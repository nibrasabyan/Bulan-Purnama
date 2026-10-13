import { useLayoutEffect, useRef, useState } from "react";
import { invitation } from "../config.js";
import { Sparkle } from "./Icons.jsx";
import { Petal } from "./Flowers.jsx";
import foto from "../assets/foto.jpg";
import "../styles/invitation.css";

export default function Invitation({ onNext }) {
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState(null);
  const [burst, setBurst] = useState(false);
  const yesRef = useRef(null);
  const noRef = useRef(null);
  const lastDodge = useRef(0);
  // selisih antara koordinat CSS left/top dan posisi nyata di viewport
  // (≠ 0 kalau ada ancestor ber-transform yang jadi containing block)
  const [cbOff, setCbOff] = useState({ x: 0, y: 0 });

  const PAD = 14;

  const dodge = () => {
    if (burst) return;
    // satu sentuhan di HP memicu pointerdown + mouse sintetis + click;
    // cukup satu kali kabur per interaksi
    const now = Date.now();
    if (now - lastDodge.current < 400) return;
    lastDodge.current = now;
    setNoCount((c) => c + 1);

    const pad = PAD;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const noRect = noRef.current?.getBoundingClientRect();
    const w = noRect?.width || 120;
    const h = noRect?.height || 48;
    const yesRect = yesRef.current?.getBoundingClientRect();

    let x = pad;
    let y = pad;
    let tries = 0;
    do {
      x = pad + Math.random() * Math.max(1, vw - w - pad * 2);
      y = pad + Math.random() * Math.max(1, vh - h - pad * 2);
      tries += 1;
    } while (
      yesRect &&
      tries < 40 &&
      x < yesRect.right + 14 &&
      x + w > yesRect.left - 14 &&
      y < yesRect.bottom + 14 &&
      y + h > yesRect.top - 14
    );

    setNoPos({ x, y });
  };

  // Setelah teks berganti: ukur ukuran & posisi nyata tombol, lalu pastikan
  // seluruh tombol berada di dalam layar.
  useLayoutEffect(() => {
    const el = noRef.current;
    if (!noPos || !el) return;
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const off = {
      x: rect.left - parseFloat(cs.left || 0),
      y: rect.top - parseFloat(cs.top || 0),
    };
    if (Math.abs(off.x - cbOff.x) > 1 || Math.abs(off.y - cbOff.y) > 1) {
      setCbOff(off);
    }
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = Math.min(Math.max(PAD, noPos.x), Math.max(PAD, vw - w - PAD));
    const y = Math.min(Math.max(PAD, noPos.y), Math.max(PAD, vh - h - PAD));
    if (Math.abs(x - noPos.x) > 0.5 || Math.abs(y - noPos.y) > 0.5) {
      setNoPos({ x, y });
    }
  }, [noPos, noCount, cbOff]);

  const handleYes = () => {
    if (burst) return;
    setBurst(true);
    setTimeout(onNext, 1100);
  };

  const yesScale = 1 + Math.min(noCount, 8) * 0.07;
  const noText = invitation.noTexts[noCount % invitation.noTexts.length];

  const confetti = burst
    ? Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.6;
        const dist = 70 + Math.random() * 90;
        return {
          id: i,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 40,
          rot: Math.random() * 260 - 130,
          delay: Math.random() * 0.12,
          size: 10 + Math.random() * 12,
          sparkle: i % 3 === 0,
        };
      })
    : [];

  return (
    <section className="card inv-card" data-testid="invitation-step">
      <div className="photo-frame">
        <img src={foto} alt="Foto Nibras dan Bulan" data-testid="invitation-photo" />
      </div>
      <p className="hand inv-caption">{invitation.caption}</p>

      <div className="inv-actions">
        <span className="yes-wrap">
          {burst &&
            confetti.map((c) => (
              <span
                key={c.id}
                className="confetti"
                style={{
                  width: c.size,
                  height: c.size,
                  "--dx": `${c.dx}px`,
                  "--dy": `${c.dy}px`,
                  "--rot": `${c.rot}deg`,
                  "--cd": `${c.delay}s`,
                }}
              >
                {c.sparkle ? (
                  <Sparkle size={c.size} color={["#f0b34a", "#d9566f"][c.id % 2]} />
                ) : (
                  <Petal color={["#f6b8c6", "#ffd95e", "#a5bef6", "#fffef9"][c.id % 4]} />
                )}
              </span>
            ))}
          <button
            ref={yesRef}
            className="btn btn-primary inv-yes"
            style={{ transform: `scale(${yesScale})` }}
            onClick={handleYes}
            data-testid="invitation-yes-btn"
          >
            {invitation.yesLabel}
          </button>
        </span>

        <button
          ref={noRef}
          className={`btn inv-no${noPos ? " is-fleeing" : ""}`}
          style={noPos ? { left: noPos.x - cbOff.x, top: noPos.y - cbOff.y } : undefined}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") dodge();
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            dodge();
          }}
          onClick={(e) => {
            e.preventDefault();
            dodge();
          }}
          data-testid="invitation-no-btn"
        >
          {noText}
        </button>
      </div>
    </section>
  );
}
