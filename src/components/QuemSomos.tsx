"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useAberturaCobrindo, usePrefereMenosMovimento } from "@/lib/movimento";
import { marca, quemSomos } from "@/content/site";
import { Embaralhado } from "./Embaralhado";
import { Reveal } from "./Reveal";

const realce = "font-semibold text-noff-roxo-claro";
// Intervalo entre um destaque e o próximo na cascata de embaralhamento.
const INTERVALO_CASCATA_MS = 450;

type Parte = { texto: string; ordem?: number };

// Separa "texto **destaque** texto" em partes; cada destaque recebe sua posição na cascata (ordem).
function partes(paragrafos: readonly string[]): Parte[][] {
  let ordem = 0;
  return paragrafos.map((texto) =>
    texto.split(/\*\*(.+?)\*\*/g).map((parte, i) => (i % 2 === 1 ? { texto: parte, ordem: ordem++ } : { texto: parte })),
  );
}

const [primeiro, segundo] = partes(quemSomos.paragrafos);

// Ordem e recuo da v1, com letra mais leve, palavras-chave em roxo e o "N" da NOFF ao fundo.
export function QuemSomos() {
  const secaoRef = useRef<HTMLElement>(null);
  const textoRef = useRef<HTMLDivElement>(null);
  const reduzir = usePrefereMenosMovimento();
  // O "N" anda um pouco mais devagar que a página (parallax)
  const { scrollYProgress } = useScroll({ target: secaoRef, offset: ["start end", "end start"] });
  const yN = useTransform(scrollYProgress, [0, 1], reduzir ? [0, 0] : [-80, 80]);
  // Os destaques embaralham em cascata quando os parágrafos aparecem na tela (e a abertura já saiu da frente)
  const naTela = useInView(textoRef, { once: true, margin: "0px 0px -20% 0px" });
  const cobrindo = useAberturaCobrindo();
  const comecar = naTela && !cobrindo;

  const paragrafo = (lista: Parte[]) =>
    lista.map((p, i) =>
      p.ordem === undefined ? (
        p.texto
      ) : (
        <Embaralhado key={i} texto={p.texto} comecar={comecar} atrasoMs={400 + p.ordem * INTERVALO_CASCATA_MS} className={realce} />
      ),
    );

  return (
    <section ref={secaoRef} id="us" className="relative isolate mx-auto flex max-w-[90rem] flex-col overflow-hidden px-8 py-20 max-tablet:px-4 max-tablet:py-12">
      {/* "N" grande e quase transparente, inteiro dentro da seção */}
      <motion.div
        aria-hidden
        style={reduzir ? undefined : { y: yN }}
        className="pointer-events-none absolute top-1/2 right-8 -z-10 w-[28rem] -translate-y-1/2 opacity-[0.04] max-tablet:right-4 max-tablet:w-[18rem]"
      >
        <Image src={marca.simbolo.src} alt="" className="w-full" />
      </motion.div>

      <Reveal
        as="h2"
        className="sublinhado w-fit self-start pr-12 text-[3rem] font-bold [--sublinhado-ate:65%] max-celular:sublinhado-centro max-celular:self-center max-celular:px-6 max-celular:text-[2rem] max-celular:[--sublinhado-espessura:.3rem]"
      >
        {quemSomos.titulo}
      </Reveal>

      <div ref={textoRef} className="flex flex-col gap-6 pt-8 pl-[18vw] text-[1.375rem] leading-relaxed text-noff-creme/85 max-tablet:pl-0 max-celular:text-[1.0625rem]">
        <Reveal as="p">{paragrafo(primeiro)}</Reveal>
        <Reveal as="p" ordem={1} className="text-[1.15em] font-semibold text-noff-creme">
          {quemSomos.destaque}
        </Reveal>
        <Reveal as="p" ordem={2}>
          {paragrafo(segundo)}
        </Reveal>
      </div>
    </section>
  );
}
