import Link from "next/link";

export default function GestionButton() {
  return (
    <Link
      href="/admin/gestion"
      className="flex items-center gap-2 px-6 py-2.5 bg-white/50 border border-white hover:border-blue-celta/30 hover:bg-white transition-all rounded-xl shadow-sm group"
    >
      <div className="size-6 rounded-lg bg-linear-to-br from-blue-celta/10 to-dark-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-3.5 text-blue-celta"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <span className="text-[10px] font-black text-dark-blue uppercase tracking-widest hidden md:inline">
        Gestión
      </span>
    </Link>
  );
}
