/* Koleksi bunga & kelopak sebagai SVG inline — ringan, tanpa file gambar */

const PETAL_ANGLES = [0, 72, 144, 216, 288];

export function Daisy() {
  return (
    <svg viewBox="0 0 64 64" className="flower-svg" aria-hidden="true">
      <defs>
        <radialGradient id="fya-daisy-c" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#ffe08a" />
          <stop offset="68%" stopColor="#fcc44d" />
          <stop offset="100%" stopColor="#efa72c" />
        </radialGradient>
      </defs>
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="32"
          cy="14.5"
          rx="5.6"
          ry="13"
          fill="#fffef9"
          stroke="#efe3d8"
          strokeWidth="0.7"
          transform={`rotate(${i * 30} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="9" fill="url(#fya-daisy-c)" />
    </svg>
  );
}

export function Rose() {
  return (
    <svg viewBox="0 0 64 64" className="flower-svg" aria-hidden="true">
      <defs>
        <radialGradient id="fya-rose-g" cx="42%" cy="40%" r="72%">
          <stop offset="0%" stopColor="#fbc6d2" />
          <stop offset="55%" stopColor="#f5a8ba" />
          <stop offset="100%" stopColor="#e989a2" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="25" fill="url(#fya-rose-g)" />
      <path
        d="M10.5 34c1-13 10-22.5 21.5-22.5 12 0 21 9 21.5 21"
        fill="none"
        stroke="#e98aa4"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity=".65"
      />
      <circle cx="25.5" cy="27.5" r="11.5" fill="#f4a2b5" />
      <circle cx="38.5" cy="29.5" r="10.5" fill="#ef92a8" />
      <circle cx="31" cy="37.5" r="10" fill="#ea819b" />
      <circle cx="32" cy="30" r="7" fill="#e46a89" />
      <path
        d="M36.5 30a4.5 4.5 0 1 0-4.5 4.5"
        fill="none"
        stroke="#c94a63"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="31.6" cy="29.6" r="2.2" fill="#c94a63" />
    </svg>
  );
}

export function YellowFlower() {
  return (
    <svg viewBox="0 0 64 64" className="flower-svg" aria-hidden="true">
      <defs>
        <radialGradient id="fya-yellow-g" cx="45%" cy="42%" r="72%">
          <stop offset="0%" stopColor="#ffe68d" />
          <stop offset="100%" stopColor="#f8b93a" />
        </radialGradient>
      </defs>
      {PETAL_ANGLES.map((a) => (
        <ellipse
          key={a}
          cx="32"
          cy="16"
          rx="9.5"
          ry="13.5"
          fill="url(#fya-yellow-g)"
          stroke="#eea92e"
          strokeWidth="0.7"
          transform={`rotate(${a} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="8" fill="#f79f2d" />
      <circle cx="29.5" cy="29.5" r="2.4" fill="#ffedbe" />
    </svg>
  );
}

const CLUSTER = [
  [18, 22],
  [40, 17],
  [48, 37],
  [22, 44],
  [33, 32],
  [38, 46],
];

export function BlueCluster() {
  return (
    <svg viewBox="0 0 64 64" className="flower-svg" aria-hidden="true">
      <defs>
        <radialGradient id="fya-blue-g" cx="42%" cy="40%" r="72%">
          <stop offset="0%" stopColor="#b9ccf9" />
          <stop offset="100%" stopColor="#84a4ef" />
        </radialGradient>
      </defs>
      {CLUSTER.map(([x, y], i) => (
        <g key={i} transform={`translate(${x - 12} ${y - 12}) scale(0.75)`}>
          {PETAL_ANGLES.map((a) => (
            <ellipse
              key={a}
              cx="16"
              cy="8.5"
              rx="4.8"
              ry="7.2"
              fill={i % 2 ? "url(#fya-blue-g)" : "#a5bef6"}
              transform={`rotate(${a} 16 16)`}
            />
          ))}
          <circle cx="16" cy="16" r="3.6" fill="#f9d46a" />
        </g>
      ))}
    </svg>
  );
}

export function Petal({ color = "#f6b8c6" }) {
  return (
    <svg viewBox="0 0 24 24" className="flower-svg" aria-hidden="true">
      <path
        d="M12 2.5c4.8 4.2 6.8 8 6.8 11.4a6.8 6.8 0 1 1-13.6 0C5.2 10.5 7.2 6.7 12 2.5z"
        fill={color}
      />
    </svg>
  );
}
