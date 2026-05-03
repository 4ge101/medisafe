import "../styles/History.css";
import { useApp } from "../context/AppContext";
import { formatDate, todayStr } from "../utils/helpers";

export default function History() {
  const { settings, getHistory } = useApp();
  const history = getHistory();

  const totalTaken = history.reduce((s, d) => s + d.taken, 0);
  const totalDoses = history.reduce((s, d) => s + d.total, 0);
  const adhPct = totalDoses === 0 ? 0 : Math.round((totalTaken / totalDoses) * 100);
  const maxTotal = Math.max(...history.map((d) => d.total), 1);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function barColor(taken: number, total: number) {
    if (total === 0) return "var(--border)";
    const r = taken / total;
    if (r >= 0.8) return "#00b894";
    if (r >= 0.5) return "#ffa502";
    return "#d63031";
  }

  let streak = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].total > 0 && history[i].taken === history[i].total) streak++;
    else if (history[i].total > 0) break;
  }

  return (
    <div className={`hist-page ${settings.simpleMode ? "simple-mode" : ""}`}>
      <div className="hist-hero">
        <h1>Medicine History</h1>
        <p>Last 7 days overview</p>
        <div className="adh-row">
          <div className="adh-ring"><span className="adh-pct">{adhPct}%</span></div>
          <div className="adh-info">
            <strong>Weekly Adherence</strong>
            <span>{totalTaken} of {totalDoses} doses taken</span>
          </div>
        </div>
      </div>

      <div className="hist-body">
        {streak > 1 && (
          <div className="streak-box">
            <span className="s-icon">🔥</span>
            <div>
              <strong>{streak} Day Streak!</strong>
              <small>Keep it up — you're doing great!</small>
            </div>
          </div>
        )}

        <div className="chart-card">
          <div className="chart-title">Weekly Overview</div>
          <div className="bars">
            {history.map((d) => {
              const idx = new Date(d.date).getDay();
              const barH = d.total === 0 ? 3 : Math.max(6, Math.round((d.taken / maxTotal) * 82));
              const isToday = d.date === todayStr();
              return (
                <div key={d.date} className="bar-col">
                  <div className="bar-fill" style={{ height: barH, background: barColor(d.taken, d.total) }} />
                  <span className="bar-day" style={isToday ? { color: "#0984e3", fontWeight: 800 } : {}}>
                    {days[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hist-sec">Daily Breakdown</div>
        {[...history].reverse().map((d, i) => {
          const p = d.total === 0 ? null : Math.round((d.taken / d.total) * 100);
          const c = barColor(d.taken, d.total);
          return (
            <div key={d.date} className="hist-row" style={{ animationDelay: `${i * 0.05}s` }}>
              <div>
                <div className="hist-d">{formatDate(d.date)}</div>
                <div className="hist-c">{d.total === 0 ? "No medicines scheduled" : `${d.taken} of ${d.total} doses taken`}</div>
              </div>
              {p !== null && <span className="hist-pct" style={{ background: c + "18", color: c }}>{p}%</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}