"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { marca, menu } from "@/content/site";

// Qual seção está na tela: a última cujo topo já passou de 40% da altura da janela.
function secaoAtual() {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) return menu.at(-1)?.href;
  let atual: string | undefined;
  for (const item of menu) {
    const secao = document.querySelector(item.href);
    if (secao && secao.getBoundingClientRect().top <= window.innerHeight * 0.4) atual = item.href;
  }
  return atual;
}

export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [ativo, setAtivo] = useState<string>();

  useEffect(() => {
    const atualizar = () => {
      setRolou(window.scrollY > 10);
      setAtivo(secaoAtual());
    };
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, []);

  return (
    // No topo a barra é transparente sobre o vídeo; ao rolar fica escura, desfocada e mais baixa.
    <header
      className={`fixed top-0 left-0 z-[1000] flex w-full items-center justify-around transition-[height,background-color,backdrop-filter] duration-500 ease-suave max-tablet:h-20 max-tablet:justify-between max-tablet:px-6 ${
        rolou || aberto
          ? "h-[clamp(56px,4vw,72px)] bg-noff-preto/80 backdrop-blur-md max-tablet:bg-noff-preto/90"
          : "h-[clamp(64px,5vw,88px)] bg-transparent max-tablet:bg-noff-preto"
      }`}
    >
      <a href="#topo">
        <Image
          src={marca.simbolo.src}
          alt={marca.simbolo.alt}
          loading="eager"
          className={`w-auto transition-[height] duration-500 ease-suave max-tablet:h-16 ${
            rolou ? "h-[clamp(38px,2.8vw,48px)]" : "h-[clamp(44px,3.5vw,60px)]"
          }`}
        />
      </a>

      {/* No celular o menu desce com fade e fecha ao tocar num link */}
      <nav
        aria-label="Menu principal"
        className={`flex items-center gap-16 max-tablet:absolute max-tablet:top-full max-tablet:left-0 max-tablet:w-full max-tablet:flex-col max-tablet:gap-8 max-tablet:bg-noff-preto max-tablet:py-8 max-tablet:transition-[opacity,translate,visibility] max-tablet:duration-300 max-tablet:ease-suave ${
          aberto ? "max-tablet:visible max-tablet:opacity-100" : "max-tablet:invisible max-tablet:-translate-y-3 max-tablet:opacity-0"
        }`}
      >
        {menu.map((item) => {
          const atual = ativo === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={atual ? "location" : undefined}
              onClick={() => setAberto(false)}
              // Traço roxo que desliza por baixo no hover e fica embaixo da seção atual
              className={`relative font-display text-[1.5rem] transition-colors duration-300 ease-suave after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-noff-roxo after:transition-transform after:duration-500 after:ease-suave hover:text-noff-roxo hover:after:scale-x-100 ${
                atual ? "text-noff-roxo after:scale-x-100" : "text-noff-branco after:scale-x-0"
              }`}
            >
              {item.texto}
            </a>
          );
        })}
      </nav>

      {/* ☰ que vira ✕ */}
      <button
        type="button"
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={aberto}
        onClick={() => setAberto((v) => !v)}
        className="relative hidden size-10 cursor-pointer max-tablet:block"
      >
        {[-8, 0, 8].map((deslocamento, i) => (
          <span
            key={i}
            style={{ "--y": `${deslocamento}px` } as CSSProperties}
            className={`absolute top-1/2 left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-noff-branco transition-[translate,rotate,opacity] duration-500 ease-suave ${
              aberto
                ? i === 1
                  ? "opacity-0"
                  : `-translate-y-1/2 ${i === 0 ? "rotate-45" : "-rotate-45"}`
                : "translate-y-[calc(var(--y)-50%)]"
            }`}
          />
        ))}
      </button>
    </header>
  );
}
