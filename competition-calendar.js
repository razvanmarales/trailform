// The rider's potential competitions. 2026 dates come from their race sheet (published Google Sheet, gid 437321762).
// Each event is repeated for 2027 under the same name. 2027 dates are estimated as the same weekday 52 weeks later,
// unless a 2027 date has been announced (listed in COMPETITION_2027_CONFIRMED with its source, checked October 2026).
const COMPETITION_SERIES = [
  { id: "garboavele-race", name: "Garboavele Race", location: "Galati", discipline: "MTB", date2026: "2026-03-28" },
  { id: "ziua-b", name: "Ziua B", location: "Cernica", discipline: "MTB", date2026: "2026-04-04" },
  { id: "triada-mtb-avrig", name: "Triada MTB Avrig", location: "Avrig", discipline: "MTB", date2026: "2026-04-18" },
  { id: "aston-bike", name: "Aston Bike", location: "Aiton", discipline: "MTB", date2026: "2026-04-25" },
  { id: "maratonul-vinului", name: "Maratonul Vinului", location: "Urlati", discipline: "MTB", date2026: "2026-04-25" },
  { id: "poli-bike-challenge", name: "Poli Bike Challenge", location: "Timisoara", discipline: "Road", date2026: "2026-04-26" },
  { id: "thassos", name: "Thassos", location: "Thasos", discipline: "MTB & Road", date2026: "2026-05-02" },
  { id: "medias-bike-marathon", name: "Medias Bike Marathon", location: "Medias", discipline: "MTB", date2026: "2026-05-09" },
  { id: "maratonul-dunari", name: "Maratonul Dunari", location: "Giurgiu", discipline: "MTB", date2026: "2026-05-16" },
  { id: "hospice-brasov", name: "Hospice Brasov", location: "Brasov", discipline: "MTB", date2026: "2026-05-16" },
  { id: "prima-evadare", name: "Prima Evadare", location: "Bucuresti", discipline: "MTB", date2026: "2026-05-17" },
  { id: "mouflon-tracks", name: "Mouflon tracks", location: "Stronie Slaskie", discipline: "MTB", date2026: "2026-05-22" },
  { id: "the-wall-pucioasa", name: "The Wall Pucioasa", location: "Pucioasa", discipline: "Road", date2026: "2026-05-23" },
  { id: "brm-300", name: "BRM 300", location: "Brasov", discipline: "Road", date2026: "2026-05-30" },
  { id: "triada-mtb-cheile-gradistei", name: "Triada MTB Cheile Gradistei", location: "Paltinis", discipline: "MTB", date2026: "2026-05-30" },
  { id: "macin", name: "Macin", location: "Macin", discipline: "MTB", date2026: "2026-06-05" },
  { id: "paltinis-challenge", name: "Paltinis Challenge", location: "Paltinis", discipline: "Road", date2026: "2026-06-05" },
  { id: "porumbacu-mtb", name: "Porumbacu MTB", location: "Porumbacu", discipline: "MTB", date2026: "2026-06-06" },
  { id: "pedala-in-banie", name: "Pedala in banie", location: "Craiova", discipline: "MTB", date2026: "2026-06-13" },
  { id: "topoloveni-summer-tour", name: "Topoloveni Summer Tour", location: "Arges", discipline: "MTB", date2026: "2026-06-14" },
  { id: "vidraru-challenge", name: "Vidraru Challenge", location: "Vidraru", discipline: "MTB", date2026: "2026-06-27" },
  { id: "teleferic-challenge", name: "Teleferic Challenge", location: "Brasov", discipline: "MTB", date2026: "2026-08-01" },
  { id: "alba-carolina-bike", name: "Alba Carolina Bike", location: "Alba Iulia", discipline: "MTB", date2026: "2026-08-15" },
  { id: "endurance-25h", name: "Endurance 25h", location: "Adancata", discipline: "Road", date2026: "2026-08-22" },
  { id: "trans-bike-trails", name: "Trans Bike Trails", location: "Saschiz", discipline: "MTB", date2026: "2026-08-22" },
  { id: "mtb-academy-cup-xco", name: "MTB Academy Cup XCO", location: "Campulung Muscel", discipline: "MTB", date2026: "2026-09-19" },
  { id: "lupii-dacilor", name: "Lupii Dacilor", location: "Muscel", discipline: "MTB", date2026: "2026-09-20" },
  { id: "turnul-colinelor", name: "Turnul Colinelor", location: "Bacau", discipline: "Road", date2026: "2026-10-10" },
  { id: "haiduci-si-domnite", name: "Haiduci si domnite", location: "Moara Vlasiei", discipline: "MTB", date2026: "2026-10-17" }
];

const COMPETITION_2027_CONFIRMED = {
  "garboavele-race": { date: "2027-04-03", source: "https://www.instagram.com/p/DewH8LQI1Ad/" },
  "maratonul-vinului": { date: "2027-04-24", source: "https://maratonulvinului.ro" },
  "ziua-b": { date: "2027-05-08", source: "https://www.instagram.com/p/DetOg_hAhzG/" },
  "mouflon-tracks": { date: "2027-05-21", source: "https://odjazd.pl/wydarzenie/b0c4a52d-9e4b-4c8e-9a9e-14fc3072ce9e" },
  "medias-bike-marathon": { date: "2027-05-22", source: "https://www.biklo.ro/calendar/medias-bike-marathon-2027" },
  "triada-mtb-cheile-gradistei": { date: "2027-05-29", source: "https://www.uci.org/competition-details/2027/MTB/81086" },
  "macin": { date: "2027-06-04", source: "https://www.facebook.com/events/macin-mountain-fun-greci-4-6-iunie-2027/2012008329504262/" },
  "paltinis-challenge": { date: "2027-07-04", source: "https://paltinis.t-challenge.ro/" },
  "teleferic-challenge": { date: "2027-07-31", source: "https://roadgrandtour.ro/teleferic/" }
};

const COMPETITION_CALENDAR_YEARS = [2027, 2026];

const COMPETITION_CALENDAR = COMPETITION_SERIES.flatMap((series) => {
  const [year, month, day] = series.date2026.split("-").map(Number);
  const estimated2027 = new Date(Date.UTC(year, month - 1, day + 364)).toISOString().slice(0, 10);
  const confirmed = COMPETITION_2027_CONFIRMED[series.id];
  const base = { seriesId: series.id, name: series.name, location: series.location, discipline: series.discipline };
  return [
    { ...base, id: `${series.id}-2026`, year: 2026, date: series.date2026, dateStatus: "listed", source: "" },
    { ...base, id: `${series.id}-2027`, year: 2027, date: confirmed?.date || estimated2027, dateStatus: confirmed ? "confirmed" : "estimated", source: confirmed?.source || "" }
  ];
});
