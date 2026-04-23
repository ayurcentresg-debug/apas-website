import Link from "next/link";

const SECTIONS = [
  {
    id: "scope",
    title: "Scope of Practice",
    body: (
      <>
        <p>APAS members practice Ayurveda as a complementary health discipline within Singapore's regulatory context. Scope is defined inclusively — what members may do — and exclusively — what they may not.</p>
        <h3>Within scope</h3>
        <ul>
          <li>Consultation, assessment (<em>prakriti/vikriti</em>), and dietary guidance</li>
          <li>Herbal formulations prepared in licensed dispensaries</li>
          <li>External therapies: <em>abhyanga</em>, <em>shirodhara</em>, <em>basti</em>, <em>nasya</em>, when delivered in APAS-registered clinics</li>
          <li><em>Panchakarma</em>, with documented patient consent and post-care</li>
        </ul>
        <h3>Out of scope</h3>
        <ul>
          <li>Surgical procedures and invasive diagnostics</li>
          <li>Prescription of controlled substances or Western pharmaceuticals</li>
          <li>Treatment of acute emergencies — practitioners must refer</li>
        </ul>
      </>
    ),
  },
  {
    id: "qual",
    title: "Qualification & Registration",
    body: (
      <>
        <p>A BAMS qualification or equivalent is the primary pathway. A Heritage pathway exists for experienced practitioners without formal academic credentials.</p>
        <div className="callout"><strong>Heritage pathway:</strong> 10+ years of documented practice, two APAS member references, and a portfolio review.</div>
      </>
    ),
  },
  {
    id: "conduct",
    title: "Code of Conduct",
    body: (
      <>
        <p>Members uphold honesty, competence, patient safety and fair dealing. Full text is available to members in the portal.</p>
      </>
    ),
  },
  {
    id: "cpe",
    title: "Continuing Professional Education",
    body: (
      <>
        <p>24 CPE hours per calendar year, logged in the member portal. Hours accrue from APAS-accredited events, peer case review, and self-study (capped at 8 hours/year).</p>
      </>
    ),
  },
  {
    id: "clinics",
    title: "Clinic Standards",
    body: (
      <>
        <p>Hygiene, record-keeping, staffing, and consent. Effective 1 May 2026 — inspection cycle every 24 months.</p>
        <p>The full clinic standards pack is attached to every clinic registration. <Link href="/apply-clinic">Register a clinic →</Link></p>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Complaints Process",
    body: (
      <>
        <p>Public concerns are received via the complaint form, acknowledged within 5 working days, and reviewed by the Disciplinary Committee. <Link href="/complain">Raise a concern →</Link></p>
      </>
    ),
  },
];

export const metadata = { title: "Self-Regulatory Framework" };

export default function FrameworkPage() {
  return (
    <div className="container page-fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
      <div style={{ marginBottom: 24 }}>
        <span className="eyebrow">Governance · v2.0 (Dec 2025)</span>
        <h1 style={{ marginTop: 6 }}>APAS Self-Regulatory Framework</h1>
        <p className="lead" style={{ maxWidth: "65ch", fontSize: 16 }}>
          The framework under which APAS operates as a self-regulating professional body for Ayurvedic practitioners in Singapore.
        </p>
      </div>
      <div className="doc-layout">
        <aside className="toc">
          <div className="eyebrow" style={{ marginBottom: 10 }}>Contents</div>
          <ol>
            {SECTIONS.map(s => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}
          </ol>
          <button className="btn sm" style={{ marginTop: 18, width: "100%" }}>Download PDF</button>
        </aside>
        <article className="doc-body">
          {SECTIONS.map(s => (
            <section key={s.id} id={s.id}>
              <h2>{s.title}</h2>
              {s.body}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
