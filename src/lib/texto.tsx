// Transforma **trecho** em <strong>trecho</strong> (com classe opcional para o realce).
export function comDestaque(texto: string, classe?: string) {
  return texto.split(/\*\*(.+?)\*\*/g).map((parte, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={classe}>
        {parte}
      </strong>
    ) : (
      parte
    ),
  );
}
