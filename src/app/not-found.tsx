import type { Metadata } from "next";
import Link from "next/link";
import { paginaNaoEncontrada as pagina } from "@/content/site";
import { SimboloN } from "@/components/SimboloN";

export const metadata: Metadata = { title: pagina.tituloAba };

/*
  Página de erro (endereço que não existe). No site publicado vira out/404.html, que o
  Netlify mostra sozinho. O N se desenha como na abertura, com a luz roxa do Contato ao fundo.
*/
export default function NaoEncontrada() {
  return (
    <main className="simbolo-tracado relative isolate flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 text-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgb(145_37_217/0.28),transparent_70%)]"
      />
      <SimboloN id="erro-brilho" className="mb-2 w-[120px] max-celular:w-[96px]" />
      <p className="text-[0.8125rem] font-semibold tracking-[0.2em] text-noff-roxo-claro uppercase">{pagina.rotulo}</p>
      {/* Sublinhado já desenhado (data-visivel), como os títulos das seções */}
      <h1 data-visivel className="sublinhado-centro px-6 text-[3rem] leading-tight font-bold [--sublinhado-espessura:.3rem] max-celular:text-[2rem]">
        {pagina.titulo}
      </h1>
      <p className="max-w-md text-[1.125rem] text-noff-creme/75 max-celular:text-[1rem]">{pagina.texto}</p>
      <Link
        href="/"
        className="mt-4 rounded-2xl bg-noff-roxo px-8 py-4 text-[1.125rem] font-bold text-noff-branco transition-[translate,background-color,box-shadow] duration-300 ease-suave hover:-translate-y-0.5 hover:bg-noff-roxo-escuro hover:shadow-[0_12px_30px_-10px_var(--color-noff-roxo)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-noff-roxo-claro active:translate-y-0"
      >
        {pagina.botao}
      </Link>
    </main>
  );
}
