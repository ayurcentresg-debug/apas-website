import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="logo logo-img" aria-label="APAS — Ayurvedic Practitioners Association Singapore">
      <Image
        src="/apas-logo.png"
        alt="APAS — Ayurvedic Practitioners Association Singapore"
        width={1200}
        height={470}
        priority
      />
    </Link>
  );
}
