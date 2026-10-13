import { useEffect, useState } from "react";
import { people, theme } from "./config.js";

const STEP_TITLES = [
  "Surat pembuka",
  "Animasi bunga",
  "Pesan apresiasi",
  "Ajakan",
  "Kapan kamu free?",
  "Rencana kita",
  "Dress code-nya?",
  "Tiket rangkuman",
];

export default function App() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [timeLabel, setTimeLabel] = useState("");
  const [activities, setActivities] = useState([]);
  const [customActivity, setCustomActivity] = useState("");
  const [dressCode, setDressCode] = useState("");
  const [customDressCode, setCustomDressCode] = useState("");
  const [note, setNote] = useState("");

  // Sinkronkan tema dari config.js ke CSS variables
  useEffect(() => {
    const s = document.documentElement.style;
    s.setProperty("--primary", theme.primary);
    s.setProperty("--secondary", theme.secondary);
    s.setProperty("--accent", theme.accent);
    s.setProperty("--card", theme.card);
    theme.background.forEach((c, i) => s.setProperty(`--bg-${i + 1}`, c));
  }, []);

  const goTo = (i) => setStep(((i % STEP_TITLES.length) + STEP_TITLES.length) % STEP_TITLES.length);
  const next = () => goTo(step + 1);

  const reset = () => {
    setStep(0);
    setDate(null);
    setTime("");
    setTimeLabel("");
    setActivities([]);
    setCustomActivity("");
    setDressCode("");
    setCustomDressCode("");
    setNote("");
  };

  const state = {
    step,
    date,
    time,
    timeLabel,
    activities,
    customActivity,
    dressCode,
    customDressCode,
    note,
  };

  return (
    <main className="app" data-testid="app-root">
      <div className="step-wrap" key={step}>
        <section className="card" data-testid={`step-panel-${step}`}>
          <p className="kicker">
            Step {step + 1} / {STEP_TITLES.length}
          </p>
          <h2 className="hand scaffold-title">{STEP_TITLES[step]}</h2>
          <p className="scaffold-sub">
            Kerangka alur &amp; state sudah tersambung untuk {people.sender.nick} →{" "}
            {people.receiver.nick}. Layar tiap step dibuat di checkpoint berikutnya.
          </p>
        </section>
      </div>

      <section className="scaffold-panel" data-testid="state-viewer">
        <p className="kicker">State alur</p>
        <pre className="scaffold-state">{JSON.stringify(state, null, 2)}</pre>
        <div className="scaffold-actions">
          <button className="btn btn-primary" data-testid="dev-next-step" onClick={next}>
            Step +1
          </button>
          <button className="btn btn-ghost" data-testid="dev-reset" onClick={reset}>
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}
