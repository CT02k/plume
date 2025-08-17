"use client";

import Image from "next/image";

interface LogoProps {
  type: "full" | "icon";
  className?: string;
  plume?: boolean;
  divide?: number;
}

export default function Logo({ type, plume = false, divide = 8, className }: LogoProps) {
  return (
    type === "full" ? (
      plume ? (
        <Image src="/logo_full.png" alt="Full Logo" width={1143 / divide} height={320 / divide} className={className} />
      ) : (  
        <Image src="/logo_full.png" alt="Full Logo" width={1143 / divide} height={320 / divide} className={className} />
      )
    ) : (
      plume ? (
        <Image src="/icon.png" alt="Icon Logo" width={256 / divide} height={256 / divide} className={className} />
      ) : (
        <Image src="/icon.png" alt="Icon Logo" width={256 / divide} height={256 / divide} className={className} />
      )
    )
  );
}