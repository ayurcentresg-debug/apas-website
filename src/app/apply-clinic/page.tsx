"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AREAS } from "@/data/seed";
import { Icon } from "@/components/Icons";

type StaffRow = { regno?: string; name?: string; role?: string; hours?: string };
type Doc = { name: string; uploaded: string };
type Form = Record<string, string | boolean | string[] | StaffRow[] | Doc[] | undefined>;

const STEPS = [
  { id: 0, label: "Premises & licensing" },
  { id: 1, label: "Principal practitioner" },
  { id: 2, label: "Staff list" },
  { id: 3, label: "Standards & declarations" },
];

const SERVICES = [
  "Consultations", "Panchakarma", "Abhyanga", "Shirodhara", "Basti", "Nasya",
  "Marma", "Herbal dispensary", "Yoga therapy", "Nutritional counselling",
  "Post-partum care", "Paediatric care",
];

const DECLARATIONS = [
  { k: "std_hygiene", t: "Hygiene & infection control — we maintain a written hygiene SOP, sterilise reusable instruments per APAS schedule, and dispose of linens and single-use materials appropriately." },
  { k: "std_records", t: "Clinical records — we keep patient records for a minimum of seven (7) years, stored securely, and provide copies on patient request within 14 days." },
  { k: "std_consent", t: "Informed consent — we obtain written consent for panchakarma, external therapies and any procedure involving oils, heat, or steam." },
  { k: "std_supervision", t: "Supervision — the principal practitioner (or a named deputy) is on-site during all operating hours; therapists are never left unsupervised with patients during procedures." },
  { k: "std_adverse", t: "Adverse events — we notify the APAS Secretariat of any adverse event, hospital transfer, or complaint within 72 hours, using the standard incident form." },
  { k: "std_dispensary", t: "Dispensary — all herbal products stocked are from HSA-notified or APAS-verified sources; we keep batch records and do not dispense beyond expiry." },
  { k: "std_pricing", t: "Pricing & fee transparency — a current price list is displayed at reception and on our website; we issue itemised receipts." },
  { k: "std_inspection", t: "Inspection consent — we consent to an APAS site visit within 30 days of this application, and to periodic inspections every 24 months thereafter." },
  { k: "std_truth", t: "Truthful application — the information provided in this form is true and complete to the best of our knowledge." },
];

export default function ClinicApplyFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({ staff: [{ regno: "", name: "", role: "Practitioner", hours: "" }] });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("apas-clinic-step");
    const f = localStorage.getItem("apas-clinic-form");
    if (s) setStep(parseInt(s));
    if (f) setForm(JSON.parse(f));
  }, []);
  useEffect(() => { localStorage.setItem("apas-clinic-step", String(step)); }, [step]);
  useEffect(() => { localStorage.setItem("apas-clinic-form", JSON.stringify(form)); }, [form]);

  const up = <K extends string>(k: K, v: Form[K]) => setForm(f => ({ ...f, [k]: v }));
  const next = () => setStep(s => Math.min(3, s + 1));
  const prev = () => setStep(s => Math.max(0, s - 1));

  const submit = () => {
    setSubmitted(true);
    localStorage.removeItem("apas-clinic-step");
    localStorage.removeItem("apas-clinic-form");
    setTimeout(() => router.push("/for-clinics"), 1800);
  };

  if (submitted) {
    return (
      <div className="container-sm page-fade" style={{ paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
        <div className="card" style={{ padding: 40 }}>
          <div style={{ fontSize: 48, color: "var(--good)", marginBottom: 14 }}>✓</div>
          <h1 style={{ fontSize: 28 }}>Clinic registration submitted</h1>
          <p style={{ marginTop: 12, color: "var(--ink-2)" }}>
            Reference <strong style={{ fontFamily: "var(--mono)" }}>APAS-CLN-2026-0047</strong>. Acknowledgement emailed.
          </p>
        </div>
      </div>
    );
  }

  const staff = (form.staff as StaffRow[]) ?? [];
  const services = (form.services as string[]) ?? [];
  const docs = (form.clinicDocs as Doc[]) ?? [];
  const roleCounts = staff.reduce<Record<string, number>>((acc, s) => {
    if (s.role) acc[s.role] = (acc[s.role] || 0) + 1;
    return acc;
  }, {});

  const updateRow = (idx: number, key: keyof StaffRow, value: string) => {
    setForm(f => {
      const rows = [...((f.staff as StaffRow[]) ?? [])];
      rows[idx] = { ...rows[idx], [key]: value };
      return { ...f, staff: rows };
    });
  };
  const addRow = () => setForm(f => ({ ...f, staff: [...((f.staff as StaffRow[]) ?? []), { regno: "", name: "", role: "Practitioner", hours: "" }] }));
  const removeRow = (idx: number) => setForm(f => ({ ...f, staff: ((f.staff as StaffRow[]) ?? []).filter((_, i) => i !== idx) }));

  return (
    <div className="container page-fade" style={{ paddingTop: 32, paddingBottom: 60 }}>
      <div style={{ marginBottom: 20 }}>
        <span className="eyebrow">Clinic registration</span>
        <h1 style={{ marginTop: 6, fontSize: 36 }}>Register an Ayurvedic clinic with APAS</h1>
        <p className="lead" style={{ maxWidth: "62ch", fontSize: 16 }}>
          For premises hosting one or more APAS-registered practitioners. Typical review time: 6–8 weeks including a site visit under Framework §5.
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
              <h3>Premises &amp; licensing</h3>
              <p className="dim">The physical site and its operating basis. Satellite sites are registered separately.</p>

              <div className="field-grid">
                <label className="field full"><span className="label">Clinic trading name</span>
                  <input className="input" value={(form.clinicName as string) ?? ""} onChange={e => up("clinicName", e.target.value)} placeholder="Dhanvantari Centre" />
                </label>
                <label className="field"><span className="label">UEN (ACRA)</span>
                  <input className="input mono" value={(form.uen as string) ?? ""} onChange={e => up("uen", e.target.value)} placeholder="201234567K" />
                </label>
                <label className="field"><span className="label">Registered entity name</span>
                  <input className="input" value={(form.entityName as string) ?? ""} onChange={e => up("entityName", e.target.value)} placeholder="Dhanvantari Wellness Pte Ltd" />
                </label>
                <label className="field full"><span className="label">Street address</span>
                  <input className="input" value={(form.street as string) ?? ""} onChange={e => up("street", e.target.value)} placeholder="75 Upper Serangoon Rd, #03-11" />
                </label>
                <label className="field"><span className="label">Postal code</span>
                  <input className="input mono" value={(form.postal as string) ?? ""} onChange={e => up("postal", e.target.value)} placeholder="347592" />
                </label>
                <label className="field"><span className="label">Planning area</span>
                  <select className="input" value={(form.area as string) ?? ""} onChange={e => up("area", e.target.value)}>
                    <option value="">Select…</option>
                    {AREAS.map(a => <option key={a}>{a}</option>)}
                  </select>
                </label>
                <label className="field"><span className="label">Premises basis</span>
                  <select className="input" value={(form.premisesBasis as string) ?? ""} onChange={e => up("premisesBasis", e.target.value)}>
                    <option value="">Select…</option>
                    <option>Owned</option>
                    <option>Leased (commercial)</option>
                    <option>Leased (HDB commercial)</option>
                    <option>Shared chambers</option>
                  </select>
                </label>
                <label className="field"><span className="label">Lease end date (if leased)</span>
                  <input className="input" type="date" value={(form.leaseEnd as string) ?? ""} onChange={e => up("leaseEnd", e.target.value)} />
                </label>
                <label className="field"><span className="label">Opening / operating since</span>
                  <input className="input" type="date" value={(form.openingDate as string) ?? ""} onChange={e => up("openingDate", e.target.value)} />
                </label>
                <label className="field"><span className="label">Floor area (sqm)</span>
                  <input className="input" value={(form.floorArea as string) ?? ""} onChange={e => up("floorArea", e.target.value)} placeholder="85" />
                </label>
                <label className="field"><span className="label">Treatment rooms</span>
                  <input className="input" value={(form.rooms as string) ?? ""} onChange={e => up("rooms", e.target.value)} placeholder="3" />
                </label>
                <label className="field"><span className="label">URA / HDB use approval</span>
                  <select className="input" value={(form.ura as string) ?? ""} onChange={e => up("ura", e.target.value)}>
                    <option value="">Select…</option>
                    <option>Approved — health / medical use</option>
                    <option>Approved — general commercial</option>
                    <option>Pending</option>
                    <option>Not required (home-based limited)</option>
                  </select>
                </label>
              </div>

              <h4 style={{ marginTop: 24 }}>Services delivered on-site</h4>
              <div className="row wrap" style={{ gap: 6, marginTop: 8 }}>
                {SERVICES.map(s => {
                  const on = services.includes(s);
                  return (
                    <button key={s} type="button"
                      className={"pill " + (on ? "brand" : "outline")}
                      style={{ cursor: "pointer", border: "1px solid var(--rule)" }}
                      onClick={() => up("services", on ? services.filter(x => x !== s) : [...services, s])}>
                      {on && <Icon.check s={10} />} {s}
                    </button>
                  );
                })}
              </div>

              <div className="callout" style={{ marginTop: 20 }}>
                <strong>Dispensary notice:</strong> if you stock and dispense herbal formulations on-site, a separate HSA notification may apply. APAS will flag any gaps during the site visit.
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="form-section">
              <h3>Principal practitioner</h3>
              <p className="dim">The APAS-registered practitioner legally responsible for clinical conduct. Must be an Active APAS member.</p>
              <div className="field-grid">
                <label className="field"><span className="label">APAS registration number</span>
                  <input className="input mono" value={(form.principalRegno as string) ?? ""} onChange={e => up("principalRegno", e.target.value)} placeholder="APAS-0123" />
                  <span className="hint">We'll verify against the register on submission.</span>
                </label>
                <label className="field"><span className="label">Full name</span>
                  <input className="input" value={(form.principalName as string) ?? ""} onChange={e => up("principalName", e.target.value)} placeholder="Dr Priya Sharma" />
                </label>
                <label className="field"><span className="label">Email (work)</span>
                  <input className="input" type="email" value={(form.principalEmail as string) ?? ""} onChange={e => up("principalEmail", e.target.value)} placeholder="priya@clinic.sg" />
                </label>
                <label className="field"><span className="label">Mobile</span>
                  <input className="input" value={(form.principalMobile as string) ?? ""} onChange={e => up("principalMobile", e.target.value)} placeholder="+65 9123 4567" />
                </label>
                <label className="field"><span className="label">Years practising in SG</span>
                  <input className="input" value={(form.principalYears as string) ?? ""} onChange={e => up("principalYears", e.target.value)} placeholder="8" />
                </label>
                <label className="field"><span className="label">Role at clinic</span>
                  <select className="input" value={(form.principalRole as string) ?? ""} onChange={e => up("principalRole", e.target.value)}>
                    <option value="">Select…</option>
                    <option>Owner &amp; principal</option>
                    <option>Principal (employed)</option>
                    <option>Medical director</option>
                    <option>Partner</option>
                  </select>
                </label>
                <label className="field full"><span className="label">Clinical oversight — brief statement</span>
                  <textarea className="input" rows={3} value={(form.oversight as string) ?? ""} onChange={e => up("oversight", e.target.value)}
                    placeholder="How you supervise therapies, review case notes, and handle adverse events." />
                </label>
              </div>

              <h4 style={{ marginTop: 24 }}>Supporting documents</h4>
              <div className="stack" style={{ marginTop: 14 }}>
                {["ACRA business profile (Bizfile).pdf", "Tenancy agreement or title deed.pdf", "Premises floor plan with room labels.pdf", "Principal practitioner CV.pdf"].map(name => {
                  const d = docs.find(x => x.name === name);
                  const toggle = () => {
                    const exists = docs.find(x => x.name === name);
                    up("clinicDocs", exists ? docs.filter(x => x.name !== name) : [...docs, { name, uploaded: new Date().toLocaleDateString() }]);
                  };
                  return (
                    <div key={name} className="doc-row">
                      <div className="row center" style={{ gap: 10 }}>
                        <Icon.arrow s={16} />
                        <div>{name}{d && <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Uploaded {d.uploaded}</div>}</div>
                      </div>
                      {d ? <span className="ok"><Icon.check s={12} /> Uploaded</span>
                         : <button className="btn sm" onClick={toggle}>Upload</button>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h3>Staff &amp; roster</h3>
              <p className="dim">Everyone who delivers care, dispenses, or takes patient records. APAS-registered practitioners must include their registration number.</p>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", margin: "16px 0 20px" }}>
                {["Practitioner", "Therapist", "Reception / admin", "Dispensary"].map(r => (
                  <div key={r} style={{ padding: "8px 14px", background: "var(--surface-2)", borderRadius: 6, fontSize: 13 }}>
                    <span style={{ color: "var(--ink-3)" }}>{r}:</span> <strong>{roleCounts[r] || 0}</strong>
                  </div>
                ))}
              </div>

              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="row" style={{ padding: "10px 14px", background: "var(--surface-2)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "var(--mono)", color: "var(--ink-3)", gap: 10 }}>
                  <div style={{ width: 110 }}>APAS reg no.</div>
                  <div style={{ flex: 2 }}>Name</div>
                  <div style={{ flex: 1.3 }}>Role</div>
                  <div style={{ width: 110 }}>Hours / wk</div>
                  <div style={{ width: 30 }}></div>
                </div>
                {staff.map((row, i) => (
                  <div key={i} className="row" style={{ padding: "10px 14px", borderTop: "1px solid var(--rule)", gap: 10, alignItems: "center" }}>
                    <input className="input mono" style={{ width: 110 }} placeholder="APAS-0000"
                      value={row.regno ?? ""} onChange={e => updateRow(i, "regno", e.target.value)}
                      disabled={row.role !== "Practitioner"} />
                    <input className="input" style={{ flex: 2 }} placeholder="Name"
                      value={row.name ?? ""} onChange={e => updateRow(i, "name", e.target.value)} />
                    <select className="input" style={{ flex: 1.3 }}
                      value={row.role ?? "Practitioner"} onChange={e => updateRow(i, "role", e.target.value)}>
                      <option>Practitioner</option>
                      <option>Therapist</option>
                      <option>Reception / admin</option>
                      <option>Dispensary</option>
                    </select>
                    <input className="input" style={{ width: 110 }} placeholder="30"
                      value={row.hours ?? ""} onChange={e => updateRow(i, "hours", e.target.value)} />
                    <button className="iconbtn" onClick={() => removeRow(i)} title="Remove" style={{ width: 30 }} disabled={staff.length === 1}>
                      <Icon.close s={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="row" style={{ marginTop: 14, gap: 10 }}>
                <button className="btn sm" onClick={addRow}>+ Add person</button>
                <span style={{ fontSize: 12, color: "var(--ink-3)" }}>Therapists must hold APAS-recognised certification — you'll upload evidence after approval.</span>
              </div>

              <div className="callout" style={{ marginTop: 20 }}>
                <strong>Principal coverage rule:</strong> a principal practitioner (or a delegated deputy) must be on-site during all operating hours.
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <h3>Standards &amp; declarations</h3>
              <p className="dim">Required by the Self-Regulatory Framework v2.0 §5 (Clinic Standards, effective 1 May 2026).</p>

              <div className="stack">
                {DECLARATIONS.map(c => (
                  <label key={c.k} className="check" style={{ padding: 14, border: "1px solid var(--rule)", borderRadius: 6, alignItems: "flex-start" }}>
                    <input type="checkbox" checked={!!form[c.k]} onChange={e => up(c.k, e.target.checked)} />
                    <span>{c.t}</span>
                  </label>
                ))}
              </div>

              <div className="field-grid" style={{ marginTop: 18 }}>
                <label className="field"><span className="label">Principal signature (type full name)</span>
                  <input className="input" value={(form.principalSig as string) ?? ""} onChange={e => up("principalSig", e.target.value)} placeholder="Dr Priya Sharma" />
                </label>
                <label className="field"><span className="label">Date</span>
                  <input className="input" type="date" value={(form.sigDate as string) ?? ""} onChange={e => up("sigDate", e.target.value)} />
                </label>
              </div>

              <div className="callout" style={{ marginTop: 20 }}>
                <strong>What happens next:</strong> the Clinic Standards Panel reviews applications monthly. A provisional clinic listing appears on the register after the visit; full listing follows on panel approval.
              </div>
            </div>
          )}

          <div className="nav-actions">
            <button className="btn" onClick={prev} disabled={step === 0}><Icon.back s={14} /> Back</button>
            {step < 3 ? (
              <button className="btn primary" onClick={next}>Continue <Icon.arrow s={14} /></button>
            ) : (
              <button className="btn primary" onClick={submit}>Submit registration</button>
            )}
          </div>
        </div>

        <aside className="summary">
          <h4>Summary</h4>
          <div className="row-pair"><span className="k">Clinic</span><span className="v">{(form.clinicName as string) || "—"}</span></div>
          <div className="row-pair"><span className="k">UEN</span><span className="v">{(form.uen as string) || "—"}</span></div>
          <div className="row-pair"><span className="k">Principal</span><span className="v">{(form.principalName as string) || "—"}</span></div>
          <div className="row-pair"><span className="k">Staff</span><span className="v">{staff.filter(s => s.name).length} on roster</span></div>
          <div className="row-pair"><span className="k">Treatment rooms</span><span className="v">{(form.rooms as string) || "—"}</span></div>
          <hr style={{ margin: "14px 0", borderTopColor: "var(--rule-strong)" }} />
          <div className="row-pair"><span className="k">Registration fee</span><span className="v">S$680</span></div>
          <div className="row-pair"><span className="k">Annual standing</span><span className="v">S$540 · billed on approval</span></div>
          <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 14 }}>
            Clinic fees are separate from practitioner dues. A site visit is scheduled on receipt.
          </p>
        </aside>
      </div>
    </div>
  );
}
