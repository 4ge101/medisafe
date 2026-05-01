import "../styles/Schedule.css";
import { useApp } from "../context/AppContext";
import { getTimeSlotLabel, speak, todayStr } from "../utils/helpers";

export default function Schedule() {
  const { settings, getTodayDoses, markDose } = useApp();
  const doses = getTodayDoses();
  const today = todayStr();

  const handleTake = (medicineId: string, timeSlot: string, medicineName: string) => {
    markDose(medicineId, today, timeSlot, "taken");
    if (settings.voiceEnabled) {
      speak(`Great! ${medicineName} marked as taken.`);
    }
  };

  const handleMiss = (medicineId: string, timeSlot: string) => {
    markDose(medicineId, today, timeSlot, "missed");
  };

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  // group by time slot order
  const order = ["morning", "afternoon", "night", "custom"];
  const sorted = [...doses].sort((a, b) => {
    return order.indexOf(a.record.timeSlot) - order.indexOf(b.record.timeSlot);
  });

  const takenAll = doses.length > 0 && doses.every(d => d.record.status === "taken");

  return (
    <div className={`schedule-page ${settings.simpleMode ? "simple-mode" : ""}`}>
      <h1>Today's Schedule</h1>
      <p className="date-str">📅 {todayLabel}</p>

      {takenAll && (
        <div style={{
          background: "#4CAF5015", border: "2px solid #4CAF5055",
          borderRadius: 16, padding: "16px 20px", marginBottom: 20,
          textAlign: "center",
        }}>
          <p style={{ margin: 0, fontWeight: 700, color: "#2e7d32", fontSize: 16 }}>
            🎉 All medicines taken! Great job!
          </p>
        </div>
      )}

      {doses.length === 0 ? (
        <div className="empty-schedule">
          <span style={{ fontSize: 64 }}>🌟</span>
          <p>No medicines scheduled for today.</p>
          <p style={{ fontSize: 13 }}>Add medicines to see your schedule here.</p>
        </div>
      ) : (
        sorted.map(({ medicine, record }) => (
          <div key={`${medicine.id}-${record.timeSlot}`} className={`dose-card ${record.status}`}>
            <div
              className="dose-icon-wrap"
              style={{ background: medicine.color + "22" }}
            >
              {medicine.icon}
            </div>

            <div className="dose-info">
              <p className="dose-name">{medicine.name}</p>
              <p className="dose-meta">{medicine.dosage}</p>
              <p className="dose-meta">{getTimeSlotLabel(record.timeSlot)}</p>
            </div>

            <div className="dose-action">
              {record.status === "pending" && (
                <>
                  <button className="btn-take" onClick={() => handleTake(medicine.id, record.timeSlot, medicine.name)}>
                    ✅ Take
                  </button>
                  <button
                    onClick={() => handleMiss(medicine.id, record.timeSlot)}
                    style={{
                      background: "none", border: "none", fontSize: 12,
                      color: "var(--text-muted)", cursor: "pointer", textDecoration: "underline",
                    }}
                  >
                    Skip
                  </button>
                </>
              )}
              {record.status === "taken" && (
                <span className="status-badge taken">✅ Taken</span>
              )}
              {record.status === "missed" && (
                <span className="status-badge missed">❌ Missed</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}