"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { Icon } from "./Icons";

const NAV_ITEMS = [
  { id: "practitioners", label: "For Practitioners", href: "/for-practitioners" },
  { id: "clinics", label: "For Clinics", href: "/for-clinics" },
  { id: "public", label: "For Public", href: "/for-public" },
  { id: "about", label: "About", href: "/about" },
];

function activeId(pathname: string): string | null {
  if (pathname.startsWith("/for-practitioners") || pathname.startsWith("/apply") || pathname.startsWith("/renew") || pathname.startsWith("/portal")) return "practitioners";
  if (pathname.startsWith("/for-clinics") || pathname.startsWith("/clinic/") || pathname.startsWith("/apply-clinic")) return "clinics";
  if (pathname.startsWith("/for-public") || pathname.startsWith("/complain") || pathname.startsWith("/practitioner/") || pathname.startsWith("/register")) return "public";
  if (pathname.startsWith("/about") || pathname.startsWith("/framework") || pathname.startsWith("/announcements")) return "about";
  return null;
}

export function TopBar() {
  const pathname = usePathname();
  const active = activeId(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="container bar">
        <Logo />
        <nav className="primary-nav">
          <div className="navgroup">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className={"navbtn " + (active === item.id ? "active" : "")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="top-right">
          <Link href="/register" className="iconbtn" aria-label="Search register">
            <Icon.search s={16} />
          </Link>
          <Link href="/portal" className="btn">
            <Icon.user s={14} /> Member login
          </Link>
          <button className="iconbtn mobile-menu-btn" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
            <Icon.menu />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="container" style={{ padding: "0 24px 14px" }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.id} href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", padding: "10px 0", borderTop: "1px solid var(--rule)", color: "var(--ink)" }}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
