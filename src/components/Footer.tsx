import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dark-blue border-t border-white/10 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-black uppercase tracking-tighter">
                Teams <span className="text-blue-celta">Map</span>
              </span>
            </Link>
            <p className="text-sm text-blue-celta/80 leading-relaxed font-medium">
              Explorando el fútbol base de Galicia municipio a municipio.
              Descubre los clubes y categorías infantiles.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-red-celta">
              Navegación
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-white/70 hover:text-blue-celta transition-colors"
              >
                Mapa Interactivo
              </Link>
              <Link
                href="https://github.com/Aaron-GF/teams-map"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-blue-celta transition-colors"
              >
                Sobre el Proyecto
              </Link>
              <Link
                href="www.linkedin.com/in/aaron-garcia-fernandez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-blue-celta transition-colors"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* Credits/Info */}
          <div className="flex flex-col gap-4 text-right md:text-left">
            <h4 className="text-sm font-black uppercase tracking-widest text-red-celta">
              Proyecto
            </h4>
            <p className="text-sm text-white/70 leading-normal">
              App desarrollada por{" "}
              <Link
                href="https://github.com/Aaron-GF"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-blue-celta">Aaron-GF</span>
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-celta/60">
            © {currentYear} Teams Map -{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-celta hover:text-blue-celta/80 transition-colors"
              title="Licencia Creative Commons BY-NC-SA 4.0"
            >
              CC BY-NC-SA 4.0
            </a>
          </p>
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">
            Galicia · Deporte · Base
          </span>
        </div>
      </div>
    </footer>
  );
}
