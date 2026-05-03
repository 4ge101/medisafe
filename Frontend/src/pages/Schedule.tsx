import "../styles/Schedule.css";
import { useApp } from "../context/AppContext";
import { speak, todayStr } from "../utils/helpers";

export default function Schedule() {
  const { settings, getTodayDoses, markDose } = useApp();
  const doses = getTodayDoses();
  const today = todayStr();

  const taken = doses.filter((d) => d.record.status === "taken").length;
  const total = doses.length;
  const pct = total === 0 ? 0 : Math.round((taken / total) * 100);
  const allDone = total > 0 && doses.every((d) => d.record.status === "taken");

  const dateLabel = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const handleTake = (medicineId: string, slot: string, name: string) => {
    markDose(medicineId, today, slot, "taken");
    if (settings.voiceEnabled) speak(`Great! ${name} marked as taken.`);
  };

  const order = ["morning", "afternoon", "night", "custom"];
  const sorted = [...doses].sort((a, b) => order.indexOf(a.record.timeSlot) - order.indexOf(b.record.timeSlot));

  const groups: Record<string, typeof sorted> = {};
  sorted.forEach((d) => {
    const s = d.record.timeSlot;
    if (!groups[s]) groups[s] = [];
    groups[s].push(d);
  });

  const slotName: Record<string, string> = {
    morning: "🌅 Morning",
    afternoon: "☀️ Afternoon",
    night: "🌙 Night",
    custom: "⏰ Custom",
  };

  return (
    <div className={`sch-page ${settings.simpleMode ? "simple-mode" : ""}`}>
      <div className="sch-hero">
        <h1>Today's Schedule</h1>
        <div className="sch-date">📅 {dateLabel}</div>
        <div className="prog-bg"><div className="prog-fill" style={{ width: `${pct}%` }} /></div>
        <div className="prog-lbl">{taken} of {total} doses taken · {pct}%</div>
      </div>

      <div className="sch-body">
        {allDone && <div className="all-done-banner"><p>🎉 All medicines taken today! Great job!</p></div>}

        {total === 0 ? (
          <div className="sch-empty">
            <span style={{ fontSize: 48, display: "block", marginBottom: 10 }}>🌟</span>
            <strong style={{ fontSize: 16, color: "var(--text)" }}>Nothing scheduled today</strong>
            <p style={{ fontSize: 13, color: "var(--text3)", marginTop: 6 }}>Add medicines to see your daily schedule here.</p>
          </div>
        ) : (
          Object.entries(groups).map(([slot, items]) => (
            <div key={slot}>
              <div className="slot-lbl">{slotName[slot] || slot}</div>
              {items.map(({ medicine: m, record: r }, i) => (
                <div key={`${m.id}-${r.timeSlot}`} className={`dose-card ${r.status}`} style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="dose-icon" style={{ background: m.color + "22" }}>{m.icon}</div>
                  <div className="dose-body">
                    <div className="dose-name">{m.name}</div>
                    <div className="dose-sub">{m.dosage}</div>
                    {r.status === "taken" && r.takenAt && (
                      <div className="dose-taken-at">
                        Taken at {new Date(r.takenAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    )}
                  </div>
                  <div className="dose-right">
                    {r.status === "pending" && (
                      <>
                        <button className="take-btn" onClick={() => handleTake(m.id, r.timeSlot, m.name)}>✅ Take</button>
                        <button className="skip-btn" onClick={() => markDose(m.id, today, r.timeSlot, "missed")}>Skip</button>
                      </>
                    )}
                    {r.status === "taken" && <span className="status-pill taken">✅ Taken</span>}
                    {r.status === "missed" && <span className="status-pill missed">❌ Missed</span>}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}