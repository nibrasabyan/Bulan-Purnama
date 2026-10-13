import { formatIndoDate } from "./DatePicker.jsx";
import { people, senderNote, ticket, times, whatsappNumber } from "../config.js";
import { Sparkle } from "./Icons.jsx";
import "../styles/ticket.css";

function Row({ icon, label, value, testid }) {
  return (
    <div className="ticket-row" data-testid={testid}>
      <span className="ticket-row-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="kicker ticket-row-label">{label}</p>
        <p className="ticket-row-value">{value}</p>
      </div>
    </div>
  );
}

export default function Ticket({
  date,
  time,
  timeLabel,
  activities,
  dressCode,
  customDressCode,
  note,
  onReset,
}) {
  const timeLabelText = times.find((t) => t.id === timeLabel)?.label;
  const kapan = [date && formatIndoDate(date), timeLabelText, time]
    .filter(Boolean)
    .join(" · ");
  const acara = activities.length > 0 ? activities.join(", ") : "-";
  const dress = customDressCode.trim() || dressCode || "-";
  const notes = note.trim() || "-";

  const waText = `Hai ${people.sender.nick}! Aku mau jalan sama kamu 😊\n📅 Kapan: ${kapan}\n🎯 Acara: ${acara}\n👗 Dress code: ${dress}\n📝 Notes: ${notes}`;
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`;

  return (
    <section className="ticket-screen" data-testid="ticket-step">
      <Sparkle size={30} color="#f0b34a" className="ticket-heart" />
      <h1 className="hand ticket-title">{ticket.title}</h1>
      <p className="kicker ticket-kicker">{ticket.kicker}</p>

      <div className="ticket-card" data-testid="ticket-card">
        <div className="ticket-head">
          <div>
            <p className="kicker">{ticket.admit}</p>
            <p className="hand ticket-name">{ticket.name}</p>
          </div>
          <span className="ticket-stamp" aria-hidden="true">
            <Sparkle size={26} color="var(--primary)" />
          </span>
        </div>

        <div className="ticket-rows">
          <Row icon="🌟" label={ticket.labels.untuk} value={people.receiver.full} testid="ticket-unto" />
          <Row icon="📅" label={ticket.labels.kapan} value={kapan} testid="ticket-when" />
          <Row icon="🎯" label={ticket.labels.acara} value={acara} testid="ticket-plan" />
          <Row icon="👗" label={ticket.labels.dressCode} value={dress} testid="ticket-dress" />
          <Row icon="📝" label={ticket.labels.notes} value={notes} testid="ticket-notes" />
        </div>

        <div className="ticket-note">
          <p className="kicker">{ticket.labels.catatan}</p>
          <p className="hand ticket-note-text">{senderNote}</p>
        </div>

        <p className="hand ticket-footer">{ticket.footer}</p>
      </div>

      <a
        className="btn btn-primary ticket-wa"
        href={waLink}
        target="_blank"
        rel="noreferrer"
        data-testid="wa-button"
      >
        {ticket.waButton}
      </a>
      <button className="btn btn-ghost ticket-reset" onClick={onReset} data-testid="reset-button">
        {ticket.resetButton}
      </button>
      <p className="ticket-hint">{ticket.hint}</p>
    </section>
  );
}
