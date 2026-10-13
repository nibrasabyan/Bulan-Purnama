import { useEffect, useState } from "react";
import { theme } from "./config.js";
import Ambient from "./components/Ambient.jsx";
import Envelope from "./components/Envelope.jsx";
import FlowerAnimation, { FloatingPetals } from "./components/FlowerAnimation.jsx";
import Message from "./components/Message.jsx";
import Invitation from "./components/Invitation.jsx";
import DatePicker from "./components/DatePicker.jsx";
import ActivityPicker from "./components/ActivityPicker.jsx";
import DressCodePicker from "./components/DressCodePicker.jsx";
import Ticket from "./components/Ticket.jsx";

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

  const next = () => setStep((s) => (s + 1) % 8);

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
      case 7:
        return (
          <Ticket
            date={date}
            time={time}
            timeLabel={timeLabel}
            activities={activities}
            dressCode={dressCode}
            customDressCode={customDressCode}
            note={note}
            onReset={reset}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="app" data-testid="app-root">
      <Ambient />
      {step === 1 && <FlowerAnimation onDone={next} />}
      {step >= 2 && <FloatingPetals />}
      <div className="step-wrap" key={step}>
        {renderStep()}
      </div>
    </main>
  );
}
