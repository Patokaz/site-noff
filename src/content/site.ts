/*
  Todo o texto do site mora aqui. Para trocar uma frase, um link ou um logo,
  edite este arquivo; os componentes só montam o visual.
  Negrito: escreva **assim** dentro dos textos dos feedbacks.
*/
import noffN from "@/assets/marca/noff-n-branco.webp";
import noffCompleto from "@/assets/marca/noff-completo-branco.webp";
import iconeInstagram from "@/assets/icones/instagram.webp";
import iconeWhatsapp from "@/assets/icones/whatsapp.webp";
import logoAsConsult from "@/assets/clientes/as-consult.webp";
import logoBardi from "@/assets/clientes/bardi.webp";
import logoVetVidas from "@/assets/clientes/vet-vidas.webp";
import logoEubella from "@/assets/clientes/eubella.webp";
import logoLegato from "@/assets/clientes/legato.webp";
import { Camera, Monitor, Smartphone, Target } from "lucide-react";

export const seo = {
  titulo: "NOFF Marketing e Assessoria | Tráfego Pago, Social Media e Web Design",
  descricao:
    "Agência NOFF especializada em tráfego pago, social media, web design e produção audiovisual. Estratégias digitais para crescimento de marcas.",
  ogTitulo: "NOFF Marketing e Assessoria",
  ogUrl: "https://noffmarketing.com.br",
  ogImagem: "https://noffmarketing.com.br/IMG/n-noff-branco.png",
};

export const marca = {
  simbolo: { src: noffN, alt: "Logo da NOFF Marketing e Assessoria" },
  simboloFaixa: { src: noffN, alt: "Logo da NOFF Marketing" },
  completo: { src: noffCompleto, alt: "Logo completo da NOFF Marketing e Assessoria" },
};

export const contato = {
  telefone: { texto: "11 99834-9147", href: "tel:+5511998349147" },
  email: { texto: "noffagenciamkt@gmail.com", href: "mailto:noffagenciamkt@gmail.com" },
  whatsapp: "https://wa.me/5511998349147?text=Ol%C3%A1+Noff!++Vim+do+site+e+quero+saber+mais!+",
  instagram: "https://www.instagram.com/noff_marketingeassessoria",
};

export const menu = [
  { texto: "Serviços", href: "#servicos" },
  { texto: "Feedbacks", href: "#feedbacks" },
  { texto: "Quem Somos", href: "#us" },
  { texto: "Contatos", href: "#contato" },
];

export const hero = {
  // Título principal da página: invisível, só para leitores de tela e buscadores
  titulo: "NOFF Marketing e Assessoria",
  // Computador/tablet (1920x800) e celular (1280x534), os dois feitos da matriz em Full HD
  video: "/video/video-site.mp4",
  videoCelular: "/video/video-site-celular.mp4",
  // Quadro do vídeo mostrado enquanto ele carrega
  capa: "/video/video-site-capa.webp",
};

export const servicos = {
  titulo: "Serviços",
  itens: [
    {
      icone: Target,
      titulo: "Tráfego Pago",
      texto:
        "Cada clique é um passo rumo ao resultado. Criamos campanhas inteligentes, que vão muito além de impulsionar posts — conectando marcas às pessoas certas.",
    },
    {
      icone: Smartphone,
      titulo: "Social Media",
      texto:
        "Conteúdos que param qualquer feed e despertam conversões reais. Mais do que posts, criamos conexões. Estratégias pensadas para transformar atenção em relacionamento e resultados em crescimento.",
    },
    {
      icone: Monitor,
      titulo: "Web Design",
      texto:
        "O site é uma das vitrines da sua marca — e ele precisa impressionar. Desenvolvemos sites institucionais, landing pages e portais com foco em conversão e navegabilidade.",
    },
    {
      icone: Camera,
      titulo: "Produção Audiovisual",
      texto:
        "Cobertura de eventos, comerciais institucionais, gravação e lançamento de cursos. Transformamos momentos em conteúdo estratégico que reforça sua marca e amplia o seu alcance",
    },
  ],
};

export const feedbacks = {
  titulo: "Feedbacks",
  depoimentos: [
    {
      logo: { src: logoAsConsult, alt: "Logo da empresa AS Consult" },
      autor: "Andréia Santiago, CEO e Fundadora",
      empresa: "AS Consult",
      texto:
        "Durante o período da AS Consult com a **NOFF** pude ver como ter uma estratégia bem direcionada e redes alimentadas fazem muita diferença para o perfil da empresa. O mundo hoje é cada vez mais digital, e a agência tem o pacote completo para todo tipo de segmento, o que nos ajudou muito a prosperar e alcançar novas relações B2B.",
    },
    {
      logo: { src: logoBardi, alt: "Logo da Bardi Traduções" },
      autor: "Vilma, CEO e fundadora da Bardi",
      empresa: "Bardi Traduções",
      texto:
        "Estamos muito gratos com os serviços prestados pela empresa de marketing **NOFF**. A equipe é profissional, atenciosa e sempre disponível para atender nossas necessidades. O trabalho é feito com estratégia, criatividade e foco em resultados, o que tem contribuído diretamente para o crescimento e fortalecimento da nossa marca. Recomendamos com confiança!",
    },
    {
      logo: { src: logoVetVidas, alt: "Logo da Clínica Vet Vidas" },
      autor: "Deise, Diretora da clínica",
      empresa: "Clínica Vet Vidas",
      texto:
        "O serviço da **NOFF** é excelente, eles nos ajudaram a aumentar nossa presença online, em pouco tempo já vimos muita diferença. O líder do time de tráfego pago, Guilherme, é muito atencioso e prestativo. Já indico a agência para amigos e todos que querem fazer seu negócio alavancar, com toda certeza do mundo.",
    },
    {
      logo: { src: logoEubella, alt: "Logo da Eubella Moda Feminina" },
      autor: "Adriana Silva, CEO da Eubella modas e Eubella cosméticos",
      empresa: "Eubella Moda Feminina",
      texto:
        "Simplesmente amei o resultado! Tudo ficou incrível — cada detalhe da edição valorizou demais a loja! Dá pra ver o cuidado, a criatividade e o capricho em cada parte do trabalho. De verdade, ficou perfeito e super alinhado com o que eu queria. Parabéns pelo talento e dedicação da agência e da equipe designada!",
    },
    {
      logo: { src: logoLegato, alt: "Logo da Legato Piano Expressivo" },
      autor: "Acsa Giunco, CEO e Fundadora da Legato Piano Expressivo e Legato One",
      empresa: "Legatos",
      texto:
        "Comecei a trabalhar com a **NOFF** no final de 2024, e desde então sou muito grata pelo trabalho excelente que eles fornecem. Desde todo o suporte para dúvidas, os planejamentos para as redes e a disponibilidade para ajudar, tudo com muito respeito e carinho. Eu agradeço e a minha empresa também.",
    },
  ],
};

export const quemSomos = {
  titulo: "Quem Somos",
  // Frase em destaque (na v1 era o parágrafo do meio)
  destaque: "Cada projeto é planejado com olhar analítico e execução criativa, garantindo impacto e resultado.",
  // **trecho** aparece realçado em roxo
  paragrafos: [
    "A NOFF nasceu com o propósito de trazer **solidez e clareza** à presença online da sua empresa e marca. Somos o parceiro estratégico que guia o seu negócio, unindo métodos de comunicação profissionais, criativos e eficazes. Nosso foco é construir algo que realmente dura: **uma marca forte, valiosa e de confiança**.",
    "Em um mercado que se transforma a cada dia, nossa metodologia é **viva e adaptável**. Acompanhamos tendências, tecnologias e mudanças de plataformas para manter sua marca sempre à frente. Somos o time que traduz sua visão em **presença digital consistente**, com foco total no sucesso e no crescimento da sua empresa.",
  ],
};

export const formulario = {
  titulo: "ENTRE EM CONTATO!",
  campos: {
    nome: { rotulo: "Nome", placeholder: "Digite seu nome!", erro: "Digite seu nome." },
    empresa: { rotulo: "Empresa", placeholder: "Digite sua empresa", erro: "Digite o nome da sua empresa." },
    telefone: { rotulo: "Telefone", placeholder: "(11) 99999-9999", erro: "Digite um telefone com DDD, ex.: (11) 99999-9999." },
    email: { rotulo: "Email", placeholder: "email@dominio.com.br", erro: "Digite um e-mail válido." },
    mensagem: { rotulo: "Mensagem", placeholder: "Digite sua mensagem...", erro: "Escreva sua mensagem." },
  },
  botao: "Enviar",
  enviando: "Enviando…",
  // Canais diretos ao lado do formulário (os mesmos contatos do rodapé)
  canais: [
    { tipo: "whatsapp", rotulo: "WhatsApp", valor: "11 99834-9147", href: contato.whatsapp, icone: iconeWhatsapp },
    { tipo: "email", rotulo: "E-mail", valor: contato.email.texto, href: contato.email.href },
    { tipo: "instagram", rotulo: "Instagram", valor: "@noff_marketingeassessoria", href: contato.instagram, icone: iconeInstagram },
  ],
  popup: {
    titulo: "Mensagem Enviada!",
    texto: "Obrigado! Entraremos em contato em breve.",
    // Some quando o formulário passar a enviar de verdade.
    aviso: "Versão de teste: nenhuma mensagem foi enviada.",
  },
};

export const rodape = {
  menuTitulo: "Menu rápido",
  menu: [
    { texto: "Home", href: "#topo" },
    { texto: "Serviços", href: "#servicos" },
    { texto: "Feedbacks", href: "#feedbacks" },
    { texto: "Quem Somos", href: "#us" },
  ],
  redesTitulo: "Redes Sociais",
  redes: [
    { href: contato.instagram, icone: iconeInstagram, alt: "Instagram da NOFF Marketing e Assessoria" },
    { href: contato.whatsapp, icone: iconeWhatsapp, alt: "Contato via WhatsApp da NOFF Marketing" },
  ],
  // O ano entra sozinho (ver Rodape.tsx)
  direitos: (ano: number) => `© ${ano} NOFF Marketing e Assessoria. Todos os direitos reservados.`,
};

export const whatsappFlutuante = {
  href: contato.whatsapp,
  // Lido por leitores de tela (o botão só tem o símbolo)
  rotulo: "Conversar com a NOFF no WhatsApp (abre em nova aba)",
};

// Página de erro (quem abre um endereço que não existe no site)
export const paginaNaoEncontrada = {
  tituloAba: "Página não encontrada | NOFF Marketing e Assessoria",
  rotulo: "Erro 404",
  titulo: "Página não encontrada",
  texto: "O endereço que você tentou abrir não existe ou mudou de lugar.",
  botao: "Voltar para o início",
};

// Link que só aparece para quem navega pelo teclado (Tab), antes do menu
export const acessibilidade = {
  pularParaConteudo: "Pular para o conteúdo",
};
