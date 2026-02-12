import asSeenOn from "@/assets/as-seen-on.png";

export default function AsSeenOnMarquee() {
  return (
    <div className="w-full bg-[#001228] border-t border-white/5 py-8">
      <p className="text-center text-xs text-blue-300/50 uppercase tracking-widest font-[Inter,sans-serif] mb-5">
        As Seen On
      </p>
      <div className="flex justify-center px-4">
        <img
          src={asSeenOn}
          alt="As Seen On – FOX, USA Today, and more"
          className="max-w-md w-full opacity-50"
        />
      </div>
    </div>
  );
}
