interface AdSlotProps {
  placement: "after-intro" | "mid-content" | "pre-faq" | "sidebar";
}

export default function AdSlot({ placement }: AdSlotProps) {
  const label = {
    "after-intro": "Advertisement - After Intro",
    "mid-content": "Advertisement - Mid Content",
    "pre-faq": "Advertisement - Before FAQ",
    "sidebar": "Advertisement - Sidebar",
  }[placement];

  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isRealAdsenseId = adsenseId && adsenseId !== "ca-pub-0000000000000000";

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 my-6 text-center text-sm text-gray-400 min-h-[90px] flex items-center justify-center">
      {isRealAdsenseId ? (
        <div data-ad-slot={placement} className="ad-container" />
      ) : (
        <span>{label} (AdSense placeholder - configure NEXT_PUBLIC_ADSENSE_CLIENT_ID to enable)</span>
      )}
    </div>
  );
}
