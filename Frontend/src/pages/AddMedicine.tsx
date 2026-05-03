import { useState, useRef } from "react";
import "../styles/AddMedicine.css";
import { useApp } from "../context/AppContext";
import { generateId, todayStr } from "../utils/helpers";
import type { TimeSlot } from "../types";

const ICONS = ["💊","💉","🌿","🧪","💙","⭐","🔴","🟠","🟢","🩺"];
const COLORS = ["#ff6b6b","#ffa502","#00b894","#1e90ff","#a29bfe","#fd79a8","#00cec9","#e17055"];

const TIME_OPTS = [
  { slot: "morning", emoji: "🌅", name: "Morning", sub: "8:00 AM" },
  { slot: "afternoon", emoji: "☀️", name: "Afternoon", sub: "1:00 PM" },
  { slot: "night", emoji: "🌙", name: "Night", sub: "9:00 PM" },
  { slot: "custom", emoji: "⏰", name: "Custom", sub: "Pick time" },
];

interface Props {
  onDone: () => void;
}

export default function AddMedicine({ onDone }: Props) {
  const { addMedicine, settings } = useApp();
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("1 pill");
  const [slot, setSlot] = useState<TimeSlot>("morning");
  const [customTime, setCustomTime] = useState("08:00");
  const [startDate, setStartDate] = useState(todayStr());
  const [endDate, setEndDate] = useState("");
  const [icon, setIcon] = useState(ICONS[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [showToast, setShowToast] = useState(false);
  const [listening, setListening] = useState(false);
  const recRef = useRef<any>(null);

  const handleVoice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Voice input needs Chrome browser."); return; }
    if (listening) { recRef.current?.stop(); setListening(false); return; }
    const rec = new SR();
    recRef.current = rec;
    rec.lang = "en-US";
    rec.onresult = (e: any) => { setName(e.results[0][0].transcript); setListening(false); };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
    setListening(true);
  };

  const handleSave = () => {
    if (!name.trim() || !endDate) return;
    addMedicine({
      id: generateId(),
      name: name.trim(),
      dosage: dosage || "1 pill",
      timeSlot: slot,
      customTime: slot === "custom" ? customTime : undefined,
      startDate,
      endDate,
      color,
      icon,
    });
    setShowToast(true);
    setTimeout(() => { setShowToast(false); onDone(); }, 1500);
  };

  const slotName = TIME_OPTS.find((t) => t.slot === slot)?.name || "";
  const isValid = name.trim().length > 0 && endDate.length > 0;

  return (
    <div className={`add-page ${settings.simpleMode ? "simple-mode" : ""}`}>
      <div className="add-hero">
        <h1>Add Medicine</h1>
        <p>Fill in your medicine details</p>
      </div>

      <div className="add-body">
        {/* Name */}
        <div className="form-grp">
          <label className="form-lbl">Medicine Name</label>
          <input className="form-in" type="text" placeholder="e.g. Paracetamol, Metformin..." value={name} onChange={(e) => setName(e.target.value)} />
          <button className={`voice-row ${listening ? "listening" : ""}`} onClick={handleVoice}>
            {listening ? "🔴 Listening... tap to stop" : "🎤 Speak medicine name"}
          </button>
        </div>

        {/* Dosage */}
        <div className="form-grp">
          <label className="form-lbl">Dosage</label>
          <input className="form-in" type="text" placeholder="e.g. 1 pill, 2 tablets..." value={dosage} onChange={(e) => setDosage(e.target.value)} />
        </div>

        {/* Time slot */}
        <div className="form-grp">
          <label className="form-lbl">When to Take</label>
          <div className="time-grid">
            {TIME_OPTS.map((opt) => (
              <button key={opt.slot} className={`time-opt ${slot === opt.slot ? "sel" : ""}`} onClick={() => setSlot(opt.slot as TimeSlot)}>
                <span className="t-em">{opt.emoji}</span>
                <span className="t-name">{opt.name}</span>
                <span className="t-sub">{opt.sub}</span>
              </button>
            ))}
          </div>
          {slot === "custom" && (
            <input className="form-in" type="time" value={customTime} onChange={(e) => setCustomTime(e.target.value)} style={{ marginTop: 8 }} />
          )}
        </div>

        {/* Duration */}
        <div className="form-grp">
          <label className="form-lbl">Duration</label>
          <div className="date-2col">
            <div>
              <span className="date-sm-lbl">Start Date</span>
              <input className="form-in" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <span className="date-sm-lbl">End Date</span>
              <input className="form-in" type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Icon */}
        <div className="form-grp">
          <label className="form-lbl">Icon</label>
          <div className="icons-row">
            {ICONS.map((ic) => (
              <button key={ic} className={`icon-opt ${icon === ic ? "sel" : ""}`} onClick={() => setIcon(ic)}>{ic}</button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="form-grp">
          <label className="form-lbl">Color</label>
          <div className="colors-row">
            {COLORS.map((c) => (
              <button key={c} className={`color-opt ${color === c ? "sel" : ""}`} style={{ background: c }} onClick={() => setColor(c)} />
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div className="preview-strip" style={{ background: color + "18", border: `1px solid ${color}40` }}>
          <span style={{ fontSize: 28 }}>{icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{name || "Medicine Name"}</div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{dosage || "Dosage"} · {slotName}</div>
          </div>
        </div>

        <button className="save-btn" onClick={handleSave} disabled={!isValid}>
          ✅ Save Medicine
        </button>
      </div>

      {showToast && <div className="toast-fixed">✅ Medicine added successfully!</div>}
    </div>
  );
}