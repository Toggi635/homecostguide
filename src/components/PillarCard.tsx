import Link from "next/link";

interface PillarCardProps {
  slug: string;
  name: string;
  description: string;
}

export default function PillarCard({ slug, name, description }: PillarCardProps) {
  return (
    <Link
      href={`/${slug}/`}
      className="block border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all"
    >
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}
