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

export default function FlowerAnimation({ onDone }) {
  const reduced = useReducedMotion();

  const flowers = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        Type: FLOWER_TYPES[i % 4],
        x: 4 + Math.random() * 92,
        y: 5 + Math.random() * 86,
        s: 34 + Math.random() * 40,
        r: Math.random() * 64 - 32,
        d: i * 0.085,
        fd: 2.9 + Math.random() * 0.7,
        fy: 60 + Math.random() * 150,
        fr: Math.random() * 120 - 60,
      })),
    []
  );

  useEffect(() => {
    const t = setTimeout(onDone, reduced ? 1800 : 5600);
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
            "--fr": `${f.fr}deg`,
          }}
        >
          <Type />
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
