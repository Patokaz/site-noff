"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/*
  Movimento do site inteiro:
  - rolagem suave (Lenis), inclusive nos links internos (#...), que param abaixo do menu fixo
    (scroll-padding-top em globals.css);
  - quem pede "reduzir movimento" no sistema fica sem deslocamentos e sem rolagem suave.
*/
export function Movimento({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      // Com a tela de abertura na frente, a rolagem fica travada (ver globals.css)
      virtualScroll: () => !document.documentElement.hasAttribute("data-abertura"),
    });

    // Links para seções da página: cancela o salto seco do navegador, rola com suavidade e,
    // ao chegar, leva o foco para a seção (quem usa teclado ou leitor de tela continua dali).
    const aoClicar = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.('a[href^="#"]');
      const destino = link?.getAttribute("href");
      const alvo = destino && destino !== "#" ? document.querySelector<HTMLElement>(destino) : null;
      if (!alvo) return;
      e.preventDefault();
      lenis.scrollTo(alvo, {
        onComplete: () => {
          if (!alvo.hasAttribute("tabindex")) alvo.setAttribute("tabindex", "-1");
          alvo.focus({ preventScroll: true });
        },
      });
    };
    document.addEventListener("click", aoClicar);

    return () => {
      document.removeEventListener("click", aoClicar);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
