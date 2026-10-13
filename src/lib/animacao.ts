import type { Variants } from "motion/react";

/*
  Linguagem de movimento do site. Para ajustar a sensação geral, mexa aqui:
  curva, duração, distância e intervalo entre itens de um mesmo grupo.
*/
export const CURVA_SUAVE = [0.22, 1, 0.36, 1] as const;
export const DURACAO_ENTRADA = 0.6;
export const DISTANCIA_ENTRADA = 16;
export const DESFOQUE_ENTRADA = "blur(6px)";
export const INTERVALO_GRUPO = 0.08;

// Entrada ao rolar: aparece com leve desfoque e sobe um pouco.
export function variantesEntrada(ordem: number): Variants {
  return {
    oculto: { opacity: 0, y: DISTANCIA_ENTRADA, filter: DESFOQUE_ENTRADA },
    visivel: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transitionEnd: { filter: "none" },
      transition: { duration: DURACAO_ENTRADA, ease: CURVA_SUAVE, delay: ordem * INTERVALO_GRUPO },
    },
  };
}
