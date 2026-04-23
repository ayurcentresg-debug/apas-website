"use client";
import { useState } from "react";
import { Icon } from "@/components/Icons";

type Form = {
  subject?: string; regno?: string; date?: string;
  desc?: string;
  name?: string; rel?: string; email?: string; phone?: string;
  consent?: boolean;
};

export default function ComplaintPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({});
  const [submitted, setSubmitted] = useState(false);
  const up = <K extends keyof Form>(k: K, v: Form[K]) => setForm(f => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <div className="container-sm page-fade" style={{ paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
        <div className="card" style={{ padding: 40 }}>
          <div style={{ fontSize: 48, color: "var(--good)", marginBottom: 14 }}>✓</div>
          <h1 style={{ fontSize: 28 }}>Concern submitted confidentially</h1>
          <p style={{ marginTop: 12, color: "var(--ink-2)" }}>
            Reference <strong style={{ fontFamily: "var(--mono)" }}>APAS-C-2026-0089</strong>. Acknowledgement email sent to {form.email || "your email"}. The Disciplinary Committee will respond within 5 working days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-sm page-fade" style={{ paddingTop: 32, paddingBottom: 60 }}>
      <span className="eyebrow">Confidential intake</span>
      <h1 style={{ marginTop: 6 }}>Raise a concern about an APAS practitioner or clinic</h1>
      <p className="lead" style={{ fontSize: 16 }}>
        Your submission is reviewed by the APAS Disciplinary Committee. You'll receive acknowledgement within 5 working days.
      </p>

      <div className="card" style={{ marginTop: 24, padding: 28 }}>
        {step === 0 && (
          <div className="form-section">
            <h3>Who is this about?</h3>
            <p className="dim">If you're unsure of the registration number, search the register first.</p>
            <div className="field-grid">
              <label className="field full"><span className="label">Practitioner or clinic name</span>
                <input className="input" value={form.subject ?? ""} onChange={e => up("subject", e.target.value)} />
              </label>
              <label className="field"><span className="label">Registration number (if known)</span>
                <input className="input mono" value={form.regno ?? ""} onChange={e => up("regno", e.target.value)} placeholder="APAS-0000" />
              </label>
              <label className="field"><span className="label">Date of incident</span>
                <input className="input" type="date" value={form.date ?? ""} onChange={e => up("date", e.target.value)} />
              </label>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="form-section">
            <h3>What happened?</h3>
            <p className="dim">Describe the concern in your own words. Attach documents if you have them.</p>
            <label className="field full"><span className="label">Description</span>
              <textarea className="input" rows={8} value={form.desc ?? ""} onChange={e => up("desc", e.target.value)} />
            </label>
            <div className="drop" style={{ marginTop: 14 }}>
              <Icon.arrow s={20} /><br/>Drop documents or click to browse
              <div className="hint">Optional · max 20MB total</div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="form-section">
            <h3>Your contact details</h3>
            <p className="dim">Required — the committee may need to follow up. Your identity is not shared with the subject without your written consent.</p>
            <div className="field-grid">
              <label className="field"><span className="label">Your name</span>
                <input className="input" value={form.name ?? ""} onChange={e => up("name", e.target.value)} />
              </label>
              <label className="field"><span className="label">Relationship</span>
                <select className="input" value={form.rel ?? ""} onChange={e => up("rel", e.target.value)}>
                  <option value="">Select…</option>
                  <option>Patient</option>
                  <option>Family member</option>
                  <option>GP / allied health</option>
                  <option>Clinic staff</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="field"><span className="label">Email</span>
                <input className="input" type="email" value={form.email ?? ""} onChange={e => up("email", e.target.value)} />
              </label>
              <label className="field"><span className="label">Phone</span>
                <input className="input" value={form.phone ?? ""} onChange={e => up("phone", e.target.value)} />
              </label>
              <label className="check full" style={{ marginTop: 10 }}>
                <input type="checkbox" checked={!!form.consent} onChange={e => up("consent", e.target.checked)} />
                <span>I understand this form is not a substitute for medical attention or a police report.</span>
              </label>
            </div>
          </div>
        )}

        <div className="nav-actions">
          <button className="btn" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
            <Icon.back s={14} /> Back
          </button>
          {step < 2 ? (
            <button className="btn primary" onClick={() => setStep(s => s + 1)}>Continue <Icon.arrow s={14} /></button>
          ) : (
            <button className="btn primary" onClick={() => setSubmitted(true)}>Submit confidentially</button>
          )}
        </div>
      </div>
    </div>
  );
}
