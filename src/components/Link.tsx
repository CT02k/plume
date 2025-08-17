"use client";

import { useRouter } from "next/navigation";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export default function Link({ href, children }: LinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a onClick={handleClick} className="text-plume8 hover:underline cursor-pointer">
      {children}
    </a>
  );
}