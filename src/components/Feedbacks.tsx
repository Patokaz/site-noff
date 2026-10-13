"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, type PanInfo } from "motion/react";
import { usePrefereMenosMovimento } from "@/lib/movimento";
import { useMidia } from "@/lib/midia";
import { Quote } from "lucide-react";
import { feedbacks } from "@/content/site";
import { CURVA_SUAVE } from "@/lib/animacao";
import { comDestaque } from "@/lib/texto";
import { FundoFeedback } from "./FundoFeedback";
import { Reveal } from "./Reveal";

// Tempo de cada depoimento na troca automática.
const INTERVALO_MS = 7000;
const total = feedbacks.depoimentos.length;

// Altura do conteúdo, acompanhada enquanto ele muda (para a caixa crescer/encolher com suavidade).
function useAltura() {
  const ref = useRef<HTMLDivElement>(null);
  const [altura, setAltura] = useState<number | "auto">("auto");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setAltura(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, altura] as const;
}

// Tela de toque (para o gesto de deslizar só existir no celular/tablet).
const useToque = () => useMidia("(pointer: coarse)");

export function Feedbacks() {
  const [ativo, setAtivo] = useState(0);
  const [direcao, setDirecao] = useState(1);
  const [mouseEmCima, setMouseEmCima] = useState(false);
  const [pessoaAssumiu, setPessoaAssumiu] = useState(false);
  const [conteudoRef, altura] = useAltura();
  const secaoRef = useRef<HTMLElement>(null);
  const naTela = useInView(secaoRef, { amount: 0.3 });
  const reduzirMovimento = usePrefereMenosMovimento();
  const toque = useToque();

  // Troca automática: para de vez quando a pessoa clica/desliza, pausa com o mouse em cima ou fora da tela.
  const automatico = !pessoaAssumiu && !reduzirMovimento;
  const rodando = automatico && naTela && !mouseEmCima;
  const depoimento = feedbacks.depoimentos[ativo];

  function irPara(i: number, dir = i > ativo ? 1 : -1) {
    setDirecao(dir);
    setAtivo((i + total) % total);
  }

  function escolher(i: number) {
    setPessoaAssumiu(true);
    if (i !== ativo) irPara(i);
  }

  function aoDeslizar(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) < 60) return;
    setPessoaAssumiu(true);
    irPara(ativo + (info.offset.x < 0 ? 1 : -1), info.offset.x < 0 ? 1 : -1);
  }

  return (
    <section
      ref={secaoRef}
      id="feedbacks"
      onPointerEnter={(e) => e.pointerType === "mouse" && setMouseEmCima(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setMouseEmCima(false)}
      className="mx-auto flex max-w-[90rem] flex-col items-center gap-16 px-8 py-20 max-tablet:px-4 max-tablet:py-12 max-celular:gap-10 max-celular:px-3"
    >
      <Reveal
        as="h2"
        className="sublinhado w-1/4 self-start text-[3rem] font-bold max-celular:sublinhado-centro max-celular:w-3/5 max-celular:self-center max-celular:text-center max-celular:text-[2rem] max-celular:[--sublinhado-espessura:.3rem]"
      >
        {feedbacks.titulo}
      </Reveal>

      {/* Logos (visual da v1): quadrados brancos; o escolhido cresce e ganha sombra roxa */}
      <div className="flex justify-center gap-12 max-tablet:gap-8 max-celular:flex-wrap max-celular:gap-x-4 max-celular:gap-y-8">
        {feedbacks.depoimentos.map((d, i) => {
          const atual = ativo === i;
          return (
            <Reveal key={d.empresa} ordem={i} className="relative">
              <button
                type="button"
                aria-pressed={atual}
                aria-label={d.empresa}
                onClick={() => escolher(i)}
                className={`flex size-48 cursor-pointer items-center justify-center rounded-3xl bg-noff-branco p-4 transition-[scale,box-shadow] duration-500 ease-suave max-tablet:size-28 max-tablet:p-3 max-celular:size-24 max-celular:rounded-2xl max-celular:p-2.5 ${
                  atual
                    ? "scale-125 shadow-[0_15px_30px_-5px_var(--color-noff-roxo)] max-celular:scale-110"
                    : "hover:scale-105 hover:shadow-[0_15px_30px_-15px_var(--color-noff-roxo)]"
                }`}
              >
                <Image src={d.logo.src} alt={d.logo.alt} className="size-full object-contain" />
              </button>

              {/* Progresso até o próximo depoimento (abaixo do logo já aumentado) */}
              {atual && automatico && (
                <span aria-hidden className="absolute inset-x-4 -bottom-9 h-0.5 overflow-hidden rounded-full bg-white/15 max-tablet:-bottom-6 max-celular:inset-x-2 max-celular:-bottom-4">
                  <span
                    key={ativo}
                    onAnimationEnd={() => irPara(ativo + 1, 1)}
                    className="block h-full origin-left rounded-full bg-noff-roxo"
                    style={{ animation: `progresso ${INTERVALO_MS}ms linear forwards`, animationPlayState: rodando ? "running" : "paused" }}
                  />
                </span>
              )}
            </Reveal>
          );
        })}
      </div>

      <Reveal className="relative isolate w-full max-w-[72rem] overflow-hidden rounded-[3rem] bg-noff-roxo p-12 max-tablet:p-8 max-celular:rounded-[2rem] max-celular:p-5">
        <FundoFeedback />
        <Quote aria-hidden className="mb-6 size-12 fill-white/25 text-white/25 max-celular:mb-4 max-celular:size-8" />

        <motion.div animate={{ height: altura }} transition={{ duration: 0.5, ease: CURVA_SUAVE }}>
          <div ref={conteudoRef}>
            <AnimatePresence mode="wait" initial={false} custom={direcao}>
              <motion.figure
                key={ativo}
                custom={direcao}
                variants={{
                  entra: (dir: number) => ({ opacity: 0, x: 24 * dir, filter: "blur(4px)" }),
                  visivel: { opacity: 1, x: 0, filter: "blur(0px)" },
                  sai: (dir: number) => ({ opacity: 0, x: -24 * dir, filter: "blur(4px)" }),
                }}
                initial="entra"
                animate="visivel"
                exit="sai"
                transition={{ duration: 0.3, ease: CURVA_SUAVE }}
                // No celular, deslizar o dedo passa para o próximo/anterior
                drag={toque ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={aoDeslizar}
              >
                <blockquote className="text-[1.25rem] leading-relaxed max-celular:text-[1.0625rem]">
                  <p>{comDestaque(depoimento.texto)}</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 max-celular:mt-6">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-noff-branco p-1.5">
                    <Image src={depoimento.logo.src} alt="" className="size-full object-contain" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-bold">{depoimento.autor}</span>
                    <span className="text-[0.9375rem] text-noff-creme/90">{depoimento.empresa}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
