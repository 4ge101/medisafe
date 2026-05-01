import "../styles/Home.css";
import { useApp } from "../context/AppContext";
import { getTimeSlotLabel } from "../utils/helpers";

interface Props {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: Props) {
  const { medicines, deleteMedicine, settings, getTodayDoses } = useApp();

  const todayDoses = getTodayDoses();
  const takenCount = todayDoses.filter(d => d.record.status === "taken").length;
  const totalCount = todayDoses.length;

  const hour = new Date().getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  else if (hour >= 17) greeting = "Good evening";

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove ${name} from your medicines?`)) {
      deleteMedicine(id);
    }
  };

  return (
    <div className={`home-page ${settings.simpleMode ? "simple-mode" : ""}`}>
      <div className="home-header">
        <div>
          <p className="greeting">{greeting} 👋</p>
          <h1 className="app-title">Medi<span>Safe</span></h1>
        </div>
        <span className="header-icon">💊</span>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-number">{takenCount}</span>
          <span className="stat-label">Taken Today</span>
        </div>
        <div className="stat-card">
          <span className="stat-number" style={{ color: "var(--accent)" }}>
            {totalCount - takenCount}
          </span>
          <span className="stat-label">Remaining</span>
        </div>
      </div>

      <h2 className="section-title">My Medicines ({medicines.length})</h2>

      {medicines.length === 0 ? (
        <div className="empty-state">
          <span style={{ fontSize: 60 }}>💊</span>
          <p>No medicines added yet.</p>
          <p style={{ fontSize: 14 }}>Add your first medicine to get started!</p>
          <button className="quick-add-btn" onClick={() => onNavigate("add")}>
            + Add Medicine
          </button>
        </div>
      ) : (
        <div className="medicine-cards">
          {medicines.map(med => (
            <div key={med.id} className="med-card">
              <div
                className="med-icon-circle"
                style={{ background: med.color + "22" }}
              >
                {med.icon}
              </div>
              <div className="med-info">
                <p className="med-name">{med.name}</p>
                <p className="med-detail">
                  {med.dosage} · {getTimeSlotLabel(med.timeSlot)}
                </p>
                <p className="med-detail" style={{ fontSize: 12, marginTop: 2 }}>
                  Until {new Date(med.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
              <button
                className="med-delete"
                onClick={() => handleDelete(med.id, med.name)}
                title="Remove medicine"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}