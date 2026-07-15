import Link from "next/link";
import { Home, Wind, Droplet, Zap, UtensilsCrossed, Paintbrush, Wrench } from "lucide-react";
import { articles } from "@/lib/content";

const pillarIcons: Record<string, { icon: React.ElementType; color: string }> = {
  "roofing-exterior": { icon: Home, color: "rust" },
  "hvac-energy": { icon: Wind, color: "forest" },
  "plumbing": { icon: Droplet, color: "rust" },
  "electrical": { icon: Zap, color: "forest" },
  "kitchen-bath": { icon: UtensilsCrossed, color: "rust" },
  "interior-renovation": { icon: Paintbrush, color: "forest" },
  "home-maintenance": { icon: Wrench, color: "rust" },
};

interface PillarCardProps {
  slug: string;
  name: string;
  description: string;
}

export default function PillarCard({ slug, name, description }: PillarCardProps) {
  const iconData = pillarIcons[slug] || { icon: Home, color: "rust" };
  const Icon = iconData.icon;
  const colorClass = iconData.color === "forest" ? "bg-forest/10 text-forest" : "bg-rust/10 text-rust-dark";
  const count = articles.filter((a) => a.pillar === slug).length;

  return (
    <Link
      href={`/${slug}/`}
      className="block bg-white border border-line rounded-card p-5 shadow-soft transition-all duration-200 hover:shadow-lift hover:-translate-y-0.5 hover:border-rust/40"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${colorClass}`}>
          <Icon size={22} />
        </span>
        <div>
          <h3 className="font-serif font-semibold text-ink">{name}</h3>
          <span className="text-xs text-muted">{count} guides</span>
        </div>
      </div>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </Link>
  );
}
