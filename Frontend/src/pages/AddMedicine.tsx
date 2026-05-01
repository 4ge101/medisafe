import { useState, useRef } from "react";
import "../styles/AddMedicine.css";
import { useApp } from "../context/AppContext";
import { generateId, todayStr } from "../utils/helpers";
import type { TimeSlot } from "../types";

const timeOptions = [
  { value: "morning", label: "Morning", icon: "🌅", sub: "8:00 AM" },
  { value: "afternoon", label: "Afternoon", icon: "☀️", sub: "1:00 PM" },
  { value: "night", label: "Night", icon: "🌙", sub: "9:00 PM" },
  { value: "custom", label: "Custom", icon: "⏰", sub: "Pick time" },
];

const ICONS = ["💊", "💉", "🌿", "🧪", "💙", "⭐", "🔴", "🟠"];
const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7A072"];

interface Props {
  onDone: () => void;
}

export default function AddMedicine({ onDone }: Props) {
  const { addMedicine, settings } = useApp();
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("1 pill");
  const [timeSlot, setTimeSlot] = useState<TimeSlot>("morning");
  const [customTime, setCustomTime] = useState("08:00");
  const [startDate, setStartDate] = useState(todayStr());
  const [endDate, setEndDate] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("💊");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Try Chrome.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setName(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  };

  const handleSubmit = () => {
    if (!name.trim() || !endDate) return;
    addMedicine({
      id: generateId(),
      name: name.trim(),
      dosage,
      timeSlot,
      customTime: timeSlot === "custom" ? customTime : undefined,
      startDate,
      endDate,
      color: selectedColor,
      icon: selectedIcon,
    });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setName("");
      setDosage("1 pill");
      setTimeSlot("morning");
      setEndDate("");
      onDone();
    }, 1500);
  };

  const isValid = name.trim().length > 0 && endDate.length > 0;

  return (
    <div className={`add-page ${settings.simpleMode ? "simple-mode" : ""}`}>
      <h1>Add Medicine</h1>
      <p className="subtitle">Fill in your medicine details below</p>

      <div className="form-group">
        <label className="form-label">💊 Medicine Name</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g. Paracetamol, Metformin..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          className={`voice-input-btn ${listening ? "listening" : ""}`}
          onClick={handleVoiceInput}
        >
          🎤 {listening ? "Listening... tap to stop" : "Speak medicine name"}
        </button>
      </div>

      <div className="form-group">
        <label className="form-label">💉 Dosage</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g. 1 pill, 2 tablets, 5ml..."
          value={dosage}
          onChange={e => setDosage(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">⏰ When to Take</label>
        <div className="time-grid">
          {timeOptions.map(opt => (
            <button
              key={opt.value}
              className={`time-btn ${timeSlot === opt.value ? "selected" : ""}`}
              onClick={() => setTimeSlot(opt.value as TimeSlot)}
            >
              <span className="time-btn-icon">{opt.icon}</span>
              <span className="time-btn-label">{opt.label}</span>
              <span className="time-btn-label" style={{ opacity: 0.7, fontSize: 11 }}>{opt.sub}</span>
            </button>
          ))}
        </div>
        {timeSlot === "custom" && (
          <input
            className="form-input"
            style={{ marginTop: 10 }}
            type="time"
            value={customTime}
            onChange={e => setCustomTime(e.target.value)}
          />
        )}
      </div>

      <div className="form-group">
        <label className="form-label">📅 Duration</label>
        <div className="date-row">
          <div>
            <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Start</label>
            <input
              className="form-input"
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>End</label>
            <input
              className="form-input"
              type="date"
              value={endDate}
              min={startDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">🎨 Icon & Color</label>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          {ICONS.map(icon => (
            <button
              key={icon}
              onClick={() => setSelectedIcon(icon)}
              style={{
                fontSize: 28, border: "2px solid",
                borderColor: selectedIcon === icon ? "var(--primary)" : "transparent",
                borderRadius: 10, padding: 6, cursor: "pointer",
                background: "var(--hover-bg)",
              }}
            >
              {icon}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {COLORS.map(color => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                width: 34, height: 34, borderRadius: "50%", background: color,
                border: selectedColor === color ? "3px solid var(--text)" : "3px solid transparent",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit} disabled={!isValid}>
        ✅ Save Medicine
      </button>

      {showSuccess && (
        <div className="success-toast">✅ Medicine added!</div>
      )}
    </div>
  );
}