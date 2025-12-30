import Link from "next/link";

export default function FiltersButton() {
  return (
    <Link
      href="/admin/filtros"
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
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 18H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 12h7.5"
          />
        </svg>
      </div>
      <span className="text-[10px] font-black text-dark-blue uppercase tracking-widest hidden md:inline">
        Filtros
      </span>
    </Link>
  );
}
