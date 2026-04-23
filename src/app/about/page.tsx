import Link from "next/link";
import { practitioners, clinics } from "@/data/seed";
import { Avatar } from "@/components/Avatar";
import { Verified } from "@/components/Avatar";
import { Icon } from "@/components/Icons";

export default function AboutPage() {
  const committee = practitioners.slice(0, 5);

  return (
    <div className="page-fade">
      <section className="container" style={{ paddingTop: 56, paddingBottom: 24 }}>
        <span className="eyebrow">About APAS</span>
        <h1 style={{ marginTop: 10, maxWidth: "18ch" }}>Who we are.</h1>
        <p className="lead" style={{ maxWidth: "60ch", fontSize: 18 }}>
          The Ayurvedic Practitioners Association Singapore (APAS) is the national professional body for Ayurveda practitioners and clinics — founded in 2006 and self-regulating since 2018 under a published framework.
        </p>
      </section>

      <section className="container" style={{ paddingBottom: 32 }}>
        <div className="dash-grid">
          <div className="stat-card">
            <div className="label">Founded</div>
            <div className="val">2006</div>
            <div className="sub">Registered Society · UEN T06SS0142K</div>
          </div>
          <div className="stat-card">
            <div className="label">Registered practitioners</div>
            <div className="val">{practitioners.length}</div>
            <div className="sub">Across {clinics.length} affiliated clinics</div>
          </div>
          <div className="stat-card">
            <div className="label">Framework</div>
            <div className="val" style={{ fontSize: 32 }}>v2.0</div>
            <div className="sub">Self-regulatory framework · Dec 2025</div>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 32 }}>
        <div className="two-col">
          <div className="card" style={{ padding: 28 }}>
            <span className="eyebrow">Our mission</span>
            <h2 style={{ marginTop: 8, fontSize: 28 }}>To uphold the integrity and accessibility of Ayurveda in Singapore.</h2>
            <p style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.6 }}>
              We maintain a voluntary public register of qualified Ayurvedic practitioners and clinics, set standards for practice and continuing education, and provide a transparent complaints process — so patients and the wider healthcare community can engage with Ayurveda with confidence.
            </p>
            <div className="row wrap" style={{ gap: 8, marginTop: 18 }}>
              <span className="pill brand">Public register</span>
              <span className="pill brand">Standards &amp; CPE</span>
              <span className="pill brand">Complaints process</span>
              <span className="pill brand">Community &amp; events</span>
            </div>
          </div>

          <aside className="card" style={{ padding: 22, background: "var(--surface-2)" }}>
            <h4 style={{ marginBottom: 10 }}>Contact the secretariat</h4>
            <dl className="kv" style={{ gridTemplateColumns: "90px 1fr" }}>
              <dt>Email</dt><dd><a href="mailto:secretariat@apas.org.sg">secretariat@apas.org.sg</a></dd>
              <dt>Phone</dt><dd>+65 6293 4410</dd>
              <dt>Office</dt><dd>128 Race Course Road, #02-05<br/>Singapore 218578</dd>
              <dt>Hours</dt><dd>Mon–Fri · 10am–5pm</dd>
            </dl>
            <Link href="/complain" className="btn primary" style={{ width: "100%", marginTop: 14, justifyContent: "center" }}>Raise a concern</Link>
          </aside>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 40 }}>
        <div className="section-title"><h2>A short history</h2></div>
        <div className="card" style={{ padding: 0 }}>
          {[
            { y: "2006", t: "APAS founded", d: "Established as a registered society to represent Ayurvedic practitioners working in Singapore." },
            { y: "2012", t: "First public register", d: "Voluntary register of qualified practitioners launched, alongside a basic code of conduct." },
            { y: "2018", t: "Self-regulation framework v1.0", d: "Adopted a formal framework covering scope, qualifications, conduct, CPE and complaints." },
            { y: "2022", t: "Clinic standards introduced", d: "Published operating standards for hygiene, record-keeping and consent in affiliated clinics." },
            { y: "2025", t: "Framework v2.0 consultation", d: "Public consultation and member review of the revised self-regulatory framework." },
            { y: "2026", t: "Digital register & portal", d: "Launched this public register, online application flow and member portal." },
          ].map((e, i, arr) => (
            <div key={i} className="row" style={{ padding: "18px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--rule)" : "none", gap: 20 }}>
              <div style={{ minWidth: 72, fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600, color: "var(--brand-ink)" }}>{e.y}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{e.t}</div>
                <div style={{ color: "var(--ink-2)", fontSize: 14.5 }}>{e.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 60 }}>
        <div className="section-title">
          <h2>Management committee · 2026</h2>
          <Link href="/register" style={{ fontSize: 13 }}>See full register →</Link>
        </div>
        <div className="results-grid">
          {committee.map(p => (
            <Link key={p.id} href={`/practitioner/${p.id}`} className="p-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <div className="top">
                <Avatar name={p.name} />
                <div style={{ flex: 1 }}>
                  <div className="row between" style={{ alignItems: "flex-start" }}>
                    <h3>{p.name}</h3>
                    <Verified small />
                  </div>
                  <div className="reg">{p.id}</div>
                  {p.role && <div style={{ fontSize: 13, color: "var(--brand)", marginTop: 6, fontWeight: 500 }}>{p.role}</div>}
                </div>
              </div>
              <div className="meta-row">
                <div>Member since {p.since}</div>
                <Icon.arrow s={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
