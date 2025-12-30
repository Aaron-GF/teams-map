import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "Teams Map",
    template: "%s | Teams Map",
  },
  description:
    "Aplicación que muestra información sobre los equipos de fútbol de categorías infantiles de Galicia usando un mapa interactivo dividido por municipios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <Providers>
          <Navbar />
          <div className="pt-24 md:pt-28">{children}</div>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
