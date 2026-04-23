import { announcements, events } from "@/data/seed";

export const metadata = { title: "Announcements" };

export default function AnnouncementsPage() {
  const upcoming = events.filter(e => e.status === "upcoming");
  const past = events.filter(e => e.status === "past");

  return (
    <div className="container page-fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
      <span className="eyebrow">Public notices &amp; events</span>
      <h1 style={{ marginTop: 6 }}>Announcements</h1>

      <div className="two-col" style={{ marginTop: 28 }}>
        <div>
          <div className="section-title"><h2>Circulars</h2></div>
          <div className="card" style={{ padding: "0 22px" }}>
            {announcements.map((x, i) => (
              <div key={i} className="announcement-row">
                <div className="d">{x.date}</div>
                <div><span className="pill outline">{x.tag}</span></div>
                <div className="t">{x.title}</div>
                <a style={{ fontSize: 13 }}>Read →</a>
              </div>
            ))}
          </div>
        </div>
        <aside>
          <div className="section-title"><h2>Events</h2></div>
          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)", fontFamily: "var(--mono)", marginBottom: 10 }}>Upcoming</div>
            {upcoming.map((x, i) => {
              const d = new Date(x.date);
              return (
                <div key={i} className="event-row">
                  <div className="date"><div className="m">{d.toLocaleString("en", { month: "short" })}</div><div className="d">{d.getDate()}</div></div>
                  <div><div className="t">{x.title}</div><div className="l">{x.location}</div></div>
                  {x.cpe > 0 && <span className="pill brand">{x.cpe} CPE</span>}
                </div>
              );
            })}
            <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)", fontFamily: "var(--mono)", marginTop: 18, marginBottom: 10 }}>Past</div>
            {past.map((x, i) => {
              const d = new Date(x.date);
              return (
                <div key={i} className="event-row">
                  <div className="date" style={{ opacity: .6 }}><div className="m">{d.toLocaleString("en", { month: "short" })}</div><div className="d">{d.getDate()}</div></div>
                  <div><div className="t" style={{ color: "var(--ink-2)" }}>{x.title}</div><div className="l">{x.location}</div></div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
