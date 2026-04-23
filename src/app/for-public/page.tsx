import { AudienceLanding } from "@/components/AudienceLanding";

export default function ForPublic() {
  return (
    <AudienceLanding
      eyebrow="For the public"
      h1="Verify, refer, and raise a concern."
      lead="Everything you need to know before you see an Ayurvedic practitioner."
      tiles={[
        { h: "Verify a practitioner", p: "Search the public register by name or number.", to: "/register", cta: "Search register" },
        { h: "Find a clinic near you", p: "By area, specialty, or languages spoken.", to: "/register?type=clinic", cta: "Browse clinics" },
        { h: "File a concern", p: "Confidential intake — reviewed within 5 working days.", to: "/complain", cta: "Start form" },
      ]}
    />
  );
}
