"use client";

/*
  Script que roda no HTML enquanto a página carrega, antes do React. No navegador o React
  nunca executa <script> que ele mesmo cria; o type "text/plain" ali só evita o aviso disso
  (padrão do guia "preventing-flash-before-hydration" da documentação do Next).
*/
export function ScriptInline({ codigo }: { codigo: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: codigo }}
    />
  );
}
