import { useSyncExternalStore } from "react";

// Uma função de inscrição por consulta, sempre a mesma (o React não reinscreve a cada render).
const inscricoes = new Map<string, (avisar: () => void) => () => void>();

function inscrever(consulta: string) {
  let f = inscricoes.get(consulta);
  if (!f) {
    f = (avisar) => {
      const mq = window.matchMedia(consulta);
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    };
    inscricoes.set(consulta, f);
  }
  return f;
}

/*
  true quando a consulta de mídia vale (ex.: "(max-width: 840px)"), acompanhando mudanças
  com a página aberta. No HTML gerado no build vale sempre false.
*/
export function useMidia(consulta: string) {
  return useSyncExternalStore(
    inscrever(consulta),
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}
