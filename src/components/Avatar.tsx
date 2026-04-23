import { initials } from "@/data/seed";

export function Avatar({ name, size = 54 }: { name: string; size?: number }) {
  return (
    <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.37 }}>
      {initials(name)}
    </div>
  );
}

export function AvatarLg({ name }: { name: string }) {
  return <div className="avatar-lg">{initials(name)}</div>;
}

export function Verified({ small = false }: { small?: boolean }) {
  return (
    <span className="badge-verified" style={small ? { fontSize: 11 } : undefined}>
      <span className="dot"></span> Verified
    </span>
  );
}
