"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { usePrefereMenosMovimento } from "@/lib/movimento";

/*
  Fundo da caixa roxa do depoimento: linhas claras e onduladas que se movem devagar.
  Pausa fora da tela e fica parado para quem pede "reduzir movimento".
*/
export function FundoFeedback() {
  return <CanvasAnimado desenho={ondas} />;
}

type Desenho = (ctx: CanvasRenderingContext2D, largura: number, altura: number, tempo: number, dt: number, estado: Map<string, unknown>) => void;

// Canvas que redesenha a cada quadro enquanto está na tela.
function CanvasAnimado({ desenho }: { desenho: Desenho }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const naTela = useInView(ref);
  const reduzir = usePrefereMenosMovimento();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const estado = new Map<string, unknown>();
    let largura = 0;
    let altura = 0;
    const ajustar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = canvas.clientWidth;
      altura = canvas.clientHeight;
      canvas.width = largura * dpr;
      canvas.height = altura * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      estado.clear();
    };
    ajustar();
    const observer = new ResizeObserver(() => {
      ajustar();
      desenho(ctx, largura, altura, performance.now(), 0, estado);
    });
    observer.observe(canvas);

    let quadro = 0;
    let anterior = performance.now();
    const passo = (agora: number) => {
      desenho(ctx, largura, altura, agora, agora - anterior, estado);
      anterior = agora;
      quadro = requestAnimationFrame(passo);
    };
    if (naTela && !reduzir) quadro = requestAnimationFrame(passo);
    else desenho(ctx, largura, altura, 4000, 0, estado);

    return () => {
      cancelAnimationFrame(quadro);
      observer.disconnect();
    };
  }, [desenho, naTela, reduzir]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 -z-10 size-full" />;
}

// Linhas onduladas claras que se movem devagar (evolução das linhas da v1).
const ondas: Desenho = (ctx, w, h, t) => {
  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = 1.5;
  const linhas = 7;
  for (let i = 0; i < linhas; i++) {
    const base = h * (0.18 + (i / (linhas - 1)) * 0.64);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 6) {
      const y =
        base +
        Math.sin(x * 0.0035 + t * 0.00035 * (1 + i * 0.12) + i * 0.9) * h * 0.09 +
        Math.sin(x * 0.009 - t * 0.00025 + i * 1.7) * h * 0.035;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + (i % 3) * 0.05})`;
    ctx.stroke();
  }
};
