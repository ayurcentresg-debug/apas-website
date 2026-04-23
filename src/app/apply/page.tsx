"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SPECIALTIES } from "@/data/seed";
import { Icon } from "@/components/Icons";

type Doc = { name: string; uploaded: string };
type Form = Record<string, string | boolean | string[] | Doc[] | undefined>;

const STEPS = [
  { id: 0, label: "Eligibility" },
  { id: 1, label: "Personal details" },
  { id: 2, label: "Qualifications" },
  { id: 3, label: "Practice details" },
  { id: 4, label: "Declarations" },
  { id: 5, label: "Review & pay" },
];

export default function ApplyFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("apas-apply-step");
    const f = localStorage.getItem("apas-apply-form");
    if (s) setStep(parseInt(s));
    if (f) setForm(JSON.parse(f));
  }, []);
  useEffect(() => { localStorage.setItem("apas-apply-step", String(step)); }, [step]);
  useEffect(() => { localStorage.setItem("apas-apply-form", JSON.stringify(form)); }, [form]);

  const up = <K extends string>(k: K, v: Form[K]) => setForm(f => ({ ...f, [k]: v }));
  const next = () => setStep(s => Math.min(5, s + 1));
  const prev = () => setStep(s => Math.max(0, s - 1));

  const submit = () => {
    setSubmitted(true);
    localStorage.removeItem("apas-apply-step");
    localStorage.removeItem("apas-apply-form");
    setTimeout(() => router.push("/portal"), 1800);
  };

  if (submitted) {
    return (
      <div className="container-sm page-fade" style={{ paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
        <div className="card" style={{ padding: 40 }}>
          <div style={{ fontSize: 48, color: "var(--good)", marginBottom: 14 }}>✓</div>
          <h1 style={{ fontSize: 28 }}>Application submitted</h1>
          <p style={{ marginTop: 12, color: "var(--ink-2)" }}>
            Reference <strong style={{ fontFamily: "var(--mono)" }}>APAS-APP-2026-0412</strong>. Redirecting to your portal…
          </p>
        </div>
      </div>
    );
  }

  const docs = (form.docs as Doc[]) ?? [];
  const specs = (form.specialties as string[]) ?? [];
  const langs = (form.languages as string[]) ?? [];

  return (
    <div className="container page-fade" style={{ paddingTop: 32, paddingBottom: 60 }}>
      <div style={{ marginBottom: 20 }}>
        <span className="eyebrow">Member application</span>
        <h1 style={{ marginTop: 6, fontSize: 36 }}>Apply for APAS membership</h1>
        <p className="lead" style={{ maxWidth: "60ch", fontSize: 16 }}>
          For Ayurvedic practitioners holding a BAMS or equivalent qualification and intending to practice in Singapore. Typical review time: 4–6 weeks.
        </p>
      </div>

      <div className="stepper">
        {STEPS.map((s, i) => (
          <div key={s.id} className={"step " + (i === step ? "current" : i < step ? "done" : "")}>
            <div className="n"><span>{i + 1}</span></div>
            <div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".1em", fontFamily: "var(--mono)" }}>Step {i + 1}</div>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="apply-layout">
        <div className="card" style={{ padding: 32 }}>
          {step === 0 && (
            <div className="form-section">
              <h3>Before you begin</h3>
              <p className="dim">Confirm you meet APAS membership requirements. Check every box that applies.</p>
              <div className="stack">
                {[
                  { k: "elig_qual", t: "I hold a BAMS (Bachelor of Ayurvedic Medicine and Surgery) or an equivalent qualification from a recognised institution." },
                  { k: "elig_work", t: "I intend to practice Ayurveda in Singapore within an APAS-registered clinic, or am in the process of opening one." },
                  { k: "elig_scope", t: "I agree to observe Singapore's medical regulations and the APAS Scope of Practice." },
                  { k: "elig_cpe", t: "I understand CPE of 24 hours per year is required to maintain registration." },
                  { k: "elig_ep", t: "I am not currently the subject of a complaint or disciplinary proceeding in any jurisdiction." },
                ].map(c => (
                  <label key={c.k} className="check" style={{ padding: 14, border: "1px solid var(--rule)", borderRadius: 6 }}>
                    <input type="checkbox" checked={!!form[c.k]} onChange={e => up(c.k, e.target.checked)} />
                    <span>{c.t}</span>
                  </label>
                ))}
              </div>
              <div className="callout" style={{ marginTop: 20 }}>
                <strong>Not a BAMS holder?</strong> We also accept experienced practitioners under the Heritage route, with a recommendation from two existing APAS members and at least 10 years' documented practice.
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="form-section">
              <h3>Personal details</h3>
              <p className="dim">As they appear on your NRIC or passport.</p>
              <div className="field-grid">
                <label className="field"><span className="label">Full legal name</span>
                  <input className="input" value={(form.fullName as string) ?? ""} onChange={e => up("fullName", e.target.value)} placeholder="Dr Priya Sharma" />
                </label>
                <label className="field"><span className="label">Preferred name</span>
                  <input className="input" value={(form.preferredName as string) ?? ""} onChange={e => up("preferredName", e.target.value)} placeholder="Priya" />
                </label>
                <label className="field"><span className="label">NRIC / FIN (last 4 + letter)</span>
                  <input className="input mono" value={(form.nric as string) ?? ""} onChange={e => up("nric", e.target.value)} placeholder="···· 123A" />
                </label>
                <label className="field"><span className="label">Date of birth</span>
                  <input className="input" type="date" value={(form.dob as string) ?? ""} onChange={e => up("dob", e.target.value)} />
                </label>
                <label className="field"><span className="label">Email</span>
                  <input className="input" type="email" value={(form.email as string) ?? ""} onChange={e => up("email", e.target.value)} placeholder="you@clinic.sg" />
                </label>
                <label className="field"><span className="label">Mobile (SG)</span>
                  <input className="input" value={(form.mobile as string) ?? ""} onChange={e => up("mobile", e.target.value)} placeholder="+65 9123 4567" />
                </label>
                <label className="field full"><span className="label">Residential address</span>
                  <input className="input" value={(form.address as string) ?? ""} onChange={e => up("address", e.target.value)} placeholder="Blk 123 Serangoon Ave 3, #05-67" />
                </label>
                <label className="field"><span className="label">Postal code</span>
                  <input className="input" value={(form.postal as string) ?? ""} onChange={e => up("postal", e.target.value)} placeholder="550123" />
                </label>
                <label className="field"><span className="label">Citizenship status</span>
                  <select className="input" value={(form.status as string) ?? ""} onChange={e => up("status", e.target.value)}>
                    <option value="">Select…</option>
                    <option>Singapore Citizen</option>
                    <option>Permanent Resident</option>
                    <option>Employment Pass</option>
                    <option>S Pass</option>
                    <option>Dependant's Pass</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h3>Qualifications &amp; training</h3>
              <p className="dim">Your primary Ayurvedic qualification, plus any postgraduate training.</p>
              <div className="field-grid">
                <label className="field"><span className="label">Primary qualification</span>
                  <select className="input" value={(form.qualification as string) ?? ""} onChange={e => up("qualification", e.target.value)}>
                    <option value="">Select…</option>
                    <option>BAMS</option>
                    <option>MD (Ayurveda)</option>
                    <option>MS (Ayurveda)</option>
                    <option>Heritage pathway</option>
                  </select>
                </label>
                <label className="field"><span className="label">Awarding institution</span>
                  <input className="input" value={(form.institution as string) ?? ""} onChange={e => up("institution", e.target.value)} placeholder="e.g. Gujarat Ayurved University" />
                </label>
                <label className="field"><span className="label">Country</span>
                  <select className="input" value={(form.country as string) ?? ""} onChange={e => up("country", e.target.value)}>
                    <option value="">Select…</option>
                    <option>India</option><option>Sri Lanka</option><option>Nepal</option><option>Other</option>
                  </select>
                </label>
                <label className="field"><span className="label">Year awarded</span>
                  <input className="input" value={(form.year as string) ?? ""} onChange={e => up("year", e.target.value)} placeholder="2015" />
                </label>
                <label className="field full"><span className="label">Registration in home jurisdiction (if any)</span>
                  <input className="input" value={(form.homeReg as string) ?? ""} onChange={e => up("homeReg", e.target.value)} placeholder="e.g. CCIM registration no." />
                </label>
              </div>

              <h4 style={{ marginTop: 28 }}>Supporting documents</h4>
              <p style={{ fontSize: 13, color: "var(--ink-3)" }}>PDF or JPG, max 10MB each. All four are required.</p>
              <div className="stack" style={{ marginTop: 14 }}>
                {["Degree certificate.pdf", "Academic transcript.pdf", "Passport-style photo.jpg", "CV or practice history.pdf"].map(name => {
                  const d = docs.find(x => x.name === name);
                  const toggle = () => {
                    const exists = docs.find(x => x.name === name);
                    up("docs", exists ? docs.filter(x => x.name !== name) : [...docs, { name, uploaded: new Date().toLocaleDateString() }]);
                  };
                  return (
                    <div key={name} className="doc-row">
                      <div className="row center" style={{ gap: 10 }}>
                        <Icon.arrow s={16} />
                        <div>
                          <div>{name}</div>
                          {d && <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Uploaded {d.uploaded}</div>}
                        </div>
                      </div>
                      {d ? <span className="ok"><Icon.check s={12} /> Uploaded</span>
                         : <button className="btn sm" onClick={toggle}>Upload</button>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <h3>Practice details</h3>
              <p className="dim">Where you'll practice and what you offer. This becomes your public register profile.</p>

              <div className="field-grid">
                <label className="field full"><span className="label">Clinic name</span>
                  <input className="input" value={(form.clinicName as string) ?? ""} onChange={e => up("clinicName", e.target.value)} placeholder="e.g. Dhanvantari Centre" />
                  <span className="hint">If your clinic isn't yet registered with APAS, we'll guide you through that separately.</span>
                </label>
                <label className="field"><span className="label">Clinic address</span>
                  <input className="input" value={(form.clinicAddr as string) ?? ""} onChange={e => up("clinicAddr", e.target.value)} placeholder="75 Upper Serangoon Rd, #03-11" />
                </label>
                <label className="field"><span className="label">Clinic postal code</span>
                  <input className="input" value={(form.clinicPostal as string) ?? ""} onChange={e => up("clinicPostal", e.target.value)} placeholder="347592" />
                </label>
                <label className="field full"><span className="label">Languages spoken (for patient care)</span>
                  <div className="row wrap" style={{ gap: 6 }}>
                    {["English", "Tamil", "Hindi", "Malayalam", "Gujarati", "Marathi", "Mandarin", "Bahasa"].map(l => {
                      const on = langs.includes(l);
                      return (
                        <button key={l} type="button"
                          className={"pill " + (on ? "brand" : "outline")}
                          style={{ cursor: "pointer", border: "1px solid var(--rule)" }}
                          onClick={() => up("languages", on ? langs.filter(x => x !== l) : [...langs, l])}>
                          {on && <Icon.check s={10} />} {l}
                        </button>
                      );
                    })}
                  </div>
                </label>
              </div>

              <h4 style={{ marginTop: 24 }}>Specialties (choose up to 3)</h4>
              <div className="row wrap" style={{ gap: 8, marginTop: 8 }}>
                {SPECIALTIES.map(s => {
                  const on = specs.includes(s);
                  return (
                    <button key={s} type="button"
                      className={"pill " + (on ? "brand" : "outline")}
                      style={{ cursor: "pointer", padding: "8px 14px", fontSize: 13 }}
                      onClick={() => up("specialties", on ? specs.filter(x => x !== s) : [...specs, s])}>
                      {on && <Icon.check s={12} />} {s}
                    </button>
                  );
                })}
              </div>

              <label className="check" style={{ marginTop: 20, padding: 14, background: "var(--surface-2)", borderRadius: 6, alignItems: "flex-start" }}>
                <input type="checkbox" checked={!!form.acceptsReferrals} onChange={e => up("acceptsReferrals", e.target.checked)} />
                <span><strong>I accept referrals</strong> from GPs, allied health, and other APAS members. Your profile will display this.</span>
              </label>
            </div>
          )}

          {step === 4 && (
            <div className="form-section">
              <h3>Declarations</h3>
              <p className="dim">These are required by the Self-Regulatory Framework v2.0, section 4.3.</p>
              <div className="stack">
                {[
                  { k: "dec_truth", t: "The information I've provided is true and complete. I understand APAS may verify it with institutions or authorities." },
                  { k: "dec_conduct", t: "I agree to be bound by the APAS Code of Conduct and Scope of Practice, and to any amendments notified to members." },
                  { k: "dec_complaints", t: "I consent to APAS receiving and investigating complaints about my practice under the framework's complaints process." },
                  { k: "dec_cpe", t: "I commit to completing at least 24 hours of CPE per year and maintaining a log in the member portal." },
                  { k: "dec_privacy", t: "I consent to APAS publishing my name, registration number, clinic, specialties and status on the public register." },
                ].map(c => (
                  <label key={c.k} className="check" style={{ padding: 14, border: "1px solid var(--rule)", borderRadius: 6 }}>
                    <input type="checkbox" checked={!!form[c.k]} onChange={e => up(c.k, e.target.checked)} />
                    <span>{c.t}</span>
                  </label>
                ))}
              </div>
              <label className="field" style={{ marginTop: 18 }}>
                <span className="label">Electronic signature — type your full name</span>
                <input className="input" value={(form.sig as string) ?? ""} onChange={e => up("sig", e.target.value)} placeholder="Dr Priya Sharma" />
              </label>
            </div>
          )}

          {step === 5 && (
            <div className="form-section">
              <h3>Review your application</h3>
              <p className="dim">Check everything below. You can go back to edit any section.</p>

              {[
                { title: "Personal", rows: [["Name", form.fullName], ["Email", form.email], ["Mobile", form.mobile], ["Status", form.status]] },
                { title: "Qualifications", rows: [["Qualification", form.qualification], ["Institution", form.institution], ["Year", form.year], ["Documents", `${docs.length}/4 uploaded`]] },
                { title: "Practice", rows: [["Clinic", form.clinicName], ["Address", form.clinicAddr], ["Specialties", specs.join(", ")], ["Languages", langs.join(", ")], ["Referrals", form.acceptsReferrals ? "Accepting" : "Not accepting"]] },
              ].map(section => (
                <div key={section.title} className="card soft" style={{ marginTop: 14 }}>
                  <h4 style={{ marginBottom: 10 }}>{section.title}</h4>
                  <dl className="kv">
                    {(section.rows as [string, unknown][]).map(([k, v]) => (
                      <>
                        <dt key={`${k}-dt`}>{String(k)}</dt>
                        <dd key={`${k}-dd`}>{v != null && v !== false ? String(v as never) : "—"}</dd>
                      </>
                    ))}
                  </dl>
                </div>
              ))}

              <div className="callout" style={{ marginTop: 20 }}>
                <strong>What happens next:</strong> the Credentials Committee reviews applications monthly. You'll hear from us within 4–6 weeks.
              </div>
            </div>
          )}

          <div className="nav-actions">
            <button className="btn" onClick={prev} disabled={step === 0}><Icon.back s={14} /> Back</button>
            {step < 5 ? (
              <button className="btn primary" onClick={next}>Continue <Icon.arrow s={14} /></button>
            ) : (
              <button className="btn primary" onClick={submit}>Submit &amp; pay S$320</button>
            )}
          </div>
        </div>

        <aside className="summary">
          <h4>Summary</h4>
          <div className="row-pair"><span className="k">Applicant</span><span className="v">{(form.fullName as string) || "—"}</span></div>
          <div className="row-pair"><span className="k">Qualification</span><span className="v">{(form.qualification as string) || "—"}</span></div>
          <div className="row-pair"><span className="k">Clinic</span><span className="v">{(form.clinicName as string) || "—"}</span></div>
          <div className="row-pair"><span className="k">Specialties</span><span className="v">{specs.length || "—"}</span></div>
          <div className="row-pair"><span className="k">Documents</span><span className="v">{docs.length}/4 uploaded</span></div>
          <hr style={{ margin: "14px 0", borderTopColor: "var(--rule-strong)" }} />
          <div className="row-pair"><span className="k">Application fee</span><span className="v">S$320</span></div>
          <div className="row-pair"><span className="k">Annual dues</span><span className="v">S$480 · billed on approval</span></div>
          <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 14 }}>
            Your progress saves automatically. You can close this page and resume from your member portal.
          </p>
        </aside>
      </div>
    </div>
  );
}
