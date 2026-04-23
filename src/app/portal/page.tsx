import Link from "next/link";
import { practitioners, announcements, events } from "@/data/seed";

export const metadata = { title: "Member portal" };

export default function MemberPortal() {
  const me = practitioners[0];
  const cpe = me.cpeHours;
  const target = me.cpeTarget;
  const pct = Math.min(100, (cpe / target) * 100);

  return (
    <div className="container page-fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
      <div className="row between" style={{ marginBottom: 20, flexWrap: "wrap", gap: 16, alignItems: "flex-end" }}>
        <div style={{ minWidth: 0, flex: "1 1 320px" }}>
          <span className="eyebrow">Member portal</span>
          <h1 style={{ marginTop: 6 }}>Welcome back, {me.name.split(" ")[1]}.</h1>
          <div className="reg-line" style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-3)", marginTop: 10 }}>
            {me.id} · Active · Renews Dec 2026
          </div>
        </div>
        <Link href="/practitioner/APAS-0100" className="btn">Edit public profile →</Link>
      </div>

      <div className="dash-grid">
        <div className="stat-card">
          <div className="label">CPE this cycle</div>
          <div className="val">{cpe}<span style={{ color: "var(--ink-3)" }}> / {target}</span></div>
          <div className="sub">{target - cpe} hours remaining · Cycle ends 31 Dec 2026</div>
          <div className="progress"><div className="bar" style={{ width: pct + "%" }} /></div>
        </div>
        <div className="stat-card">
          <div className="label">Annual dues</div>
          <div className="val" style={{ fontSize: 32 }}>Paid</div>
          <div className="sub">S$480 · receipt on 12 Jan 2026</div>
          <button className="btn sm" style={{ marginTop: 14 }}>Download receipt</button>
        </div>
        <div className="stat-card">
          <div className="label">Complaints / concerns</div>
          <div className="val">0</div>
          <div className="sub">No open matters</div>
        </div>
      </div>

      <div className="dash-rows">
        <div>
          <div className="section-title" style={{ marginTop: 8 }}>
            <h2 style={{ fontSize: 20 }}>Upcoming CPE events</h2>
            <Link href="/announcements" style={{ fontSize: 13 }}>All events →</Link>
          </div>
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
                  <div className="row center" style={{ gap: 10 }}>
                    {e.cpe > 0 && <span className="pill brand">{e.cpe} CPE</span>}
                    <button className="btn sm">Register</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="section-title" style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 20 }}>Recent CPE log</h2>
            <button className="btn sm primary">+ Log CPE</button>
          </div>
          <div className="card" style={{ padding: 0 }}>
            {[
              { d: "2026-03-15", t: "Women's Health in Ayurveda — attended", h: 5 },
              { d: "2026-02-20", t: "Self-study: AYUSH Journal articles", h: 3 },
              { d: "2026-01-08", t: "Panchakarma Clinical Day", h: 6 },
              { d: "2025-11-22", t: "Peer case review", h: 4 },
            ].map((r, i) => (
              <div key={i} className="row between center" style={{ padding: "14px 18px", borderBottom: "1px solid var(--rule)" }}>
                <div className="row center" style={{ gap: 14 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-3)", width: 90 }}>{r.d}</span>
                  <div>
                    <div style={{ fontWeight: 500 }}>{r.t}</div>
                    <div style={{ fontSize: 12, color: "var(--good)" }}>✓ Verified</div>
                  </div>
                </div>
                <span className="pill">{r.h} hrs</span>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <div className="section-title" style={{ marginTop: 8 }}><h2 style={{ fontSize: 20 }}>Notices</h2></div>
          <div className="card" style={{ padding: 14 }}>
            {announcements.slice(0, 4).map((a, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? "1px solid var(--rule)" : "none" }}>
                <div style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{a.date} · {a.tag}</div>
                <div style={{ marginTop: 4, fontSize: 14 }}>{a.title}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: 20, background: "var(--surface-2)" }}>
            <h4>Quick actions</h4>
            <div className="stack" style={{ marginTop: 10 }}>
              <button className="btn" style={{ width: "100%", justifyContent: "flex-start" }}>Log CPE hours</button>
              <button className="btn" style={{ width: "100%", justifyContent: "flex-start" }}>Update public profile</button>
              <button className="btn" style={{ width: "100%", justifyContent: "flex-start" }}>Download member certificate</button>
              <button className="btn" style={{ width: "100%", justifyContent: "flex-start" }}>Contact secretariat</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
