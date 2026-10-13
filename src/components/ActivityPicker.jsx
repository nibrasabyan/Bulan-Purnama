import { activities, plan } from "../config.js";
import "../styles/activitypicker.css";

export default function ActivityPicker({
  selected,
  custom,
  onToggle,
  onCustom,
  onCommitCustom,
  onNext,
}) {
  const canNext = selected.length > 0 || custom.trim().length > 0;
  const customIdeas = selected.filter((label) => !activities.some((a) => a.label === label));

  const handleOke = () => {
    const idea = custom.trim();
    if (!idea) return;
    if (!selected.includes(idea)) onToggle(idea);
    onCustom("");
  };

  const handleNext = () => {
    if (custom.trim()) onCommitCustom();
    onNext();
  };

  return (
    <section className="card act-card" data-testid="activity-step">
      <p className="kicker">{plan.label}</p>
      <h1 className="hand act-title">{plan.title}</h1>

      <div className="act-grid" role="group" aria-label="Pilih aktivitas">
        {activities.map((a) => {
          const active = selected.includes(a.label);
          return (
            <button
              key={a.id}
              type="button"
              className={`act-item${active ? " selected" : ""}`}
              onClick={() => onToggle(a.label)}
              aria-pressed={active}
              data-testid={`activity-card-${a.id}`}
            >
              <span className="act-emoji" aria-hidden="true">
                {a.emoji}
              </span>
              <span className="act-label">{a.label}</span>
            </button>
          );
        })}
      </div>

      {customIdeas.length > 0 && (
        <div className="act-chips" data-testid="activity-chips">
          {customIdeas.map((idea) => (
            <span key={idea} className="chip">
              {idea}
              <button
                type="button"
                className="chip-x"
                onClick={() => onToggle(idea)}
                aria-label={`Hapus ${idea}`}
                data-testid={`activity-chip-remove-${idea}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="act-custom">
        <input
          type="text"
          className="act-input"
          placeholder={plan.customPlaceholder}
          value={custom}
          onChange={(e) => onCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleOke();
            }
          }}
          data-testid="activity-custom-input"
        />
        <button
          type="button"
          className="btn act-oke"
          onClick={handleOke}
          disabled={!custom.trim()}
          data-testid="activity-custom-ok"
        >
          {plan.customButton}
        </button>
      </div>

      <button
        className="btn btn-primary act-next"
        disabled={!canNext}
        onClick={handleNext}
        data-testid="activity-next-btn"
      >
        {plan.nextLabel}
      </button>
    </section>
  );
}
