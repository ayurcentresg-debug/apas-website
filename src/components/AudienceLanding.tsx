import Link from "next/link";
import { Icon } from "./Icons";

export type Tile = { h: string; p: string; to: string; cta: string };

export function AudienceLanding({
  eyebrow, h1, lead, tiles,
}: { eyebrow: string; h1: string; lead: string; tiles: Tile[] }) {
  return (
    <div className="container page-fade" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <span className="eyebrow">{eyebrow}</span>
      <h1 style={{ marginTop: 10, maxWidth: "22ch" }}>{h1}</h1>
      <p className="lead" style={{ maxWidth: "55ch", fontSize: 17 }}>{lead}</p>

      <div className="public-tiles">
        {tiles.map((t, i) => (
          <Link key={i} href={t.to} className="card hover" style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}>
            <h3 style={{ marginBottom: 10 }}>{t.h}</h3>
            <p style={{ marginBottom: 18 }}>{t.p}</p>
            <span className="btn sm primary">{t.cta} <Icon.arrow s={12} /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
