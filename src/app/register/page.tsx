"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { practitioners, clinics, SPECIALTIES, clinicById } from "@/data/seed";
import { Avatar, Verified } from "@/components/Avatar";
import { Icon } from "@/components/Icons";

export default function RegisterPage() {
  const [q, setQ] = useState("");
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [type, setType] = useState<"practitioners" | "clinics">("practitioners");

  const filteredPractitioners = useMemo(() => {
    const query = q.trim().toLowerCase();
    return practitioners.filter(p => {
      if (specialty && !p.specialties.includes(specialty)) return false;
      if (statusFilter && p.status !== statusFilter) return false;
      if (area) {
        const c = clinicById(p.clinicId);
        if (!c || c.area !== area) return false;
      }
      if (!query) return true;
      const hay = [p.name, p.id, p.qualification, ...p.specialties, ...p.languages, clinicById(p.clinicId)?.name ?? ""].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [q, specialty, area, statusFilter]);

  const filteredClinics = useMemo(() => {
    const query = q.trim().toLowerCase();
    return clinics.filter(c => {
      if (area && c.area !== area) return false;
      if (!query) return true;
      return (c.name + " " + c.area + " " + c.services.join(" ")).toLowerCase().includes(query);
    });
  }, [q, area]);

  return (
    <div className="container page-fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
      <div className="row between center" style={{ marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <span className="eyebrow">Public register</span>
          <h1 style={{ marginTop: 8 }}>
            {type === "practitioners" ? "Ayurvedic practitioners" : "Ayurvedic clinics"} in Singapore
          </h1>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className={"btn " + (type === "practitioners" ? "primary" : "")} onClick={() => setType("practitioners")}>Practitioners</button>
          <button className={"btn " + (type === "clinics" ? "primary" : "")} onClick={() => setType("clinics")}>Clinics</button>
        </div>
      </div>

      <div className="search-hero" style={{ marginTop: 10, marginBottom: 24 }}>
        <div className="seg"><Icon.search s={14} /> Search</div>
        <input value={q} onChange={e => setQ(e.target.value)}
          placeholder={type === "practitioners" ? "Name, registration number, specialty, language…" : "Clinic name, area, service…"} />
        {q && <button className="btn ghost" onClick={() => setQ("")}>Clear</button>}
      </div>

      <div className="register-layout">
        <aside className="filterside">
          <h4>Area</h4>
          <div className="facets">
            <div className={"facet " + (area === null ? "active" : "")} onClick={() => setArea(null)}>
              <span>All areas</span>
              <span className="n">{type === "practitioners" ? practitioners.length : clinics.length}</span>
            </div>
            {Array.from(new Set(clinics.map(c => c.area))).map(a => {
              const count = type === "practitioners"
                ? practitioners.filter(p => clinicById(p.clinicId)?.area === a).length
                : clinics.filter(c => c.area === a).length;
              return (
                <div key={a} className={"facet " + (area === a ? "active" : "")} onClick={() => setArea(area === a ? null : a)}>
                  <span>{a}</span><span className="n">{count}</span>
                </div>
              );
            })}
          </div>

          {type === "practitioners" && (
            <>
              <h4>Specialty</h4>
              <div className="facets">
                <div className={"facet " + (specialty === null ? "active" : "")} onClick={() => setSpecialty(null)}>
                  <span>All specialties</span><span className="n">{practitioners.length}</span>
                </div>
                {SPECIALTIES.map(s => {
                  const count = practitioners.filter(p => p.specialties.includes(s)).length;
                  return (
                    <div key={s} className={"facet " + (specialty === s ? "active" : "")} onClick={() => setSpecialty(specialty === s ? null : s)}>
                      <span>{s}</span><span className="n">{count}</span>
                    </div>
                  );
                })}
              </div>

              <h4>Status</h4>
              <div className="facets">
                {["Active", "Renewal pending", "Provisional"].map(s => {
                  const count = practitioners.filter(p => p.status === s).length;
                  return (
                    <div key={s} className={"facet " + (statusFilter === s ? "active" : "")} onClick={() => setStatusFilter(statusFilter === s ? null : s)}>
                      <span>{s}</span><span className="n">{count}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </aside>

        <div>
          <div className="results-header">
            <span className="count">
              {type === "practitioners" ? filteredPractitioners.length : filteredClinics.length} {type === "practitioners" ? "practitioner" : "clinic"}{(type === "practitioners" ? filteredPractitioners.length : filteredClinics.length) === 1 ? "" : "s"}
            </span>
          </div>

          {type === "practitioners" ? (
            <div className="results-grid">
              {filteredPractitioners.map(p => {
                const c = clinicById(p.clinicId);
                return (
                  <Link key={p.id} href={`/practitioner/${p.id}`} className="p-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    <div className="top">
                      <Avatar name={p.name} />
                      <div style={{ flex: 1 }}>
                        <div className="row between" style={{ alignItems: "flex-start" }}>
                          <h3>{p.name}</h3>
                          {p.verified && <Verified small />}
                        </div>
                        <div className="reg">{p.id} · {p.status}</div>
                        {p.role && <div style={{ fontSize: 12, color: "var(--brand-ink)", marginTop: 4, fontWeight: 500 }}>{p.role}</div>}
                        <div className="chips">
                          {p.specialties.slice(0, 2).map(s => <span key={s} className="pill">{s}</span>)}
                        </div>
                      </div>
                    </div>
                    <div className="meta-row">
                      <div>{c?.name}, {c?.area}</div>
                      <Icon.arrow s={14} />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="results-grid">
              {filteredClinics.map(c => (
                <Link key={c.id} href={`/clinic/${c.id}`} className="p-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <div>
                    <h3 style={{ fontSize: 18 }}>{c.name}</h3>
                    <div className="reg">{c.area} · since {c.since}</div>
                    <div className="chips">
                      {c.services.slice(0, 3).map(s => <span key={s} className="pill">{s}</span>)}
                    </div>
                  </div>
                  <div className="meta-row">
                    <div>{c.practitioners} practitioners</div>
                    <Icon.arrow s={14} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
