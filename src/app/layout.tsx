import type { Metadata } from "next";
import { Boldonse, Poppins } from "next/font/google";
import { seo } from "@/content/site";
import "./globals.css";

// As fontes são baixadas no build e servidas pelo próprio site: nenhuma chamada ao Google na visita.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const boldonse = Boldonse({
  variable: "--font-boldonse",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: seo.titulo,
  description: seo.descricao,
  // Versão de teste: fora do Google (o public/_headers reforça com X-Robots-Tag).
  robots: { index: false, follow: false },
  openGraph: {
    url: seo.ogUrl,
    title: seo.ogTitulo,
    description: seo.descricao,
    images: [seo.ogImagem],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // suppressHydrationWarning: o script da Abertura marca o <html> antes do React carregar
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${boldonse.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
