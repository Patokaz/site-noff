/*
  Tela de abertura (Abertura.tsx). O estado fica no <html data-abertura>:
    "cobrindo" → tela preta com o N sendo traçado (a rolagem fica travada);
    "saindo"   → a tela se abre revelando o site;
    sem o atributo → site normal.

  Uma vez por visita: aba nova = visita nova; atualizar a página não repete.
  Página aberta numa aba em segundo plano: a tela espera parada (data-abertura-espera)
  e o desenho começa quando a pessoa chega na aba.
  Quem pede "reduzir movimento" no sistema, ou está sem JavaScript, entra direto no site.
*/
export const CHAVE_ABERTURA = "noff-abertura-vista";
// Disparado no <video> do topo quando o navegador não deixa ele tocar (Hero.tsx).
export const EVENTO_SEM_VIDEO = "noff-sem-video";

// Tempo do desenho do N até ficar preenchido (ver "Abertura" em globals.css).
const MINIMO_MS = 2300;
// Se a página demorar, abre assim mesmo.
const MAXIMO_MS = 5000;

/*
  Roda no HTML, antes do primeiro desenho da tela (sem esperar o JavaScript do site).
  Abre a tela quando o desenho termina E a página terminou de carregar E o vídeo do topo
  (que só começa a baixar depois do resto, ver Hero.tsx) já pode tocar; ou no tempo máximo.
*/
export const SCRIPT_ABERTURA = `(function () {
  try {
    var html = document.documentElement;
    if (
      sessionStorage.getItem("${CHAVE_ABERTURA}") ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    sessionStorage.setItem("${CHAVE_ABERTURA}", "1");
    html.setAttribute("data-abertura", "cobrindo");

    var fim = function () { html.removeAttribute("data-abertura"); };
    var saiu = false;
    var sair = function () {
      if (saiu) return;
      saiu = true;
      html.setAttribute("data-abertura", "saindo");
      setTimeout(fim, 1000);
    };
    document.addEventListener("animationend", function (e) {
      if (e.animationName === "abertura-sai") fim();
    });

    var falta = 3;
    var pronto = function () { if (--falta === 0) sair(); };
    addEventListener("load", pronto, { once: true });
    document.addEventListener("DOMContentLoaded", function () {
      var video = document.querySelector("#topo video");
      if (!video || video.readyState >= 3) return pronto();
      var feito = false;
      var ok = function () { if (!feito) { feito = true; pronto(); } };
      video.addEventListener("canplay", ok);
      video.addEventListener("${EVENTO_SEM_VIDEO}", ok);
      // Erro na última fonte = nenhuma versão do vídeo carregou
      var fontes = video.querySelectorAll("source");
      if (fontes.length) fontes[fontes.length - 1].addEventListener("error", ok);
    });

    var comecar = function () {
      html.removeAttribute("data-abertura-espera");
      setTimeout(pronto, ${MINIMO_MS});
      setTimeout(sair, ${MAXIMO_MS});
    };
    if (document.visibilityState !== "hidden") comecar();
    else {
      html.setAttribute("data-abertura-espera", "");
      var aoVer = function () {
        if (document.visibilityState === "hidden") return;
        document.removeEventListener("visibilitychange", aoVer);
        comecar();
      };
      document.addEventListener("visibilitychange", aoVer);
    }
  } catch (e) {}
})();`;
