import { useMemo, useState } from "react";
import { times, when } from "../config.js";
import "../styles/datepicker.css";

const DAY_NAMES = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const DAY_HEADERS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const isoOf = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

export function formatIndoDate(date) {
  return `${DAY_NAMES[(date.getDay() + 6) % 7]}, ${date.getDate()} ${
    MONTH_NAMES[date.getMonth()]
  } ${date.getFullYear()}`;
}

export default function DatePicker({
  date,
  time,
  timeLabel,
  onDate,
  onTime,
  onTimeLabel,
  onNext,
}) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [open, setOpen] = useState(true);

  const y = view.getFullYear();
  const m = view.getMonth();
  const firstWeekday = (new Date(y, m, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const atCurrentMonth = y === today.getFullYear() && m === today.getMonth();

  const pick = (day) => {
    const d = new Date(y, m, day);
    if (d < today) return;
    onDate(d);
  };

  const cells = [
    ...Array.from({ length: firstWeekday }, (_, i) => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <section className="card when-card" data-testid="datepicker-step">
      <h1 className="hand when-title">{when.title}</h1>

      <div className={`cal ${open ? "is-open" : ""}`} data-testid="calendar">
        <button
          type="button"
          className="cal-toggle"
          onClick={() => setOpen((o) => !o)}
          data-testid="calendar-toggle"
        >
          <span>{date ? formatIndoDate(date) : "Pilih tanggal"}</span>
          <span className={`cal-chevron${open ? " up" : ""}`} aria-hidden="true">
            ▾
          </span>
        </button>

        {open && (
          <div className="cal-panel">
            <div className="cal-head">
              <button
                type="button"
                className="cal-nav"
                onClick={() => setView(new Date(y, m - 1, 1))}
                disabled={atCurrentMonth}
                aria-label="Bulan sebelumnya"
                data-testid="cal-prev"
              >
                ‹
              </button>
              <span className="cal-month" data-testid="cal-month-label">
                {MONTH_NAMES[m]} {y}
              </span>
              <button
                type="button"
                className="cal-nav"
                onClick={() => setView(new Date(y, m + 1, 1))}
                aria-label="Bulan berikutnya"
                data-testid="cal-next"
              >
                ›
              </button>
            </div>

            <div className="cal-grid cal-days">
              {DAY_HEADERS.map((d) => (
                <span key={d} className="cal-dayname">
                  {d}
                </span>
              ))}
            </div>

            <div className="cal-grid">
              {cells.map((day, i) => {
                if (day === null) return <span key={`empty-${i}`} />;
                const d = new Date(y, m, day);
                const past = d < today;
                const selected = date && isoOf(date) === isoOf(d);
                return (
                  <button
                    key={day}
                    type="button"
                    className={`cal-day${selected ? " selected" : ""}`}
                    disabled={past}
                    onClick={() => pick(day)}
                    data-testid={`cal-day-${day}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <p className="kicker when-sub">Pilih waktunya</p>
      <div className="pill-row" role="group" aria-label="Waktu">
        {times.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`pill${timeLabel === t.id ? " selected" : ""}`}
            onClick={() => {
              onTimeLabel(t.id);
              onTime(t.hour);
            }}
            data-testid={`time-pill-${t.id}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <label className="when-time-label" htmlFor="time-input">
        Atau atur jam sendiri
      </label>
      <input
        id="time-input"
        type="time"
        className="time-input"
        value={time}
        onChange={(e) => onTime(e.target.value)}
        data-testid="time-input"
      />

      <button
        className="btn btn-primary when-next"
        disabled={!date || !time}
        onClick={onNext}
        data-testid="when-next-btn"
      >
        {when.nextLabel}
      </button>
    </section>
  );
}
