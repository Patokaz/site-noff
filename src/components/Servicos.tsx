"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { servicos } from "@/content/site";
import { useMidia } from "@/lib/midia";
import { Reveal } from "./Reveal";

type Servico = (typeof servicos.itens)[number];

// No celular (até 840px) os cards viram sanfona: um aberto por vez. O primeiro já começa
// aberto, para a pessoa ver que tem conteúdo ali e se animar a abrir os outros.
const CELULAR = "(max-width: 840px)";

const useEhCelular = () => useMidia(CELULAR);

export function Servicos() {
  const ehCelular = useEhCelular();
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <section id="servicos" className="mx-auto flex max-w-[90rem] flex-col gap-12 px-8 pt-4 pb-20 max-tablet:px-4 max-tablet:pb-12 max-celular:gap-8">
      <Reveal
        as="h2"
        className="sublinhado w-1/4 self-start text-[3rem] font-bold max-celular:sublinhado-centro max-celular:w-3/5 max-celular:self-center max-celular:text-center max-celular:text-[2rem] max-celular:[--sublinhado-espessura:.3rem]"
      >
        {servicos.titulo}
      </Reveal>

      <div className="grid grid-cols-4 gap-6 max-tablet:grid-cols-2 max-celular:grid-cols-1 max-celular:gap-4">
        {servicos.itens.map((servico, i) => (
          <Reveal key={servico.titulo} ordem={i} className="h-full">
            <CardServico
              servico={servico}
              ehCelular={ehCelular}
              aberto={ehCelular && aberto === i}
              alternar={() => setAberto((atual) => (atual === i ? null : i))}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

type CardProps = { servico: Servico; ehCelular: boolean; aberto: boolean; alternar: () => void };

function CardServico({ servico, ehCelular, aberto, alternar }: CardProps) {
  const Icone = servico.icone;
  const Cabecalho = ehCelular ? "button" : "div";
  const idTexto = `servico-${servico.titulo.toLowerCase().replace(/\W+/g, "-")}`;

  const conteudo = (
    <>
      <Cabecalho
        {...(ehCelular && { type: "button" as const, onClick: alternar, "aria-expanded": aberto, "aria-controls": idTexto })}
        className="flex w-full flex-col items-start gap-5 text-left max-celular:cursor-pointer max-celular:flex-row max-celular:items-center max-celular:gap-4"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-noff-roxo/15 text-noff-roxo-claro ring-1 ring-noff-roxo/30">
          <Icone className="size-6" strokeWidth={1.75} aria-hidden />
        </span>
        <h3 className="text-[1.5rem] leading-tight font-bold max-celular:text-[1.25rem]">{servico.titulo}</h3>
        {ehCelular && (
          <ChevronDown
            aria-hidden
            className={`ml-auto size-5 shrink-0 transition-transform duration-500 ease-suave ${aberto ? "rotate-180" : ""}`}
          />
        )}
      </Cabecalho>

      {/* No celular o texto abre e fecha; no computador fica sempre visível */}
      <div
        id={idTexto}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-suave ${
          ehCelular && !aberto ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pt-4 text-[1.0625rem] leading-relaxed text-noff-creme/80 max-celular:text-[1rem]">{servico.texto}</p>
        </div>
      </div>
    </>
  );

  // Degradê roxo suave na base e borda fina; no hover o card sobe e a borda acende.
  return (
    <div className="h-full rounded-[2rem] border border-white/10 bg-[linear-gradient(to_bottom,transparent_30%,rgb(145_37_217/0.45))] p-8 transition-[translate,border-color,box-shadow] duration-500 ease-suave hover:-translate-y-1 hover:border-noff-roxo/60 hover:shadow-[0_24px_48px_-24px_var(--color-noff-roxo)] max-celular:p-5 max-celular:hover:translate-y-0">
      {conteudo}
    </div>
  );
}
