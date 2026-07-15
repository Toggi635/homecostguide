import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

export default function Button({ href, children, variant = "primary" }: ButtonProps) {
  const base = "inline-flex items-center gap-2 rounded-btn px-5 py-3 min-h-[44px] text-sm font-medium transition-all duration-150";
  const variants = {
    primary: "bg-rust text-white hover:bg-rust-dark shadow-soft hover:shadow-card hover:-translate-y-0.5",
    secondary: "bg-forest text-white hover:bg-forest-dark shadow-soft hover:shadow-card hover:-translate-y-0.5",
    ghost: "bg-transparent text-ink border border-line hover:border-rust hover:text-rust",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
