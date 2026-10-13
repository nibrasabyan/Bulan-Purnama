import { useMemo } from "react";
import { Sparkle } from "./Icons.jsx";
import "../styles/ambient.css";

/* Ranting kecil dengan bunga mini — menghias sudut layar */
function Sprig() {
  return (
    <svg viewBox="0 0 120 120" className="sprig-svg" aria-hidden="true">
      <path
        d="M16 112C34 80 52 56 88 30"
        stroke="#b9d8c7"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="38" cy="82" rx="9" ry="4.5" fill="#b9d8c7" transform="rotate(-40 38 82)" />
      <ellipse cx="58" cy="60" rx="9" ry="4.5" fill="#c6dfd3" transform="rotate(-35 58 60)" />
      <g transform="translate(88 24)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-9"
            rx="4"
            ry="8"
            fill="#fffef9"
            stroke="#eee0d6"
            strokeWidth="0.8"
            transform={`rotate(${a})`}
          />
        ))}
        <circle r="4.5" fill="#fcc44d" />
      </g>
      <g transform="translate(48 32)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-6.5"
            rx="3"
            ry="5.5"
            fill="#a5bef6"
            transform={`rotate(${a})`}
          />
        ))}
        <circle r="3" fill="#f9d46a" />
      </g>
    </svg>
  );
}

/*
 * Dekorasi latar sepanjang alur: blob gradien lembut, kerlip bintang,
 * dan ranting bunga di dua sudut — biar sisi kiri/kanan tidak kosong.
 */
export default function Ambient() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 8 + Math.random() * 10,
        d: Math.random() * 4,
        dur: 2.6 + Math.random() * 2.6,
        color: ["#e8b04b", "#d9566f", "#96b3f4", "#f2b8c6"][i % 4],
      })),
    []
  );

  return (
    <div className="ambient" aria-hidden="true" data-testid="ambient">
      <span className="ambient-blob blob-1" />
      <span className="ambient-blob blob-2" />
      <span className="ambient-blob blob-3" />
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="ambient-sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            animationDelay: `${s.d}s`,
            "--dur": `${s.dur}s`,
          }}
        >
          <Sparkle size={s.s} color={s.color} />
        </span>
      ))}
      <span className="ambient-sprig sprig-tl">
        <Sprig />
      </span>
      <span className="ambient-sprig sprig-br">
        <Sprig />
      </span>
    </div>
  );
}
