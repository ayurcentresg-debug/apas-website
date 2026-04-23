import { AudienceLanding } from "@/components/AudienceLanding";

export default function ForClinics() {
  return (
    <AudienceLanding
      eyebrow="For clinics"
      h1="Open or operate an Ayurvedic clinic in Singapore."
      lead="Standards, enquiry forms, and the registration pathway for clinics hosting APAS practitioners."
      tiles={[
        { h: "Open a clinic", p: "Premises, licensing and APAS standards.", to: "/framework#clinics", cta: "Read standards" },
        { h: "Clinic registration", p: "Dedicated 4-step intake — premises, principal, staff, standards.", to: "/apply-clinic", cta: "Start registration" },
        { h: "Operating standards", p: "Hygiene, records, staffing — effective 1 May 2026.", to: "/framework#clinics", cta: "Framework §5" },
      ]}
    />
  );
}
