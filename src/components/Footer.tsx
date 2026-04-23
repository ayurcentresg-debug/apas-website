import Link from "next/link";

export function Footer() {
  return (
    <footer className="apas">
      <div className="container">
        <div className="cols">
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
              Ayurvedic Practitioners Association Singapore
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-3)", maxWidth: "40ch" }}>
              Self-regulating professional body for Ayurveda practitioners and clinics in Singapore. Founded 2006.
            </p>
            <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 14, fontFamily: "var(--mono)" }}>
              UEN T06SS0142K · Registered Society
            </p>
          </div>
          <div>
            <h5>Register</h5>
            <ul>
              <li><Link href="/register">Search practitioners</Link></li>
              <li><Link href="/register?type=clinic">Browse clinics</Link></li>
              <li><Link href="/framework">Framework</Link></li>
              <li><Link href="/announcements">Announcements</Link></li>
            </ul>
          </div>
          <div>
            <h5>Audiences</h5>
            <ul>
              <li><Link href="/for-practitioners">For practitioners</Link></li>
              <li><Link href="/for-clinics">For clinics</Link></li>
              <li><Link href="/for-public">For public</Link></li>
              <li><Link href="/about">About APAS</Link></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li style={{ color: "var(--ink-2)", fontSize: 14 }}>
                128 Race Course Road, #02-05<br/>Singapore 218578
              </li>
              <li style={{ marginTop: 8 }}>
                <a href="mailto:secretariat@apas.org.sg">secretariat@apas.org.sg</a>
              </li>
              <li><a href="tel:+6562934410">+65 6293 4410</a></li>
            </ul>
          </div>
        </div>
        <div className="fineprint">
          <span>© {new Date().getFullYear()} APAS. All rights reserved.</span>
          <span>Framework v2.0 · updated December 2025</span>
        </div>
      </div>
    </footer>
  );
}
