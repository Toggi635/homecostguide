interface AuthorBioProps {
  name?: string;
  credential?: string;
}

export default function AuthorBio({ name = "HomeCostGuide Team", credential = "Home improvement cost research specialists with 10+ years of industry data analysis" }: AuthorBioProps) {
  return (
    <div className="flex items-center gap-3 py-4 border-y border-line my-4">
      <div className="w-12 h-12 rounded-full bg-rust/10 flex items-center justify-center text-rust font-bold font-serif text-lg">
        {name.charAt(0)}
      </div>
      <div className="min-w-0">
        <p className="font-medium text-sm text-ink">{name}</p>
        <p className="text-xs text-muted">{credential}</p>
      </div>
    </div>
  );
}
