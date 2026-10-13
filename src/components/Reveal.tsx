"use client";

import { useRef, type CSSProperties, type MouseEventHandler, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { variantesEntrada } from "@/lib/animacao";
import { useAberturaCobrindo } from "@/lib/movimento";

const tags = { div: motion.div, p: motion.p, section: motion.section, h2: motion.h2 };

type RevealProps = {
  as?: keyof typeof tags;
  /** Posição dentro do grupo: cada item entra um pouco depois do anterior. */
  ordem?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLElement>;
  children: ReactNode;
};

/*
  Entrada ao rolar: anima uma vez, quando o elemento chega perto do fim da tela.
  O jeito de entrar está em src/lib/animacao.ts. Quando aparece, o elemento ganha
  data-visivel (o sublinhado dos títulos usa isso para se desenhar).
  Com a tela de abertura na frente, espera ela começar a abrir.
*/
export function Reveal({ as = "div", ordem = 0, children, ...resto }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const naTela = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const cobrindo = useAberturaCobrindo();
  const visivel = naTela && !cobrindo;
  const Tag = tags[as];

  return (
    <Tag
      // @ts-expect-error o ref serve para qualquer uma das tags acima
      ref={ref}
      initial="oculto"
      animate={visivel ? "visivel" : "oculto"}
      variants={variantesEntrada(ordem)}
      data-visivel={visivel || undefined}
      {...resto}
    >
      {children}
    </Tag>
  );
}
