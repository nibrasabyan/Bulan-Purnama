import { useEffect, useMemo, useState } from "react";
import { Daisy, Rose, YellowFlower, BlueCluster, Petal } from "./Flowers.jsx";
import "../styles/flowers.css";

const FLOWER_TYPES = [Daisy, Rose, YellowFlower, BlueCluster];

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/*
 * Dinding bunga: grid ber-jitter yang menyesuaikan ukuran layar
 * (±28 bunga di HP, ±54 di desktop) supaya selalu penuh satu layar.
 * Mekar memancar dari tengah, lalu tertiup jatuh pelan per gelombang.
 */
export default function FlowerAnimation({ onDone }) {
  const reduced = useReducedMotion();

  const flowers = useMemo(() => {
    const vw = Math.max(window.innerWidth, 320);
    const vh = Math.max(window.innerHeight, 480);
    const cell = Math.min(160, Math.max(104, vw / 3));
    const cols = Math.ceil(vw / cell);
    const rows = Math.ceil(vh / cell);
    const list = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const nx = (col + 0.5) / cols;
        const ny = (row + 0.5) / rows;
        const dist = Math.hypot(nx - 0.5, ny - 0.5) * 2; // 0 = tengah
        list.push({
          Type: FLOWER_TYPES[(row * cols + col + row * row) % 4],
          x: ((col + 0.5 + (Math.random() - 0.5) * 0.85) / cols) * 100,
          y: ((row + 0.5 + (Math.random() - 0.5) * 0.85) / rows) * 100,
          s: cell * (1 + Math.random() * 0.8),
          r: Math.random() * 70 - 35,
          d: dist * 1.15 + Math.random() * 0.15,
          fd: 2.4 + dist * 0.7 + Math.random() * 0.35,
          fy: 55 + Math.random() * 130,
          fx: Math.random() * 120 - 60,
          fr: Math.random() * 100 - 50,
        });
      }
    }
    return list;
  }, []);

  useEffect(() => {
    const t = setTimeout(onDone, reduced ? 1800 : 6000);
    return () => clearTimeout(t);
  }, [onDone, reduced]);

  return (
    <div className="flower-scene" aria-hidden="true" data-testid="flower-scene">
      {flowers.map(({ Type, ...f }, i) => (
        <span
          key={i}
          className="bloom"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.s,
            height: f.s,
            "--d": `${f.d}s`,
            "--fd": `${f.fd}s`,
            "--r": `${f.r}deg`,
            "--fy": `${f.fy}px`,
            "--fx": `${f.fx}px`,
            "--fr": `${f.fr}deg`,
          }}
        >
          <span className="bloom-sway">
            <Type />
          </span>
        </span>
      ))}
    </div>
  );
}

/* Kelopak kecil melayang pelan sebagai dekorasi latar step berikutnya */
export function FloatingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: 4 + Math.random() * 92,
        size: 10 + Math.random() * 9,
        dur: 13 + Math.random() * 10,
        delay: -Math.random() * 24,
        color: ["#f6b8c6", "#fce3ea", "#f9d3dd"][i % 3],
      })),
    []
  );

  return (
    <div className="petals" aria-hidden="true" data-testid="floating-petals">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            "--dur": `${p.dur}s`,
            "--delay": `${p.delay}s`,
          }}
        >
          <Petal color={p.color} />
        </span>
      ))}
    </div>
  );
}
