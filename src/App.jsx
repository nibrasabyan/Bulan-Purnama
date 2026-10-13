import { useEffect, useState } from "react";
import { people, theme } from "./config.js";
import Envelope from "./components/Envelope.jsx";
import FlowerAnimation, { FloatingPetals } from "./components/FlowerAnimation.jsx";
import Message from "./components/Message.jsx";
import Invitation from "./components/Invitation.jsx";
import DatePicker from "./components/DatePicker.jsx";
import ActivityPicker from "./components/ActivityPicker.jsx";
import DressCodePicker from "./components/DressCodePicker.jsx";

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

  const toggleActivity = (label) =>
    setActivities((list) =>
      list.includes(label) ? list.filter((l) => l !== label) : [...list, label]
    );

  const commitCustomActivity = () => {
    const idea = customActivity.trim();
    if (!idea || activities.includes(idea)) return;
    setActivities((list) => [...list, idea]);
    setCustomActivity("");
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

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Envelope onNext={next} />;
      case 1:
        return null;
      case 2:
        return <Message onNext={next} />;
      case 3:
        return <Invitation onNext={next} />;
      case 4:
        return (
          <DatePicker
            date={date}
            time={time}
            timeLabel={timeLabel}
            onDate={setDate}
            onTime={setTime}
            onTimeLabel={setTimeLabel}
            onNext={next}
          />
        );
      case 5:
        return (
          <ActivityPicker
            selected={activities}
            custom={customActivity}
            onToggle={toggleActivity}
            onCustom={setCustomActivity}
            onCommitCustom={commitCustomActivity}
            onNext={next}
          />
        );
      case 6:
        return (
          <DressCodePicker
            dressCode={dressCode}
            customDressCode={customDressCode}
            note={note}
            onDressCode={setDressCode}
            onCustom={setCustomDressCode}
            onNote={setNote}
            onNext={next}
          />
        );
      default:
        return (
          <section className="card" data-testid={`step-panel-${step}`}>
            <p className="kicker">
              Step {step + 1} / {STEP_TITLES.length}
            </p>
            <h2 className="hand scaffold-title">{STEP_TITLES[step]}</h2>
            <p className="scaffold-sub">
              Layar untuk {people.sender.nick} → {people.receiver.nick} dibuat di
              checkpoint berikutnya.
            </p>
          </section>
        );
    }
  };

  return (
    <main className="app" data-testid="app-root">
      {step === 1 && <FlowerAnimation onDone={next} />}
      {step >= 2 && <FloatingPetals />}
      <div className="step-wrap" key={step}>
        {renderStep()}
      </div>

      {step >= 3 && (
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
      )}
    </main>
  );
}
