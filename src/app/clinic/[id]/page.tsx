import Link from "next/link";
import { notFound } from "next/navigation";
import { clinics, clinicById, practitioners } from "@/data/seed";
import { Avatar, Verified } from "@/components/Avatar";
import { Icon } from "@/components/Icons";

export function generateStaticParams() {
  return clinics.map(c => ({ id: c.id }));
}

export default async function ClinicProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = clinicById(id);
  if (!c) notFound();
  const clinicPractitioners = practitioners.filter(p => p.clinicId === c.id);

  return (
    <div className="container page-fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
      <Link href="/register?type=clinic" style={{ fontSize: 13 }}>← Back to clinics</Link>

      <div className="profile-hero" style={{ marginTop: 16 }}>
        <div className="avatar-lg" style={{ background: "var(--surface-2)", color: "var(--brand-ink)", fontFamily: "var(--serif)" }}>
          {c.name[0]}
        </div>
        <div>
          <div className="row center" style={{ gap: 12 }}>
            <h1 style={{ fontSize: 34 }}>{c.name}</h1>
            <Verified />
          </div>
          <div className="reg-line">{c.id.toUpperCase()} · {c.area} · since {c.since}</div>
          <div style={{ marginTop: 10, color: "var(--ink-2)", fontSize: 15 }}>{c.street}, Singapore {c.postal}</div>
          <div className="row wrap" style={{ gap: 6, marginTop: 14 }}>
            {c.services.map(s => <span key={s} className="pill brand">{s}</span>)}
          </div>
        </div>
        <div className="profile-actions">
          <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="btn primary">
            <Icon.pin s={14} /> Call clinic
          </a>
          <a href={`mailto:secretariat@apas.org.sg?subject=Enquiry about ${encodeURIComponent(c.name)}`} className="btn">Email enquiry</a>
        </div>
      </div>

      <div className="profile-grid">
        <div>
          <div className="section-title" style={{ marginTop: 24 }}><h2>Clinic details</h2></div>
          <div className="card" style={{ padding: 24 }}>
            <dl className="kv">
              <dt>Address</dt><dd>{c.street}<br/>Singapore {c.postal}</dd>
              <dt>Area</dt><dd>{c.area}</dd>
              <dt>Phone</dt><dd><a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a></dd>
              <dt>Hours</dt><dd>{c.hours}</dd>
              <dt>Operating since</dt><dd>{c.since}</dd>
              <dt>Services</dt><dd>{c.services.join(" · ")}</dd>
            </dl>
          </div>

          <div className="section-title" style={{ marginTop: 28 }}>
            <h2>Practitioners ({clinicPractitioners.length})</h2>
          </div>
          <div className="results-grid">
            {clinicPractitioners.map(p => (
              <Link key={p.id} href={`/practitioner/${p.id}`} className="p-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div className="top">
                  <Avatar name={p.name} />
                  <div style={{ flex: 1 }}>
                    <div className="row between" style={{ alignItems: "flex-start" }}>
                      <h3>{p.name}</h3>
                      {p.verified && <Verified small />}
                    </div>
                    <div className="reg">{p.id}</div>
                    {p.role && <div style={{ fontSize: 12, color: "var(--brand-ink)", marginTop: 4, fontWeight: 500 }}>{p.role}</div>}
                    <div className="chips">
                      {p.specialties.slice(0, 2).map(s => <span key={s} className="pill">{s}</span>)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside>
          <div className="section-title" style={{ marginTop: 24 }}><h2 style={{ fontSize: 20 }}>APAS registration</h2></div>
          <div className="card soft" style={{ padding: 18 }}>
            <p style={{ fontSize: 14, color: "var(--ink-2)" }}>
              {c.name} is an APAS-registered clinic operating under framework v2.0 §5 (Clinic Standards).
            </p>
            <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 10, fontFamily: "var(--mono)" }}>
              Record updated: 22 Apr 2026
            </p>
          </div>

          <div className="section-title" style={{ marginTop: 24 }}><h2 style={{ fontSize: 20 }}>Raise a concern</h2></div>
          <div className="card" style={{ padding: 18 }}>
            <p style={{ fontSize: 14, color: "var(--ink-2)" }}>
              Any concern about this clinic is reviewed confidentially within 5 working days.
            </p>
            <Link href="/complain" className="btn primary" style={{ width: "100%", marginTop: 14, justifyContent: "center" }}>
              Start the form
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
