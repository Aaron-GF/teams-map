import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";

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
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
