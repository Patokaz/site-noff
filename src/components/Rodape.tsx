"use client";

import { useSyncExternalStore, type FocusEvent } from "react";
import Image from "next/image";
import { contato, rodape } from "@/content/site";
import { LOGO_NOFF_CAMINHO, LOGO_NOFF_VIEWBOX } from "@/assets/marca/logo-noff";

/*
  Rodapé revelado: fica parado no fim da tela, atrás da página, e a página (com cantos
  arredondados, ver main:has em globals.css) sobe revelando ele no fim da rolagem.
  Camadas: rodapé z-0 e página (main) z-[1] por cima. Não usar z-index negativo aqui: o
  rodapé ficaria atrás do <body> e nenhum clique chegaria nos links.
  Logo "Noff" médio à esquerda com os direitos; menu, redes e contatos à direita.
*/
export function Rodape({ anoDoBuild }: { anoDoBuild: number }) {
  // Ano dos direitos: o do dia em que o site foi gerado; se o ano já virou, o navegador corrige.
  const ano = useSyncExternalStore(semInscricao, () => new Date().getFullYear(), () => anoDoBuild);

  return (
    <footer data-revelado onFocus={mostrarRodape} className="sticky bottom-0 z-0 bg-black">
      <div className="mx-auto flex max-w-[90rem] items-start justify-between gap-16 px-8 py-12 max-tablet:flex-col max-tablet:items-center max-tablet:gap-8 max-tablet:px-4 max-tablet:text-center">
        {/* No tablet/celular o "contents" solta logo e direitos na coluna única (direitos vão para o fim) */}
        <div className="flex flex-col gap-5 max-tablet:contents">
          <MarcaNoff className="w-[min(34rem,40vw)] max-tablet:w-full max-tablet:max-w-[28rem]" />
          <p className="text-[0.8125rem] text-noff-creme/55 max-tablet:order-last">{rodape.direitos(ano)}</p>
        </div>
        <div className="flex flex-col items-end gap-5 pt-2 max-tablet:items-center max-tablet:pt-0">
          <div className="flex items-center gap-8 max-tablet:flex-col max-tablet:gap-5">
            <MenuRapido />
            <Redes />
          </div>
          <Contatos />
        </div>
      </div>
    </footer>
  );
}

const semInscricao = () => () => {};

// Quem chega no rodapé pelo teclado (Tab) vai até o fim da página;
// senão o link focado ficaria escondido atrás do conteúdo.
function mostrarRodape(e: FocusEvent<HTMLElement>) {
  const pagina = document.querySelector("main");
  if (pagina && pagina.getBoundingClientRect().bottom > e.currentTarget.getBoundingClientRect().top + 1) {
    window.scrollTo(0, document.documentElement.scrollHeight);
  }
}

const link = "text-noff-creme/80 transition-colors duration-300 ease-suave hover:text-noff-roxo-claro";

function MenuRapido() {
  return (
    <nav aria-label={rodape.menuTitulo}>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 max-tablet:justify-center max-celular:gap-x-4 max-celular:text-[0.9375rem]">
        {rodape.menu.map((item) => (
          <li key={item.href}>
            <a href={item.href} className={link}>
              {item.texto}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Redes() {
  return (
    <div role="group" aria-label={rodape.redesTitulo} className="flex gap-3 max-tablet:justify-center">
      {rodape.redes.map((rede) => (
        <a
          key={rede.href}
          href={rede.href}
          target="_blank"
          rel="noopener"
          className="flex size-11 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition-[background-color,box-shadow] duration-300 ease-suave hover:bg-noff-roxo/15 hover:ring-noff-roxo/50"
        >
          <Image src={rede.icone} alt={rede.alt} className="size-6" />
        </a>
      ))}
    </div>
  );
}

// Telefone · e-mail numa linha (no celular, um embaixo do outro).
function Contatos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.9375rem] max-celular:flex-col">
      <a href={contato.telefone.href} className={link}>
        {contato.telefone.texto}
      </a>
      <span aria-hidden className="text-noff-creme/40 max-celular:hidden">
        ·
      </span>
      <a href={contato.email.href} className={link}>
        {contato.email.texto}
      </a>
    </div>
  );
}

// O logo "Noff" em vetor: creme apagado descendo para lilás, contorno leve e a luz roxa do Contato atrás.
function MarcaNoff({ className }: { className: string }) {
  return (
    <div className={`relative isolate ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] -inset-y-[30%] -z-10 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgb(145_37_217/0.3),transparent_70%)]"
      />
      <svg aria-hidden viewBox={LOGO_NOFF_VIEWBOX} className="h-auto w-full">
        <defs>
          <linearGradient id="marca-rodape" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fefce8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#b565f0" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d={LOGO_NOFF_CAMINHO}
          fill="url(#marca-rodape)"
          fillRule="evenodd"
          stroke="#fefce8"
          strokeOpacity={0.18}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
