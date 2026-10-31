function exportNumber(value) {
  if (value == null || value === "") return null;
  if (typeof value !== "number" && typeof value !== "string") return value;
  if (typeof value === "string" && !value.trim()) return value;
  const number = Number(value);
  return Number.isFinite(number) ? number : String(value);
}

function exportDate(value) {
  if (!value) return null;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return String(value);
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : value;
}

function splitExportText(text, limit = 30000) {
  const parts = [];
  for (let start = 0; start < text.length;) {
    let end = Math.min(start + limit, text.length);
    // Do not split an emoji's surrogate pair across Excel cells.
    const last = text.charCodeAt(end - 1);
    if (end < text.length && last >= 0xd800 && last <= 0xdbff) end--;
    parts.push(text.slice(start, end));
    start = end;
  }
  return parts;
}

function addExportSheet(workbook, name, description, columns, rows) {
  const sheet = workbook.addWorksheet(name, {
    properties: { tabColor: { argb: "496A45" } },
    views: [{ state: "frozen", ySplit: 4, activeCell: "A5", showGridLines: false }],
    pageSetup: { paperSize: 9, orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0, printTitlesRow: "1:4" }
  });
  columns.forEach((column, index) => {
    sheet.getColumn(index + 1).width = column.width || 24;
    sheet.getColumn(index + 1).hidden = Boolean(column.hidden);
  });
  const visibleCount = columns.filter((column) => !column.hidden).length;
  sheet.mergeCells(1, 1, 1, Math.max(2, visibleCount));
  sheet.getCell("A1").value = `TRAILFORM / ${name}`;
  sheet.getCell("A1").font = { name: "Calibri", size: 21, bold: true, color: { argb: "FFFFFF" } };
  sheet.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "19372B" } };
  sheet.getCell("A1").alignment = { vertical: "middle", indent: 1 };
  sheet.getRow(1).height = 44;
  sheet.mergeCells(2, 1, 2, Math.max(2, visibleCount));
  sheet.getCell("A2").value = description;
  sheet.getCell("A2").font = { name: "Calibri", size: 11, color: { argb: "526449" } };
  sheet.getCell("A2").alignment = { wrapText: true, vertical: "middle" };
  sheet.getRow(2).height = 34;
  sheet.getRow(3).height = 12;
  const header = sheet.getRow(4);
  header.values = columns.map((column) => column.header);
  header.height = 32;
  header.eachCell((cell) => {
    cell.font = { name: "Calibri", size: 11, bold: true, color: { argb: "FFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "496A45" } };
    cell.alignment = { vertical: "middle", wrapText: true };
  });
  for (const [rowIndex, values] of rows.entries()) {
    const row = sheet.getRow(rowIndex + 5);
    let lines = 1;
    values.forEach((input, index) => {
      const column = columns[index];
      const cell = row.getCell(index + 1);
      let value = input;
      if (value != null && !(value instanceof Date) && typeof value === "object") value = JSON.stringify(value);
      if (typeof value === "string" && value.length > 32767) {
        value = `${splitExportText(value, 32000)[0]}\n[Full value preserved on the Backup data sheet.]`;
      }
      // Strings stay strings, including values beginning with "="; never interpret user text as a formula.
      cell.value = value ?? null;
      cell.font = { name: "Calibri", size: 11, color: { argb: "243B2C" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: rowIndex % 2 ? "F0F5EB" : "FFFFFF" } };
      cell.alignment = { vertical: "top", wrapText: true };
      if (column.format) cell.numFmt = column.format;
      if (column.rating && typeof value === "number") {
        cell.font = { ...cell.font, bold: true };
        cell.alignment.horizontal = "center";
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: value >= 4 ? "D8ECC8" : value >= 2 ? "FFF0CC" : "F8DCD5" } };
      }
      if (!column.hidden && value != null) {
        const text = value instanceof Date ? "31 Oct 2026" : String(value);
        lines = Math.max(lines, text.split("\n").reduce((count, line) => count + Math.max(1, Math.ceil(line.length / Math.max(8, (column.width || 24) - 2))), 0));
      }
    });
    row.height = Math.min(409, Math.max(27, lines * 15 + 10));
  }
  if (!rows.length) {
    sheet.mergeCells(5, 1, 5, Math.max(2, visibleCount));
    sheet.getCell("A5").value = "No records yet.";
    sheet.getCell("A5").font = { name: "Calibri", italic: true, color: { argb: "63745B" } };
    sheet.getRow(5).height = 30;
  }
  sheet.autoFilter = { from: { row: 4, column: 1 }, to: { row: Math.max(4, rows.length + 4), column: columns.length } };
  return sheet;
}

async function createExcelWorkbook(backup) {
  if (!globalThis.ExcelJS) throw new Error("The Excel component could not load. Reload the app and try again.");
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Trailform";
  workbook.created = new Date(backup.exportedAt);
  workbook.modified = new Date(backup.exportedAt);
  const data = backup.data;
  const col = (header, width = 24, extra = {}) => ({ header, width, ...extra });
  const id = (header = "Record ID") => col(header, 38, { hidden: true });
  const date = (header) => col(header, 18, { format: "dd mmm yyyy" });
  const number = (header, width = 18) => col(header, width, { format: "#,##0.##" });
  const stamp = `Exported ${new Date(backup.exportedAt).toLocaleString()}.`;
  const add = (name, description, columns, rows) => addExportSheet(workbook, name, `${description} ${stamp}`, columns, rows);
  const progress = getSkillProgress(data.skills);

  add("Overview", "Your MTB hub, ready to read, filter, and print.", [col("Item", 32), col("Details", 90)], [
    ["Rider", data.profile.name],
    ["Estimated rider level", data.profile.currentLevel],
    ["Season focus", data.profile.seasonGoal],
    ["Assessed personal skills", progress.assessed.length],
    ["Average confidence (0-5)", progress.assessed.length ? Number((progress.assessed.reduce((sum, record) => sum + skillRating(record.score), 0) / progress.assessed.length).toFixed(2)) : "Not assessed"],
    ["Confident skills (4-5)", progress.confident.length],
    ["Training sessions", data.training.length],
    ["Competitions", data.competitions.length],
    ["Potential competitions (race list)", (backup.reference.competitionCalendar || []).length],
    ["Bikes", data.bikes.length],
    ["Service records", data.bikes.reduce((sum, bike) => sum + (bike.maintenance || []).length, 0)],
    ["Gear items / planned purchases", `${data.gear.length} / ${data.purchases.length}`],
    ["Goals / notes", `${data.goals.length} / ${data.notes.length}`],
    ["Starter examples included", data.demoMode ? "Yes - some records are starter examples." : "No"],
    ["Reading this workbook", "Each area has its own sheet. Headers stay visible while scrolling. Use column filters to narrow records. Dates and amounts are typed Excel cells."],
    ["Skill ratings", "0 is Starting out; blank is Not assessed. Targets are optional. Estimated rider level is based on average confidence across assessed library skills: below 2.5 is Beginner, 2.5-3.9 is Intermediate, and 4 or above is Advanced. This is a self-assessment, not a coaching evaluation."],
    ["Restoring data", "Import a JSON export into Trailform to restore records. Excel is a readable report, not an import format. The Backup data sheet also contains the complete JSON, in ordered chunks."],
    ["Technical fields", "Record IDs and saved legacy names are retained in hidden columns. Unhide them in Excel if needed. The Backup data sheet preserves every original field and long value."],
    ["Amounts", "Amounts use your own currency; no currency has been assumed."]
  ]);
  add("Profile", "Your rider profile.", [col("Field", 32), col("Value", 90)],
    Object.entries(data.profile).map(([key, value]) => [{ name: "Name", currentLevel: "Estimated rider level", seasonGoal: "Season focus" }[key] || key, value]));
  const skills = [
    ...backup.reference.skills.map((reference) => ({ reference, record: data.skills.find((item) => item.catalogueId === reference.id) })),
    ...data.skills.filter((item) => !backup.reference.skills.some((reference) => reference.id === item.catalogueId)).map((record) => ({ record }))
  ];
  add("Skills", "Your entire skill map plus custom and previous records. Blank confidence means not assessed.", [
    col("Category"), col("Skill", 30), col("Difficulty", 18), col("Confidence (0-5)", 18, { rating: true }),
    col("Target (0-5)", 18, { rating: true }), col("Status", 20), col("Practice notes", 60),
    { ...col("Saved name", 32), hidden: true }, id(), id("Catalogue ID")
  ], skills.map(({ reference, record }) => [
    reference?.category ?? record.category, reference?.name ?? record.name, reference?.level ?? record.level,
    record ? skillRating(record.score) : null, record ? skillRating(record.target) : null, getSkillStatus(record).label,
    record?.notes, record?.name, record?.id, record?.catalogueId ?? reference?.id
  ]));
  add("Training", "Every logged session.", [
    date("Date"), col("Session type"), number("Duration (minutes)"), number("Effort (1-5)"), col("Notes", 70), id()
  ], data.training.map((item) => [exportDate(item.date), item.type, exportNumber(item.duration), exportNumber(item.effort), item.notes, item.id]));
  add("Competitions", "Your competitions: events you marked as going from your race list, plus your own events.", [
    col("Event", 32), date("Date"), col("Location", 28), col("Discipline"), col("Status", 18), col("Personal goal", 60), col("From", 16), id(), id("Race list ID")
  ], data.competitions.map((item) => [item.name, exportDate(item.date), item.location, item.discipline, item.status, item.goal, item.calendarId ? "Race list" : "Own event", item.id, item.calendarId]));
  const raceCalendar = backup.reference.competitionCalendar || [];
  add("Race calendar", "Your potential competitions. 2027 dates marked Estimated are the same weekday one year after 2026; confirm them with the organizer.", [
    col("Year", 10), date("Date"), col("Event", 32), col("Location", 26), col("Discipline", 16), col("Date status", 26), col("Going", 12), col("Date source", 50), id("Race list ID")
  ], [...raceCalendar].sort((a, b) => a.date.localeCompare(b.date)).map((entry) => [
    entry.year, exportDate(entry.date), entry.name, entry.location, entry.discipline,
    { listed: "From your race sheet", estimated: "Estimated", confirmed: "Announced (see source)" }[entry.dateStatus] || entry.dateStatus,
    data.competitions.some((item) => item.calendarId === entry.id) ? "Yes" : "No", entry.source, entry.id
  ]));
  add("Bikes", "Your bikes and their saved types.", [
    col("Bike", 30), col("Make / model", 32), col("Model year", 14), col("Bike type", 28), number("Service records"), id()
  ], data.bikes.map((bike) => [bike.name, bike.model, exportNumber(bike.year), bike.discipline, (bike.maintenance || []).length, bike.id]));
  add("Maintenance", "Every service record, linked to its bike. Reminder status is as of export.", [
    col("Bike", 28), col("Service / component", 34), date("Last serviced"), number("Interval (days)"),
    date("Next due"), col("Reminder status", 22), col("Notes", 60), id(), id("Bike ID")
  ], data.bikes.flatMap((bike) => (bike.maintenance || []).map((item) => {
    const status = serviceStatus(item);
    return [bike.name, item.component, exportDate(item.serviceDate), exportNumber(item.intervalDays), exportDate(status.dueDate), status.label, item.notes, item.id, bike.id];
  })));
  add("Gear", "Everything in your gear inventory.", [
    col("Item", 32), col("Category"), col("Condition", 18), col("Notes", 70), id()
  ], data.gear.map((item) => [item.name, item.category, item.condition, item.notes, item.id]));
  add("Purchases", "Planned and completed purchases. Amounts are in your own currency.", [
    col("Item", 32), col("Priority", 18), col("Estimated amount", 22, { format: "#,##0.00" }), date("Target date"),
    col("Status", 18), col("Notes", 65), id()
  ], data.purchases.map((item) => [item.name, item.priority, exportNumber(item.estimatedCost), exportDate(item.targetDate), item.status, item.notes, item.id]));
  add("Goals", "All goals, with their status and progress. Measured goals also show their target, actual, and unit.", [
    col("Goal", 36), col("Category"), date("Target date"), col("Status", 20), number("Progress (%)"),
    number("Target"), number("Actual"), col("Unit", 14), col("Notes", 65), id()
  ], data.goals.map((item) => {
    const measured = item.measure === "number" && Number(item.target) > 0;
    return [
      item.title, item.category, exportDate(item.targetDate), item.status, goalPercent(item),
      measured ? exportNumber(item.target) : null, measured ? exportNumber(item.actual || "0") : null, measured ? item.unit : "", item.notes, item.id
    ];
  }));
  add("Notes", "Your complete notebook, with topics, links, and tags.", [
    date("Date"), col("Title", 36), col("Topic", 22), col("Linked to", 36), col("Tags", 30), col("Pinned", 10), col("Content", 100), id(), id("Link key")
  ], data.notes.map((item) => {
    const target = describeNoteLink(item.link, data);
    return [
      exportDate(item.date), item.title, item.topic, target ? `${target.type} · ${target.label}` : "",
      (item.tags || []).join(", "), item.pinned ? "Yes" : "No", item.content, item.id, item.link || ""
    ];
  }));
  add("Skill guides", "The complete reference library. Prerequisites are suggestions, not locks.", [
    col("Category"), col("Skill", 30), col("Difficulty", 18), col("Purpose", 60), col("Builds on", 35),
    col("Practice setting", 55), col("Practice drill", 75), col("Self-check cues", 65), col("Safety guidance", 70), id("Catalogue ID")
  ], backup.reference.skills.map((skill) => [
    skill.category, skill.name, skill.level, skill.summary,
    skill.prerequisites.map((key) => backup.reference.skills.find((item) => item.id === key)?.name || key).join("\n"),
    skill.setting, skill.drill.map((step, index) => `${index + 1}. ${step}`).join("\n"),
    skill.checks.join("\n"), skill.safety, skill.id
  ]));
  add("Backup data", "Complete, lossless JSON. Join the chunks in numeric order without adding separators to recover the original export.", [
    number("Chunk", 12), col("JSON text", 110)
  ], splitExportText(JSON.stringify(backup, null, 2)).map((chunk, index) => [index + 1, chunk]));
  return workbook.xlsx.writeBuffer();
}
