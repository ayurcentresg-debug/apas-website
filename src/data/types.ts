export type Clinic = {
  id: string;
  name: string;
  area: string;
  street: string;
  postal: string;
  phone: string;
  since: number;
  practitioners: number;
  services: string[];
  hours: string;
};

export type PractitionerStatus = "Active" | "Renewal pending" | "Provisional" | "Lapsed";

export type Practitioner = {
  id: string;
  name: string;
  role: string | null;
  since: number;
  clinicId: string;
  specialties: string[];
  languages: string[];
  qualification: string;
  cpeHours: number;
  cpeTarget: number;
  status: PractitionerStatus;
  acceptsReferrals: boolean;
  verified: boolean;
  gender: "M" | "F";
};

export type Announcement = {
  date: string;
  title: string;
  tag: "Framework" | "CPE" | "Clinical" | "Governance" | "Standards";
};

export type APASEvent = {
  date: string;
  title: string;
  location: string;
  status: "upcoming" | "past";
  cpe: number;
};
