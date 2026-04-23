import { AudienceLanding } from "@/components/AudienceLanding";

export default function ForPractitioners() {
  return (
    <AudienceLanding
      eyebrow="For practitioners"
      h1="Register, renew, and practice with confidence."
      lead="Join Singapore's community of Ayurvedic practitioners under a clear self-regulatory framework."
      tiles={[
        { h: "Apply for membership", p: "BAMS and Heritage pathways. 4–6 week review.", to: "/apply", cta: "Start application" },
        { h: "Renew annually", p: "Track CPE and pay dues in one place.", to: "/portal", cta: "Member portal" },
        { h: "Continuing education", p: "Upcoming events, webinars, and case reviews.", to: "/announcements", cta: "See events" },
      ]}
    />
  );
}
