import { dresscode, dressCodeOptions } from "../config.js";
import "../styles/dresscodepicker.css";

export default function DressCodePicker({
  dressCode,
  customDressCode,
  note,
  onDressCode,
  onCustom,
  onNote,
  onNext,
}) {
  return (
    <section className="card dc-card" data-testid="dresscode-step">
      <p className="kicker">{dresscode.label}</p>
      <h1 className="hand dc-title">{dresscode.title}</h1>

      <div className="pill-row dc-pills" role="group" aria-label="Dress code">
        {dressCodeOptions.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`pill${
              dressCode === opt && !customDressCode.trim() ? " selected" : ""
            }`}
            onClick={() => onDressCode(opt)}
            data-testid={`dresscode-pill-${opt.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <input
        type="text"
        className="dc-input"
        placeholder={dresscode.customPlaceholder}
        value={customDressCode}
        onChange={(e) => onCustom(e.target.value)}
        data-testid="dresscode-custom-input"
      />

      <label className="dc-note-label" htmlFor="dc-note">
        {dresscode.noteLabel}
      </label>
      <div className="dc-note-wrap">
        <textarea
          id="dc-note"
          className="dc-note"
          rows={2}
          maxLength={dresscode.noteMax}
          value={note}
          onChange={(e) => onNote(e.target.value)}
          data-testid="dresscode-note-input"
        />
        <span className="dc-count" data-testid="dresscode-note-count">
          {note.length}/{dresscode.noteMax}
        </span>
      </div>

      <button
        className="btn btn-primary dc-next"
        onClick={onNext}
        data-testid="dresscode-next-btn"
      >
        {dresscode.nextLabel}
      </button>
    </section>
  );
}
