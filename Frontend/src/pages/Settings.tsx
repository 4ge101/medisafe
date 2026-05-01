import "../styles/Settings.css";
import { useApp } from "../context/AppContext";
import { speak } from "../utils/helpers";

export default function Settings() {
  const { settings, updateSettings } = useApp();

  const testVoice = () => {
    speak("Hello! It's time to take your medicine. Please take 1 pill now.");
  };

  return (
    <div className={`settings-page ${settings.simpleMode ? "simple-mode" : ""}`}>
      <h1>⚙️ Settings</h1>

      <div className="settings-section">
        <p className="settings-section-title">Display</p>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-left">
              <span className="settings-row-icon">👴</span>
              <div>
                <p className="settings-row-label">Simple Mode</p>
                <p className="settings-row-sub">Bigger buttons & text for easy reading</p>
              </div>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.simpleMode}
                onChange={e => updateSettings({ simpleMode: e.target.checked })}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-row">
            <div className="settings-row-left">
              <span className="settings-row-icon">🌙</span>
              <div>
                <p className="settings-row-label">Night Mode</p>
                <p className="settings-row-sub">Softer colors after 8 PM (auto)</p>
              </div>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.nightMode}
                onChange={e => updateSettings({ nightMode: e.target.checked })}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <p className="settings-section-title">Reminders</p>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-left">
              <span className="settings-row-icon">🔊</span>
              <div>
                <p className="settings-row-label">Voice Alerts</p>
                <p className="settings-row-sub">Speak medicine name out loud</p>
              </div>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.voiceEnabled}
                onChange={e => updateSettings({ voiceEnabled: e.target.checked })}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-row">
            <div className="settings-row-left">
              <span className="settings-row-icon">😴</span>
              <div>
                <p className="settings-row-label">Snooze Duration</p>
                <p className="settings-row-sub">Minutes before reminding again</p>
              </div>
            </div>
            <select
              className="snooze-select"
              value={settings.snoozeMinutes}
              onChange={e => updateSettings({ snoozeMinutes: Number(e.target.value) })}
            >
              <option value={5}>5 min</option>
              <option value={10}>10 min</option>
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
            </select>
          </div>
        </div>
      </div>

      {settings.voiceEnabled && (
        <div className="settings-section">
          <p className="settings-section-title">Test Voice</p>
          <div className="settings-card">
            <div className="settings-row">
              <div className="settings-row-left">
                <span className="settings-row-icon">🎤</span>
                <div>
                  <p className="settings-row-label">Test Voice Alert</p>
                  <p className="settings-row-sub">Hear how reminders sound</p>
                </div>
              </div>
              <button
                onClick={testVoice}
                style={{
                  background: "var(--primary)", color: "white",
                  border: "none", borderRadius: 10, padding: "10px 16px",
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                }}
              >
                ▶ Play
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="app-info">
        <p>💊 MediSafe — Your Personal Medicine Reminder</p>
        <p style={{ marginTop: 4, fontSize: 12 }}>Version 1.0 · Built for everyone</p>
      </div>
    </div>
  );
}