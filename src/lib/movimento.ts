import { useSyncExternalStore } from "react";
import { useMidia } from "./midia";

/*
  true quando a pessoa pede "reduzir movimento" no sistema. Diferente do useReducedMotion
  do Motion (que lê uma vez só), este acompanha a mudança com a página aberta.
*/
export function usePrefereMenosMovimento() {
  return useMidia("(prefers-reduced-motion: reduce)");
}

// Acompanha o <html data-abertura> (estados em src/lib/abertura.ts).
function inscreverAbertura(avisar: () => void) {
  const observador = new MutationObserver(avisar);
  observador.observe(document.documentElement, { attributes: true, attributeFilter: ["data-abertura"] });
  return () => observador.disconnect();
}

/*
  true enquanto a tela de abertura cobre o site. As entradas das seções esperam ela
  começar a abrir, para acontecerem à vista e não escondidas atrás dela.
*/
export function useAberturaCobrindo() {
  return useSyncExternalStore(
    inscreverAbertura,
    () => document.documentElement.getAttribute("data-abertura") === "cobrindo",
    () => false,
  );
}
