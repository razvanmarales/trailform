const STORAGE_KEY = "trailform-hub-v1";
const PAGE_TITLES = {
  overview: "Overview",
  skills: "Skills",
  training: "Training",
  competitions: "Competitions",
  calendar: "Race calendar",
  bikes: "Bikes & service",
  gear: "Gear & purchases",
  goals: "Goals & notes",
  notes: "Notes"
};
// Sub-pages live inside a sidebar section instead of having their own menu item.
const PAGE_PARENTS = { calendar: "competitions", notes: "goals" };
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const LEVEL_OPTIONS = LEVELS.map((level) => ({ value: level, label: level }));
const RATING_OPTIONS = [1, 2, 3, 4, 5].map((rating) => ({ value: rating, label: `${rating} — ${["New to it", "Learning", "Getting there", "Confident", "Dialed"][rating - 1]}` }));
const SKILL_RATING_OPTIONS = [{ value: 0, label: "0 — Starting out" }, ...RATING_OPTIONS];
const SKILL_CATEGORIES = [...SKILL_GROUPS.map((group) => group.name), "Other"];
const SUPPLIED_SKILL_SCORES = {
  "ready-position": 4,
  "attack-position": 3,
  "riding-vision": 3,
  "track-stands": 3,
  "body-bike-separation": 2,
  "braking-control": 3,
  "emergency-braking": 4,
  "brake-modulation": 4,
  "slope-braking": 4,
  "flat-cornering": 3,
  "berms": 3,
  "off-camber-turns": 2,
  "switchbacks": 4,
  "climbing-position": 4,
  "climbing-traction": 3,
  "technical-climbing": 4,
  "descending-position": 3,
  "controlled-descents": 3,
  "descending-line-choice": 2,
  "roots": 3,
  "rocks": 3,
  "steps": 3,
  "rollable-features": 3,
  "front-wheel-lifts": 2,
  "rear-wheel-lifts": 1,
  "ratcheting": 3,
  "pivots": 0,
  "manuals": 1,
  "bunny-hops": 1,
  "drops": 3,
  "tabletop-jumps": 2,
  "pumping": 2,
  "trail-scanning": 3,
  "anticipation": 3,
  "line-choice": 3,
  "riding-confidence": 3,
  "consistency": 3,
  "decision-making": 3
};
const TRAINING_TYPES = ["Skills", "Trail ride", "Endurance", "Strength", "Recovery", "Other"];
const GOAL_STATUSES = ["Planned", "In progress", "Achieved", "Paused"];
const NOTE_TOPICS = ["Training", "Technique", "Equipment & gear", "Bike setup", "Maintenance", "Trail & spots", "Race", "Nutrition & hydration", "Body & recovery", "Mindset"];
const NOTE_TOPIC_COLORS = {
  "Training": "#d3ec85", "Technique": "#8fd1b0", "Equipment & gear": "#e8cb89", "Bike setup": "#9cc7e0", "Maintenance": "#e7a879",
  "Trail & spots": "#a3c8a9", "Race": "#f2ac9d", "Nutrition & hydration": "#c9b3e6", "Body & recovery": "#e9a6c4", "Mindset": "#b8c4f0"
};
// Earlier notes used training session types; map them onto the closest topic.
const LEGACY_NOTE_TOPICS = { Skills: "Technique", Recovery: "Body & recovery" };
const NOTE_LINK_KINDS = {
  skill: { label: "Skill", topic: "Technique" },
  myskill: { label: "Skill", topic: "Technique" },
  bike: { label: "Bike", topic: "Bike setup" },
  gear: { label: "Gear", topic: "Equipment & gear" },
  competition: { label: "Competition", topic: "Race" },
  goal: { label: "Goal", topic: "" }
};
const MAX_NOTE_TAGS = 8;
const MAX_TAG_LENGTH = 24;

const today = new Date();
const dateOffset = (days) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return toISODate(date);
};

function createStarterState() {
  return {
    profile: { name: "Rider", currentLevel: "Beginner", seasonGoal: "Build confidence and consistency on the trail" },
    skills: [
      { id: createId(), name: "Ready position & balance", category: "Bike control", level: "Beginner", score: "2", target: "4", notes: "Comfortable on easy trails; keep practicing relaxed elbows." },
      { id: createId(), name: "Braking control", category: "Braking", level: "Beginner", score: "2", target: "4", notes: "Work on smooth, progressive braking." },
      { id: createId(), name: "Cornering", category: "Cornering", level: "Beginner", score: "1", target: "3", notes: "Look through the turn and practice on wide, flat corners." },
      { id: createId(), name: "Line choice", category: "Trail judgment", level: "Intermediate", score: "1", target: "3", notes: "" }
    ],
    training: [
      { id: createId(), date: dateOffset(-2), type: "Skills", duration: "45", effort: "2", notes: "Flat-ground braking and cornering drills." },
      { id: createId(), date: dateOffset(-5), type: "Trail ride", duration: "90", effort: "3", notes: "Easy local loop. Focused on looking ahead." }
    ],
    competitions: [
      { id: createId(), name: "Local trail event", date: dateOffset(24), location: "Add location", discipline: "Enduro", goal: "Finish feeling in control", status: "Planned" }
    ],
    bikes: [
      {
        id: createId(), name: "Trail bike", model: "Add make / model", discipline: "Trail",
        maintenance: [
          { id: createId(), component: "Drivetrain clean & lube", serviceDate: dateOffset(-16), intervalDays: "30", notes: "Example reminder — adjust to your riding and manufacturer guidance." },
          { id: createId(), component: "Brake pad inspection", serviceDate: dateOffset(-40), intervalDays: "30", notes: "Check wear before the next ride." }
        ]
      }
    ],
    gear: [
      { id: createId(), name: "Helmet", category: "Protection", condition: "Good", notes: "Example item — confirm fit and replace after an impact." },
      { id: createId(), name: "Knee pads", category: "Protection", condition: "Good", notes: "" }
    ],
    purchases: [
      { id: createId(), name: "Spare brake pads", priority: "Soon", estimatedCost: "25", targetDate: dateOffset(14), status: "Planned", notes: "Check the correct model for your brakes." }
    ],
    goals: [
      { id: createId(), title: "Ride consistently this month", category: "Training", targetDate: dateOffset(30), status: "In progress", progress: "40", notes: "Aim for two sessions each week." }
    ],
    notes: [
      { id: createId(), date: dateOffset(-2), title: "Skills session takeaway", topic: "Technique", link: "skill:flat-cornering", tags: ["cornering", "grip"], pinned: false, content: "Relaxing my grip helped me stay balanced. Repeat the cornering drill next time." }
    ],
    demoMode: true
  };
}

function createEmptyState() {
  return {
    profile: { name: "Rider", currentLevel: "Beginner", seasonGoal: "" },
    skills: [], training: [], competitions: [], bikes: [], gear: [], purchases: [], goals: [], notes: [],
    demoMode: false
  };
}

function createId() {
  return globalThis.crypto?.randomUUID?.() || `record-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isValidState(value) {
  const collections = ["skills", "training", "competitions", "bikes", "gear", "purchases", "goals", "notes"];
  if (!value || typeof value !== "object" || Array.isArray(value) ||
      !value.profile || typeof value.profile !== "object" || Array.isArray(value.profile) ||
      typeof value.profile.name !== "string" || typeof value.profile.currentLevel !== "string") return false;
  return collections.every((key) => {
    if (!Array.isArray(value[key])) return false;
    return value[key].every((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item) || typeof item.id !== "string") return false;
      if (key !== "bikes" || item.maintenance === undefined) return true;
      return Array.isArray(item.maintenance) && item.maintenance.every((service) =>
        service && typeof service === "object" && !Array.isArray(service) && typeof service.id === "string"
      );
    });
  });
}

function skillRating(value) {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (!/^[0-5]$/.test(String(value))) return null;
  return Number(value);
}

function normalizeSkillRecords(records) {
  const ids = new Set();
  const linkedIds = new Set();
  const normalized = records.map((record) => {
    if (!record.id || ids.has(record.id)) throw new Error("Skill IDs must be nonempty and unique.");
    ids.add(record.id);
    if (typeof record.name !== "string" || !record.name.trim() ||
        typeof record.category !== "string" || !LEVELS.includes(record.level) ||
        skillRating(record.score) === null ||
        (record.target != null && record.target !== "" && skillRating(record.target) === null) ||
        (record.notes !== undefined && typeof record.notes !== "string") ||
        (record.catalogueId != null && typeof record.catalogueId !== "string")) {
      throw new Error("Each saved skill needs a name, category, valid level, a 0-5 confidence rating, and text notes. Targets must be blank or 0-5.");
    }
    if (SKILL_CATALOG_BY_ID.has(record.catalogueId)) {
      if (linkedIds.has(record.catalogueId)) throw new Error("A library skill has more than one personal progress record.");
      linkedIds.add(record.catalogueId);
    }
    return { ...record };
  });
  for (const legacy of LEGACY_SKILL_LINKS) {
    const matches = normalized.filter((record) => !Object.hasOwn(record, "catalogueId") &&
      record.name === legacy.name && record.category === legacy.category && record.level === legacy.level);
    if (matches.length === 1 && !linkedIds.has(legacy.catalogueId)) {
      matches[0].catalogueId = legacy.catalogueId;
      linkedIds.add(legacy.catalogueId);
    }
  }
  return normalized.map((record) => Object.hasOwn(record, "catalogueId") ? record : { ...record, catalogueId: null });
}

function prepareState(value) {
  if (!isValidState(value)) throw new Error("The saved MTB data does not have a supported format.");
  return {
    ...value,
    skills: normalizeSkillRecords(value.skills),
    competitions: normalizeCompetitionRecords(value.competitions),
    goals: normalizeGoalRecords(value.goals),
    notes: normalizeNoteRecords(value.notes)
  };
}

function clampProgress(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(100, Math.max(0, Math.round(number))) : 0;
}

function normalizeGoalRecords(records) {
  return records.map((record) => {
    const target = Number(record.target);
    const numeric = record.measure !== "percent" && Number.isFinite(target) && target > 0;
    if (numeric) {
      const actual = Math.max(0, Number(record.actual) || 0);
      return {
        ...record, measure: "number", target: String(target), actual: String(actual), unit: String(record.unit ?? "").trim(),
        progress: String(Math.min(100, Math.floor((actual / target) * 100)))
      };
    }
    const hasProgress = record.progress !== undefined && record.progress !== null && String(record.progress).trim() !== "" && Number.isFinite(Number(record.progress));
    return {
      ...record, measure: "percent", target: "", actual: "", unit: "",
      progress: String(hasProgress ? clampProgress(record.progress) : record.status === "Achieved" ? 100 : 0)
    };
  });
}

function normalizeTags(values) {
  const seen = new Set();
  const tags = [];
  for (const value of values) {
    const tag = String(value ?? "").trim().replace(/^#+/, "").replace(/\s+/g, " ").slice(0, MAX_TAG_LENGTH).trim();
    if (!tag || seen.has(tag.toLowerCase())) continue;
    seen.add(tag.toLowerCase());
    tags.push(tag);
    if (tags.length === MAX_NOTE_TAGS) break;
  }
  return tags;
}

function normalizeNoteRecords(records) {
  return records.map(({ type, ...record }) => {
    const rawTags = Array.isArray(record.tags) ? [...record.tags] : typeof record.tags === "string" ? record.tags.split(",") : [];
    let topic = NOTE_TOPICS.includes(record.topic) ? record.topic : "";
    if (!topic) {
      // Keep the old session type (or an unknown topic) as a tag so no detail is lost.
      const previous = typeof record.topic === "string" && record.topic.trim() ? record.topic : typeof type === "string" ? type : "";
      topic = LEGACY_NOTE_TOPICS[type] || "Training";
      if (previous && previous !== "Other") rawTags.push(previous.toLowerCase());
    }
    return { ...record, topic, link: typeof record.link === "string" ? record.link : "", tags: normalizeTags(rawTags), pinned: record.pinned === true };
  });
}

function applySuppliedSkillAssessment(value) {
  if (value.skillAssessmentApplied === true) return value;
  const skills = value.skills.map((record) => ({ ...record }));
  for (const reference of SKILL_CATALOG) {
    const score = String(SUPPLIED_SKILL_SCORES[reference.id]);
    const existing = skills.find((record) => record.catalogueId === reference.id);
    if (existing) {
      existing.score = score;
    } else {
      skills.push({
        id: createId(), catalogueId: reference.id, name: reference.name, category: reference.category,
        level: reference.level, score, target: "", notes: ""
      });
    }
  }
  // The supplied assessment is a one-time update, not a default to replay after edits or resets.
  return { ...value, skills, skillAssessmentApplied: true };
}

function normalizeCompetitionRecords(records) {
  const linked = new Set();
  return records.map((record) => {
    const calendarId = typeof record.calendarId === "string" && record.calendarId && !linked.has(record.calendarId) ? record.calendarId : null;
    if (calendarId) linked.add(calendarId);
    return { ...record, calendarId };
  });
}

function movePreviousCalendarImport(value) {
  if (value.competitionCalendar2026Applied !== true) return value;
  const { competitionCalendar2026Applied, ...rest } = value;
  const linked = new Set(value.competitions.map((record) => record.calendarId).filter(Boolean));
  const competitions = [];
  for (const record of value.competitions) {
    const entry = !record.calendarId && COMPETITION_CALENDAR.find((item) => item.year === 2026 && item.date === record.date &&
      item.name.toLowerCase() === String(record.name || "").trim().toLowerCase());
    if (!entry) {
      competitions.push(record);
      continue;
    }
    const untouched = record.name === entry.name && record.location === entry.location && record.discipline === entry.discipline &&
      !String(record.goal || "").trim() && record.status === "Planned";
    if (untouched) continue;
    if (linked.has(entry.id)) {
      competitions.push(record);
      continue;
    }
    linked.add(entry.id);
    competitions.push({ ...record, calendarId: entry.id });
  }
  // An earlier version copied the race sheet into My competitions; untouched copies now live only in the potential list.
  return { ...rest, competitions };
}

function getSkillProgress(records) {
  const assessed = records.filter((record) => skillRating(record.score) !== null);
  return {
    assessed,
    confident: assessed.filter((record) => skillRating(record.score) >= 4),
    percent: assessed.length ? Math.round(assessed.reduce((sum, record) => sum + skillRating(record.score), 0) / (assessed.length * 5) * 100) : 0
  };
}

function getRiderLevel(records) {
  const assessed = records.filter((record) =>
    SKILL_CATALOG_BY_ID.has(record.catalogueId) && skillRating(record.score) !== null
  );
  if (!assessed.length) return { level: "Not assessed", assessed: 0, average: null };
  const average = assessed.reduce((sum, record) => sum + skillRating(record.score), 0) / assessed.length;
  const level = average < 2.5 ? "Beginner" : average < 4 ? "Intermediate" : "Advanced";
  return { level, assessed: assessed.length, average };
}

function withRiderLevel(nextState) {
  return {
    ...nextState,
    profile: { ...nextState.profile, currentLevel: getRiderLevel(nextState.skills).level }
  };
}

function getCatalogueRecord(catalogueId) {
  return state.skills.find((record) => record.catalogueId === catalogueId);
}

function getCustomSkills() {
  return state.skills.filter((record) => !SKILL_CATALOG_BY_ID.has(record.catalogueId));
}

function getSkillStatus(record) {
  const rating = skillRating(record?.score);
  if (rating === null) return { label: "Not assessed", className: "unassessed", rating: null };
  if (rating === 0) return { label: "Starting out", className: "starting", rating };
  return { label: rating >= 4 ? "Confident" : "Learning", className: rating >= 4 ? "confident" : "learning", rating };
}

let state;
let storageNotice = "";
let storageReadFailed = false;
let rawUnparsedData = null;
let savedData = null;

try {
  savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData === null) {
    state = prepareState(createStarterState());
  } else {
    state = prepareState(JSON.parse(savedData));
  }
} catch (error) {
  storageReadFailed = true;
  rawUnparsedData = savedData;
  state = createEmptyState();
  storageNotice = `Saved data could not be loaded: ${error.message} Your records were not overwritten. ${rawUnparsedData !== null ? "Export the original data or import a valid backup to continue." : "Saving is blocked until you import a valid backup."}`;
  console.error("Trailform could not load saved data.", error);
}

const pageContent = document.querySelector("#page-content");
const appNotice = document.querySelector("#app-notice");
const editorDialog = document.querySelector("#editor-dialog");
const editorForm = document.querySelector("#editor-form");
const formFields = document.querySelector("#form-fields");
const formError = document.querySelector("#form-error");
const toast = document.querySelector("#toast");
let activePage = "overview";
let editorContext = null;
let editorReturnFocus = null;
let editorReturnSkillId = "";
let editorInitialValues = "";
const skillFilters = { query: "", category: "All" };
const COMPETITION_CALENDAR_BY_ID = new Map(COMPETITION_CALENDAR.map((entry) => [entry.id, entry]));
const competitionFilters = { year: String(COMPETITION_CALENDAR_YEARS[0]), type: "All" };
const raceCalendarView = { month: "" };
const noteFilters = { query: "", topic: "All", tag: "", link: "" };
const goalFilters = { year: "" };
const raceDialog = document.querySelector("#race-dialog");
const raceDialogContent = document.querySelector("#race-dialog-content");
const raceDialogStatus = document.querySelector("#race-dialog-status");
let raceDialogKey = "";
let pendingRouteFocus = "";
let toastTimeout;

const field = (name, label, type = "text", options = {}) => ({ name, label, type, ...options });

const FORM_CONFIG = {
  profile: {
    title: "Rider profile",
    fields: [
      field("name", "Name", "text", { required: true, maxlength: 50 }),
      field("seasonGoal", "Season focus", "textarea", { maxlength: 220, full: true, placeholder: "What would you like to work toward?" })
    ]
  },
  skills: {
    title: "Skill",
    fields: [
      field("name", "Skill", "text", { required: true, maxlength: 70 }),
      field("category", "Area", "select", { required: true, choices: SKILL_CATEGORIES.map((label) => ({ value: label, label })) }),
      field("level", "Suggested level", "select", { required: true, choices: LEVEL_OPTIONS }),
      field("score", "Current confidence (0–5)", "select", { required: true, choices: [{ value: "", label: "Choose your confidence" }, ...SKILL_RATING_OPTIONS] }),
      field("target", "Next target (0–5)", "select", { choices: [{ value: "", label: "Not set" }, ...SKILL_RATING_OPTIONS] }),
      field("notes", "Practice notes", "textarea", { maxlength: 300, full: true })
    ]
  },
  training: {
    title: "Training session",
    fields: [
      field("date", "Date", "date", { required: true, default: () => toISODate(new Date()) }),
      field("type", "Session type", "select", { required: true, choices: TRAINING_TYPES.map((label) => ({ value: label, label })) }),
      field("duration", "Duration (minutes)", "number", { required: true, min: 1, max: 1440 }),
      field("effort", "Effort (1–5)", "select", { required: true, choices: RATING_OPTIONS }),
      field("notes", "What did you work on?", "textarea", { maxlength: 400, full: true })
    ]
  },
  competitions: {
    title: "Competition",
    fields: [
      field("name", "Event", "text", { required: true, maxlength: 90 }),
      field("date", "Date", "date", { required: true }),
      field("location", "Location", "text", { maxlength: 90 }),
      field("discipline", "Discipline", "text", { maxlength: 50, placeholder: "Enduro, XC, downhill…" }),
      field("goal", "Personal goal", "text", { maxlength: 140 }),
      field("status", "Status", "select", { required: true, choices: ["Planned", "Registered", "Completed", "Withdrawn"].map((label) => ({ value: label, label })) })
    ]
  },
  bikes: {
    title: "Bike",
    fields: [
      field("name", "Bike name", "text", { required: true, maxlength: 60 }),
      field("model", "Make / model", "text", { maxlength: 90 }),
      field("year", "Model year", "number", { min: 1970, max: new Date().getFullYear() + 1, step: 1, placeholder: String(new Date().getFullYear()) }),
      field("discipline", "Bike type", "select", { choices: [] })
    ]
  },
  maintenance: {
    title: "Maintenance record",
    fields: [
      field("bikeId", "Bike", "select", { required: true, choices: [] }),
      field("component", "Service / component", "text", { required: true, maxlength: 90 }),
      field("serviceDate", "Last serviced", "date", { required: true, default: () => toISODate(new Date()) }),
      field("intervalDays", "Reminder interval (days)", "number", { min: 1, max: 3650, placeholder: "Optional" }),
      field("notes", "Service notes", "textarea", { maxlength: 300, full: true })
    ]
  },
  gear: {
    title: "Gear item",
    fields: [
      field("name", "Item", "text", { required: true, maxlength: 70 }),
      field("category", "Category", "text", { maxlength: 50, placeholder: "Protection, tools, clothing…" }),
      field("condition", "Condition", "select", { required: true, choices: ["Good", "Watch", "Replace"].map((label) => ({ value: label, label })) }),
      field("notes", "Notes", "textarea", { maxlength: 250, full: true })
    ]
  },
  purchases: {
    title: "Planned purchase",
    fields: [
      field("name", "Item", "text", { required: true, maxlength: 80 }),
      field("priority", "Priority", "select", { required: true, choices: ["Whenever", "Soon", "Essential"].map((label) => ({ value: label, label })) }),
      field("estimatedCost", "Estimated amount (your currency)", "number", { min: 0, max: 10000000, step: "0.01", placeholder: "Optional" }),
      field("targetDate", "Target date", "date"),
      field("status", "Status", "select", { required: true, choices: ["Planned", "Purchased"].map((label) => ({ value: label, label })) }),
      field("notes", "Notes", "textarea", { maxlength: 250, full: true })
    ]
  },
  goals: {
    title: "Season goal",
    fields: [
      field("title", "Goal", "text", { required: true, maxlength: 100, full: true }),
      field("category", "Focus area", "text", { maxlength: 50, placeholder: "Ride volume, events, skills…" }),
      field("targetDate", "Target date", "date", { default: () => goalDefaultTargetDate(), hint: "The year of this date is the season the goal belongs to." }),
      field("status", "Status", "select", { required: true, choices: GOAL_STATUSES.map((label) => ({ value: label, label })) }),
      field("measure", "Track progress by", "select", {
        required: true, default: () => "number",
        choices: [{ value: "number", label: "Target vs actual (e.g. 300 h)" }, { value: "percent", label: "Percentage slider" }]
      }),
      field("target", "Target", "number", { required: true, min: 0.01, step: "any", third: true, placeholder: "6000" }),
      field("actual", "Actual so far", "number", { min: 0, step: "any", third: true, default: () => "0", placeholder: "5399" }),
      field("unit", "Unit", "text", { maxlength: 20, third: true, placeholder: "km, h, races…" }),
      field("progress", "Progress", "range", { min: 0, max: 100, step: 5, full: true, default: () => "0", hint: "Moving it updates the status: above 0% is In progress, 100% is Achieved." }),
      field("notes", "Next step / notes", "textarea", { maxlength: 300, full: true })
    ]
  },
  notes: {
    title: "Note",
    fields: [
      field("date", "Date", "date", { required: true, default: () => toISODate(new Date()) }),
      field("topic", "Topic", "select", { required: true, choices: NOTE_TOPICS.map((label) => ({ value: label, label })) }),
      field("title", "Title", "text", { required: true, maxlength: 80, full: true }),
      field("link", "Linked to", "select", { choices: [], hint: "Optional. The note also appears there." }),
      field("tags", "Tags", "text", { maxlength: 240, placeholder: "braking, wet roots", hint: `Separate with commas. Up to ${MAX_NOTE_TAGS}.` }),
      field("content", "Note", "textarea", { required: true, maxlength: 2000, full: true, rows: 6, placeholder: "What worked, what to try next, settings, details worth remembering…" })
    ]
  }
};

const SKILL_PROGRESS_FIELDS = FORM_CONFIG.skills.fields
  .filter((item) => ["score", "target", "notes"].includes(item.name));

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function formatDate(value, options = { day: "numeric", month: "short", year: "numeric" }) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return "No date set";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "No date set";
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

function setNotice(message, isError = false) {
  appNotice.hidden = !message;
  appNotice.textContent = message;
  appNotice.classList.toggle("notice-error", isError);
}

function saveState(nextState, { replaceUnreadable = false } = {}) {
  try {
    if (storageReadFailed && !replaceUnreadable) {
      throw new Error("Existing saved data is unreadable. Import a valid backup before saving.");
    }
    const savedState = withRiderLevel(nextState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
    state = savedState;
    storageReadFailed = false;
    rawUnparsedData = null;
    storageNotice = "";
    setNotice("", false);
    return true;
  } catch (error) {
    storageNotice = `Changes were not saved. ${error.message}`;
    console.error("Trailform could not save data.", error);
    setNotice(storageNotice, true);
    return false;
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

function sortedByDate(records, key, direction = "asc") {
  return [...records].sort((a, b) => {
    const comparison = String(a[key] || "").localeCompare(String(b[key] || ""));
    return direction === "asc" ? comparison : -comparison;
  });
}

function getBike(bikeId) {
  return state.bikes.find((bike) => bike.id === bikeId);
}

function allMaintenance() {
  return state.bikes.flatMap((bike) => (bike.maintenance || []).map((item) => ({ ...item, bikeId: bike.id, bikeName: bike.name })));
}

function getNextServiceDate(item) {
  const interval = Number(item.intervalDays);
  if (!item.serviceDate || !Number.isFinite(interval) || interval <= 0) return "";
  const due = new Date(`${item.serviceDate}T12:00:00`);
  due.setDate(due.getDate() + interval);
  return toISODate(due);
}

function serviceStatus(item) {
  const dueDate = getNextServiceDate(item);
  if (!dueDate) return { label: "No reminder", className: "status-neutral", dueDate: "" };
  const days = Math.ceil((new Date(`${dueDate}T12:00:00`) - new Date(`${toISODate(new Date())}T12:00:00`)) / 86400000);
  if (days < 0) return { label: `${Math.abs(days)}d overdue`, className: "status-danger", dueDate };
  if (days <= 14) return { label: days === 0 ? "Due today" : `Due in ${days}d`, className: "status-warning", dueDate };
  return { label: "On track", className: "status-good", dueDate };
}

function pageHeader({ eyebrow, title, description, action, actionLabel, actionIcon = "+" }) {
  return `
    <section class="page-heading">
      <div>
        <p class="eyebrow"><span class="eyebrow-line"></span>${escapeHTML(eyebrow)}</p>
        <h1>${title}<span class="heading-period">.</span></h1>
        <p class="page-description">${description}</p>
      </div>
      ${action ? `<button class="primary-button" type="button" data-add="${escapeHTML(action)}">${escapeHTML(actionLabel)} <span aria-hidden="true">${actionIcon}</span></button>` : ""}
    </section>
  `;
}

function recordActions(module, recordId, extra = "") {
  return `
    <div class="record-actions">
      ${extra}
      <button class="icon-button" type="button" data-edit="${escapeHTML(module)}" data-id="${escapeHTML(recordId)}" aria-label="Edit record">✎</button>
      <button class="icon-button danger-hover" type="button" data-delete="${escapeHTML(module)}" data-id="${escapeHTML(recordId)}" aria-label="Delete record">×</button>
    </div>
  `;
}

function emptyPanel(title, description, action, label) {
  return `
    <div class="empty-panel">
      <span class="empty-mark" aria-hidden="true">＋</span>
      <h3>${title}</h3>
      <p>${description}</p>
      ${action ? `<button class="secondary-button" type="button" data-add="${escapeHTML(action)}">${label}</button>` : ""}
    </div>
  `;
}

function renderOverview() {
  const skillProgress = getSkillProgress(state.skills);
  const riderLevel = getRiderLevel(state.skills);
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 6);
  const weekStartISO = toISODate(weekStart);
  const recentTraining = state.training.filter((session) => session.date >= weekStartISO);
  const weeklyMinutes = recentTraining.reduce((sum, session) => sum + Number(session.duration || 0), 0);
  const nextCompetition = sortedByDate(state.competitions.filter((event) => event.date >= toISODate(new Date()) && event.status !== "Withdrawn" && event.status !== "Completed"), "date")[0];
  const serviceItems = sortedByDate(allMaintenance().filter((item) => serviceStatus(item).className === "status-danger" || serviceStatus(item).className === "status-warning"), "serviceDate");
  const nextService = serviceItems[0];
  const purchaseTotal = state.purchases.filter((item) => item.status !== "Purchased").reduce((sum, item) => sum + Number(item.estimatedCost || 0), 0);
  const recentNotes = sortedByDate(state.notes, "date", "desc").slice(0, 2);

  return `
    <section class="overview-hero" aria-labelledby="overview-title">
      <div class="overview-hero-copy">
        <p class="eyebrow"><span class="eyebrow-line"></span>YOUR SEASON</p>
        <h1 id="overview-title">Your riding,<br>at a glance<span class="heading-period">.</span></h1>
        <p class="overview-hero-description">A little progress, a good plan, and more time on the bike.</p>
        <button class="primary-button" type="button" data-add="training">Log a session <span aria-hidden="true">↗</span></button>
      </div>
      <div class="overview-hero-media">
        <img class="overview-hero-photo" src="assets/trail-rider-hero.jpg" width="1152" height="768" alt="" fetchpriority="high" decoding="async">
      </div>
    </section>

    <section class="rider-strip">
      <div class="rider-level">
        <span class="avatar-large">${escapeHTML((state.profile.name || "R").trim().charAt(0).toUpperCase() || "R")}</span>
        <div><span class="stat-label">ESTIMATED RIDER LEVEL</span><strong>${escapeHTML(riderLevel.level)}</strong><span class="rider-level-caption">${riderLevel.assessed} skill ratings</span></div>
      </div>
      <div class="rider-goal"><span class="stat-label">SEASON FOCUS</span><p>${escapeHTML(state.profile.seasonGoal || "Add a season focus to keep your training pointed in the right direction.")}</p></div>
      <button class="text-button profile-edit" type="button" data-edit="profile">Edit profile <span aria-hidden="true">↗</span></button>
    </section>

    <section class="stats-grid" aria-label="Season overview">
      <article class="stat-card">
        <div class="stat-top"><span class="stat-label">SKILL CONFIDENCE</span><span class="stat-symbol" aria-hidden="true">⌁</span></div>
        <div class="stat-main"><strong>${skillProgress.percent}%</strong><span>across ${skillProgress.assessed.length} assessed skills</span></div>
        <div class="progress-track"><span style="width:${skillProgress.percent}%"></span></div>
      </article>
      <article class="stat-card">
        <div class="stat-top"><span class="stat-label">LAST 7 DAYS</span><span class="stat-symbol" aria-hidden="true">◷</span></div>
        <div class="stat-main"><strong>${recentTraining.length}</strong><span>sessions · ${weeklyMinutes} min</span></div>
        <p class="stat-footnote">Consistency beats intensity.</p>
      </article>
      <article class="stat-card">
        <div class="stat-top"><span class="stat-label">PURCHASE PLAN</span><span class="stat-symbol" aria-hidden="true">◇</span></div>
        <div class="stat-main"><strong>${state.purchases.filter((item) => item.status !== "Purchased").length}</strong><span>items · ${escapeHTML(purchaseTotal.toLocaleString())} planned</span></div>
        <p class="stat-footnote">Amounts are in your chosen currency.</p>
      </article>
    </section>

    <section class="dashboard-grid">
      <article class="panel spotlight-panel">
        <div class="panel-heading"><div><p class="eyebrow"><span class="eyebrow-line"></span>ON YOUR CALENDAR</p><h2>Next competition<span class="heading-period">.</span></h2></div><button class="text-button" type="button" data-page="competitions">All events <span aria-hidden="true">↗</span></button></div>
        ${nextCompetition ? `
          <div class="event-highlight">
            <div class="event-date"><span>${escapeHTML(formatDate(nextCompetition.date, { month: "short" }).toUpperCase())}</span><strong>${escapeHTML(formatDate(nextCompetition.date, { day: "numeric" }))}</strong></div>
            <div class="event-info"><span class="soft-tag">${escapeHTML(nextCompetition.discipline || "EVENT")}</span><h3>${escapeHTML(nextCompetition.name)}</h3><p>${escapeHTML(nextCompetition.location || "Location not set")}${competitionDateTag(nextCompetition) && COMPETITION_CALENDAR_BY_ID.get(nextCompetition.calendarId)?.dateStatus === "estimated" ? " · date estimated" : ""}</p></div>
            <div class="event-countdown">${Math.max(0, Math.ceil((new Date(`${nextCompetition.date}T12:00:00`) - new Date(`${toISODate(new Date())}T12:00:00`)) / 86400000))}<span>DAYS</span></div>
          </div>
          ${nextCompetition.goal ? `<p class="event-goal"><span>YOUR GOAL</span> ${escapeHTML(nextCompetition.goal)}</p>` : ""}
        ` : emptyPanel("No upcoming events", "Add a competition to start mapping your season.", "competitions", "Add competition")}
      </article>

      <article class="panel">
        <div class="panel-heading"><div><p class="eyebrow"><span class="eyebrow-line"></span>KEEP IT ROLLING</p><h2>Bike check<span class="heading-period">.</span></h2></div><button class="text-button" type="button" data-page="bikes">Bikes <span aria-hidden="true">↗</span></button></div>
        ${nextService ? `
          <div class="service-highlight">
            <span class="service-icon" aria-hidden="true">⌘</span>
            <div class="service-copy"><h3>${escapeHTML(nextService.component)}</h3><p>${escapeHTML(nextService.bikeName)} · due ${escapeHTML(formatDate(serviceStatus(nextService).dueDate))}</p></div>
            <span class="status-tag ${serviceStatus(nextService).className}">${escapeHTML(serviceStatus(nextService).label)}</span>
          </div>
        ` : emptyPanel("All clear for now", "Add a bike and service reminders to stay ahead of maintenance.", "bikes", "Add a bike")}
      </article>

      <article class="panel skill-summary-panel">
        <div class="panel-heading"><div><p class="eyebrow"><span class="eyebrow-line"></span>BUILD YOUR TOOLKIT</p><h2>Skills in focus<span class="heading-period">.</span></h2></div><button class="text-button" type="button" data-page="skills">Skill set <span aria-hidden="true">↗</span></button></div>
        ${skillProgress.assessed.length ? `
          <div class="focus-skill-list">${[...skillProgress.assessed].sort((a, b) => skillRating(a.score) - skillRating(b.score)).slice(0, 3).map((skill) => `
            <div class="focus-skill">
              <div class="focus-skill-meta"><span>${escapeHTML(SKILL_CATALOG_BY_ID.get(skill.catalogueId)?.name || skill.name)}</span><span>${escapeHTML(skill.score)}/5</span></div>
              <div class="progress-track"><span style="width:${Math.min(100, Number(skill.score || 0) * 20)}%"></span></div>
            </div>
          `).join("")}</div>
        ` : emptyPanel("Start your skill profile", "Rate a few skills to see where you are and what to work on next.", "skills", "Add a skill")}
      </article>

      <article class="panel notes-summary-panel">
        <div class="panel-heading"><div><p class="eyebrow"><span class="eyebrow-line"></span>REMEMBER THE GOOD STUFF</p><h2>Recent notes<span class="heading-period">.</span></h2></div><button class="text-button" type="button" data-page="notes">All notes <span aria-hidden="true">↗</span></button></div>
        ${recentNotes.length ? recentNotes.map((note) => `<div class="note-preview" style="--topic:${noteTopicColor(note.topic)}"><span>${escapeHTML(formatDate(note.date, { day: "numeric", month: "short" }))}</span><div>${topicTag(note.topic)}<h3>${escapeHTML(note.title)}</h3><p>${escapeHTML(truncateText(note.content, 160))}</p></div></div>`).join("") : emptyPanel("Keep a note", "Capture a lesson from a ride, a bike setup change, or a technique cue.", "notes", "Add a note")}
      </article>
    </section>

    <section class="quick-actions">
      <div><p class="eyebrow"><span class="eyebrow-line"></span>MAKE IT YOURS</p><h2>Good plans start small<span class="heading-period">.</span></h2></div>
      <div class="quick-action-buttons">
        <button class="secondary-button" type="button" data-add="skills">＋ Add a skill</button>
        <button class="secondary-button" type="button" data-add="competitions">＋ Plan an event</button>
        <button class="secondary-button" type="button" data-add="goals">＋ Set a goal</button>
      </div>
    </section>
  `;
}

function skillMatchesFilters(skill) {
  const query = skillFilters.query.trim().toLowerCase();
  return (skillFilters.category === "All" || skill.category === skillFilters.category) &&
    `${skill.name} ${skill.category} ${skill.level} ${skill.summary || ""}`.toLowerCase().includes(query);
}

function renderSkillNode(skill) {
  const personal = getCatalogueRecord(skill.id);
  const status = getSkillStatus(personal);
  return `
    <article class="skill-node is-${status.className}">
      <button class="skill-node-button" type="button" data-open-skill="${skill.id}" aria-labelledby="skill-name-${skill.id}" aria-describedby="skill-level-${skill.id} skill-status-${skill.id}">
        <span class="skill-node-top">
          <span class="skill-node-name" id="skill-name-${skill.id}">${escapeHTML(skill.name)}</span>
          <span class="skill-node-score" aria-hidden="true">${status.rating !== null ? `${status.rating}<small>/5</small>` : "↗"}</span>
        </span>
        <span class="skill-node-bottom">
          <span class="level-pill skill-node-level ${skill.level.toLowerCase()}" id="skill-level-${skill.id}">${skill.level}</span>
          <span class="skill-status ${status.className}" id="skill-status-${skill.id}"><span class="skill-status-dot" aria-hidden="true"></span>${status.label}${status.rating !== null ? `<span class="sr-only">, confidence ${status.rating} of 5</span>` : ""}</span>
        </span>
        <span class="skill-node-meter" aria-hidden="true">${[1, 2, 3, 4, 5].map((rating) => `<span${rating <= status.rating ? ' class="is-filled"' : ""}></span>`).join("")}</span>
      </button>
    </article>
  `;
}

function renderCustomSkillCards(records) {
  return records.map((skill) => {
    const target = skillRating(skill.target);
    return `
    <article class="record-card skill-card">
      <div class="record-card-top"><span class="soft-tag">${escapeHTML(skill.category || "OTHER")}</span>${recordActions("skills", skill.id, noteBacklinkButton(`myskill:${skill.id}`, skill.name))}</div>
      <div class="record-title-row"><h3>${escapeHTML(skill.name)}</h3><span class="level-pill ${escapeHTML((skill.level || "Beginner").toLowerCase())}">${escapeHTML(skill.level || "Beginner")}</span></div>
      <div class="rating-compare">
        <div><span>CURRENT</span><strong>${escapeHTML(skill.score)}<small> / 5</small></strong></div>
        <span class="rating-arrow" aria-hidden="true">→</span>
        <div><span>NEXT TARGET</span><strong>${target !== null ? `${target}<small> / 5</small>` : "—"}</strong></div>
      </div>
      <div class="rating-track"><span style="width:${skillRating(skill.score) * 20}%"></span>${target !== null ? `<i style="left:${target * 20}%"></i>` : ""}</div>
      <p class="record-notes">${escapeHTML(skill.notes || "Add a practice note or small next step.")}</p>
    </article>
  `;
  }).join("");
}

function renderSkillMap() {
  const matches = SKILL_CATALOG.filter(skillMatchesFilters);
  const custom = getCustomSkills();
  const customMatches = custom.filter(skillMatchesFilters);
  return `
    ${matches.length ? `
      <div class="skill-map">
        ${SKILL_GROUPS.filter((group) => matches.some((skill) => skill.category === group.name)).map((group) => {
          const groupSkills = SKILL_CATALOG.filter((skill) => skill.category === group.name);
          const visible = groupSkills.filter(skillMatchesFilters);
          const progress = getSkillProgress(groupSkills.map((skill) => getCatalogueRecord(skill.id)).filter(Boolean));
          return `
            <section class="skill-group group-${group.accent}" data-skill-group="${group.id}" aria-labelledby="group-title-${group.id}">
              <div class="skill-group-heading">
                <div class="skill-group-title"><h3 id="group-title-${group.id}">${group.name}</h3><span>${groupSkills.length} skills</span></div>
                <p>${group.description}</p>
                <div class="skill-group-progress"><span>${progress.assessed.length} / ${groupSkills.length} assessed</span><span>${progress.confident.length} confident</span></div>
              </div>
              <div class="skill-group-nodes">${visible.map(renderSkillNode).join("")}</div>
            </section>
          `;
        }).join("")}
      </div>
    ` : `<div class="skill-map-empty"><h3>No library skills match those filters.</h3><p>Try a different technique or category.</p><button class="secondary-button" type="button" data-clear-skills>Show all skills</button></div>`}
    <section class="custom-skills-section" aria-labelledby="custom-skills-title">
      <div class="section-subheading"><div><h2 id="custom-skills-title">Your custom skills<span class="heading-period">.</span></h2><p>Personal techniques and previous records outside your current map.</p></div><button class="secondary-button" type="button" data-add="skills">Add custom skill <span aria-hidden="true">+</span></button></div>
      ${customMatches.length ? `<div class="record-grid">${renderCustomSkillCards(customMatches)}</div>` : `<p class="skill-custom-empty">${custom.length ? "No custom skills match these filters." : "Have something specific to work on? Add it here without changing the library."}</p>`}
    </section>
  `;
}

function skillResultLabel() {
  const custom = getCustomSkills();
  return `${SKILL_CATALOG.filter(skillMatchesFilters).length} of ${SKILL_CATALOG.length} library skills${custom.length ? ` · ${custom.filter(skillMatchesFilters).length} custom` : ""}`;
}

function updateSkillMap() {
  document.querySelector("#skills-map-content").innerHTML = renderSkillMap();
  document.querySelector("#skill-result-count").textContent = skillResultLabel();
}

function renderSkills() {
  const progress = getSkillProgress(state.skills.filter((record) => SKILL_CATALOG_BY_ID.has(record.catalogueId)));
  const riderLevel = getRiderLevel(state.skills);
  const categories = [...new Set([...SKILL_GROUPS.map((group) => group.name), ...getCustomSkills().map((skill) => skill.category)])];
  if (!categories.includes(skillFilters.category)) skillFilters.category = "All";
  return `
    <div class="skills-page">
      ${pageHeader({ eyebrow: "YOUR RIDING TOOLKIT", title: "Skills, mapped out", description: "Every part of your riding, in one place. Explore each category, find your next step, and make it your own." })}
      <section class="skills-summary" aria-label="Your skill progress">
        <div class="skill-profile-summary"><span class="stat-label">ESTIMATED RIDER LEVEL</span><strong>${escapeHTML(riderLevel.level)}</strong><span class="skill-summary-caption">${riderLevel.assessed ? `Average ${riderLevel.average.toFixed(1)} / 5 across ${riderLevel.assessed} rated library skills` : "Rate skills in your map to get an estimate"}</span></div>
        <div><span class="stat-label">LIBRARY SKILLS ASSESSED</span><strong id="skills-assessed-count">${progress.assessed.length}<small> / ${SKILL_CATALOG.length}</small></strong><span class="skill-summary-caption">Across ${SKILL_GROUPS.length} categories</span></div>
        <div><span class="stat-label">FEELING CONFIDENT</span><strong id="skills-confident-count">${progress.confident.length}</strong><span class="skill-summary-caption">Self-rated 4 or 5 out of 5</span></div>
      </section>
      <section class="skill-library" aria-labelledby="skill-map-title">
        <div class="section-subheading"><div><h2 id="skill-map-title">Your skill map<span class="heading-period">.</span></h2><p>Organized by category. Beginner to advanced, with every skill open.</p></div></div>
        <div class="skill-map-toolbar">
          <label class="skill-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><span class="sr-only">Search skills</span><input type="search" id="skill-search" placeholder="Find a technique..." value="${escapeHTML(skillFilters.query)}" autocomplete="off" aria-controls="skills-map-content"></label>
          <label class="skill-category-filter"><span class="sr-only">Filter by skill category</span><select id="skill-category" aria-controls="skills-map-content"><option value="All">All categories</option>${categories.map((category) => `<option value="${escapeHTML(category)}"${category === skillFilters.category ? " selected" : ""}>${escapeHTML(category)}</option>`).join("")}</select></label>
          <button class="text-button" type="button" data-clear-skills>Clear filters</button>
        </div>
        <div class="skill-map-summary">
          <div class="skill-map-legend" aria-label="Confidence legend"><span class="skill-status unassessed"><span class="skill-status-dot" aria-hidden="true"></span>Not assessed</span><span class="skill-status starting"><span class="skill-status-dot" aria-hidden="true"></span>Starting out · 0</span><span class="skill-status learning"><span class="skill-status-dot" aria-hidden="true"></span>Learning · 1–3</span><span class="skill-status confident"><span class="skill-status-dot" aria-hidden="true"></span>Confident · 4–5</span></div>
          <p class="skill-result-count" id="skill-result-count" role="status" aria-live="polite">${skillResultLabel()}</p>
        </div>
        <div id="skills-map-content">${renderSkillMap()}</div>
      </section>
      <p class="skill-map-footnote">Confidence runs from 0 to 5. A saved 0 is a starting point, not an unassessed skill. Targets are optional. Your estimated level uses the average of assessed library-skill ratings: below 2.5 is Beginner, 2.5–3.9 is Intermediate, and 4 or above is Advanced. It is a self-assessment, not a coaching or trail-readiness evaluation.</p>
    </div>
  `;
}

function renderTraining() {
  const sessions = sortedByDate(state.training, "date", "desc");
  const totalMinutes = state.training.reduce((sum, session) => sum + Number(session.duration || 0), 0);
  const skillsSessions = state.training.filter((session) => session.type === "Skills").length;
  return `
    ${pageHeader({ eyebrow: "SHOW UP, THEN BUILD", title: "Training log", description: "Keep a lightweight record of sessions, focus, and effort. Your log is for learning—not chasing numbers.", action: "training", actionLabel: "Log session" })}
    <div class="mini-stats"><div><span>SESSIONS LOGGED</span><strong>${state.training.length}</strong></div><div><span>TOTAL TIME</span><strong>${Math.floor(totalMinutes / 60)}<small>h</small> ${totalMinutes % 60}<small>m</small></strong></div><div><span>SKILLS SESSIONS</span><strong>${skillsSessions}</strong></div></div>
    <div class="section-subheading"><div><h2>Every session counts<span class="heading-period">.</span></h2><p>Your recent training, all in one place.</p></div></div>
    ${sessions.length ? `<div class="record-list">${sessions.map((session) => `
      <article class="list-row">
        <div class="date-block"><span>${escapeHTML(formatDate(session.date, { month: "short" }).toUpperCase())}</span><strong>${escapeHTML(formatDate(session.date, { day: "numeric" }))}</strong></div>
        <div class="list-main"><div class="record-title-row"><h3>${escapeHTML(session.type)}</h3><span class="soft-tag">EFFORT ${escapeHTML(session.effort || "—")} / 5</span></div><p>${escapeHTML(session.notes || "No session notes added.")}</p></div>
        <div class="list-duration">${escapeHTML(session.duration)}<span>MIN</span></div>
        ${recordActions("training", session.id)}
      </article>
    `).join("")}</div>` : emptyPanel("Your next session starts here", "Log a skills drill, trail ride, or recovery day to build your training history.", "training", "Log a session")}
  `;
}

function competitionDateTag(record) {
  const entry = COMPETITION_CALENDAR_BY_ID.get(record.calendarId);
  if (!entry || entry.date !== record.date) return "";
  if (entry.dateStatus === "estimated") return `<span class="status-tag status-neutral" title="Estimated from the 2026 date. Check with the organizer before you travel.">Estimated date</span>`;
  if (entry.dateStatus === "confirmed" && entry.source) return `<a class="status-tag status-good date-source" href="${escapeHTML(entry.source)}" target="_blank" rel="noopener noreferrer">Date announced <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>`;
  return "";
}

function competitionWhen(record) {
  return formatDate(record.date, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

const VIEW_ICONS = {
  list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  goals: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  notes: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h7M9 16h5"/>'
};

function viewSwitch(ariaLabel, views, current) {
  return `<nav class="view-switch" aria-label="${escapeHTML(ariaLabel)}">${views.map(({ page, label, icon, count }) =>
    `<a href="#${page}" data-view-link="${page}"${page === current ? ' aria-current="page"' : ""}><svg viewBox="0 0 24 24" aria-hidden="true">${VIEW_ICONS[icon]}</svg>${label}${count !== undefined ? `<span class="view-count"><span class="sr-only">(</span>${count}<span class="sr-only">)</span></span>` : ""}</a>`).join("")}</nav>`;
}

function competitionViewSwitch(current) {
  return viewSwitch("Competition views", [
    { page: "competitions", label: "List", icon: "list" },
    { page: "calendar", label: "Calendar", icon: "calendar" }
  ], current);
}

function goalsViewSwitch(current) {
  return viewSwitch("Goals and notes views", [
    { page: "goals", label: "Goals", icon: "goals", count: state.goals.length },
    { page: "notes", label: "Notes", icon: "notes", count: state.notes.length }
  ], current);
}

function renderCompetitionRow(event) {
  return `
    <article class="list-row event-row">
      <div class="date-block"><span>${escapeHTML(formatDate(event.date, { month: "short" }).toUpperCase())}</span><strong>${escapeHTML(formatDate(event.date, { day: "numeric" }))}</strong></div>
      <div class="list-main"><div class="record-title-row"><h3>${escapeHTML(event.name)}</h3><span class="record-tags">${competitionDateTag(event)}<span class="status-tag ${event.status === "Completed" ? "status-good" : event.status === "Withdrawn" ? "status-neutral" : "status-warning"}">${escapeHTML(event.status)}</span></span></div><p>${escapeHTML([event.discipline, event.location, competitionWhen(event)].filter(Boolean).join(" · "))}</p>${event.goal ? `<p class="event-goal"><span>YOUR GOAL</span> ${escapeHTML(event.goal)}</p>` : ""}</div>
      ${recordActions("competitions", event.id, noteBacklinkButton(`competition:${event.id}`, event.name))}
    </article>
  `;
}

function calendarEntriesForFilters() {
  return COMPETITION_CALENDAR
    .filter((entry) => String(entry.year) === competitionFilters.year &&
      (competitionFilters.type === "All" || entry.discipline.split(" & ").includes(competitionFilters.type)))
    .sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name));
}

function renderPotentialList() {
  const today = toISODate(new Date());
  const entries = calendarEntriesForFilters();
  const goingIds = new Set(state.competitions.map((record) => record.calendarId).filter(Boolean));
  if (!entries.length) return `<p class="muted-copy">No ${competitionFilters.type === "All" ? "" : `${escapeHTML(competitionFilters.type)} `}events in ${escapeHTML(competitionFilters.year)}.</p>`;
  return `<div class="record-list">${entries.map((entry) => {
    const isPast = entry.date < today;
    const nameId = `calendar-${entry.id}-name`;
    return `
      <article class="list-row potential-row${isPast ? " is-past" : ""}">
        <div class="date-block${entry.dateStatus === "estimated" ? " is-estimated" : ""}"><span>${escapeHTML(formatDate(entry.date, { month: "short" }).toUpperCase())}</span><strong>${escapeHTML(formatDate(entry.date, { day: "numeric" }))}</strong></div>
        <div class="list-main"><div class="record-title-row"><h3 id="${escapeHTML(nameId)}">${escapeHTML(entry.name)}</h3><span class="record-tags">${competitionDateTag({ calendarId: entry.id, date: entry.date })}${isPast ? `<span class="status-tag status-neutral">Past</span>` : ""}</span></div><p>${escapeHTML([entry.discipline, entry.location, competitionWhen(entry)].join(" · "))}</p></div>
        <button class="going-button" type="button" data-going="${escapeHTML(entry.id)}" aria-pressed="${goingIds.has(entry.id)}" aria-describedby="${escapeHTML(nameId)}"><span class="going-check" aria-hidden="true">✓</span>${isPast ? "I raced it" : "I’m going"}</button>
      </article>
    `;
  }).join("")}</div>`;
}

function updatePotentialCompetitions() {
  const list = document.querySelector("#potential-list");
  if (!list) return;
  list.innerHTML = renderPotentialList();
  document.querySelectorAll("[data-calendar-year]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.calendarYear === competitionFilters.year)));
  document.querySelectorAll("[data-calendar-type]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.calendarType === competitionFilters.type)));
  const count = calendarEntriesForFilters().length;
  document.querySelector("#potential-count").textContent = `${count} ${count === 1 ? "event" : "events"}`;
}

function updateCompetitionGoing(calendarId) {
  const entry = COMPETITION_CALENDAR_BY_ID.get(calendarId);
  if (!entry) {
    showToast("That competition is no longer in your race list.");
    return "";
  }
  const existing = state.competitions.find((record) => record.calendarId === calendarId);
  const defaultStatus = entry.date < toISODate(new Date()) ? "Completed" : "Planned";
  if (existing && (String(existing.goal || "").trim() || existing.status !== defaultStatus) &&
      !window.confirm(`Remove “${existing.name}” from My competitions? Its goal and status will be cleared.`)) return "";
  const nextState = structuredClone(state);
  if (existing) {
    nextState.competitions = nextState.competitions.filter((record) => record.calendarId !== calendarId);
  } else {
    nextState.competitions.push({
      id: createId(), calendarId, name: entry.name, date: entry.date, location: entry.location,
      discipline: entry.discipline, goal: "", status: defaultStatus
    });
  }
  nextState.demoMode = false;
  if (!saveState(nextState)) return "";
  showToast(existing ? `${entry.name} removed from My competitions.` : `${entry.name} added to My competitions.`);
  return existing ? "removed" : "added";
}

function toggleCompetitionGoing(calendarId, button) {
  const previousTop = button.getBoundingClientRect().top;
  if (!updateCompetitionGoing(calendarId)) return;
  renderPage();
  const nextButton = document.querySelector(`[data-going="${CSS.escape(calendarId)}"]`);
  if (nextButton) {
    // My competitions sits above this list, so keep the clicked row where it was on screen.
    window.scrollBy({ top: nextButton.getBoundingClientRect().top - previousTop, behavior: "instant" });
    nextButton.focus({ preventScroll: true });
  }
}

function renderCompetitions() {
  const today = toISODate(new Date());
  const upcoming = sortedByDate(state.competitions.filter((event) => event.date >= today), "date");
  const past = sortedByDate(state.competitions.filter((event) => !(event.date >= today)), "date", "desc");
  const activeUpcoming = upcoming.filter((event) => event.status !== "Completed" && event.status !== "Withdrawn");
  const potentialAhead = COMPETITION_CALENDAR.filter((entry) => entry.date >= today).length;
  const filterButton = (attribute, value, current, label = value) =>
    `<button type="button" data-${attribute}="${escapeHTML(value)}" aria-pressed="${value === current}">${escapeHTML(label)}</button>`;
  return `
    ${pageHeader({ eyebrow: "MAKE ROOM FOR THE START LINE", title: "Competitions", description: "Browse your race list, mark the events you’re going to, and keep goals and status together. The best result is a day you’re proud of.", action: "competitions", actionLabel: "Add your own event" })}
    ${competitionViewSwitch("competitions")}
    <div class="event-callout"><span class="callout-icon" aria-hidden="true">⚑</span><div><strong>${activeUpcoming.length} upcoming</strong><p>${potentialAhead} potential ${potentialAhead === 1 ? "event" : "events"} ahead in your race list. Mark the ones that fit your season.</p></div></div>

    <section class="competition-section" aria-labelledby="my-competitions-title">
      <div class="section-subheading"><div><h2 id="my-competitions-title">My competitions<span class="heading-period">.</span></h2><p>Events you’re going to, plus any you added yourself.</p></div></div>
      ${state.competitions.length ? `
        ${upcoming.length ? `<p class="list-divider">Upcoming</p><div class="record-list">${upcoming.map(renderCompetitionRow).join("")}</div>` : ""}
        ${past.length ? `<p class="list-divider">Past</p><div class="record-list">${past.map(renderCompetitionRow).join("")}</div>` : ""}
      ` : emptyPanel("Nothing on your start list yet", "Choose “I’m going” on a potential competition below, or add your own event.", "competitions", "Add your own event")}
    </section>

    <section class="competition-section" aria-labelledby="potential-title">
      <div class="section-subheading"><div><h2 id="potential-title">Potential competitions<span class="heading-period">.</span></h2><p>Your race list for 2026 and the same events in 2027. “Date announced” links to the 2027 announcement; “Estimated” dates are the same weekday one year on — check them with the organizer.</p></div></div>
      <div class="calendar-toolbar">
        <div class="segmented" role="group" aria-label="Year">${COMPETITION_CALENDAR_YEARS.map((year) => filterButton("calendar-year", String(year), competitionFilters.year)).join("")}</div>
        <div class="segmented" role="group" aria-label="Event type">${filterButton("calendar-type", "All", competitionFilters.type, "All types")}${filterButton("calendar-type", "MTB", competitionFilters.type)}${filterButton("calendar-type", "Road", competitionFilters.type)}</div>
        <p class="calendar-count" id="potential-count" aria-live="polite">${calendarEntriesForFilters().length} events</p>
      </div>
      <div id="potential-list">${renderPotentialList()}</div>
    </section>
  `;
}

function raceCalendarItems() {
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;
  const linked = new Map();
  for (const record of state.competitions) {
    if (record.calendarId && COMPETITION_CALENDAR_BY_ID.has(record.calendarId)) linked.set(record.calendarId, record);
  }
  const items = COMPETITION_CALENDAR.map((entry) => {
    const record = linked.get(entry.id) || null;
    return {
      key: `race:${entry.id}`, entry, record, mine: Boolean(record),
      name: record?.name || entry.name,
      date: record && isoDate.test(record.date || "") ? record.date : entry.date,
      location: record ? record.location : entry.location,
      discipline: record ? record.discipline : entry.discipline
    };
  });
  for (const record of state.competitions) {
    if (linked.get(record.calendarId) === record || !isoDate.test(record.date || "")) continue;
    items.push({
      key: `own:${record.id}`, entry: null, record, mine: true, name: record.name || "Untitled event",
      date: record.date, location: record.location, discipline: record.discipline
    });
  }
  return items.sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name));
}

function shiftMonth(month, delta) {
  const [year, monthNumber] = month.split("-").map(Number);
  return toISODate(new Date(year, monthNumber - 1 + delta, 1)).slice(0, 7);
}

function raceMonthLabel(month, options = { month: "long", year: "numeric" }) {
  return formatDate(`${month}-01`, options);
}

function raceCalendarYears(items) {
  return [...new Set([...COMPETITION_CALENDAR_YEARS, new Date().getFullYear(), ...items.map((item) => Number(item.date.slice(0, 4)))])]
    .sort((a, b) => a - b);
}

function raceYearStartMonth(year) {
  const today = toISODate(new Date());
  const yearItems = raceCalendarItems().filter((item) => item.date.startsWith(`${year}-`));
  const target = yearItems.find((item) => item.date >= today) || yearItems[0];
  return target ? target.date.slice(0, 7) : `${year}-01`;
}

function raceItemNote(item) {
  if (item.record?.status === "Withdrawn") return ", withdrawn";
  if (item.mine) return item.entry ? ", you’re going" : ", your event";
  return item.entry?.dateStatus === "estimated" ? ", estimated date" : "";
}

function renderRaceChip(item, today) {
  const classes = ["race-chip", item.mine ? "is-mine" : "", item.record?.status === "Withdrawn" ? "is-withdrawn" : "",
    !item.mine && item.entry?.dateStatus === "estimated" ? "is-estimated" : "", item.date < today ? "is-past" : ""].filter(Boolean).join(" ");
  return `<button class="${classes}" type="button" data-race-event="${escapeHTML(item.key)}" aria-haspopup="dialog" aria-label="${escapeHTML(item.name + raceItemNote(item))}">${item.mine ? '<span class="race-chip-mark">✓</span>' : ""}<span class="race-chip-name">${escapeHTML(item.name)}</span></button>`;
}

function renderRaceAgendaItem(item, today) {
  const tag = item.record?.status === "Withdrawn" ? "Withdrawn" : item.mine ? (item.entry ? "Going" : "Your event") : "";
  return `
    <li><button class="race-agenda-item${item.mine ? " is-mine" : ""}${item.date < today ? " is-past" : ""}" type="button" data-race-event="${escapeHTML(item.key)}" aria-haspopup="dialog">
      <span class="date-block${!item.mine && item.entry?.dateStatus === "estimated" ? " is-estimated" : ""}" aria-hidden="true"><span>${escapeHTML(formatDate(item.date, { weekday: "short" }).toUpperCase())}</span><strong>${escapeHTML(formatDate(item.date, { day: "numeric" }))}</strong></span>
      <span class="race-agenda-main"><strong>${escapeHTML(item.name)}</strong><span class="sr-only">${escapeHTML(formatDate(item.date, { weekday: "long", day: "numeric", month: "long" }))}</span><span>${escapeHTML([item.discipline, item.location].filter(Boolean).join(" · ") || "No details yet")}${!item.mine && item.entry?.dateStatus === "estimated" ? " · estimated date" : ""}</span></span>
      ${tag ? `<span class="status-tag ${tag === "Withdrawn" ? "status-neutral" : "status-good"}">${tag}</span>` : '<span class="race-agenda-arrow" aria-hidden="true">›</span>'}
    </button></li>
  `;
}

function renderRaceCalendarBody() {
  const items = raceCalendarItems();
  const years = raceCalendarYears(items);
  const firstMonth = `${years[0]}-01`;
  const lastMonth = `${years.at(-1)}-12`;
  const today = toISODate(new Date());
  if (!/^\d{4}-\d{2}$/.test(raceCalendarView.month) || raceCalendarView.month < firstMonth || raceCalendarView.month > lastMonth) {
    raceCalendarView.month = (items.find((item) => item.date >= today)?.date || today).slice(0, 7);
  }
  const month = raceCalendarView.month;
  const [year, monthNumber] = month.split("-").map(Number);
  const monthLabel = raceMonthLabel(month);
  const monthItems = items.filter((item) => item.date.startsWith(`${month}-`));
  const mineCount = monthItems.filter((item) => item.mine).length;
  const byDate = new Map();
  for (const item of monthItems) byDate.set(item.date, [...(byDate.get(item.date) || []), item]);

  const offset = (new Date(year, monthNumber - 1, 1).getDay() + 6) % 7;
  const cellCount = Math.ceil((offset + new Date(year, monthNumber, 0).getDate()) / 7) * 7;
  const weeks = [];
  for (let index = 0; index < cellCount; index += 1) {
    const date = new Date(year, monthNumber - 1, 1 - offset + index);
    const iso = toISODate(date);
    const inMonth = date.getMonth() === monthNumber - 1;
    const dayItems = inMonth ? byDate.get(iso) || [] : [];
    const classes = ["race-cal-day", inMonth ? "" : "is-outside", [0, 6].includes(date.getDay()) ? "is-weekend" : "",
      iso === today ? "is-today" : "", iso < today ? "is-past" : "", dayItems.length ? "has-events" : ""].filter(Boolean).join(" ");
    const cell = inMonth
      ? `<td class="${classes}"><time class="race-cal-date" datetime="${iso}">${date.getDate()}${iso === today ? '<span class="sr-only"> (today)</span>' : ""}</time>${dayItems.map((item) => renderRaceChip(item, today)).join("")}${dayItems.length ? `<span class="race-cal-dots" aria-hidden="true">${dayItems.map((item) => `<i${item.mine ? ' class="is-mine"' : ""}></i>`).join("")}</span>` : ""}</td>`
      : `<td class="${classes}"><span class="race-cal-date" aria-hidden="true">${date.getDate()}</span></td>`;
    if (index % 7 === 0) weeks.push([]);
    weeks.at(-1).push(cell);
  }
  const weekdays = Array.from({ length: 7 }, (_, index) => new Date(2024, 0, 1 + index));
  const weekdayName = (date, weekday) => new Intl.DateTimeFormat(undefined, { weekday }).format(date);
  const nextItem = monthItems.length ? null : items.find((item) => item.date > `${month}-31`);
  const status = `${monthLabel}: ${monthItems.length ? `${monthItems.length} ${monthItems.length === 1 ? "event" : "events"}${mineCount ? `, ${mineCount} yours` : ""}` : "no competitions"}`;

  return `
    <div class="race-cal" data-status="${escapeHTML(status)}">
      <div class="race-cal-toolbar">
        <div class="race-cal-nav">
          <button class="icon-button" type="button" data-race-step="-1" aria-label="Previous month"${month <= firstMonth ? " disabled" : ""}>‹</button>
          <h2 id="race-cal-title" tabindex="-1">${escapeHTML(monthLabel)}</h2>
          <button class="icon-button" type="button" data-race-step="1" aria-label="Next month"${month >= lastMonth ? " disabled" : ""}>›</button>
        </div>
        <button class="secondary-button race-cal-today" type="button" data-race-today>Today</button>
        <div class="segmented" role="group" aria-label="Year">${years.map((value) => `<button type="button" data-race-year="${value}" aria-pressed="${value === year}">${value}</button>`).join("")}</div>
      </div>
      <div class="race-cal-months" role="group" aria-label="Months in ${year}">${Array.from({ length: 12 }, (_, index) => {
        const key = `${year}-${String(index + 1).padStart(2, "0")}`;
        const events = items.filter((item) => item.date.startsWith(`${key}-`));
        const mine = events.filter((item) => item.mine).length;
        const label = `${raceMonthLabel(key)}, ${events.length ? `${events.length} ${events.length === 1 ? "event" : "events"}` : "no events"}${mine ? `, ${mine} yours` : ""}`;
        return `<button type="button" data-race-month="${key}" aria-pressed="${key === month}" aria-label="${escapeHTML(label)}"${key === today.slice(0, 7) ? ' class="is-current"' : ""}><span class="race-month-name">${escapeHTML(raceMonthLabel(key, { month: "short" }))}</span><span class="race-month-count">${events.length || "–"}</span>${mine ? '<span class="race-month-mine"></span>' : ""}</button>`;
      }).join("")}</div>
      <div class="race-cal-meta">
        <p class="race-cal-summary">${monthItems.length ? `<strong>${monthItems.length}</strong> ${monthItems.length === 1 ? "event" : "events"} in ${escapeHTML(raceMonthLabel(month, { month: "long" }))}${mineCount ? ` · <strong>${mineCount}</strong> yours` : ""}` : `No competitions in ${escapeHTML(monthLabel)}.`}${nextItem ? ` <button class="text-button" type="button" data-race-month="${nextItem.date.slice(0, 7)}">Next: ${escapeHTML(nextItem.name)}, ${escapeHTML(formatDate(nextItem.date))} <span aria-hidden="true">→</span></button>` : ""}</p>
        <ul class="race-cal-legend" aria-label="Legend">
          <li><span class="legend-swatch is-mine" aria-hidden="true"></span>Your competitions</li>
          <li><span class="legend-swatch" aria-hidden="true"></span>Race list</li>
          <li><span class="legend-swatch is-estimated" aria-hidden="true"></span>Estimated date</li>
        </ul>
      </div>
      <table class="race-cal-grid">
        <caption class="sr-only">Competitions in ${escapeHTML(monthLabel)}</caption>
        <thead><tr>${weekdays.map((date) => `<th scope="col"><span aria-hidden="true">${escapeHTML(weekdayName(date, "short"))}</span><span class="sr-only">${escapeHTML(weekdayName(date, "long"))}</span></th>`).join("")}</tr></thead>
        <tbody>${weeks.map((cells) => `<tr>${cells.join("")}</tr>`).join("")}</tbody>
      </table>
      ${monthItems.length ? `<section class="race-cal-agenda" aria-labelledby="race-agenda-title"><h3 id="race-agenda-title">${escapeHTML(monthLabel)}</h3><ul class="race-agenda-list">${monthItems.map((item) => renderRaceAgendaItem(item, today)).join("")}</ul></section>` : ""}
    </div>
  `;
}

function renderRaceCalendar() {
  return `
    ${pageHeader({ eyebrow: "MAKE ROOM FOR THE START LINE", title: "Competitions", description: "Every competition on your race list, month by month. Your competitions are highlighted — select any event to see the details or mark that you’re going.", action: "competitions", actionLabel: "Add your own event" })}
    ${competitionViewSwitch("calendar")}
    <p class="sr-only" id="race-cal-status" aria-live="polite"></p>
    <div id="race-calendar">${renderRaceCalendarBody()}</div>
  `;
}

function setRaceMonth(month, focusSelector) {
  raceCalendarView.month = month;
  const container = pageContent.querySelector("#race-calendar");
  if (!container) return;
  container.innerHTML = renderRaceCalendarBody();
  pageContent.querySelector("#race-cal-status").textContent = container.querySelector(".race-cal").dataset.status;
  let target = container.querySelector(focusSelector);
  if (!target || target.disabled) target = container.querySelector("[data-race-step]:not(:disabled)");
  target?.focus({ preventScroll: true });
}

function findRaceEventControl(key) {
  return [...pageContent.querySelectorAll(`[data-race-event="${CSS.escape(key)}"]`)].find((element) => element.getClientRects().length) || null;
}

function renderRaceDialog(item) {
  const { entry, record } = item;
  const today = toISODate(new Date());
  const days = Math.round((new Date(`${item.date}T12:00:00`) - new Date(`${today}T12:00:00`)) / 86400000);
  const countdown = days === 0 ? "Today" : days > 0 ? `In ${days} ${days === 1 ? "day" : "days"}` : "Past event";
  const facts = [
    ["Discipline", item.discipline], ["Location", item.location],
    ...(record ? [["Status", record.status], ["Your goal", record.goal]] : []),
    ...(record && entry && record.date !== entry.date ? [["Race list date", competitionWhen(entry)]] : [])
  ];
  return `
    <div class="dialog-top">
      <div>
        <p class="eyebrow"><span class="eyebrow-line"></span>${entry ? `RACE LIST · ${entry.year}` : "YOUR EVENT"}</p>
        <h2 id="race-dialog-title" tabindex="-1">${escapeHTML(item.name)}<span class="heading-period">.</span></h2>
      </div>
      <button class="icon-button" type="button" data-race-close aria-label="Close details">×</button>
    </div>
    <p class="race-dialog-when"><strong>${escapeHTML(competitionWhen(item))}</strong><span>${countdown}</span>${entry ? competitionDateTag({ calendarId: entry.id, date: item.date }) : ""}</p>
    <dl class="race-dialog-facts">${facts.map(([label, value]) => `<div${label === "Your goal" ? ' class="is-wide"' : ""}><dt>${label}</dt><dd>${escapeHTML(value || "Not set")}</dd></div>`).join("")}</dl>
    <div class="dialog-actions race-dialog-actions">
      ${record ? `<button class="secondary-button" type="button" data-race-edit="${escapeHTML(record.id)}">${entry ? "Edit goal &amp; status" : "Edit event"}</button>` : ""}
      ${entry ? `<button class="going-button" type="button" data-race-going="${escapeHTML(entry.id)}" aria-pressed="${Boolean(record)}"><span class="going-check" aria-hidden="true">✓</span>${entry.date < today ? "I raced it" : "I’m going"}</button>` : ""}
    </div>
  `;
}

function openRaceDialog(key) {
  const item = raceCalendarItems().find((candidate) => candidate.key === key);
  if (!item) {
    showToast("That competition is no longer available.");
    return;
  }
  raceDialogKey = key;
  raceDialogContent.innerHTML = renderRaceDialog(item);
  raceDialogStatus.textContent = "";
  raceDialog.showModal();
  raceDialog.querySelector("#race-dialog-title").focus();
}

function toggleRaceDialogGoing(calendarId) {
  const result = updateCompetitionGoing(calendarId);
  if (!result) return;
  renderPage();
  const item = raceCalendarItems().find((candidate) => candidate.key === raceDialogKey);
  if (!item) {
    raceDialog.close();
    return;
  }
  raceDialogContent.innerHTML = renderRaceDialog(item);
  raceDialogStatus.textContent = result === "added" ? "Added to My competitions." : "Removed from My competitions.";
  raceDialog.querySelector("[data-race-going]")?.focus();
}

function editFromRaceDialog(recordId) {
  const key = raceDialogKey;
  raceDialog.close();
  // Focus the calendar event first so the editor returns there after saving.
  (findRaceEventControl(key) || pageContent).focus({ preventScroll: true });
  openEditor("competitions", recordId);
}

function renderBikes() {
  const maintenance = allMaintenance();
  const dueCount = maintenance.filter((item) => ["status-danger", "status-warning"].includes(serviceStatus(item).className)).length;
  const bikeCards = state.bikes.map((bike) => {
    const items = sortedByDate(bike.maintenance || [], "serviceDate", "desc");
    return `
      <article class="record-card bike-card">
        <div class="record-card-top"><span class="soft-tag">${escapeHTML(bike.discipline || "BIKE")}</span>${recordActions("bikes", bike.id, `${noteBacklinkButton(`bike:${bike.id}`, bike.name)}<button class="text-button" type="button" data-add="maintenance" data-bike-id="${escapeHTML(bike.id)}">＋ Service</button>`)}</div>
        ${renderBikeIllustration(bike.discipline)}
        <h3>${escapeHTML(bike.name)}</h3><p class="bike-model">${escapeHTML(bike.model || "Add make and model details")}${bike.year ? ` · ${escapeHTML(bike.year)}` : ""}</p>
        <div class="maintenance-heading"><span>MAINTENANCE</span><span>${items.length} ${items.length === 1 ? "record" : "records"}</span></div>
        ${items.length ? `<div class="maintenance-list">${items.map((item) => {
          const status = serviceStatus(item);
          return `<div class="maintenance-row"><div><strong>${escapeHTML(item.component)}</strong><span>Serviced ${escapeHTML(formatDate(item.serviceDate, { day: "numeric", month: "short" }))}${status.dueDate ? ` · next ${escapeHTML(formatDate(status.dueDate, { day: "numeric", month: "short" }))}` : ""}</span></div><span class="status-tag ${status.className}">${escapeHTML(status.label)}</span><div class="record-actions"><button class="icon-button" type="button" data-edit="maintenance" data-id="${escapeHTML(item.id)}" aria-label="Edit maintenance record">✎</button><button class="icon-button danger-hover" type="button" data-delete="maintenance" data-id="${escapeHTML(item.id)}" data-bike-id="${escapeHTML(bike.id)}" aria-label="Delete maintenance record">×</button></div></div>`;
        }).join("")}</div>` : `<p class="muted-copy">No maintenance records yet.</p><button class="secondary-button" type="button" data-add="maintenance" data-bike-id="${escapeHTML(bike.id)}">＋ Add service record</button>`}
      </article>
    `;
  }).join("");
  return `
    ${pageHeader({ eyebrow: "LOOK AFTER YOUR RIDE", title: "Bikes &amp; service", description: "Keep your bike details and service reminders together. Use intervals that suit your riding and the manufacturer’s guidance.", action: "bikes", actionLabel: "Add a bike" })}
    <div class="mini-stats"><div><span>BIKES</span><strong>${state.bikes.length}</strong></div><div><span>SERVICE RECORDS</span><strong>${maintenance.length}</strong></div><div><span>NEEDS ATTENTION</span><strong class="${dueCount ? "text-warning" : ""}">${dueCount}</strong></div></div>
    ${bikeCards ? `<div class="record-grid">${bikeCards}</div>` : emptyPanel("Make room for your bike", "Add a bike to start a maintenance history and set service reminders.", "bikes", "Add a bike")}
  `;
}

function renderGear() {
  const gearCards = state.gear.map((item) => `
    <article class="inventory-row">
      <div class="gear-icon" aria-hidden="true">◇</div><div class="inventory-main"><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.category || "Uncategorized")} · ${escapeHTML(item.notes || "No notes")}</p></div>
      <span class="status-tag ${item.condition === "Replace" ? "status-danger" : item.condition === "Watch" ? "status-warning" : "status-good"}">${escapeHTML(item.condition || "Good")}</span>
      ${recordActions("gear", item.id, noteBacklinkButton(`gear:${item.id}`, item.name))}
    </article>
  `).join("");
  const purchases = sortedByDate(state.purchases, "targetDate");
  const purchaseCards = purchases.map((item) => `
    <article class="list-row purchase-row">
      <div class="priority-marker priority-${escapeHTML((item.priority || "Whenever").toLowerCase())}"></div>
      <div class="list-main"><div class="record-title-row"><h3>${escapeHTML(item.name)}</h3><span class="status-tag ${item.status === "Purchased" ? "status-good" : "status-neutral"}">${escapeHTML(item.status || "Planned")}</span></div><p>${escapeHTML(item.notes || `${item.priority || "Whenever"} priority`)}${item.targetDate ? ` · target ${escapeHTML(formatDate(item.targetDate, { day: "numeric", month: "short" }))}` : ""}</p></div>
      <strong class="purchase-cost">${item.estimatedCost ? escapeHTML(Number(item.estimatedCost).toLocaleString()) : "—"}</strong>
      ${recordActions("purchases", item.id)}
    </article>
  `).join("");
  const budgetTotal = state.purchases.filter((item) => item.status !== "Purchased").reduce((sum, item) => sum + Number(item.estimatedCost || 0), 0);
  return `
    ${pageHeader({ eyebrow: "TAKE CARE OF YOUR KIT", title: "Gear &amp; purchases", description: "Know what you own, what needs replacing, and what you’re saving for. Enter costs in whichever currency you use.", action: "gear", actionLabel: "Add gear" })}
    <section class="gear-section"><div class="section-subheading"><div><h2>Gear inventory<span class="heading-period">.</span></h2><p>${state.gear.length} items in your kit</p></div><button class="secondary-button" type="button" data-add="gear">＋ Add gear</button></div>
      ${gearCards ? `<div class="inventory-list">${gearCards}</div>` : emptyPanel("Build your kit list", "Track protection, tools, clothing, and anything else you take riding.", "gear", "Add your first item")}
    </section>
    <section class="gear-section"><div class="section-subheading"><div><h2>Purchase plan<span class="heading-period">.</span></h2><p>${state.purchases.filter((item) => item.status !== "Purchased").length} planned · ${escapeHTML(budgetTotal.toLocaleString())} estimated</p></div><button class="primary-button" type="button" data-add="purchases">Add a purchase <span aria-hidden="true">+</span></button></div>
      ${purchaseCards ? `<div class="record-list">${purchaseCards}</div>` : emptyPanel("A little planning goes a long way", "Add upcoming gear or maintenance purchases and set a priority.", "purchases", "Plan a purchase")}
    </section>
  `;
}

const LINK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>';
const PIN_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6Z"/><path d="M12 14v7"/></svg>';

function truncateText(text, max) {
  const value = String(text ?? "").replace(/\s+/g, " ").trim();
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;
}

function daysUntil(isoDate) {
  return Math.round((new Date(`${isoDate}T12:00:00`) - new Date(`${toISODate(new Date())}T12:00:00`)) / 86400000);
}

function noteTopicColor(topic) {
  return Object.hasOwn(NOTE_TOPIC_COLORS, topic) ? NOTE_TOPIC_COLORS[topic] : "#abb7ad";
}

function topicTag(topic) {
  return `<span class="topic-tag"><i aria-hidden="true"></i>${escapeHTML(topic || "Training")}</span>`;
}

function describeNoteLink(link, data = state) {
  if (typeof link !== "string") return null;
  const separator = link.indexOf(":");
  const kind = link.slice(0, separator);
  const id = link.slice(separator + 1);
  if (separator < 1 || !id || !Object.hasOwn(NOTE_LINK_KINDS, kind)) return null;
  let label = "";
  if (kind === "skill") {
    label = SKILL_CATALOG_BY_ID.get(id)?.name || "";
  } else if (kind === "myskill") {
    const record = data.skills.find((item) => item.id === id && !SKILL_CATALOG_BY_ID.has(item.catalogueId));
    label = record ? record.name || "Untitled skill" : "";
  } else {
    const collection = { bike: data.bikes, gear: data.gear, competition: data.competitions, goal: data.goals }[kind] || [];
    const record = collection.find((item) => item.id === id);
    label = record ? record.name || record.title || "Untitled" : "";
  }
  return label ? { kind, id, label, type: NOTE_LINK_KINDS[kind].label } : null;
}

function resolveNoteLink(link) {
  return describeNoteLink(link, state);
}

function byNewestNote(a, b) {
  return String(b.date || "").localeCompare(String(a.date || ""));
}

function notesForLink(link) {
  return state.notes.filter((note) => note.link === link);
}

function noteBacklinkButton(link, name) {
  const count = notesForLink(link).length;
  if (!count) return "";
  const label = `${count} ${count === 1 ? "note" : "notes"}`;
  return `<button class="text-button note-backlink" type="button" data-note-filter="${escapeHTML(link)}" aria-label="${label} about ${escapeHTML(name || "this item")}"><svg viewBox="0 0 24 24" aria-hidden="true">${VIEW_ICONS.notes}</svg>${label}</button>`;
}

function noteLinkChoices() {
  const groupOrder = new Map(SKILL_GROUPS.map((group, index) => [group.name, index]));
  const librarySkills = [...SKILL_CATALOG].sort((a, b) => (groupOrder.get(a.category) ?? 99) - (groupOrder.get(b.category) ?? 99));
  return [
    { value: "", label: "Not linked" },
    ...librarySkills.map((skill) => ({ value: `skill:${skill.id}`, label: skill.name, group: `Skills · ${skill.category}` })),
    ...getCustomSkills().map((skill) => ({ value: `myskill:${skill.id}`, label: skill.name || "Untitled skill", group: "Your custom skills" })),
    ...state.bikes.map((bike) => ({ value: `bike:${bike.id}`, label: bike.name || "Untitled bike", group: "Bikes" })),
    ...state.gear.map((item) => ({ value: `gear:${item.id}`, label: item.name || "Untitled item", group: "Gear" })),
    ...sortedByDate(state.competitions, "date").map((event) => ({ value: `competition:${event.id}`, label: `${event.name || "Untitled event"} · ${formatDate(event.date)}`, group: "My competitions" })),
    ...state.goals.map((goal) => ({ value: `goal:${goal.id}`, label: goal.title || "Untitled goal", group: "Goals" }))
  ];
}

function renderLinkedNotes(link) {
  const notes = notesForLink(link).sort(byNewestNote);
  return `
    <section class="linked-notes" aria-labelledby="linked-notes-title">
      <div class="linked-notes-head">
        <h3 id="linked-notes-title">Your notes${notes.length ? ` <span class="view-count">${notes.length}</span>` : ""}</h3>
        <div class="linked-notes-actions">
          ${notes.length ? `<button class="text-button" type="button" data-note-filter="${escapeHTML(link)}" aria-label="See all ${notes.length} ${notes.length === 1 ? "note" : "notes"}">See all <span aria-hidden="true">↗</span></button>` : ""}
          <button class="secondary-button" type="button" data-note-add="${escapeHTML(link)}">＋ Add a note</button>
        </div>
      </div>
      ${notes.length ? `<div class="linked-notes-list">${notes.slice(0, 3).map((note) => `
        <article class="linked-note" style="--topic:${noteTopicColor(note.topic)}">
          <span class="linked-note-date">${escapeHTML(formatDate(note.date, { day: "numeric", month: "short" }))}</span>
          <div>${topicTag(note.topic)}<h4>${escapeHTML(note.title)}</h4><p>${escapeHTML(truncateText(note.content, 180))}</p></div>
        </article>`).join("")}</div>` : `<p class="linked-notes-empty">Cues that clicked, drills that worked, what to try next. Notes you link here show up in this space.</p>`}
    </section>
  `;
}

function goalStatusForProgress(status, progress) {
  if (status === "Paused") return status;
  if (progress >= 100) return "Achieved";
  if (status === "Achieved" || (progress > 0 && status !== "In progress")) return "In progress";
  return GOAL_STATUSES.includes(status) ? status : "Planned";
}

function goalStatusClass(status) {
  if (status === "Achieved") return "status-good";
  if (status === "Paused") return "status-neutral";
  return "status-warning";
}

function goalDue(goal) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(goal.targetDate || "") || goal.status === "Achieved" || goal.status === "Paused") return null;
  const days = daysUntil(goal.targetDate);
  if (days < 0) return { text: `${Math.abs(days)} ${Math.abs(days) === 1 ? "day" : "days"} overdue`, className: "is-overdue" };
  if (days === 0) return { text: "due today", className: "is-soon" };
  return { text: `in ${days} ${days === 1 ? "day" : "days"}`, className: days <= 14 ? "is-soon" : "" };
}

function goalMeasure(goal) {
  const target = Number(goal.target);
  if (goal.measure !== "number" || !Number.isFinite(target) || target <= 0) return null;
  const actual = Math.max(0, Number(goal.actual) || 0);
  return { target, actual, unit: String(goal.unit || "").trim(), percent: Math.floor((actual / target) * 100), reached: actual >= target };
}

function goalPercent(goal) {
  return goalMeasure(goal)?.percent ?? clampProgress(goal.progress);
}

// Measured goals only count as 100% once the actual really reaches the target.
function measuredStatusProgress(measure) {
  return measure.reached ? 100 : Math.min(99, measure.percent);
}

function formatGoalNumber(value) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value);
}

function withUnit(value, unit) {
  return unit ? `${formatGoalNumber(value)} ${unit}` : formatGoalNumber(value);
}

function goalPace(goal, measure) {
  if (measure.reached) {
    const over = measure.actual - measure.target;
    return over > 0 ? `Target reached · ${withUnit(over, measure.unit)} over` : "Target reached";
  }
  const remaining = measure.target - measure.actual;
  let text = `${withUnit(remaining, measure.unit)} to go`;
  if (goal.status !== "Paused" && /^\d{4}-\d{2}-\d{2}$/.test(goal.targetDate || "")) {
    const days = daysUntil(goal.targetDate);
    const perWeek = days > 0 ? remaining / (days / 7) : 0;
    if (days >= 14 && perWeek >= 1) text += ` · about ${withUnit(Math.ceil(perWeek), measure.unit)} a week`;
    else if (days > 0 && days < 14 && remaining / days >= 1) text += ` · about ${withUnit(Math.ceil(remaining / days), measure.unit)} a day`;
  }
  return text;
}

function renderGoalProgress(goal) {
  const id = escapeHTML(goal.id);
  const measure = goalMeasure(goal);
  if (!measure) {
    const progress = clampProgress(goal.progress);
    return `
      <div class="goal-progress">
        <div class="goal-progress-head"><span class="stat-label" aria-hidden="true">PROGRESS</span><span class="goal-progress-value" aria-hidden="true"><span data-range-value>${progress}</span><small>%</small></span></div>
        <input class="goal-range" type="range" min="0" max="100" step="5" value="${progress}" data-goal-progress="${id}" aria-label="Progress for ${escapeHTML(goal.title)}" aria-valuetext="${progress}%" style="--value:${progress}%">
      </div>`;
  }
  const inputId = `goal-actual-${id}`;
  return `
    <div class="goal-progress is-measured">
      <div class="goal-progress-head">
        <span class="goal-measure"><strong>${escapeHTML(formatGoalNumber(measure.actual))}</strong> / ${escapeHTML(withUnit(measure.target, measure.unit))}</span>
        <span class="goal-progress-value">${measure.percent}<small>%</small></span>
      </div>
      <div class="progress-track goal-track${measure.reached ? " is-reached" : ""}" aria-hidden="true"><span style="width:${Math.min(100, measure.percent)}%"></span></div>
      <p class="goal-pace">${escapeHTML(goalPace(goal, measure))}</p>
      <form class="goal-update" data-goal-update="${id}" novalidate>
        <label for="${inputId}">Update actual</label>
        <span class="goal-update-input"><input id="${inputId}" name="actual" type="number" min="0" step="any" inputmode="decimal" value="${escapeHTML(String(measure.actual))}" aria-describedby="${inputId}-unit"><span id="${inputId}-unit">${escapeHTML(measure.unit || "total")}</span></span>
        <button class="secondary-button" type="submit">Update</button>
      </form>
    </div>`;
}

function renderGoalCard(goal) {
  const status = GOAL_STATUSES.includes(goal.status) ? goal.status : "Planned";
  const due = goalDue(goal);
  const link = `goal:${goal.id}`;
  return `
    <article class="record-card goal-card is-${status.toLowerCase().replace(/\s+/g, "-")}">
      <div class="record-card-top"><span class="soft-tag">${escapeHTML(goal.category || "SEASON GOAL")}</span>${recordActions("goals", goal.id)}</div>
      <div class="record-title-row"><h3>${escapeHTML(goal.title)}</h3><span class="status-tag ${goalStatusClass(status)}">${escapeHTML(status)}</span></div>
      ${renderGoalProgress(goal)}
      ${goal.notes ? `<div class="goal-next"><span class="goal-next-label">${status === "Achieved" ? "NOTES" : "NEXT STEP"}</span><p>${escapeHTML(goal.notes)}</p></div>` : status === "Achieved" ? '<div class="goal-next"></div>' : '<div class="goal-next"><span class="goal-next-label">NEXT STEP</span><p>Add a next step that makes this goal feel manageable.</p></div>'}
      <div class="goal-footer">
        <span class="goal-date">${goal.targetDate ? `TARGET · ${escapeHTML(formatDate(goal.targetDate))}` : "NO TARGET DATE"}${due ? ` <span class="goal-due ${due.className}">· ${escapeHTML(due.text)}</span>` : ""}</span>
        <span class="goal-links">${noteBacklinkButton(link, goal.title)}<button class="text-button" type="button" data-note-add="${escapeHTML(link)}" aria-label="Add a note to ${escapeHTML(goal.title)}">＋ Note</button></span>
      </div>
    </article>
  `;
}

function goalsHeader(view) {
  return pageHeader({
    eyebrow: "MAKE A SEASON YOUR OWN", title: "Goals &amp; notes",
    description: "Track progress toward your goals, and keep notes on everything that makes you a better rider: technique, bike setup, gear, trails, and races.",
    action: view, actionLabel: view === "notes" ? "Add a note" : "Add a goal"
  });
}

function goalYear(goal) {
  return /^\d{4}-\d{2}-\d{2}$/.test(goal.targetDate || "") ? goal.targetDate.slice(0, 4) : "none";
}

function goalYearLabel(year) {
  if (year === "all") return "All years";
  return year === "none" ? "No date" : year;
}

// The current and next season are always offered so the next year can be planned before it has goals.
function goalYearChoices() {
  const current = new Date().getFullYear();
  const years = new Set([String(current), String(current + 1)]);
  state.goals.forEach((goal) => { if (goalYear(goal) !== "none") years.add(goalYear(goal)); });
  const choices = [...years].sort();
  if (state.goals.some((goal) => goalYear(goal) === "none")) choices.push("none");
  return [...choices, "all"];
}

function selectedGoalYear() {
  const choices = goalYearChoices();
  if (choices.includes(goalFilters.year)) return goalFilters.year;
  const current = String(new Date().getFullYear());
  const dated = choices.filter((year) => /^\d{4}$/.test(year) && state.goals.some((goal) => goalYear(goal) === year));
  if (!dated.length || dated.includes(current)) return state.goals.length && !dated.length ? "none" : current;
  return dated.find((year) => year > current) || dated[dated.length - 1];
}

function goalDefaultTargetDate() {
  if (activePage !== "goals") return "";
  const year = selectedGoalYear();
  return /^\d{4}$/.test(year) ? `${year}-12-31` : "";
}

function isActiveGoal(goal) {
  return goal.status !== "Achieved" && goal.status !== "Paused";
}

function byGoalTarget(a, b) {
  return (a.targetDate || "9999").localeCompare(b.targetDate || "9999") || String(a.title).localeCompare(String(b.title));
}

function renderGoalGroups(goals) {
  const group = (label, items) => items.length ? `<p class="list-divider">${label} · ${items.length}</p><div class="record-grid goal-grid">${items.map(renderGoalCard).join("")}</div>` : "";
  return group("In motion", goals.filter(isActiveGoal).sort(byGoalTarget))
    + group("Achieved", goals.filter((goal) => goal.status === "Achieved").sort(byGoalTarget))
    + group("Paused", goals.filter((goal) => goal.status === "Paused").sort(byGoalTarget));
}

function goalSeasonSummary(year, goals) {
  const achieved = goals.filter((goal) => goal.status === "Achieved").length;
  const parts = [`${goals.length} ${goals.length === 1 ? "goal" : "goals"}`, `${achieved} achieved`];
  const current = new Date().getFullYear();
  if (year === String(current)) {
    const days = daysUntil(`${year}-12-31`);
    parts.push(days === 0 ? "last day of the season" : `${days} ${days === 1 ? "day" : "days"} left in the season`);
  } else if (/^\d{4}$/.test(year) && Number(year) < current) {
    parts.push("season complete");
  }
  return parts.join(" · ");
}

function renderGoalSeason(year, goals, hint = "") {
  const headingId = `goal-season-${year}`;
  const title = year === "none" ? "No target date" : `${year} season`;
  return `
    <section class="goals-section goal-season" aria-labelledby="${headingId}">
      <div class="section-subheading"><div><h2 id="${headingId}">${escapeHTML(title)}<span class="heading-period">.</span></h2><p><span class="goal-season-meta">${escapeHTML(goalSeasonSummary(year, goals))}.</span>${hint ? ` ${hint}` : ""}</p></div></div>
      ${renderGoalGroups(goals)}
    </section>`;
}

function renderGoalYearSwitch(selected) {
  return `<div class="calendar-toolbar goal-year-toolbar"><div class="segmented goal-year-switch" role="group" aria-label="Season">${goalYearChoices().map((year) => {
    const count = year === "all" ? state.goals.length : state.goals.filter((goal) => goalYear(goal) === year).length;
    return `<button type="button" data-goal-year="${year}" aria-pressed="${year === selected}">${escapeHTML(goalYearLabel(year))}${count ? `<span class="segmented-count">${count}<span class="sr-only"> ${count === 1 ? "goal" : "goals"}</span></span>` : ""}</button>`;
  }).join("")}</div></div>`;
}

function renderGoalStats(year, goals) {
  const active = goals.filter(isActiveGoal).length;
  const achieved = goals.filter((goal) => goal.status === "Achieved").length;
  const average = Math.round(goals.reduce((sum, goal) => sum + Math.min(100, goalPercent(goal)), 0) / goals.length);
  return `
    <div class="mini-stats goal-stats">
      <div><span>IN MOTION</span><strong>${active}</strong></div>
      <div><span>${/^\d{4}$/.test(year) ? `${year} PROGRESS` : "AVERAGE PROGRESS"}</span><strong>${average}<small>%</small></strong><div class="progress-track" aria-hidden="true"><span style="width:${average}%"></span></div></div>
      <div><span>ACHIEVED</span><strong>${achieved}<small> / ${goals.length}</small></strong></div>
    </div>`;
}

function renderGoals() {
  if (!state.goals.length) {
    return `${goalsHeader("goals")}${goalsViewSwitch("goals")}${emptyPanel("Pick a direction, not a deadline", "Add a distance, ride time, race, or skill goal that feels motivating, then track your progress.", "goals", "Set a season goal")}`;
  }
  const year = selectedGoalYear();
  const hint = "Update the actual numbers as you go, or slide the percentage for goals without a number. Reaching the target marks a goal as achieved.";
  const shown = year === "all" ? state.goals : state.goals.filter((goal) => goalYear(goal) === year);
  let body;
  if (year === "all") {
    body = goalYearChoices().filter((choice) => choice !== "all")
      .map((choice) => [choice, state.goals.filter((goal) => goalYear(goal) === choice)])
      .filter(([, goals]) => goals.length)
      .map(([choice, goals]) => renderGoalSeason(choice, goals)).join("");
  } else {
    body = shown.length ? renderGoalSeason(year, shown, hint) : emptyPanel(`Plan your ${escapeHTML(year)} season`, `Goals with a target date in ${escapeHTML(year)} show up here: a distance, ride time, number of races, or a skill to nail.`, "goals", `Set a ${escapeHTML(year)} goal`);
  }
  return `
    ${goalsHeader("goals")}
    ${goalsViewSwitch("goals")}
    ${renderGoalYearSwitch(year)}
    ${shown.length ? renderGoalStats(year, shown) : ""}
    ${body}
  `;
}

function saveGoalProgress(goalId, value) {
  const nextState = structuredClone(state);
  const goal = nextState.goals.find((item) => item.id === goalId);
  if (!goal) {
    showToast("That goal is no longer available.");
    renderPage();
    return;
  }
  const progress = clampProgress(value);
  const previousStatus = goal.status;
  goal.progress = String(progress);
  goal.status = goalStatusForProgress(goal.status, progress);
  nextState.demoMode = false;
  if (!saveState(nextState)) {
    renderPage();
    return;
  }
  renderPage();
  const slider = pageContent.querySelector(`[data-goal-progress="${CSS.escape(goalId)}"]`);
  if (slider) {
    slider.focus({ preventScroll: true });
    slider.scrollIntoView({ block: "nearest" });
  }
  if (goal.status === "Achieved" && previousStatus !== "Achieved") showToast("Goal achieved. Nice work!");
  else if (goal.status !== previousStatus) showToast(`Progress saved: ${progress}%. Now ${goal.status.toLowerCase()}.`);
  else showToast(`Progress saved: ${progress}%.`);
}

function saveGoalActual(form) {
  const goalId = form.dataset.goalUpdate;
  const input = form.elements.actual;
  const raw = input.value.trim();
  const value = Number(raw);
  if (!raw || !Number.isFinite(value) || value < 0) {
    input.setAttribute("aria-invalid", "true");
    input.focus();
    showToast("Enter the actual amount as a number of 0 or more.");
    return;
  }
  const nextState = structuredClone(state);
  const goal = nextState.goals.find((item) => item.id === goalId);
  const measure = goal && goalMeasure({ ...goal, actual: value });
  if (!measure) {
    showToast("That goal is no longer available.");
    renderPage();
    return;
  }
  const previousStatus = goal.status;
  goal.actual = String(value);
  goal.progress = String(Math.min(100, measure.percent));
  goal.status = goalStatusForProgress(goal.status, measuredStatusProgress(measure));
  nextState.demoMode = false;
  if (!saveState(nextState)) {
    renderPage();
    return;
  }
  renderPage();
  const nextInput = pageContent.querySelector(`[data-goal-update="${CSS.escape(goalId)}"] input`);
  if (nextInput) {
    nextInput.focus({ preventScroll: true });
    nextInput.scrollIntoView({ block: "nearest" });
  }
  const summary = `${formatGoalNumber(measure.actual)} / ${withUnit(measure.target, measure.unit)} (${measure.percent}%)`;
  if (goal.status === "Achieved" && previousStatus !== "Achieved") showToast(`Goal achieved: ${summary}. Nice work!`);
  else if (goal.status !== previousStatus) showToast(`Updated: ${summary}. Now ${goal.status.toLowerCase()}.`);
  else showToast(`Updated: ${summary}.`);
}

function updateRangeVisual(input) {
  const min = Number(input.min || 0);
  const max = Number(input.max || 100);
  const value = Number(input.value);
  input.style.setProperty("--value", `${max > min ? Math.round(((value - min) / (max - min)) * 1000) / 10 : 0}%`);
  input.setAttribute("aria-valuetext", `${value}%`);
  const label = input.closest(".range-control, .goal-progress")?.querySelector("[data-range-value]");
  if (label) label.textContent = String(value);
}

function hasNoteFilters() {
  return Boolean(noteFilters.query.trim() || noteFilters.topic !== "All" || noteFilters.tag || noteFilters.link);
}

function noteMatchesFilters(note) {
  if (noteFilters.topic !== "All" && note.topic !== noteFilters.topic) return false;
  if (noteFilters.tag && !note.tags.some((tag) => tag.toLowerCase() === noteFilters.tag.toLowerCase())) return false;
  if (noteFilters.link && note.link !== noteFilters.link) return false;
  const query = noteFilters.query.trim().toLowerCase();
  if (!query) return true;
  return [note.title, note.content, note.topic, note.tags.join(" "), resolveNoteLink(note.link)?.label || ""].join(" ").toLowerCase().includes(query);
}

function syncNoteFilters() {
  if (noteFilters.topic !== "All" && !state.notes.some((note) => note.topic === noteFilters.topic)) noteFilters.topic = "All";
  if (noteFilters.link && !resolveNoteLink(noteFilters.link)) noteFilters.link = "";
  if (noteFilters.tag && !state.notes.some((note) => note.tags.some((tag) => tag.toLowerCase() === noteFilters.tag.toLowerCase()))) noteFilters.tag = "";
}

function resetNoteFilters(link = "") {
  Object.assign(noteFilters, { query: "", topic: "All", tag: "", link });
}

function noteCountLabel() {
  const total = state.notes.length;
  if (!hasNoteFilters()) return `${total} ${total === 1 ? "note" : "notes"}`;
  return `${state.notes.filter(noteMatchesFilters).length} of ${total} notes`;
}

function renderNoteTopicFilter() {
  const counts = new Map();
  for (const note of state.notes) counts.set(note.topic, (counts.get(note.topic) || 0) + 1);
  const chip = (value, label, count, color = "") =>
    `<button class="topic-chip" type="button" data-note-topic="${escapeHTML(value)}" aria-pressed="${noteFilters.topic === value}"${color ? ` style="--topic:${color}"` : ""}>${color ? '<i aria-hidden="true"></i>' : ""}${escapeHTML(label)}<small>${count}</small></button>`;
  return chip("All", "All topics", state.notes.length) + NOTE_TOPICS.filter((topic) => counts.has(topic)).map((topic) => chip(topic, topic, counts.get(topic), noteTopicColor(topic))).join("");
}

function renderActiveNoteFilters() {
  const chips = [];
  const target = noteFilters.link ? resolveNoteLink(noteFilters.link) : null;
  if (target) {
    chips.push(`<button class="filter-chip" type="button" data-note-clear="link" aria-label="Remove filter: ${escapeHTML(target.type)} ${escapeHTML(target.label)}">${LINK_ICON}<span>${escapeHTML(target.type)} · ${escapeHTML(target.label)}</span><span class="filter-chip-x" aria-hidden="true">×</span></button>`);
    if (target.kind === "skill") chips.push(`<button class="text-button" type="button" data-open-skill="${escapeHTML(target.id)}">Open skill guide <span aria-hidden="true">↗</span></button>`);
  }
  if (noteFilters.tag) {
    chips.push(`<button class="filter-chip" type="button" data-note-clear="tag" aria-label="Remove tag filter: ${escapeHTML(noteFilters.tag)}"><span>#${escapeHTML(noteFilters.tag)}</span><span class="filter-chip-x" aria-hidden="true">×</span></button>`);
  }
  return chips.join("");
}

function renderNoteCard(note) {
  const target = resolveNoteLink(note.link);
  const titleId = `note-${escapeHTML(note.id)}-title`;
  const activeTag = noteFilters.tag.toLowerCase();
  const hasDate = /^\d{4}-\d{2}-\d{2}$/.test(note.date || "");
  const pinButton = `<button class="icon-button pin-button" type="button" data-note-pin="${escapeHTML(note.id)}" aria-pressed="${note.pinned}" aria-label="Pin note" aria-describedby="${titleId}" title="${note.pinned ? "Unpin" : "Pin to top"}">${PIN_ICON}</button>`;
  return `
    <article class="note-card${note.pinned ? " is-pinned" : ""}" style="--topic:${noteTopicColor(note.topic)}" aria-labelledby="${titleId}">
      <div class="date-block note-date">${hasDate ? `<span>${escapeHTML(formatDate(note.date, { month: "short" }).toUpperCase())}</span><strong>${escapeHTML(formatDate(note.date, { day: "numeric" }))}</strong>` : '<span>NO DATE</span><strong>—</strong>'}</div>
      <div class="note-main">
        <div class="note-top">${topicTag(note.topic)}${note.pinned ? '<span class="note-pinned-label">PINNED</span>' : ""}</div>
        <h3 id="${titleId}">${escapeHTML(note.title)}</h3>
        <p class="note-content">${escapeHTML(note.content)}</p>
        ${target || note.tags.length ? `<div class="note-meta">
          ${target ? `<button class="note-link-chip" type="button" data-note-filter="${escapeHTML(note.link)}" aria-label="Show notes linked to ${escapeHTML(target.type)} ${escapeHTML(target.label)}">${LINK_ICON}<span class="note-link-kind">${escapeHTML(target.type)}</span><span>${escapeHTML(target.label)}</span></button>` : ""}
          ${note.tags.map((tag) => `<button class="note-tag" type="button" data-note-tag="${escapeHTML(tag)}" aria-pressed="${tag.toLowerCase() === activeTag}">#${escapeHTML(tag)}</button>`).join("")}
        </div>` : ""}
      </div>
      ${recordActions("notes", note.id, pinButton)}
    </article>
  `;
}

function renderNoteResults() {
  const notes = state.notes.filter(noteMatchesFilters);
  if (!notes.length) {
    return `<div class="skill-map-empty notes-empty"><h3>No notes match these filters.</h3><p>Try another word, topic, or tag.</p><button class="secondary-button" type="button" data-note-clear="all">Clear filters</button></div>`;
  }
  const pinned = notes.filter((note) => note.pinned).sort(byNewestNote);
  const months = new Map();
  for (const note of notes.filter((item) => !item.pinned).sort(byNewestNote)) {
    const month = /^\d{4}-\d{2}-\d{2}$/.test(note.date || "") ? note.date.slice(0, 7) : "";
    if (!months.has(month)) months.set(month, []);
    months.get(month).push(note);
  }
  return `
    ${pinned.length ? `<p class="list-divider">Pinned · ${pinned.length}</p><div class="note-list">${pinned.map(renderNoteCard).join("")}</div>` : ""}
    ${[...months].map(([month, items]) => `<p class="list-divider">${month ? escapeHTML(raceMonthLabel(month)) : "No date"} · ${items.length}</p><div class="note-list">${items.map(renderNoteCard).join("")}</div>`).join("")}
  `;
}

function renderNotes() {
  syncNoteFilters();
  const topicsUsed = new Set(state.notes.map((note) => note.topic)).size;
  const linked = state.notes.filter((note) => resolveNoteLink(note.link)).length;
  return `
    ${goalsHeader("notes")}
    ${goalsViewSwitch("notes")}
    ${state.notes.length ? `
      <div class="mini-stats">
        <div><span>NOTES</span><strong>${state.notes.length}</strong></div>
        <div><span>TOPICS COVERED</span><strong>${topicsUsed}<small> / ${NOTE_TOPICS.length}</small></strong></div>
        <div><span>LINKED TO YOUR RIDING</span><strong>${linked}</strong></div>
      </div>
      <section class="notes-section" aria-labelledby="notes-title">
        <div class="section-subheading"><div><h2 id="notes-title">Your notebook<span class="heading-period">.</span></h2><p>Technique cues, setup changes, gear, trails, and races, all searchable. Link a note to a skill, bike, gear item, competition, or goal to see it there too.</p></div></div>
        <div class="notes-toolbar">
          <label class="skill-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><span class="sr-only">Search notes</span><input type="search" id="note-search" placeholder="Search titles, notes, tags, links…" value="${escapeHTML(noteFilters.query)}" autocomplete="off" aria-controls="notes-results"></label>
          <div class="topic-filter" id="note-topics" role="group" aria-label="Filter by topic">${renderNoteTopicFilter()}</div>
        </div>
        <div class="notes-meta"><div class="active-filters" id="note-active-filters">${renderActiveNoteFilters()}</div><p class="notes-count" id="notes-count" role="status" aria-live="polite">${noteCountLabel()}</p></div>
        <div id="notes-results">${renderNoteResults()}</div>
      </section>
    ` : emptyPanel("Start your notebook", "Write about a technique cue, a bike setup change, a trail, a race, or anything else you want to remember.", "notes", "Write your first note")}
  `;
}

function updateNotes(focusSelector = "") {
  if (activePage !== "notes" || !document.querySelector("#notes-results")) {
    renderPage();
    return;
  }
  syncNoteFilters();
  document.querySelector("#note-topics").innerHTML = renderNoteTopicFilter();
  document.querySelector("#note-active-filters").innerHTML = renderActiveNoteFilters();
  document.querySelector("#notes-results").innerHTML = renderNoteResults();
  document.querySelector("#notes-count").textContent = noteCountLabel();
  const search = document.querySelector("#note-search");
  if (search.value !== noteFilters.query) search.value = noteFilters.query;
  if (!focusSelector) return;
  const target = pageContent.querySelector(focusSelector) || search;
  target.focus({ preventScroll: true });
  target.scrollIntoView({ block: "nearest" });
}

function showNotesFor(link) {
  if (activePage === "notes") {
    noteFilters.link = link;
    updateNotes('[data-note-clear="link"]');
    return;
  }
  resetNoteFilters(link);
  navigateTo("notes");
}

function toggleNotePin(noteId) {
  const nextState = structuredClone(state);
  const note = nextState.notes.find((item) => item.id === noteId);
  if (!note) {
    showToast("That note is no longer available.");
    renderPage();
    return;
  }
  note.pinned = !note.pinned;
  nextState.demoMode = false;
  if (!saveState(nextState)) return;
  updateNotes(`[data-note-pin="${CSS.escape(noteId)}"]`);
  showToast(note.pinned ? "Note pinned to the top." : "Note unpinned.");
}

const PAGE_RENDERERS = {
  overview: renderOverview,
  skills: renderSkills,
  training: renderTraining,
  competitions: renderCompetitions,
  calendar: renderRaceCalendar,
  bikes: renderBikes,
  gear: renderGear,
  goals: renderGoals,
  notes: renderNotes
};

function renderPage(page = activePage) {
  activePage = Object.hasOwn(PAGE_RENDERERS, page) ? page : "overview";
  const navPage = PAGE_PARENTS[activePage] || activePage;
  document.querySelectorAll(".nav-link[data-page]").forEach((button) => {
    const isCurrent = button.dataset.page === navPage;
    button.classList.toggle("active", isCurrent);
    if (isCurrent) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  const pageTitle = navPage === activePage ? PAGE_TITLES[activePage] : `${PAGE_TITLES[navPage]} / ${PAGE_TITLES[activePage]}`;
  document.querySelector("#breadcrumb-current").textContent = pageTitle;
  document.title = `${PAGE_TITLES[activePage]} — Trailform`;
  document.querySelector("#rider-name").textContent = state.profile.name || "Rider";
  document.querySelector(".user-avatar").textContent = (state.profile.name || "R").trim().charAt(0).toUpperCase() || "R";
  pageContent.innerHTML = PAGE_RENDERERS[activePage]();
  if (storageNotice) {
    setNotice(storageNotice, true);
  } else if (state.demoMode) {
    setNotice("Starter examples are shown. Edit or remove them; your own changes are saved in this browser.", false);
  } else {
    setNotice("", false);
  }
}

function getCollection(module) {
  if (module === "maintenance") return allMaintenance();
  if (module === "profile") return [state.profile];
  return state[module] || [];
}

function findRecord(module, id) {
  if (module === "profile") return state.profile;
  if (module === "maintenance") return allMaintenance().find((item) => item.id === id);
  return getCollection(module).find((item) => item.id === id);
}

function getBikeIdForMaintenance(id) {
  return state.bikes.find((bike) => (bike.maintenance || []).some((item) => item.id === id))?.id || "";
}

function renderField(config, value) {
  const id = `field-${config.name}`;
  const required = config.required ? " required" : "";
  const full = config.full ? " field-full" : "";
  const placeholder = config.placeholder ? ` placeholder="${escapeHTML(config.placeholder)}"` : "";
  const maxLength = config.maxlength ? ` maxlength="${config.maxlength}"` : "";
  const min = config.min !== undefined ? ` min="${config.min}"` : "";
  const max = config.max !== undefined ? ` max="${config.max}"` : "";
  const step = config.step ? ` step="${config.step}"` : "";
  const hintId = config.hint ? `${id}-hint` : "";
  const describedBy = hintId ? ` aria-describedby="${hintId}"` : "";

  let control;
  if (config.type === "select") {
    const option = (choice) => `<option value="${escapeHTML(choice.value)}"${String(value ?? "") === String(choice.value) ? " selected" : ""}>${escapeHTML(choice.label)}</option>`;
    let options = "";
    let group = "";
    for (const choice of config.choices || []) {
      const nextGroup = choice.group || "";
      if (nextGroup !== group) {
        if (group) options += "</optgroup>";
        if (nextGroup) options += `<optgroup label="${escapeHTML(nextGroup)}">`;
        group = nextGroup;
      }
      options += option(choice);
    }
    if (group) options += "</optgroup>";
    control = `<select id="${id}" name="${config.name}"${required}${describedBy}>${options}</select>`;
  } else if (config.type === "textarea") {
    control = `<textarea id="${id}" name="${config.name}" rows="${config.rows || 3}"${required}${maxLength}${placeholder}${describedBy}>${escapeHTML(value)}</textarea>`;
  } else if (config.type === "range") {
    const lowest = Number(config.min ?? 0);
    const highest = Number(config.max ?? 100);
    const number = Math.min(highest, Math.max(lowest, Number(value) || lowest));
    const percent = highest > lowest ? ((number - lowest) / (highest - lowest)) * 100 : 0;
    control = `<div class="range-control"><input class="goal-range" id="${id}" name="${config.name}" type="range" value="${number}"${min}${max}${step} aria-valuetext="${number}%"${describedBy} style="--value:${percent}%"><span class="range-value" aria-hidden="true"><span data-range-value>${number}</span><small>%</small></span></div>`;
  } else {
    control = `<input id="${id}" name="${config.name}" type="${config.type}" value="${escapeHTML(value)}"${required}${maxLength}${min}${max}${step}${placeholder}${describedBy}>`;
  }
  return `<div class="form-field${full ? " field-full" : ""}${config.third ? " field-third" : ""}" data-field="${config.name}"><label for="${id}">${escapeHTML(config.label)}${config.required ? `<span aria-hidden="true"> *</span>` : ""}</label>${control}${hintId ? `<p class="field-hint" id="${hintId}">${escapeHTML(config.hint)}</p>` : ""}</div>`;
}

function rememberEditorOrigin(catalogueId = "") {
  if (!editorDialog.open) {
    editorReturnFocus = document.activeElement;
    editorReturnSkillId = catalogueId;
  }
}

function editorHasSkillChanges() {
  return Boolean(editorContext?.catalogueId) && JSON.stringify([...new FormData(editorForm)]) !== editorInitialValues;
}

function renderSkillDetails(skill, personal) {
  const status = getSkillStatus(personal);
  return `
    <div class="skill-detail-intro">
      <div class="skill-detail-badges"><span class="level-pill ${skill.level.toLowerCase()}">${skill.level}</span><span class="skill-status ${status.className}"><span class="skill-status-dot" aria-hidden="true"></span>${status.label}${status.rating !== null ? ` · ${status.rating}/5` : ""}</span></div>
      <p>${escapeHTML(skill.summary)}</p>
    </div>
    <section class="skill-prerequisites" aria-labelledby="skill-prerequisites-title">
      <h3 id="skill-prerequisites-title">Builds on</h3>
      ${skill.prerequisites.length ? `<div class="skill-prerequisite-links">${skill.prerequisites.map((id) => {
        const prerequisite = SKILL_CATALOG_BY_ID.get(id);
        return `<button class="skill-prerequisite-button" type="button" data-open-skill="${id}">${escapeHTML(prerequisite.name)} <span aria-hidden="true">↗</span></button>`;
      }).join("")}</div><p>Helpful foundations, not requirements to unlock this skill.</p>` : "<p>A starting point. No suggested prerequisites.</p>"}
    </section>
    <section class="skill-practice-setting"><h3>Practice setting</h3><p>${escapeHTML(skill.setting)}</p></section>
    <div class="skill-guide-grid">
      <section class="skill-drill"><span class="skill-guide-label">YOUR NEXT STEP</span><h3>Try this practice drill</h3><ol>${skill.drill.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol></section>
      <section class="skill-self-check"><span class="skill-guide-label">NOTICE YOUR PROGRESS</span><h3>Check in with yourself</h3><ul>${skill.checks.map((check) => `<li>${escapeHTML(check)}</li>`).join("")}</ul><p>Use these cues to reflect, not as a pass/fail test.</p></section>
    </div>
    <aside class="skill-safety-note"><strong>${skill.level === "Advanced" ? "Progress with qualified coaching" : "Keep your practice controlled"}</strong><p>${escapeHTML(skill.safety)}</p></aside>
    ${renderLinkedNotes(`skill:${skill.id}`)}
  `;
}

function openSkillDetails(catalogueId) {
  const skill = SKILL_CATALOG_BY_ID.get(catalogueId);
  if (!skill) {
    showToast("That library skill is not available.");
    console.error("Unknown skill catalogue reference.", catalogueId);
    return;
  }
  if (editorHasSkillChanges() && !window.confirm("Discard your unsaved changes and view another skill?")) return;
  rememberEditorOrigin(catalogueId);
  const personal = getCatalogueRecord(catalogueId);
  editorContext = { module: "skills", id: personal?.id || "", catalogueId };
  document.querySelector("#bike-type-preview").hidden = true;
  document.querySelector("#bike-type-preview").innerHTML = "";
  editorDialog.classList.add("skill-detail-dialog");
  document.querySelector("#dialog-title").textContent = skill.name;
  document.querySelector("#dialog-eyebrow").textContent = `${skill.category} / SKILL GUIDE`;
  const detailContent = document.querySelector("#skill-detail-content");
  detailContent.hidden = false;
  detailContent.innerHTML = renderSkillDetails(skill, personal);
  document.querySelector("#skill-progress-heading").hidden = false;
  document.querySelector("#skill-reset-button").hidden = !personal;
  document.querySelector("#dialog-cancel").textContent = "Close";
  document.querySelector("#dialog-save").textContent = "Save progress";
  formFields.innerHTML = SKILL_PROGRESS_FIELDS.map((item) => renderField(item, personal?.[item.name] ?? "")).join("");
  formError.textContent = "";
  formError.hidden = true;
  editorInitialValues = JSON.stringify([...new FormData(editorForm)]);
  if (!editorDialog.open) editorDialog.showModal();
  editorDialog.scrollTop = 0;
  document.querySelector("#dialog-title").focus({ preventScroll: true });
}

function resetSkillTracking() {
  const catalogueId = editorContext?.catalogueId;
  const personal = getCatalogueRecord(catalogueId);
  if (!personal) {
    showToast("There is no saved progress to reset for this skill.");
    return;
  }
  if (!window.confirm(`Reset your confidence, target, and notes for "${SKILL_CATALOG_BY_ID.get(catalogueId).name}"? The skill will stay in the map.`)) return;
  const nextState = { ...state, skills: state.skills.filter((record) => record.catalogueId !== catalogueId), demoMode: false };
  if (!saveState(nextState)) {
    formError.textContent = storageNotice;
    formError.hidden = false;
    return;
  }
  editorInitialValues = JSON.stringify([...new FormData(editorForm)]);
  renderPage();
  openSkillDetails(catalogueId);
  showToast("Personal tracking reset. The skill is still available.");
}

function openEditor(module, id = "", extra = {}) {
  const config = FORM_CONFIG[module];
  if (!config) return;
  const existing = module === "profile" ? state.profile : id ? findRecord(module, id) : null;
  if (id && !existing) {
    showToast("That record is no longer available.");
    return;
  }
  if (module === "skills" && existing && SKILL_CATALOG_BY_ID.has(existing.catalogueId)) {
    openSkillDetails(existing.catalogueId);
    return;
  }

  rememberEditorOrigin(extra.returnSkill || "");
  const values = { ...(existing || {}) };
  if (module === "notes") {
    config.fields.find((item) => item.name === "link").choices = noteLinkChoices();
    if (!existing) {
      values.link = extra.link || (activePage === "notes" ? noteFilters.link : "");
      const linkTopic = NOTE_LINK_KINDS[String(values.link).split(":")[0]]?.topic;
      values.topic = linkTopic || (activePage === "notes" && noteFilters.topic !== "All" ? noteFilters.topic : "Training");
    }
    if (values.link && !resolveNoteLink(values.link)) values.link = "";
    if (Array.isArray(values.tags)) values.tags = values.tags.join(", ");
  }
  if (module === "bikes") {
    const choices = [{ value: "", label: "Choose a bike type" }, ...BIKE_TYPES.map(({ value, label }) => ({ value, label }))];
    if (values.discipline && !choices.some((choice) => choice.value === values.discipline)) {
      choices.push({ value: values.discipline, label: `${values.discipline} (existing type)` });
    }
    config.fields.find((item) => item.name === "discipline").choices = choices;
  }
  if (module === "skills") {
    config.fields.find((item) => item.name === "category").choices =
      [...new Set([...SKILL_CATEGORIES, ...getCustomSkills().map((skill) => skill.category)])].map((label) => ({ value: label, label }));
  }
  if (module === "maintenance") {
    values.bikeId = extra.bikeId || values.bikeId || getBikeIdForMaintenance(id);
    config.fields[0].choices = state.bikes.map((bike) => ({ value: bike.id, label: bike.name }));
    if (!config.fields[0].choices.length) {
      showToast("Add a bike before logging maintenance.");
      return;
    }
  }
  editorContext = { module, id, extra };
  editorDialog.classList.remove("skill-detail-dialog");
  document.querySelector("#skill-detail-content").hidden = true;
  document.querySelector("#skill-detail-content").innerHTML = "";
  document.querySelector("#skill-progress-heading").hidden = true;
  document.querySelector("#skill-reset-button").hidden = true;
  document.querySelector("#dialog-cancel").textContent = "Cancel";
  document.querySelector("#dialog-save").innerHTML = 'Save record <span aria-hidden="true">↗</span>';
  document.querySelector("#dialog-title").innerHTML = `${id ? "Edit" : "Add"} ${escapeHTML(config.title.toLowerCase())}<span class="heading-period">.</span>`;
  document.querySelector("#dialog-eyebrow").textContent = PAGE_TITLES[PAGE_PARENTS[activePage] || activePage].toUpperCase();
  formError.hidden = true;
  formError.textContent = "";
  formFields.innerHTML = `${module === "profile" ? '<p class="form-intro">Your rider level is estimated automatically from the confidence ratings in your Skills library.</p>' : ""}${config.fields.map((item) => {
    let value = values[item.name];
    if (value === undefined || value === null) value = item.default ? item.default() : "";
    return renderField(item, value);
  }).join("")}`;
  const bikePreview = document.querySelector("#bike-type-preview");
  bikePreview.hidden = module !== "bikes";
  bikePreview.innerHTML = module === "bikes" ? renderBikeIllustration(values.discipline) : "";
  if (module === "goals") syncGoalMeasureFields();
  editorInitialValues = JSON.stringify([...new FormData(editorForm)]);
  editorDialog.showModal();
  editorDialog.querySelector("input, select, textarea")?.focus();
}

function finishEditor() {
  const context = editorContext;
  editorDialog.close();
  editorContext = null;
  editorForm.reset();
  editorInitialValues = "";
  editorDialog.classList.remove("skill-detail-dialog");
  let focusTarget = editorReturnFocus?.isConnected ? editorReturnFocus : null;
  if (!focusTarget && editorReturnFocus?.dataset?.raceEvent) {
    focusTarget = findRaceEventControl(editorReturnFocus.dataset.raceEvent);
  }
  if (!focusTarget && editorReturnSkillId) {
    focusTarget = document.querySelector(`[data-open-skill="${CSS.escape(editorReturnSkillId)}"]`);
  }
  if (!focusTarget && context?.extra?.link) {
    focusTarget = pageContent.querySelector(`[data-note-add="${CSS.escape(context.extra.link)}"]`);
  }
  if (!focusTarget && context?.id && context.module !== "profile") {
    focusTarget = pageContent.querySelector(`[data-edit="${CSS.escape(context.module)}"][data-id="${CSS.escape(context.id)}"]`);
  }
  if (!focusTarget && context?.module) {
    const selector = context.module === "profile" ? '[data-edit="profile"]' : `[data-add="${CSS.escape(context.module)}"]`;
    focusTarget = document.querySelector(selector);
  }
  (focusTarget || pageContent).focus({ preventScroll: true });
  editorReturnFocus = null;
  editorReturnSkillId = "";
  if (context?.extra?.returnSkill) openSkillDetails(context.extra.returnSkill);
}

function editorHasUnsavedChanges() {
  return Boolean(editorContext) && JSON.stringify([...new FormData(editorForm)]) !== editorInitialValues;
}

function setEditorFieldVisible(name, visible) {
  const wrapper = editorForm.querySelector(`[data-field="${name}"]`);
  if (!wrapper) return;
  wrapper.hidden = !visible;
  wrapper.querySelectorAll("input, select, textarea").forEach((control) => { control.disabled = !visible; });
}

function syncGoalMeasureFields() {
  const numeric = editorForm.querySelector("#field-measure")?.value === "number";
  ["target", "actual", "unit"].forEach((name) => setEditorFieldVisible(name, numeric));
  setEditorFieldVisible("progress", !numeric);
}

function syncEditorGoalStatus() {
  const status = editorForm.querySelector("#field-status");
  if (!status) return;
  if (editorForm.querySelector("#field-measure")?.value === "number") {
    const measure = goalMeasure({ measure: "number", target: editorForm.querySelector("#field-target").value, actual: editorForm.querySelector("#field-actual").value });
    if (measure) status.value = goalStatusForProgress(status.value, measuredStatusProgress(measure));
  } else {
    status.value = goalStatusForProgress(status.value, Number(editorForm.querySelector("#field-progress").value));
  }
}

function closeEditor() {
  if (editorHasSkillChanges() && !window.confirm("Discard your unsaved skill changes?")) return;
  if (editorContext?.module === "notes" && editorHasUnsavedChanges() && !window.confirm("Discard this note?")) return;
  finishEditor();
}

function saveEditor(event) {
  event.preventDefault();
  if (!editorContext || !editorForm.reportValidity()) return;

  const { module, id, catalogueId } = editorContext;
  const config = FORM_CONFIG[module];
  const fields = catalogueId ? SKILL_PROGRESS_FIELDS : config.fields;
  const formData = new FormData(editorForm);
  const record = {};
  for (const item of fields) {
    if (editorForm.elements[item.name]?.disabled) {
      record[item.name] = "";
      continue;
    }
    const value = String(formData.get(item.name) || "").trim();
    if (item.required && !value) {
      formError.textContent = `${item.label} is required.`;
      formError.hidden = false;
      return;
    }
    if ((item.type === "number" || item.type === "range") && value && (!Number.isFinite(Number(value)) || Number(value) < (item.min ?? -Infinity) || Number(value) > (item.max ?? Infinity))) {
      formError.textContent = item.max === undefined ? `${item.label} must be a number of at least ${item.min ?? 0}.` : `${item.label} must be between ${item.min ?? "the minimum"} and ${item.max}.`;
      formError.hidden = false;
      return;
    }
    if (item.type === "select" && !item.choices.some((choice) => String(choice.value) === value)) {
      formError.textContent = `Choose a valid option for ${item.label.toLowerCase()}.`;
      formError.hidden = false;
      return;
    }
    record[item.name] = value;
  }
  if (module === "notes" && !catalogueId) {
    record.tags = normalizeTags(record.tags.split(","));
  }
  if (module === "goals") {
    if (record.measure === "number") {
      record.actual = String(Math.max(0, Number(record.actual) || 0));
      record.target = String(Number(record.target));
      const measure = goalMeasure(record);
      record.progress = String(Math.min(100, measure.percent));
      if (measure.reached && record.status !== "Paused") record.status = "Achieved";
    } else {
      let progress = clampProgress(record.progress);
      if (record.status === "Achieved") progress = 100;
      else if (progress >= 100 && record.status !== "Paused") record.status = "Achieved";
      Object.assign(record, { progress: String(progress), target: "", actual: "", unit: "" });
    }
  }

  const nextState = structuredClone(state);
  if (catalogueId) {
    const reference = SKILL_CATALOG_BY_ID.get(catalogueId);
    if (!reference) {
      formError.textContent = "This library skill is not available. Close the dialog and select another skill.";
      formError.hidden = false;
      return;
    }
    const index = nextState.skills.findIndex((item) => item.catalogueId === catalogueId);
    if (index >= 0) {
      nextState.skills[index] = { ...nextState.skills[index], ...record };
    } else {
      nextState.skills.push({
        id: createId(), catalogueId, name: reference.name, category: reference.category, level: reference.level, ...record
      });
    }
  } else if (module === "profile") {
    nextState.profile = { ...nextState.profile, ...record };
  } else if (module === "maintenance") {
    const bike = nextState.bikes.find((item) => item.id === record.bikeId);
    if (!bike) {
      formError.textContent = "Choose a bike that still exists.";
      formError.hidden = false;
      return;
    }
    bike.maintenance ||= [];
    if (id) {
      const index = bike.maintenance.findIndex((item) => item.id === id);
      if (index >= 0) bike.maintenance[index] = { ...record, id };
      else bike.maintenance.push({ ...record, id: createId() });
    } else {
      bike.maintenance.push({ ...record, id: createId() });
    }
  } else {
    const collection = nextState[module];
    const index = id ? collection.findIndex((item) => item.id === id) : -1;
    if (index >= 0) collection[index] = { ...collection[index], ...record, id };
    else collection.unshift({
      ...record, id: createId(), ...(module === "bikes" ? { maintenance: [] } : {}), ...(module === "skills" ? { catalogueId: null } : {}), ...(module === "notes" ? { pinned: false } : {})
    });
  }

  nextState.demoMode = false;
  if (!saveState(nextState)) {
    formError.textContent = storageNotice;
    formError.hidden = false;
    return;
  }
  if (module === "competitions" && activePage === "calendar" && /^\d{4}-\d{2}-\d{2}$/.test(record.date || "")) {
    raceCalendarView.month = record.date.slice(0, 7);
  }
  let toastSuffix = "";
  if (module === "notes" && activePage === "notes" && hasNoteFilters()) {
    const savedNote = id ? state.notes.find((item) => item.id === id) : state.notes[0];
    if (savedNote && !noteMatchesFilters(savedNote)) {
      resetNoteFilters();
      toastSuffix = " Filters cleared so you can see it.";
    }
  }
  if (module === "goals" && activePage === "goals" && selectedGoalYear() !== "all") {
    const savedYear = goalYear(record);
    if (savedYear !== selectedGoalYear()) {
      goalFilters.year = savedYear;
      toastSuffix = savedYear === "none" ? " Showing goals with no target date." : ` Showing the ${savedYear} season.`;
    }
  }
  renderPage();
  finishEditor();
  showToast(catalogueId ? "Skill progress saved on this device." : `${config.title} ${id ? "updated" : "added"}.${toastSuffix}`);
}

function deleteRecord(module, id, bikeId = "") {
  const record = findRecord(module, id);
  if (!record) {
    showToast("That record is no longer available.");
    return;
  }
  const label = module === "profile" ? "your rider profile" : (record.name || record.title || record.component || record.type || "this record");
  if (!window.confirm(`Delete “${label}”? This cannot be undone.`)) return;

  if (module === "profile") {
    showToast("The rider profile cannot be deleted.");
    return;
  }
  const nextState = structuredClone(state);
  if (module === "maintenance") {
    const bike = nextState.bikes.find((item) => item.id === (bikeId || getBikeIdForMaintenance(id)));
    if (bike) bike.maintenance = (bike.maintenance || []).filter((item) => item.id !== id);
  } else {
    nextState[module] = nextState[module].filter((item) => item.id !== id);
  }
  nextState.demoMode = false;
  if (!saveState(nextState)) return;
  renderPage();
  showToast("Record deleted.");
}

function downloadFile(payload, filename, mimeType = "application/json") {
  const blob = new Blob([payload], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  try {
    document.body.append(link);
    link.click();
  } finally {
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

function createBackup() {
  return {
    app: "Trailform", version: 1, exportedAt: new Date().toISOString(),
    data: structuredClone(state),
    reference: { skills: structuredClone(SKILL_CATALOG), bikeTypes: structuredClone(BIKE_TYPES), competitionCalendar: structuredClone(COMPETITION_CALENDAR) }
  };
}

function exportData() {
  if (storageReadFailed && rawUnparsedData === null) {
    setNotice("Export is unavailable because your saved data could not be read. No records were overwritten. Import a valid backup to recover.", true);
    return;
  }
  try {
    if (rawUnparsedData !== null) {
      downloadFile(rawUnparsedData, "trailform-unreadable-backup.json", "text/plain");
      showToast("Original unreadable data downloaded. Import a valid Trailform backup to continue.");
      return;
    }
    downloadFile(JSON.stringify(createBackup(), null, 2), `trailform-backup-${toISODate(new Date())}.json`);
    showToast("Your complete JSON backup is ready.");
  } catch (error) {
    console.error("Trailform could not export JSON.", error);
    setNotice(`JSON export failed: ${error.message}`, true);
  }
}

async function exportExcel() {
  if (storageReadFailed) {
    setNotice(rawUnparsedData !== null
      ? "Excel export is unavailable because saved data is unreadable. Use Export JSON to recover the original data, or import a valid backup."
      : "Excel export is unavailable because saved data could not be read. No records were overwritten.", true);
    return;
  }
  const button = document.querySelector("#export-excel-button");
  if (button.disabled) return;
  button.disabled = true;
  button.setAttribute("aria-busy", "true");
  button.textContent = "Preparing Excel…";
  try {
    const backup = createBackup();
    const buffer = await createExcelWorkbook(backup);
    downloadFile(buffer, `trailform-export-${toISODate(new Date(backup.exportedAt))}.xlsx`, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    showToast("Your complete Excel workbook is ready.");
  } catch (error) {
    console.error("Trailform could not export Excel.", error);
    setNotice(`Excel export failed: ${error.message}`, true);
  } finally {
    button.disabled = false;
    button.removeAttribute("aria-busy");
    button.textContent = "Export Excel (.xlsx)";
  }
}

async function importData(file) {
  try {
    const parsed = JSON.parse(await file.text());
    const imported = parsed?.data || parsed;
    const nextState = movePreviousCalendarImport(prepareState(imported));
    if (![...LEVELS, "Not assessed"].includes(nextState.profile.currentLevel)) throw new Error("The rider level in this backup is not recognized.");
    // Restoring a backup must not replay the supplied assessment on the next load.
    nextState.skillAssessmentApplied = true;
    nextState.demoMode = false;
    if (!saveState(nextState, { replaceUnreadable: true })) throw new Error(storageNotice);
    renderPage();
    if (nextState.skills.some((record) => record.catalogueId && !SKILL_CATALOG_BY_ID.has(record.catalogueId))) {
      setNotice("Some skill links are not in this library. Those records are preserved in Your custom skills.", false);
    }
    showToast("Backup imported successfully.");
  } catch (error) {
    console.error("Trailform could not import data.", error);
    setNotice(`Import failed: ${error.message}`, true);
  }
}

const sidebar = document.querySelector(".sidebar");
const navigationPanel = document.querySelector("#navigation-panel");
const menuToggle = document.querySelector("#menu-toggle");
const mobileNavigation = window.matchMedia("(max-width: 960px)");

function closeNavigation(restoreFocus = false) {
  sidebar.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.querySelector("#menu-toggle-label").textContent = "Menu";
  if (restoreFocus && mobileNavigation.matches) menuToggle.focus();
}

function showRoute(page) {
  closeNavigation();
  if (raceDialog.open) raceDialog.close();
  renderPage(page);
  const focusTarget = pendingRouteFocus ? pageContent.querySelector(pendingRouteFocus) : null;
  pendingRouteFocus = "";
  (focusTarget || pageContent).focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}

function navigateTo(page) {
  if (window.location.hash === `#${page}`) showRoute(page);
  else window.location.hash = page;
}

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.querySelector("#menu-toggle-label").textContent = isOpen ? "Close" : "Menu";
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sidebar.classList.contains("is-open")) closeNavigation(true);
});
document.addEventListener("click", (event) => {
  if (event.isTrusted && sidebar.classList.contains("is-open") && !sidebar.contains(event.target)) {
    closeNavigation(navigationPanel.contains(document.activeElement));
  }
});
mobileNavigation.addEventListener("change", () => {
  const focusIsInPanel = navigationPanel.contains(document.activeElement);
  const focusIsOnToggle = document.activeElement === menuToggle;
  closeNavigation(focusIsInPanel);
  if (!mobileNavigation.matches && focusIsOnToggle) {
    document.querySelector(".nav-link[aria-current='page']").focus();
  }
});
document.querySelector(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  navigateTo("overview");
});
document.querySelector("#main-nav").addEventListener("click", (event) => {
  const button = event.target.closest("[data-page]");
  if (!button) return;
  navigateTo(button.dataset.page);
});

document.querySelector("#page-content").addEventListener("click", (event) => {
  const viewLink = event.target.closest("[data-view-link]");
  if (viewLink) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (viewLink.getAttribute("aria-current") === "page") return;
    pendingRouteFocus = `[data-view-link="${CSS.escape(viewLink.dataset.viewLink)}"]`;
    navigateTo(viewLink.dataset.viewLink);
    return;
  }
  const skillButton = event.target.closest("[data-open-skill]");
  if (skillButton) {
    openSkillDetails(skillButton.dataset.openSkill);
    return;
  }
  if (event.target.closest("[data-clear-skills]")) {
    skillFilters.query = "";
    skillFilters.category = "All";
    document.querySelector("#skill-search").value = "";
    document.querySelector("#skill-category").value = "All";
    updateSkillMap();
    document.querySelector("#skill-search").focus();
    return;
  }
  const goingButton = event.target.closest("[data-going]");
  if (goingButton) {
    toggleCompetitionGoing(goingButton.dataset.going, goingButton);
    return;
  }
  const yearButton = event.target.closest("[data-calendar-year]");
  if (yearButton) {
    competitionFilters.year = yearButton.dataset.calendarYear;
    updatePotentialCompetitions();
    return;
  }
  const goalYearButton = event.target.closest("[data-goal-year]");
  if (goalYearButton) {
    goalFilters.year = goalYearButton.dataset.goalYear;
    renderPage();
    pageContent.querySelector(`[data-goal-year="${CSS.escape(goalFilters.year)}"]`)?.focus();
    return;
  }
  const typeButton = event.target.closest("[data-calendar-type]");
  if (typeButton) {
    competitionFilters.type = typeButton.dataset.calendarType;
    updatePotentialCompetitions();
    return;
  }
  const raceEvent = event.target.closest("[data-race-event]");
  if (raceEvent) {
    openRaceDialog(raceEvent.dataset.raceEvent);
    return;
  }
  const raceStep = event.target.closest("[data-race-step]");
  if (raceStep) {
    setRaceMonth(shiftMonth(raceCalendarView.month, Number(raceStep.dataset.raceStep)), `[data-race-step="${raceStep.dataset.raceStep}"]`);
    return;
  }
  if (event.target.closest("[data-race-today]")) {
    setRaceMonth(toISODate(new Date()).slice(0, 7), "[data-race-today]");
    return;
  }
  const raceYear = event.target.closest("[data-race-year]");
  if (raceYear) {
    setRaceMonth(raceYearStartMonth(raceYear.dataset.raceYear), `[data-race-year="${raceYear.dataset.raceYear}"]`);
    return;
  }
  const raceMonth = event.target.closest("[data-race-month]");
  if (raceMonth) {
    const month = raceMonth.dataset.raceMonth;
    setRaceMonth(month, raceMonth.closest(".race-cal-months") ? `[data-race-month="${month}"]` : "#race-cal-title");
    return;
  }
  const noteFilterButton = event.target.closest("[data-note-filter]");
  if (noteFilterButton) {
    showNotesFor(noteFilterButton.dataset.noteFilter);
    return;
  }
  const noteAddButton = event.target.closest("[data-note-add]");
  if (noteAddButton) {
    openEditor("notes", "", { link: noteAddButton.dataset.noteAdd });
    return;
  }
  const topicButton = event.target.closest("[data-note-topic]");
  if (topicButton) {
    noteFilters.topic = topicButton.dataset.noteTopic;
    updateNotes(`[data-note-topic="${CSS.escape(noteFilters.topic)}"]`);
    return;
  }
  const tagButton = event.target.closest("[data-note-tag]");
  if (tagButton) {
    const tag = tagButton.dataset.noteTag;
    noteFilters.tag = noteFilters.tag.toLowerCase() === tag.toLowerCase() ? "" : tag;
    updateNotes(noteFilters.tag ? '[data-note-clear="tag"]' : "#note-search");
    return;
  }
  const clearButton = event.target.closest("[data-note-clear]");
  if (clearButton) {
    const filter = clearButton.dataset.noteClear;
    if (filter === "all") resetNoteFilters();
    else noteFilters[filter] = "";
    updateNotes("#note-search");
    return;
  }
  const pinButton = event.target.closest("[data-note-pin]");
  if (pinButton) {
    toggleNotePin(pinButton.dataset.notePin);
    return;
  }
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    openEditor(addButton.dataset.add, "", { bikeId: addButton.dataset.bikeId || "" });
    return;
  }
  const editButton = event.target.closest("[data-edit]");
  if (editButton) {
    openEditor(editButton.dataset.edit, editButton.dataset.id || "");
    return;
  }
  const deleteButton = event.target.closest("[data-delete]");
  if (deleteButton) {
    deleteRecord(deleteButton.dataset.delete, deleteButton.dataset.id, deleteButton.dataset.bikeId || "");
    return;
  }
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    navigateTo(pageButton.dataset.page);
  }
});

pageContent.addEventListener("input", (event) => {
  if (event.target.id === "skill-search") {
    skillFilters.query = event.target.value;
    updateSkillMap();
  } else if (event.target.id === "note-search") {
    noteFilters.query = event.target.value;
    updateNotes();
  } else if (event.target.matches("[data-goal-progress]")) {
    updateRangeVisual(event.target);
  }
});
pageContent.addEventListener("change", (event) => {
  if (event.target.id === "skill-category") {
    skillFilters.category = event.target.value;
    updateSkillMap();
  } else if (event.target.matches("[data-goal-progress]")) {
    saveGoalProgress(event.target.dataset.goalProgress, event.target.value);
  }
});
pageContent.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-goal-update]");
  if (!form) return;
  event.preventDefault();
  saveGoalActual(form);
});
editorForm.addEventListener("click", (event) => {
  const noteButton = event.target.closest("[data-note-filter], [data-note-add]");
  if (noteButton) {
    if (editorHasSkillChanges() && !window.confirm("Discard your unsaved skill changes?")) return;
    const returnSkill = editorContext?.catalogueId || "";
    finishEditor();
    if (noteButton.dataset.noteFilter) showNotesFor(noteButton.dataset.noteFilter);
    else openEditor("notes", "", { link: noteButton.dataset.noteAdd, returnSkill });
    return;
  }
  const button = event.target.closest("[data-open-skill]");
  if (button) openSkillDetails(button.dataset.openSkill);
});
editorForm.addEventListener("submit", saveEditor);
editorForm.addEventListener("input", (event) => {
  if (event.target.type === "range") updateRangeVisual(event.target);
  if (editorContext?.module === "goals" && ["field-progress", "field-target", "field-actual"].includes(event.target.id)) syncEditorGoalStatus();
});
editorForm.addEventListener("change", (event) => {
  if (editorContext?.module === "bikes" && event.target.id === "field-discipline") {
    document.querySelector("#bike-type-preview").innerHTML = renderBikeIllustration(event.target.value);
  }
  if (editorContext?.module === "goals" && event.target.id === "field-measure") {
    syncGoalMeasureFields();
    syncEditorGoalStatus();
  }
  if (editorContext?.module === "goals" && event.target.id === "field-status" && event.target.value === "Achieved") {
    const range = editorForm.querySelector("#field-progress");
    if (range && !range.disabled) {
      range.value = "100";
      updateRangeVisual(range);
    }
  }
  if (editorContext?.module === "notes") {
    if (event.target.id === "field-topic") editorContext.topicTouched = true;
    if (event.target.id === "field-link" && !editorContext.id && !editorContext.topicTouched) {
      const topic = NOTE_LINK_KINDS[event.target.value.split(":")[0]]?.topic;
      if (topic) editorForm.querySelector("#field-topic").value = topic;
    }
  }
});
document.querySelector("#skill-reset-button").addEventListener("click", resetSkillTracking);
document.querySelector("#dialog-close").addEventListener("click", closeEditor);
document.querySelector("#dialog-cancel").addEventListener("click", closeEditor);
editorDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeEditor();
});
editorDialog.addEventListener("click", (event) => {
  if (event.target !== editorDialog) return;
  const bounds = editorDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeEditor();
});
raceDialog.addEventListener("click", (event) => {
  const goingButton = event.target.closest("[data-race-going]");
  if (goingButton) {
    toggleRaceDialogGoing(goingButton.dataset.raceGoing);
    return;
  }
  const editButton = event.target.closest("[data-race-edit]");
  if (editButton) {
    editFromRaceDialog(editButton.dataset.raceEdit);
    return;
  }
  if (event.target.closest("[data-race-close]")) {
    raceDialog.close();
    return;
  }
  if (event.target !== raceDialog) return;
  const bounds = raceDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) raceDialog.close();
});
raceDialog.addEventListener("close", () => {
  const key = raceDialogKey;
  raceDialogKey = "";
  raceDialogContent.innerHTML = "";
  raceDialogStatus.textContent = "";
  if (editorDialog.open || (document.activeElement !== document.body && document.activeElement?.isConnected)) return;
  (findRaceEventControl(key) || pageContent).focus({ preventScroll: true });
});
window.addEventListener("hashchange", () => showRoute(window.location.hash.slice(1) || "overview"));
document.querySelector("#export-button").addEventListener("click", exportData);
document.querySelector("#export-excel-button").addEventListener("click", exportExcel);
document.querySelector("#import-button").addEventListener("click", () => document.querySelector("#import-file").click());
document.querySelector("#import-file").addEventListener("change", (event) => {
  const [file] = event.target.files || [];
  if (file) importData(file);
  event.target.value = "";
});

if (!storageReadFailed) state = withRiderLevel(state);

if (!storageReadFailed && state.skillAssessmentApplied !== true) {
  saveState(applySuppliedSkillAssessment(state));
}

if (!storageReadFailed && state.competitionCalendar2026Applied === true) {
  saveState(movePreviousCalendarImport(state));
}

if (storageNotice) {
  setNotice(storageNotice, true);
} else if (state.demoMode) {
  setNotice("Starter examples are shown. Edit or remove them; your own changes are saved in this browser.", false);
}
renderPage(window.location.hash.slice(1) || "overview");
