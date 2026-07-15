interface AuthorBioProps {
  name?: string;
  credential?: string;
}

export default function AuthorBio({ name = "HomeCostGuide Team", credential = "Home improvement cost research specialists with 10+ years of industry data analysis" }: AuthorBioProps) {
  return (
    <div className="flex items-center gap-3 py-4 border-y border-gray-200 my-4">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-gray-500">{credential}</p>
      </div>
    </div>
  );
}
