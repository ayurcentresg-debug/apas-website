import Link from "next/link";
import { notFound } from "next/navigation";
import { practitioners, practitionerById, clinicById } from "@/data/seed";
import { AvatarLg, Verified } from "@/components/Avatar";
import { Icon } from "@/components/Icons";

export function generateStaticParams() {
  return practitioners.map(p => ({ id: p.id }));
}

export default async function PractitionerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = practitionerById(id);
  if (!p) notFound();
  const clinic = clinicById(p.clinicId);
  const pct = Math.min(100, (p.cpeHours / p.cpeTarget) * 100);

  return (
    <div className="container page-fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
      <Link href="/register" style={{ fontSize: 13 }}>← Back to register</Link>

      <div className="profile-hero" style={{ marginTop: 16 }}>
        <AvatarLg name={p.name} />
        <div>
          <div className="row center" style={{ gap: 12, flexWrap: "wrap" }}>
            <h1 style={{ fontSize: 34 }}>{p.name}</h1>
            {p.verified && <Verified />}
          </div>
          <div className="reg-line">{p.id} · {p.status} · member since {p.since}</div>
          {p.role && <div style={{ marginTop: 10, color: "var(--brand-ink)", fontWeight: 600 }}>{p.role}</div>}
          <div className="row wrap" style={{ gap: 6, marginTop: 14 }}>
            {p.specialties.map(s => <span key={s} className="pill brand">{s}</span>)}
          </div>
        </div>
        <div className="profile-actions">
          {p.acceptsReferrals && <span className="pill good">Accepting referrals</span>}
          <Link href={clinic ? `/clinic/${clinic.id}` : "/register"} className="btn primary">Visit clinic <Icon.arrow s={14} /></Link>
          <Link href="/complain" className="btn">Raise a concern</Link>
        </div>
      </div>

      <div className="profile-grid">
        <div>
          <div className="section-title" style={{ marginTop: 24 }}><h2>Professional details</h2></div>
          <div className="card" style={{ padding: 24 }}>
            <dl className="kv">
              <dt>Qualification</dt><dd>{p.qualification}</dd>
              <dt>Languages</dt><dd>{p.languages.join(" · ")}</dd>
              <dt>Clinic</dt><dd>{clinic?.name ?? "—"}</dd>
              <dt>Area</dt><dd>{clinic?.area ?? "—"}</dd>
              <dt>Referrals</dt><dd>{p.acceptsReferrals ? "Accepting referrals" : "Not currently accepting referrals"}</dd>
            </dl>
          </div>

          <div className="section-title" style={{ marginTop: 28 }}><h2>CPE standing</h2></div>
          <div className="card" style={{ padding: 24 }}>
            <div className="row between center" style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 14, color: "var(--ink-3)" }}>This cycle (2026)</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 14 }}>{p.cpeHours} / {p.cpeTarget} hours</div>
            </div>
            <div className="progress"><div className="bar" style={{ width: pct + "%" }} /></div>
            <p style={{ marginTop: 14, color: "var(--ink-3)", fontSize: 13 }}>
              CPE target is 24 hours per calendar year under framework v2.0 §4.5.
            </p>
          </div>
        </div>

        <aside>
          <div className="section-title" style={{ marginTop: 24 }}><h2 style={{ fontSize: 20 }}>Verification</h2></div>
          <div className="card soft" style={{ padding: 18 }}>
            <p style={{ fontSize: 14, color: "var(--ink-2)" }}>
              This practitioner is listed on the APAS public register under UEN T06SS0142K, subject to framework v2.0.
            </p>
            <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 10, fontFamily: "var(--mono)" }}>
              Record updated: 22 Apr 2026
            </p>
          </div>

          <div className="section-title" style={{ marginTop: 24 }}><h2 style={{ fontSize: 20 }}>Have a concern?</h2></div>
          <div className="card" style={{ padding: 18 }}>
            <p style={{ fontSize: 14, color: "var(--ink-2)" }}>
              Concerns about this practitioner are handled confidentially by the APAS Disciplinary Committee.
            </p>
            <Link href="/complain" className="btn primary" style={{ width: "100%", marginTop: 14, justifyContent: "center" }}>
              Raise a concern
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
