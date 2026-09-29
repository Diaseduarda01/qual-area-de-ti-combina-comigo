const CENTER = 10;
const FILL_RADIUS = 6;
const RING_RADIUS = 7.6;
const STEPS = 4;

interface ScaleIconProps {
  /** 4 = gosto muito, 0 = não gosto. */
  level: number;
}

/**
 * Fatia do intervalo 0–4 como uma "fase da lua": disco cheio em gosto muito,
 * vazio em não gosto.
 *
 * A primeira versão era um anel com o traço parcial, mas a 20px o cheio e o
 * vazio ficavam quase idênticos — a única diferença era a opacidade do traço.
 * Área preenchida se distingue de relance; contorno de traço, não.
 */
function wedgePath(level: number): string {
  const angle = (level / STEPS) * 2 * Math.PI;
  const x = CENTER + FILL_RADIUS * Math.sin(angle);
  const y = CENTER - FILL_RADIUS * Math.cos(angle);
  const largeArc = level > STEPS / 2 ? 1 : 0;
  return [
    `M ${CENTER} ${CENTER}`,
    `L ${CENTER} ${CENTER - FILL_RADIUS}`,
    `A ${FILL_RADIUS} ${FILL_RADIUS} 0 ${largeArc} 1 ${x} ${y}`,
    "Z",
  ].join(" ");
}

export function ScaleIcon({ level }: ScaleIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      {/* contorno: sempre visível, pra o nível 0 ainda ter forma */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RING_RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.45"
      />
      {/* um disco inteiro no topo da escala: o path de arco não fecha em 360° */}
      {level >= STEPS ? (
        <circle cx={CENTER} cy={CENTER} r={FILL_RADIUS} fill="currentColor" />
      ) : (
        level > 0 && <path d={wedgePath(level)} fill="currentColor" />
      )}
    </svg>
  );
}
