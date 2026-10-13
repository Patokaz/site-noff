import { SIMBOLO_N_PARTES, SIMBOLO_N_VIEWBOX } from "@/assets/marca/simbolo-n";

/*
  Símbolo N da NOFF com contorno lilás, preenchimento creme e brilho roxo atrás.
  O desenho (contorno → preenchimento) é só CSS ("Símbolo N" em globals.css): na abertura
  e na página de erro (classe simbolo-tracado num elemento acima).
  `id`: nome do degradê do brilho, único na página.
*/
export function SimboloN({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg aria-hidden viewBox={SIMBOLO_N_VIEWBOX} className={`h-auto overflow-visible ${className}`}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0%" stopColor="#9125d9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#9125d9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="simbolo-brilho" cx={214} cy={207} r={230} fill={`url(#${id})`} />
      {SIMBOLO_N_PARTES.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          className="simbolo-traco"
          fill="#fefce8"
          stroke="#b565f0"
          strokeWidth={3}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
