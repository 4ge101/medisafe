import "../styles/Home.css";
import { useApp } from "../context/AppContext";
import { getSlotShortTime, todayStr } from "../utils/helpers";

interface Props {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: Props) {
  const { medicines, deleteMedicine, settings, getTodayDoses, doseRecords } = useApp();

  const todayDoses = getTodayDoses();
  const taken = todayDoses.filter((d) => d.record.status === "taken").length;
  const pending = todayDoses.filter((d) => d.record.status === "pending").length;
  const total = todayDoses.length;
  const pct = total === 0 ? 0 : Math.round((taken / total) * 100);

  const h = new Date().getHours();
  const greeting = h < 12 ? "Good morning 👋" : h < 17 ? "Good afternoon 👋" : "Good evening 👋";

  const upcoming = todayDoses.filter((d) => d.record.status === "pending").slice(0, 3);
  const today = todayStr();

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from your medicines?`)) deleteMedicine(id);
  };

  return (
    <div className={`home-page ${settings.simpleMode ? "simple-mode" : ""}`}>
      <div className="home-hero">
        <div className="greeting">{greeting}</div>
        <h1>MediSafe 💊</h1>
        <div className="stats-grid">
          <div className="stat-box"><div className="stat-num">{taken}</div><div className="stat-lbl">Taken</div></div>
          <div className="stat-box"><div className="stat-num">{pending}</div><div className="stat-lbl">Pending</div></div>
          <div className="stat-box"><div className="stat-num">{pct}%</div><div className="stat-lbl">Today</div></div>
        </div>
      </div>

      <div className="home-body">
        {upcoming.length > 0 && (
          <div className="upcoming-box">
            <div className="upcoming-title">⏰ Coming up today</div>
            {upcoming.map(({ medicine: m, record: r }) => (
              <div key={m.id} className="upcoming-row">
                <div className="up-dot" style={{ background: m.color }} />
                <span className="up-name">{m.icon} {m.name}</span>
                <span className="up-time">{getSlotShortTime(r.timeSlot)}</span>
              </div>
            ))}
          </div>
        )}

        <div className="sec-head">
          <span className="sec-title">My Medicines</span>
          <span className="sec-badge">{medicines.length} total</span>
        </div>

        {medicines.length === 0 ? (
          <div className="empty-box">
            <span className="empty-icon">💊</span>
            <h3>No medicines yet</h3>
            <p>Add your first medicine and MediSafe will remind you every day.</p>
            <button className="btn-green" onClick={() => onNavigate("add")}>+ Add Medicine</button>
          </div>
        ) : (
          medicines.map((med, i) => {
            const rec = doseRecords.find((r) => r.medicineId === med.id && r.date === today && r.timeSlot === med.timeSlot);
            const status = rec?.status;
            return (
              <div key={med.id} className="med-card fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="med-icon" style={{ background: med.color + "22" }}>{med.icon}</div>
                <div className="med-body">
                  <div className="med-name">{med.name}</div>
                  <div className="tags">
                    <span className="tag">{med.dosage}</span>
                    <span className="tag">
                      {med.timeSlot === "morning" ? "🌅 Morning" : med.timeSlot === "afternoon" ? "☀️ Afternoon" : med.timeSlot === "night" ? "🌙 Night" : "⏰ Custom"}
                    </span>
                    {status === "taken" && <span className="tag tag-green">✅ Taken</span>}
                    {status === "missed" && <span className="tag tag-red">❌ Missed</span>}
                  </div>
                </div>
                <button className="del-btn" onClick={() => handleDelete(med.id, med.name)}>🗑️</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}