import { useEffect } from "react";
import "../styles/ReminderPopup.css";
import type { Medicine } from "../types";
import { speak } from "../utils/helpers";
import { useApp } from "../context/AppContext";

interface Props {
  medicine: Medicine;
  timeSlot: string;
  onTaken: () => void;
  onSnooze: () => void;
  onDismiss: () => void;
}

export default function ReminderPopup({ medicine, timeSlot, onTaken, onSnooze, onDismiss }: Props) {
  const { settings } = useApp();

  useEffect(() => {
    if (settings.voiceEnabled) {
      setTimeout(() => {
        speak(`Time to take your ${medicine.name}. ${medicine.dosage}.`);
      }, 400);
    }
  }, []);

  const speakAgain = () => {
    speak(`Time to take your ${medicine.name}. ${medicine.dosage}.`);
  };

  return (
    <div className="reminder-overlay">
      <div className="reminder-card">
        <span className="reminder-pulse">{medicine.icon}</span>
        <h2>Time for your medicine!</h2>
        <p style={{ color: medicine.color, fontWeight: 700, fontSize: 18 }}>
          {medicine.name}
        </p>
        <p>{medicine.dosage} · {timeSlot}</p>

        {settings.voiceEnabled && (
          <button onClick={speakAgain} style={{
            background: "none", border: "2px solid var(--border)",
            borderRadius: 10, padding: "8px 18px", cursor: "pointer",
            color: "var(--text-muted)", fontSize: 14, marginBottom: 16,
          }}>
            🔊 Hear Again
          </button>
        )}

        <div className="reminder-actions">
          <button className="btn-taken" onClick={onTaken}>
            ✅ Mark as Taken
          </button>
          <button className="btn-snooze" onClick={onSnooze}>
            😴 Snooze ({settings.snoozeMinutes} min)
          </button>
          <button className="btn-dismiss" onClick={onDismiss}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}