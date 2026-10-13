import { message } from "../config.js";
import "../styles/message.css";

export default function Message({ onNext }) {
  return (
    <section className="card msg-card" data-testid="message-card">
      <p className="hand msg-label">{message.label}</p>
      <div className="msg-body">
        {message.paragraphs.map((p, i) => (
          <p key={i} className="msg-para" style={{ animationDelay: `${0.45 + i * 1.1}s` }}>
            {p}
          </p>
        ))}
      </div>
      <button
        className="btn btn-primary msg-next"
        data-testid="message-next-btn"
        style={{
          animationDelay: `${0.45 + message.paragraphs.length * 1.1 + 0.25}s`,
        }}
        onClick={onNext}
      >
        {message.nextLabel}
      </button>
    </section>
  );
}
