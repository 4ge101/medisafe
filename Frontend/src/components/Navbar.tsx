import "../styles/Navbar.css";
import { useApp } from "../context/AppContext";

type Page = "home" | "add" | "schedule" | "history" | "settings";

interface Props {
  current: Page;
  onChange: (page: Page) => void;
}

const items = [
  { id: "home" as Page, icon: "🏠", label: "Home" },
  { id: "schedule" as Page, icon: "📋", label: "Today" },
  { id: "add" as Page, icon: "➕", label: "Add", special: true },
  { id: "history" as Page, icon: "📊", label: "History" },
  { id: "settings" as Page, icon: "⚙️", label: "Settings" },
];

export default function Navbar({ current, onChange }: Props) {
  const { settings } = useApp();
  return (
    <nav className={`navbar ${settings.simpleMode ? "simple-mode" : ""}`}>
      {items.map((item) => (
        <button
          key={item.id}
          className={`nav-btn ${item.special ? "nav-add" : ""} ${current === item.id ? "active" : ""}`}
          onClick={() => onChange(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
          {!item.special && <span className="nav-dot" />}
        </button>
      ))}
    </nav>
  );
}