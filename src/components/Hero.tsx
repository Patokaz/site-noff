"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/content/site";
import { useAberturaCobrindo } from "@/lib/movimento";
import { EVENTO_SEM_VIDEO } from "@/lib/abertura";

/*
  true  = no computador o vídeo começa no topo da página, atrás do menu transparente.
  false = como na v1: o vídeo começa abaixo do menu.
*/
export const HERO_ATRAS_DO_MENU = true;

/*
  Vídeos feitos da matriz em Full HD ("animação site Noff (1).mp4", 1920x1080, 7,5 Mbps), só
  com o topo (o terço de baixo é vazio) e sem áudio, em H.264:
  - video-site.mp4 (computador): 1920x800, CRF 28, 5,5 MB, VMAF 97 contra a matriz;
  - video-site-celular.mp4 (até 840px): 1280x534, CRF 28, 3,0 MB, VMAF 97.
  (A versão anterior vinha do 720p já comprimido da v1 e tinha VMAF 76: perda acumulada.)
*/
const RECORTE = "aspect-[1280/534]";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // O vídeo (2,7 MB) só começa a baixar depois que a página carregou, para não disputar a
  // conexão com o resto; até lá aparece a capa. O React não escreve `muted` no HTML, e sem ele
  // alguns navegadores bloqueiam o play.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const tocar = () => {
      video.preload = "auto";
      // Navegador que bloqueia o vídeo (ex.: economia de bateria no iPhone): avisa a abertura
      // para ela não ficar esperando; o topo fica com a capa.
      video.play().catch(() => video.dispatchEvent(new Event(EVENTO_SEM_VIDEO)));
    };
    if (document.readyState === "complete") tocar();
    else {
      window.addEventListener("load", tocar, { once: true });
      return () => window.removeEventListener("load", tocar);
    }
  }, []);

  // O vídeo já roda atrás da tela de abertura; quando ela abre, ele recomeça do início.
  const cobrindo = useAberturaCobrindo();
  const cobriu = useRef(false);
  useEffect(() => {
    const video = videoRef.current;
    if (cobrindo) cobriu.current = true;
    else if (cobriu.current && video) {
      cobriu.current = false;
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [cobrindo]);

  return (
    <section
      id="topo"
      className={`relative w-full overflow-hidden ${RECORTE} max-h-svh max-tablet:mt-[calc(5vw+16px)] ${HERO_ATRAS_DO_MENU ? "" : "mt-[5vw]"}`}
    >
      <h1 className="sr-only">{hero.titulo}</h1>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={hero.capa}
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        className="h-full w-full object-cover object-top"
      >
        {/* O navegador fica com a primeira que servir: no celular, a versão menor */}
        <source src={hero.videoCelular} type="video/mp4" media="(max-width: 840px)" />
        <source src={hero.video} type="video/mp4" />
      </video>

      {/* Degradês: escurece atrás do menu e emenda a base do vídeo no fundo da página */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-noff-preto/70 to-transparent max-tablet:hidden ${
          HERO_ATRAS_DO_MENU ? "" : "hidden"
        }`}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[8%] bg-linear-to-t from-noff-preto to-transparent" />
    </section>
  );
}
