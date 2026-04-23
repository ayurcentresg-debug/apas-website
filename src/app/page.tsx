import Link from "next/link";
import { announcements, events, practitioners, clinics } from "@/data/seed";
import { Icon } from "@/components/Icons";

export default function HomePage() {
  return (
    <>
      {/* ============ Register-first hero ============ */}
      <section className="hero">
        <div className="container">
          <span className="eyebrow kicker">The public register · Singapore</span>
          <h1>
            Verified Ayurvedic practitioners,
            <br />
            openly listed.
          </h1>
          <p className="lead">
            APAS maintains the public register of qualified Ayurvedic practitioners and clinics in Singapore, under a published self-regulatory framework. Search by name, specialty, or clinic.
          </p>

          <form action="/register" method="get" className="search-hero">
            <div className="seg"><Icon.search s={14} /> Search</div>
            <input name="q" placeholder="Practitioner name, registration number, clinic, specialty…" />
            <button type="submit" className="btn primary lg">
              Search register <Icon.arrow s={14} />
            </button>
          </form>

          <div style={{ marginTop: 20, fontSize: 13, color: "var(--ink-3)", fontFamily: "var(--mono)", letterSpacing: ".05em" }}>
            {practitioners.length} practitioners · {clinics.length} clinics · framework v2.0 · updated December 2025
          </div>
        </div>
      </section>

      {/* ============ Audience pivot ============ */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 20 }}>
        <div className="section-title">
          <h2>Choose how you'd like to engage</h2>
        </div>
        <div className="audience-grid">
          <Link href="/for-practitioners" className="audience-card">
            <div className="who">For Practitioners</div>
            <div className="what">Apply, renew, and track CPE. Access the framework and member portal.</div>
            <div className="links">
              <span>Apply</span><span>Portal</span><span>CPE</span>
            </div>
          </Link>
          <Link href="/for-clinics" className="audience-card">
            <div className="who">For Clinics</div>
            <div className="what">Premises standards, registration pathway, and operating requirements.</div>
            <div className="links">
              <span>Register a clinic</span><span>Standards</span>
            </div>
          </Link>
          <Link href="/for-public" className="audience-card">
            <div className="who">For Public</div>
            <div className="what">Verify a practitioner, find a clinic, or raise a concern.</div>
            <div className="links">
              <span>Verify</span><span>Clinics</span><span>Complaint</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ============ Announcements + events ============ */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="two-col">
          <div>
            <div className="section-title">
              <h2>Latest announcements</h2>
              <Link href="/announcements" style={{ fontSize: 13 }}>All notices →</Link>
            </div>
            <div className="card" style={{ padding: "0 22px" }}>
              <div className="announcement-list">
                {announcements.map((a, i) => (
                  <div key={i} className="announcement-row">
                    <div className="d">{a.date}</div>
                    <div><span className="pill outline">{a.tag}</span></div>
                    <div className="t">{a.title}</div>
                    <Link href="/announcements" style={{ fontSize: 13 }}>Read →</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside>
            <div className="section-title"><h2 style={{ fontSize: 22 }}>Upcoming events</h2></div>
            <div className="card" style={{ padding: 14 }}>
              {events.filter(e => e.status === "upcoming").map((e, i) => {
                const d = new Date(e.date);
                return (
                  <div key={i} className="event-row">
                    <div className="date">
                      <div className="m">{d.toLocaleString("en", { month: "short" })}</div>
                      <div className="d">{d.getDate()}</div>
                    </div>
                    <div>
                      <div className="t">{e.title}</div>
                      <div className="l">{e.location}</div>
                    </div>
                    {e.cpe > 0 && <span className="pill brand">{e.cpe} CPE</span>}
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      {/* ============ Framework CTA ============ */}
      <section className="container" style={{ paddingBottom: 60 }}>
        <div className="card soft" style={{ padding: 40, display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
          <div>
            <span className="eyebrow">Governance</span>
            <h2 style={{ marginTop: 10, fontSize: 30, maxWidth: "20ch" }}>The Self-Regulatory Framework v2.0</h2>
            <p style={{ maxWidth: "60ch", marginTop: 14, color: "var(--ink-2)", fontSize: 15.5 }}>
              The framework under which APAS operates: scope of practice, qualifications, conduct, continuing education, clinic standards, and complaints. Updated December 2025, open for consultation through 2026.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 200 }}>
            <Link href="/framework" className="btn primary lg">Read framework <Icon.arrow s={14} /></Link>
            <Link href="/framework#complaints" className="btn">Complaints process</Link>
          </div>
        </div>
      </section>
    </>
  );
}
