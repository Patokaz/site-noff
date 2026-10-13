import { Header } from "@/components/Header";
import { Hero, HERO_ATRAS_DO_MENU } from "@/components/Hero";
import { Servicos } from "@/components/Servicos";
import { Feedbacks } from "@/components/Feedbacks";
import { QuemSomos } from "@/components/QuemSomos";
import { Faixa } from "@/components/Faixa";
import { Contato } from "@/components/Contato";
import { Rodape } from "@/components/Rodape";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";
import { Movimento } from "@/components/Movimento";
import { Abertura } from "@/components/Abertura";
import { acessibilidade } from "@/content/site";

// Barra do teste local (rever a abertura, comparar opções): nem entra no site publicado.
const SeletorDev = process.env.NODE_ENV === "development" ? (await import("@/components/SeletorDev")).SeletorDev : null;

// Ordem das seções do site, de cima para baixo.
export default function Home() {
  return (
    <Movimento>
      <Abertura />
      {/* Invisível; aparece no canto ao apertar Tab pela primeira vez e pula o menu */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1002] focus:rounded-full focus:bg-noff-roxo focus:px-5 focus:py-3 focus:font-semibold focus:text-noff-branco focus:shadow-lg"
      >
        {acessibilidade.pularParaConteudo}
      </a>
      <Header />
      {/* Fundo próprio e camada acima do rodapé revelado: a página passa por cima dele */}
      <main id="conteudo" className="relative z-[1] bg-noff-preto">
        {/* Respiro abaixo do menu fixo (na v1 eram duas quebras de linha). Com o hero atrás do menu, só no celular. */}
        <div aria-hidden className={`h-[50px] ${HERO_ATRAS_DO_MENU ? "hidden max-tablet:block" : ""}`} />
        <Hero />
        <Servicos />
        <Feedbacks />
        <QuemSomos />
        <Faixa />
        <Contato />
      </main>
      <Rodape anoDoBuild={new Date().getFullYear()} />
      <WhatsAppFlutuante />
      {SeletorDev && <SeletorDev />}
    </Movimento>
  );
}
