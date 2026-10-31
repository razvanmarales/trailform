const BIKE_TYPES = [
  { value: "XC", label: "Cross-country (XC)", description: "Short-travel full suspension, light and efficient for racing.", color: "#d5ec89", seat: 94, head: 99, front: 271, suspension: true },
  { value: "Hardtail", label: "Hardtail", description: "Front suspension with a simple, rigid rear triangle.", color: "#9fcbd5", seat: 99, head: 102, front: 273 },
  { value: "Downcountry", label: "Downcountry", description: "Efficient climbing with a little more trail capability.", color: "#b4d6a2", seat: 97, head: 104, front: 279, suspension: true },
  { value: "Trail", label: "Trail", description: "An all-rounder for climbs, corners, and flowing descents.", color: "#d5ec89", seat: 103, head: 108, front: 284, suspension: true },
  { value: "Enduro", label: "Enduro", description: "Longer, slacker geometry for technical descending.", color: "#edb586", seat: 111, head: 111, front: 293, suspension: true },
  { value: "Downhill", label: "Downhill", description: "A low, long frame and dual-crown fork for gravity riding.", color: "#e8a69a", seat: 119, head: 108, front: 301, suspension: true, dualCrown: true },
  { value: "E-MTB", label: "Electric mountain bike (E-MTB)", description: "A mountain bike with pedal assistance and an integrated battery.", color: "#9ad6bf", seat: 107, head: 109, front: 286, suspension: true, electric: true },
  { value: "Dirt jump", label: "Dirt jump", description: "A compact frame, low saddle, and smaller wheels.", color: "#d0b5e7", seat: 131, head: 119, front: 269, radius: 38 },
  { value: "Fat bike", label: "Fat bike", description: "Wide tires with a generous contact patch.", color: "#a8c7eb", seat: 99, head: 99, front: 279, tire: 15 },
  { value: "Gravel", label: "Gravel", description: "Drop bars and a versatile frame for mixed surfaces.", color: "#dec59a", seat: 92, head: 97, front: 274, dropBars: true, tire: 6 },
  { value: "Road", label: "Road", description: "A light frame, drop bars, and narrow tires for paved roads.", color: "#b6c8e3", seat: 88, head: 94, front: 273, dropBars: true, tire: 4 },
  { value: "Other", label: "Other / custom", description: "A generic illustration for your own bike setup.", color: "#bec8b5", seat: 101, head: 105, front: 280 }
];

function getBikeType(value) {
  const key = String(value ?? "").trim().toLowerCase();
  const aliases = { "cross-country": "xc", "cross country": "xc", dh: "downhill", "electric mtb": "e-mtb", "e-bike": "e-mtb" };
  return BIKE_TYPES.find((type) => type.value.toLowerCase() === (aliases[key] || key));
}

function renderBikeIllustration(value) {
  const selected = getBikeType(value);
  const type = selected || BIKE_TYPES.find((item) => item.value === "Other");
  const radius = type.radius || 48;
  const tire = type.tire || 9;
  const rear = 80;
  const axle = 177;
  const crank = 157;
  const seatX = 137;
  const headX = 236;
  const ground = axle + radius + tire / 2;
  const caption = selected ? type.description : value ? "Generic illustration; your existing bike type is preserved." : "Choose a bike type to see its illustration.";
  return `
    <figure class="bike-illustration">
      <svg viewBox="0 0 380 245" role="img" aria-label="${type.label} bike illustration">
        <path d="M25 ${ground} H355" stroke="#425344" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="190" cy="${ground + 4}" rx="146" ry="5" fill="#0b1510" opacity=".45"/>
        ${[rear, type.front].map((x) => `
          <circle cx="${x}" cy="${axle}" r="${radius}" fill="#15221b" stroke="#a5b29d" stroke-width="${tire}"/>
          <circle cx="${x}" cy="${axle}" r="${radius - tire / 2 - 3}" fill="none" stroke="#526c58" stroke-width="1.5"/>
          <path d="M${x - radius + 7} ${axle}h${radius * 2 - 14} M${x} ${axle - radius + 7}v${radius * 2 - 14}" stroke="#425747" stroke-width="1"/>
          <circle cx="${x}" cy="${axle}" r="5" fill="#c8d4be"/>
        `).join("")}
        <g fill="none" stroke="${type.color}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">
          <path d="M${rear} ${axle} L${seatX} ${type.seat + 14} L${crank} ${axle} Z M${seatX} ${type.seat + 14} L${headX} ${type.head} L${crank} ${axle}"/>
          <path d="M${headX} ${type.head - 4} L${type.front} ${axle}" stroke="#b4c1ad" stroke-width="6"/>
        </g>
        ${type.suspension ? `<path d="M${seatX + 9} ${type.seat + 19} L194 ${type.head + 20}" stroke="#122018" stroke-width="9" stroke-linecap="round"/><path d="M${seatX + 10} ${type.seat + 19} L185 ${type.head + 20}" stroke="#dce7d0" stroke-width="4" stroke-dasharray="3 4"/>` : ""}
        ${type.dualCrown ? `<path d="M229 92 L256 92 M234 111 L264 111 M245 92 L293 166" fill="none" stroke="#d2d8ca" stroke-width="4"/>` : ""}
        ${type.electric ? `<path d="M173 159 L224 121" stroke="#142a20" stroke-width="15" stroke-linecap="round"/><path d="M177 157 L220 125" stroke="${type.color}" stroke-width="9" stroke-linecap="round"/><ellipse cx="${crank}" cy="${axle}" rx="15" ry="11" fill="#91b6a2"/>` : ""}
        <path d="M${seatX} ${type.seat + 14} L131 ${type.seat - 1} M117 ${type.seat - 4} H145" fill="none" stroke="#cad4c0" stroke-width="5" stroke-linecap="round"/>
        ${type.dropBars
          ? `<path d="M${headX} ${type.head} L232 ${type.head - 18} H252 Q265 ${type.head - 18} 265 ${type.head - 7} Q265 ${type.head + 4} 255 ${type.head + 4}" fill="none" stroke="#cad4c0" stroke-width="4" stroke-linecap="round"/>`
          : `<path d="M${headX} ${type.head} L229 ${type.head - 23} H251" fill="none" stroke="#cad4c0" stroke-width="5" stroke-linecap="round"/>`}
        <circle cx="${crank}" cy="${axle}" r="10" fill="#15231b" stroke="#c8d4be" stroke-width="3"/>
        <path d="M${crank} ${axle} l12 14 h10 M${rear} ${axle + 4} L${crank} ${axle + 9}" fill="none" stroke="#9ead97" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <figcaption>${caption} <span>Type illustration, not your exact model.</span></figcaption>
    </figure>
  `;
}
