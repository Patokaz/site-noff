"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, LoaderCircle, Mail } from "lucide-react";
import { formulario } from "@/content/site";
import { CURVA_SUAVE } from "@/lib/animacao";
import { Reveal } from "./Reveal";

const { campos, popup, canais } = formulario;
type Campo = keyof typeof campos;

// Regras de cada campo: devolve true quando o valor está ok.
const regras: Record<Campo, (v: string) => boolean> = {
  nome: (v) => v.trim().length > 0,
  empresa: (v) => v.trim().length > 0,
  telefone: (v) => /^\d{10,11}$/.test(v.replace(/\D/g, "")),
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  mensagem: (v) => v.trim().length > 0,
};

// Mantém só os caracteres aceitos, enquanto a pessoa digita.
const filtrar = (regex: RegExp) => (e: FormEvent<HTMLInputElement>) => {
  e.currentTarget.value = e.currentTarget.value.replace(regex, "");
};

function mascaraTelefone(e: FormEvent<HTMLInputElement>) {
  let v = e.currentTarget.value.replace(/\D/g, "").slice(0, 11);
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d{5})(\d{4})$/, "$1-$2");
  e.currentTarget.value = v;
}

export function Contato() {
  const [erros, setErros] = useState<Partial<Record<Campo, string>>>({});
  const [enviando, setEnviando] = useState(false);
  const [popupAberto, setPopupAberto] = useState(false);
  const noNavegador = useSyncExternalStore(semInscricao, () => true, () => false);
  const botaoEnviarRef = useRef<HTMLButtonElement>(null);
  const dialogoRef = useRef<HTMLDivElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);

  // Com o popup aberto: Esc fecha, Tab não sai dele e o foco não escapa nem com clique.
  useEffect(() => {
    if (!popupAberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPopupAberto(false);
        botaoEnviarRef.current?.focus();
      } else if (e.key === "Tab") {
        e.preventDefault();
        fecharRef.current?.focus();
      }
    };
    const aoFocar = (e: globalThis.FocusEvent) => {
      if (!dialogoRef.current?.contains(e.target as Node)) fecharRef.current?.focus();
    };
    document.addEventListener("keydown", aoTeclar);
    document.addEventListener("focusin", aoFocar);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.removeEventListener("focusin", aoFocar);
    };
  }, [popupAberto]);

  // Fecha o popup e devolve o foco ao botão Enviar (quem usa teclado continua de onde estava).
  function fecharPopup() {
    setPopupAberto(false);
    botaoEnviarRef.current?.focus();
  }

  function validar(campo: Campo, valor: string) {
    const erro = regras[campo](valor) ? undefined : campos[campo].erro;
    setErros((atuais) => ({ ...atuais, [campo]: erro }));
    return !erro;
  }

  // Ao sair de um campo já preenchido (ou que já tinha erro), confere na hora.
  function aoSair(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const campo = e.currentTarget.name as Campo;
    if (e.currentTarget.value || erros[campo]) validar(campo, e.currentTarget.value);
  }

  // Versão de teste: nada sai daqui. Com tudo válido, mostra "Enviando…" e abre o popup.
  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;
    const form = e.currentTarget;
    const dados = new FormData(form);
    const resultado = (Object.keys(campos) as Campo[]).map((c) => validar(c, String(dados.get(c) ?? "")));
    if (resultado.includes(false)) {
      const primeiroErro = (Object.keys(campos) as Campo[])[resultado.indexOf(false)];
      form.querySelector<HTMLElement>(`[name="${primeiroErro}"]`)?.focus();
      return;
    }
    setEnviando(true);
    setTimeout(() => {
      form.reset();
      setErros({});
      setEnviando(false);
      setPopupAberto(true);
    }, 700);
  }

  // Campos brancos; no foco, borda roxa e contorno lilás (bem visível sobre o fundo escuro).
  // Com erro, a borda fica vermelha. outline-hidden mantém o contorno no modo de alto contraste.
  const classeCampo = (campo: Campo) =>
    `w-full rounded-2xl border bg-white px-4 text-[1.0625rem] text-black outline-hidden transition-[border-color,box-shadow] duration-300 ease-suave placeholder:text-[#757575] focus:ring-[3px] focus:ring-noff-roxo-claro ${
      erros[campo] ? "border-red-500" : "border-transparent focus:border-noff-roxo"
    }`;

  return (
    <>
      <section id="contato" className="mx-auto max-w-[90rem] px-8 py-20 max-tablet:px-4 max-tablet:py-12">
        <div className="relative isolate">
          {/* Luz roxa suave atrás do formulário (no celular, atrás do formulário embaixo) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -inset-y-16 -z-10 bg-[radial-gradient(ellipse_50%_65%_at_70%_55%,rgb(145_37_217/0.4),transparent_70%)] max-tablet:bg-[radial-gradient(ellipse_85%_50%_at_50%_70%,rgb(145_37_217/0.36),transparent_70%)]"
          />
          <div className="grid grid-cols-[5fr_7fr] items-start gap-16 max-tablet:grid-cols-1 max-tablet:gap-10">
            {/* Título e canais diretos */}
            <div className="flex flex-col gap-10 max-celular:gap-8">
              <Reveal as="h2" className="sublinhado w-fit pr-12 text-[3rem] leading-tight font-bold max-tablet:text-[2rem] max-celular:sublinhado-centro max-celular:self-center max-celular:px-6 max-celular:text-center max-celular:[--sublinhado-espessura:.3rem]">
                {formulario.titulo}
              </Reveal>

              {/* grid-cols-1 = minmax(0,1fr): em tela bem estreita o cartão encolhe e o texto quebra */}
              <div className="grid grid-cols-1 gap-3">
                {canais.map((canal, i) => {
                  const externo = canal.tipo === "whatsapp" || canal.tipo === "instagram";
                  return (
                    <Reveal key={canal.tipo} ordem={i}>
                      <a
                        href={canal.href}
                        {...(externo && { target: "_blank", rel: "noopener" })}
                        className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 border-white/10 bg-white/[0.03] transition-[border-color,background-color] duration-300 ease-suave hover:border-noff-roxo/60 hover:bg-noff-roxo/10`}
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-noff-roxo/15 text-noff-roxo-claro ring-1 ring-noff-roxo/30">
                          {canal.icone ? (
                            <Image src={canal.icone} alt="" className="size-6" />
                          ) : (
                            <Mail className="size-5" aria-hidden />
                          )}
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="text-[0.875rem] text-noff-creme/60">{canal.rotulo}</span>
                          <span className="font-semibold [overflow-wrap:anywhere]">{canal.valor}</span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="ml-auto size-5 shrink-0 text-noff-creme/40 transition-[translate,color] duration-300 ease-suave group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-noff-roxo-claro"
                        />
                      </a>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* Formulário */}
            <Reveal ordem={1}>
              <form id="contato-form" noValidate onSubmit={enviar} className="grid grid-cols-2 gap-x-4 gap-y-5 max-celular:grid-cols-1">
                <CampoComRotulo campo="nome" erro={erros.nome}>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    placeholder={campos.nome.placeholder}
                    aria-required
                    aria-invalid={!!erros.nome}
                    aria-describedby={erros.nome ? "erro-nome" : undefined}
                    onInput={filtrar(/[^A-Za-zÀ-ÿ\s]/g)}
                    onBlur={aoSair}
                    className={`h-12 ${classeCampo("nome")}`}
                  />
                </CampoComRotulo>
                <CampoComRotulo campo="empresa" erro={erros.empresa}>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    autoComplete="organization"
                    placeholder={campos.empresa.placeholder}
                    aria-required
                    aria-invalid={!!erros.empresa}
                    aria-describedby={erros.empresa ? "erro-empresa" : undefined}
                    onInput={filtrar(/[^A-Za-zÀ-ÿ0-9\s&.-]/g)}
                    onBlur={aoSair}
                    className={`h-12 ${classeCampo("empresa")}`}
                  />
                </CampoComRotulo>
                <CampoComRotulo campo="telefone" erro={erros.telefone}>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder={campos.telefone.placeholder}
                    aria-required
                    aria-invalid={!!erros.telefone}
                    aria-describedby={erros.telefone ? "erro-telefone" : undefined}
                    onInput={mascaraTelefone}
                    onBlur={aoSair}
                    className={`h-12 ${classeCampo("telefone")}`}
                  />
                </CampoComRotulo>
                <CampoComRotulo campo="email" erro={erros.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={campos.email.placeholder}
                    aria-required
                    aria-invalid={!!erros.email}
                    aria-describedby={erros.email ? "erro-email" : undefined}
                    onBlur={aoSair}
                    className={`h-12 ${classeCampo("email")}`}
                  />
                </CampoComRotulo>
                <CampoComRotulo campo="mensagem" erro={erros.mensagem} largo>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    placeholder={campos.mensagem.placeholder}
                    aria-required
                    aria-invalid={!!erros.mensagem}
                    aria-describedby={erros.mensagem ? "erro-mensagem" : undefined}
                    onBlur={aoSair}
                    className={`resize-y py-3 ${classeCampo("mensagem")}`}
                  />
                </CampoComRotulo>

                <button
                  ref={botaoEnviarRef}
                  type="submit"
                  aria-disabled={enviando}
                  className="col-span-full flex w-fit cursor-pointer items-center gap-2 justify-self-center rounded-2xl bg-noff-roxo px-8 py-4 text-[1.125rem] font-bold text-noff-branco transition-[translate,background-color,box-shadow] duration-300 ease-suave hover:-translate-y-0.5 hover:bg-noff-roxo-escuro hover:shadow-[0_12px_30px_-10px_var(--color-noff-roxo)] active:translate-y-0 aria-disabled:cursor-wait aria-disabled:opacity-80 aria-disabled:hover:translate-y-0 max-celular:w-full max-celular:justify-center"
                >
                  {enviando && <LoaderCircle className="size-5 animate-spin" aria-hidden />}
                  {enviando ? formulario.enviando : formulario.botao}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* O popup vai direto no <body>: dentro da página (camada abaixo do menu) ele ficaria
          por baixo do menu do topo. Só existe no navegador (no HTML gerado não há popup). */}
      {noNavegador &&
        createPortal(
          <AnimatePresence>
            {popupAberto && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="popup-titulo"
                ref={dialogoRef}
                onClick={(e) => e.target === e.currentTarget && fecharPopup()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: CURVA_SUAVE }}
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-[5px]"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: CURVA_SUAVE }}
                  tabIndex={-1}
                  className="relative w-[90%] max-w-[400px] rounded-[10px] bg-noff-preto p-8 text-center shadow-[0_5px_15px_rgba(0,0,0,0.3)] outline-hidden"
                >
                  <button
                    type="button"
                    ref={fecharRef}
                    aria-label="Fechar"
                    autoFocus
                    onClick={fecharPopup}
                    className="absolute top-[10px] right-[15px] cursor-pointer text-[1.5rem] text-noff-creme/50 transition-colors duration-300 ease-suave hover:text-noff-creme"
                  >
                    &times;
                  </button>
                  <h2 id="popup-titulo" className="mb-4 text-[1.5em] font-bold text-noff-roxo">
                    {popup.titulo}
                  </h2>
                  <p className="mb-4">{popup.texto}</p>
                  <p className="text-[0.8rem] opacity-60">{popup.aviso}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

const semInscricao = () => () => {};

// Rótulo + campo + aviso de erro (em português, embaixo do campo).
function CampoComRotulo({ campo, erro, largo, children }: { campo: Campo; erro?: string; largo?: boolean; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-2 ${largo ? "col-span-full" : ""}`}>
      <label htmlFor={campo} className="text-[0.9375rem] font-semibold text-noff-creme/80">
        {campos[campo].rotulo}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {erro && (
          <motion.p
            id={`erro-${campo}`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: CURVA_SUAVE }}
            className="text-[0.875rem] text-red-300"
          >
            {erro}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
