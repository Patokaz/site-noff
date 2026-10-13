import Image from "next/image";
import { marca } from "@/content/site";

/*
  Assinatura entre o Quem Somos e o Contato: linha fina com o logo da NOFF no meio.
*/
export function Faixa() {
  return (
    <div aria-hidden className="mx-auto -mt-8 max-w-[90rem] px-8 max-tablet:-mt-4 max-tablet:px-4">
      <div className="flex h-[120px] items-center gap-6 max-tablet:h-20 max-tablet:gap-4">
        <span className="h-px flex-1 bg-noff-creme/15" />
        <Image src={marca.completo.src} alt="" className="h-7 w-auto max-tablet:h-6" />
        <span className="h-px flex-1 bg-noff-creme/15" />
      </div>
    </div>
  );
}
