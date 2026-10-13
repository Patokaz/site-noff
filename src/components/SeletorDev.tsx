"use client";

import { CHAVE_ABERTURA } from "@/lib/abertura";

/*
  Barra do teste local (não vai para o site publicado, ver page.tsx). Hoje só tem o botão
  de rever a abertura; quando houver opções para comparar, elas voltam para cá
  (src/lib/opcaoDev.ts, recriar com useOpcaoDev/escolherOpcaoDev).
*/
export function SeletorDev() {
  return (
    <div className="fixed bottom-4 left-1/2 z-[1001] -translate-x-1/2 rounded-3xl bg-black/80 p-1 text-[0.8rem] text-noff-branco shadow-lg backdrop-blur max-celular:left-3 max-celular:translate-x-0 max-celular:text-[0.7rem]">
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.removeItem(CHAVE_ABERTURA);
          } catch {}
          location.reload();
        }}
        className="cursor-pointer rounded-full px-3 py-1 transition-colors hover:bg-white/10"
      >
        ↻ Rever abertura
      </button>
    </div>
  );
}
