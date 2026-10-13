import { SCRIPT_ABERTURA } from "@/lib/abertura";
import { ScriptInline } from "./ScriptInline";
import { SimboloN } from "./SimboloN";

/*
  Abertura: tela preta com o símbolo N da NOFF sendo traçado em roxo e preenchido de creme;
  depois a tela se abre revelando o site. Quando e se ela aparece: src/lib/abertura.ts.
  O desenho é só CSS (SimboloN + "Abertura" em globals.css), então começa no primeiro quadro da página.
*/
export function Abertura() {
  return (
    <>
      <ScriptInline codigo={SCRIPT_ABERTURA} />
      <div aria-hidden className="abertura fixed inset-0 z-[2000] items-center justify-center bg-noff-preto">
        <SimboloN id="abertura-brilho" className="abertura-simbolo w-[160px] max-celular:w-[120px]" />
      </div>
    </>
  );
}
