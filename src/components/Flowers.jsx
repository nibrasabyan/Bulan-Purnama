/* Koleksi bunga & kelopak sebagai SVG inline — ringan, tanpa file gambar */

const PETAL_ANGLES = [0, 72, 144, 216, 288];

export function Daisy() {
  return (
    <svg viewBox="0 0 64 64" className="flower-svg" aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <ellipse
          key={i}
          cx="32"
          cy="15"
          rx="6"
          ry="13.5"
          fill="#fffdf8"
          stroke="#f0e2da"
          strokeWidth="0.8"
          transform={`rotate(${i * 36} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="8.5" fill="#ffd45e" />
      <circle cx="32" cy="32" r="5" fill="#f9b234" />
    </svg>
  );
}

export function Rose() {
  return (
    <svg viewBox="0 0 64 64" className="flower-svg" aria-hidden="true">
      <circle cx="32" cy="32" r="25" fill="#f7b3c2" />
      <circle cx="25" cy="27" r="12" fill="#f29cb2" />
      <circle cx="38" cy="29" r="11" fill="#ee8ba3" />
      <circle cx="31" cy="38" r="10.5" fill="#ea7c97" />
      <circle cx="32" cy="30" r="7" fill="#e46a89" />
      <path
        d="M32 30c-2.5-1.5-3-4-2-6.5M32 30c2.5-1 4.5-3 4.5-6"
        stroke="#d9566f"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="32" cy="29" r="2.6" fill="#c94a63" />
    </svg>
  );
}

export function YellowFlower() {
  return (
    <svg viewBox="0 0 64 64" className="flower-svg" aria-hidden="true">
      {PETAL_ANGLES.map((a) => (
        <ellipse
          key={a}
          cx="32"
          cy="16.5"
          rx="9.5"
          ry="13"
          fill="#ffd95e"
          stroke="#f4b73a"
          strokeWidth="0.8"
          transform={`rotate(${a} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="7.5" fill="#f9a03c" />
      <circle cx="29.5" cy="29.5" r="2.2" fill="#ffe9a8" />
    </svg>
  );
}

const CLUSTER = [
  [19, 24],
  [40, 20],
  [46, 39],
  [24, 44],
  [33, 33],
];

export function BlueCluster() {
  return (
    <svg viewBox="0 0 64 64" className="flower-svg" aria-hidden="true">
      {CLUSTER.map(([x, y], i) => (
        <g key={i} transform={`translate(${x - 11} ${y - 11}) scale(0.68)`}>
          {PETAL_ANGLES.map((a) => (
            <ellipse
              key={a}
              cx="16"
              cy="8.5"
              rx="4.6"
              ry="7"
              fill={i % 2 ? "#a8c0f7" : "#96b3f4"}
              transform={`rotate(${a} 16 16)`}
            />
          ))}
          <circle cx="16" cy="16" r="3.4" fill="#f9d46a" />
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
