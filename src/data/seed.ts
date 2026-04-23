import type { Clinic, Practitioner, Announcement, APASEvent } from "./types";

export const SPECIALTIES = [
  "Panchakarma", "Women's Health", "Musculoskeletal", "Skin (Kushta)",
  "Digestive (Agni/Grahani)", "Mental Wellness", "Paediatrics (Kaumarabhritya)",
  "Geriatrics (Jara)", "Respiratory", "Metabolic (Prameha)",
] as const;

export const AREAS = [
  "Little India", "Serangoon", "Tampines", "Jurong East",
  "Bukit Timah", "Novena", "Toa Payoh", "Bedok", "Bishan", "Clementi",
] as const;

const LANGS_POOL: string[][] = [
  ["English", "Tamil", "Malayalam"],
  ["English", "Hindi"],
  ["English", "Tamil"],
  ["English", "Hindi", "Gujarati"],
  ["English", "Malayalam"],
  ["English", "Tamil", "Hindi"],
];

const QUAL = [
  "BAMS, Kerala University of Health Sciences",
  "BAMS, Rajiv Gandhi University of Health Sciences",
  "MD (Ayu) Kayachikitsa, Gujarat Ayurved University",
  "BAMS, Gujarat Ayurved University",
  "BAMS, MUHS Nashik",
  "MD (Ayu) Panchakarma, Jamnagar",
];

const firstNames = ["Bindu Ancy", "Karthikeyan", "Nirubha", "Lakshmi", "Joshi",
  "Anjali", "Ravi", "Suresh", "Meera", "Priya", "Gopal", "Deepa",
  "Arun", "Vishal", "Kavita", "Srinivas", "Radhika", "Harish", "Jyoti", "Manoj",
  "Sanjay", "Aparna", "Neelam", "Rahul", "Sita"];
const lastNames = ["Joshi", "Karthikeyan", "Nair", "Menon", "Pillai", "Kumar",
  "Sharma", "Iyer", "Nambiar", "Raj", "Krishnan", "Reddy", "Bhatt",
  "Warrier", "Rao", "Varma", "Kurup", "Patel", "Desai"];

function pick<T>(arr: readonly T[], i: number): T { return arr[i % arr.length]; }
function pickN<T>(arr: readonly T[], n: number, seed: number): T[] {
  const out: T[] = [];
  const used = new Set<number>();
  for (let i = 0; i < n; i++) {
    let idx = (seed + i * 7) % arr.length;
    while (used.has(idx)) idx = (idx + 1) % arr.length;
    used.add(idx);
    out.push(arr[idx]);
  }
  return out;
}

export const clinics: Clinic[] = [
  { id: "c01", name: "Ayurvaidya Kendram", area: "Little India", street: "128 Race Course Road, #02-05", postal: "218578", phone: "+65 6293 4410", since: 2012, practitioners: 6, services: ["Consultations","Panchakarma","Therapeutic massage","Herbal dispensary"], hours: "Mon–Sat · 9:30am–7pm" },
  { id: "c02", name: "Soma Ayurveda Wellness", area: "Bukit Timah", street: "14 Cluny Court, #B1-22", postal: "259569", phone: "+65 6462 8811", since: 2018, practitioners: 4, services: ["Consultations","Shirodhara","Yoga therapy"], hours: "Tue–Sun · 10am–8pm" },
  { id: "c03", name: "Dhanvantari Centre", area: "Serangoon", street: "75 Upper Serangoon Rd, #03-11", postal: "347592", phone: "+65 6289 7766", since: 2009, practitioners: 8, services: ["Consultations","Panchakarma","Marma","Paediatric care"], hours: "Daily · 9am–9pm" },
  { id: "c04", name: "Kerala Vaidyashala SG", area: "Tampines", street: "2 Tampines Central 5, #04-18", postal: "529509", phone: "+65 6785 2210", since: 2015, practitioners: 5, services: ["Consultations","Abhyanga","Panchakarma","Post-partum care"], hours: "Mon–Sat · 10am–7pm" },
  { id: "c05", name: "Ojas Ayurvedic Clinic", area: "Novena", street: "10 Sinaran Drive, #09-33 Square 2", postal: "307506", phone: "+65 6258 3030", since: 2021, practitioners: 3, services: ["Consultations","Nasya","Nutritional counselling"], hours: "Mon–Fri · 9am–6pm" },
  { id: "c06", name: "Prakriti Ayurveda", area: "Toa Payoh", street: "Blk 190 Lorong 6, #01-566", postal: "310190", phone: "+65 6354 1212", since: 2014, practitioners: 4, services: ["Consultations","Women's health","Fertility support"], hours: "Mon–Sat · 10am–8pm" },
  { id: "c07", name: "Sushruta Ayurveda", area: "Jurong East", street: "60 Jurong East St 21, #03-14 JEM", postal: "609602", phone: "+65 6465 9944", since: 2017, practitioners: 5, services: ["Consultations","Musculoskeletal","Panchakarma"], hours: "Tue–Sun · 10am–8pm" },
  { id: "c08", name: "Charaka Clinic", area: "Bedok", street: "311 New Upper Changi Rd, #02-03", postal: "467360", phone: "+65 6441 5050", since: 2019, practitioners: 3, services: ["Consultations","Metabolic","Diabetes support"], hours: "Mon–Sat · 9am–7pm" },
];

const seedPractitioners: { name: string; role: string; since: number; clinic: string }[] = [
  { name: "Dr Bindu Ancy Joshi", role: "President · APAS", since: 2006, clinic: "c01" },
  { name: "Dr P. Karthikeyan",   role: "Secretary · APAS", since: 2010, clinic: "c03" },
  { name: "Dr J. Nirubha",       role: "Treasurer · APAS", since: 2013, clinic: "c03" },
  { name: "Dr Lakshmi J Nair",   role: "Vice President · APAS", since: 2008, clinic: "c04" },
  { name: "Dr E. J. Joshi",      role: "Joint Secretary · APAS", since: 2011, clinic: "c01" },
];

export const practitioners: Practitioner[] = (() => {
  const out: Practitioner[] = [];
  seedPractitioners.forEach((s, i) => {
    out.push({
      id: `APAS-${String(100 + i).padStart(4, "0")}`,
      name: s.name,
      role: s.role,
      since: s.since,
      clinicId: s.clinic,
      specialties: pickN(SPECIALTIES, 2, i + 3),
      languages: pick(LANGS_POOL, i + 1),
      qualification: pick(QUAL, i),
      cpeHours: 18 + (i * 3) % 10,
      cpeTarget: 24,
      status: "Active",
      acceptsReferrals: true,
      verified: true,
      gender: i % 2 === 0 ? "F" : "M",
    });
  });
  let idx = seedPractitioners.length;
  for (let i = 0; i < 27; i++, idx++) {
    const fn = pick(firstNames, i + 2);
    const ln = pick(lastNames, i + 5);
    const gender: "M" | "F" = i % 2 === 0 ? "M" : "F";
    const clinicId = clinics[i % clinics.length].id;
    out.push({
      id: `APAS-${String(100 + idx).padStart(4, "0")}`,
      name: `Dr ${fn} ${ln}`,
      role: null,
      since: 2012 + (i % 12),
      clinicId,
      specialties: pickN(SPECIALTIES, 2, i + 11),
      languages: pick(LANGS_POOL, i),
      qualification: pick(QUAL, i + 2),
      cpeHours: (i * 7) % 30,
      cpeTarget: 24,
      status: i === 9 ? "Renewal pending" : (i === 19 ? "Provisional" : "Active"),
      acceptsReferrals: i % 3 !== 0,
      verified: true,
      gender,
    });
  }
  return out;
})();

export const announcements: Announcement[] = [
  { date: "2026-04-15", title: "Self-Regulation Framework v2.1 — public consultation opens", tag: "Framework" },
  { date: "2026-04-08", title: "CPE cycle 2026–2027 opens for logging", tag: "CPE" },
  { date: "2026-03-28", title: "Guidance note: ventilation and steam-therapy safety", tag: "Clinical" },
  { date: "2026-03-12", title: "Annual General Meeting — notice and agenda", tag: "Governance" },
  { date: "2026-02-20", title: "New clinic standards: hygiene & record-keeping (effective 1 May 2026)", tag: "Standards" },
];

export const events: APASEvent[] = [
  { date: "2026-05-18", title: "Ayurveda for People & Planet 2026", location: "Singapore Indian Fine Arts Society", status: "upcoming", cpe: 4 },
  { date: "2026-06-22", title: "Panchakarma Masterclass — Dr K. Menon (Kottakkal)", location: "Novena Medical Centre", status: "upcoming", cpe: 6 },
  { date: "2026-07-12", title: "AGM 2026 + Committee Elections", location: "Ayurvaidya Kendram, Race Course Rd", status: "upcoming", cpe: 0 },
  { date: "2025-10-25", title: "Ayurveda Day 2025 — Community Health Camp", location: "Little India Arcade", status: "past", cpe: 3 },
  { date: "2025-08-14", title: "Women's Health in Ayurveda — Symposium", location: "NUS School of Medicine", status: "past", cpe: 5 },
  { date: "2025-05-30", title: "Marma Workshop — hands-on clinical day", location: "Dhanvantari Centre", status: "past", cpe: 6 },
];

export function clinicById(id: string): Clinic | undefined {
  return clinics.find(c => c.id === id);
}

export function practitionerById(id: string): Practitioner | undefined {
  return practitioners.find(p => p.id === id);
}

export function initials(name: string): string {
  return name.replace(/^Dr\s+/i, "").split(/\s+/).slice(0, 2).map(s => s[0]).join("").toUpperCase();
}
