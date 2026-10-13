import { useEffect, useRef, useState } from "react";
import { letter } from "../config.js";
import { Heart } from "./Icons.jsx";
import "../styles/envelope.css";

export default function Envelope({ onNext }) {
  const [opened, setOpened] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    timer.current = setTimeout(onNext, 1600);
  };

  return (
    <div className={`envelope-screen${opened ? " is-open" : ""}`}>
      <p className="kicker env-kicker">{letter.label}</p>

      <div className="env-appear">
        <div
          className={`envelope${opened ? " is-open" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Buka surat"
          data-testid="envelope-card"
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen();
            }
          }}
        >
          <div className="env-back" />
          <div className="env-letter">
            <Heart size={30} color="#e0475e" className="env-letter-heart" />
            <span className="env-letter-line" />
          </div>
          <div className="env-front" />
          <div className="env-flap" />
          <Heart size={34} color="#e0475e" className="env-seal" />
        </div>
      </div>

      <h1 className="hand env-teaser">{letter.teaser}</h1>
      <p className="env-hint">{letter.hint}</p>
    </div>
  );
}
