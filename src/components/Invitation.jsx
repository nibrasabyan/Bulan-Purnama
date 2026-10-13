import { useRef, useState } from "react";
import { invitation } from "../config.js";
import { Heart } from "./Icons.jsx";
import { Petal } from "./Flowers.jsx";
import foto from "../assets/foto.jpg";
import "../styles/invitation.css";

export default function Invitation({ onNext }) {
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState(null);
  const [burst, setBurst] = useState(false);
  const yesRef = useRef(null);
  const noRef = useRef(null);

  const dodge = () => {
    if (burst) return;
    setNoCount((c) => c + 1);

    const pad = 14;
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
          heart: i % 3 === 0,
        };
      })
    : [];

  return (
    <section className="card inv-card" data-testid="invitation-step">
      <div className="photo-frame">
        <img src={foto} alt="Foto Nibras dan Bulan" data-testid="invitation-photo" />
      </div>
      <p className="hand inv-caption">{invitation.caption}</p>
      <p className="hand inv-from">{invitation.from}</p>

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
                {c.heart ? (
                  <Heart size={c.size} color="#e0475e" />
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
          style={noPos ? { left: noPos.x, top: noPos.y } : undefined}
          onMouseEnter={dodge}
          onTouchStart={(e) => {
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
