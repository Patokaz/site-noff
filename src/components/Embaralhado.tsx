"use client";

import { useEffect, useState } from "react";
import { usePrefereMenosMovimento } from "@/lib/movimento";

// Letras sorteadas durante o embaralhamento (sem as muito largas, para não invadir a palavra vizinha).
const SORTEIO = "abcdefghijklnopqrstuvxyz";
const DURACAO_MS = 700;
const QUADRO_MS = 30;

/*
  Texto em destaque que aparece "embaralhado" e se acerta da esquerda para a direita.
  Espera apagado até `comecar` + `atrasoMs`. Quem pede "reduzir movimento" vê o texto pronto.
*/
export function Embaralhado({ texto, comecar, atrasoMs, className }: { texto: string; comecar: boolean; atrasoMs: number; className?: string }) {
  const reduzir = usePrefereMenosMovimento();
  const [acertadas, setAcertadas] = useState(-1); // -1 = esperando a vez
  const [sorteio, setSorteio] = useState<string[]>([]);
  const terminou = reduzir || acertadas >= texto.length;

  useEffect(() => {
    if (!comecar || terminou) return;
    const passo = texto.length / (DURACAO_MS / QUADRO_MS);
    const t = setTimeout(
      () => {
        setAcertadas((n) => Math.max(n, 0) + (n < 0 ? 0 : passo));
        setSorteio(Array.from(texto, () => SORTEIO[Math.floor(Math.random() * SORTEIO.length)]));
      },
      acertadas < 0 ? atrasoMs : QUADRO_MS,
    );
    return () => clearTimeout(t);
  }, [comecar, terminou, acertadas, atrasoMs, texto]);

  if (terminou) return <strong className={className}>{texto}</strong>;

  // Cada palavra guarda o próprio espaço (texto real invisível) e o embaralhado fica por cima.
  const palavras = texto.split(" ").map((palavra, p, todas) => ({
    palavra,
    inicio: todas.slice(0, p).reduce((soma, w) => soma + w.length + 1, 0),
  }));
  return (
    <strong className={`${className} ${acertadas < 0 ? "opacity-40" : ""} transition-opacity duration-300`}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden>
        {palavras.map(({ palavra, inicio }, p) => {
          return (
            <span key={p}>
              {p > 0 && " "}
              <span className="relative inline-block">
                <span className="invisible">{palavra}</span>
                <span className="absolute inset-0 whitespace-nowrap">
                  {Array.from(palavra, (letra, i) => (acertadas < 0 || inicio + i < acertadas ? letra : (sorteio[inicio + i] ?? letra)))}
                </span>
              </span>
            </span>
          );
        })}
      </span>
    </strong>
  );
}
