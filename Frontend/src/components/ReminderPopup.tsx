import { useEffect } from "react";
import "../styles/ReminderPopup.css";
import type { Medicine } from "../types";
import { speak, getSlotShortTime } from "../utils/helpers";
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
      setTimeout(() => speak(`Time to take your ${medicine.name}. ${medicine.dosage}.`), 400);
    }
  }, []);

  return (
    <div className="rem-overlay" onClick={(e) => { if (e.target === e.currentTarget) onDismiss(); }}>
      <div className="rem-sheet">
        <div className="rem-top">
          <div className="rem-icon" style={{ background: medicine.color + "22" }}>
            {medicine.icon}
          </div>
          <div>
            <div className="rem-tag">⏰ Time for your medicine</div>
            <div className="rem-name">{medicine.name}</div>
            <div className="rem-dose">{medicine.dosage} · {getSlotShortTime(timeSlot)}</div>
          </div>
        </div>
        <div className="rem-line" />
        <div className="rem-actions">
          <button className="rem-take" onClick={onTaken}>✅ Mark as Taken</button>
          <div className="rem-row">
            <button className="rem-snooze" onClick={onSnooze}>
              😴 Snooze {settings.snoozeMinutes}m
            </button>
            {settings.voiceEnabled && (
              <button className="rem-voice" onClick={() => speak(`Time to take your ${medicine.name}. ${medicine.dosage}.`)}>
                🔊 Hear Again
              </button>
            )}
          </div>
          <button className="rem-dismiss" onClick={onDismiss}>Dismiss reminder</button>
        </div>
      </div>
    </div>
  );
}