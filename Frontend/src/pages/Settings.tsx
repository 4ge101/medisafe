import "../styles/Settings.css";
import { useApp } from "../context/AppContext";
import { speak } from "../utils/helpers";

export default function Settings() {
  const { settings, updateSettings } = useApp();

  return (
    <div className={`set-page ${settings.simpleMode ? "simple-mode" : ""}`}>
      <div className="set-hero">
        <h1>Settings</h1>
        <p>Customize MediSafe for your needs</p>
      </div>

      <div className="set-body">
        <div className="set-sec">Display</div>
        <div className="set-card">
          <div className="set-row">
            <div className="set-left">
              <div className="set-emoji">👴</div>
              <div><div className="set-lbl">Simple Mode</div><div className="set-sub">Bigger text and buttons</div></div>
            </div>
            <label className="tgl">
              <input type="checkbox" checked={settings.simpleMode} onChange={(e) => updateSettings({ simpleMode: e.target.checked })} />
              <span className="tgl-track" /><span className="tgl-thumb" />
            </label>
          </div>
          <div className="set-row">
            <div className="set-left">
              <div className="set-emoji">🌙</div>
              <div><div className="set-lbl">Night Mode</div><div className="set-sub">Auto-enables after 8 PM</div></div>
            </div>
            <label className="tgl">
              <input type="checkbox" checked={settings.nightMode} onChange={(e) => updateSettings({ nightMode: e.target.checked })} />
              <span className="tgl-track" /><span className="tgl-thumb" />
            </label>
          </div>
        </div>

        <div className="set-sec">Reminders</div>
        <div className="set-card">
          <div className="set-row">
            <div className="set-left">
              <div className="set-emoji">🔊</div>
              <div><div className="set-lbl">Voice Alerts</div><div className="set-sub">Speaks medicine name aloud</div></div>
            </div>
            <label className="tgl">
              <input type="checkbox" checked={settings.voiceEnabled} onChange={(e) => updateSettings({ voiceEnabled: e.target.checked })} />
              <span className="tgl-track" /><span className="tgl-thumb" />
            </label>
          </div>
          <div className="set-row">
            <div className="set-left">
              <div className="set-emoji">😴</div>
              <div><div className="set-lbl">Snooze Duration</div><div className="set-sub">Minutes before re-alerting</div></div>
            </div>
            <select className="snooze-sel" value={settings.snoozeMinutes} onChange={(e) => updateSettings({ snoozeMinutes: parseInt(e.target.value) })}>
              <option value={5}>5 min</option>
              <option value={10}>10 min</option>
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
            </select>
          </div>
          <div className="set-row">
            <div className="set-left">
              <div className="set-emoji">🎤</div>
              <div><div className="set-lbl">Test Voice Alert</div><div className="set-sub">Hear how reminders sound</div></div>
            </div>
            <button className="play-btn" onClick={() => speak("Hello! Time to take your medicine. Please take 1 pill of Paracetamol now.")}>
              ▶ Play
            </button>
          </div>
        </div>

        <div className="app-info">
          <div style={{ fontSize: 36, marginBottom: 8 }}>💊</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text)" }}>MediSafe</div>
          <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>Your Personal Medicine Reminder · v1.0</div>
          <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>Made with ❤️ for everyone</div>
        </div>
      </div>
    </div>
  );
}