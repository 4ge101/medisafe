import "../styles/History.css";
import { useApp } from "../context/AppContext";

export default function History() {
  const { settings, getHistory } = useApp();
  const history = getHistory();

  const totalTaken = history.reduce((s, d) => s + d.taken, 0);
  const totalDoses = history.reduce((s, d) => s + d.total, 0);
  const adherencePct = totalDoses === 0 ? 0 : Math.round((totalTaken / totalDoses) * 100);

  const maxTotal = Math.max(...history.map(d => d.total), 1);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getColor = (taken: number, total: number) => {
    if (total === 0) return "var(--border)";
    const ratio = taken / total;
    if (ratio >= 0.8) return "#4CAF50";
    if (ratio >= 0.5) return "#FF9800";
    return "#f44336";
  };

  const formatHistoryDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const today = new Date();
    const diff = Math.round((today.getTime() - d.getTime()) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <div className={`history-page ${settings.simpleMode ? "simple-mode" : ""}`}>
      <h1>Medicine History</h1>
      <p className="subtitle">Your last 7 days</p>

      <div className="adherence-circle">
        <span className="adherence-pct">{adherencePct}%</span>
        <span className="adherence-label">Adherence</span>
      </div>

      <div className="week-bars">
        {history.map((day) => {
          const d = new Date(day.date);
          const barHeight = day.total === 0 ? 6 : Math.max(12, (day.taken / maxTotal) * 90);
          return (
            <div key={day.date} className="day-bar-wrap">
              <div
                className="day-bar"
                style={{
                  height: barHeight,
                  background: getColor(day.taken, day.total),
                }}
              />
              <span className="day-label">{dayNames[d.getDay()]}</span>
            </div>
          );
        })}
      </div>

      <div className="history-list">
        {[...history].reverse().map(day => {
          const pct = day.total === 0 ? 0 : Math.round((day.taken / day.total) * 100);
          const color = getColor(day.taken, day.total);
          return (
            <div key={day.date} className="history-row">
              <div>
                <p className="history-date">{formatHistoryDate(day.date)}</p>
                <p className="history-count">{day.taken} of {day.total} doses taken</p>
              </div>
              <span
                className="history-pill"
                style={{ background: color + "22", color }}
              >
                {day.total === 0 ? "—" : `${pct}%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}