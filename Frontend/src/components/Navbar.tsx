import "../styles/Navbar.css";
import { useApp } from "../context/AppContext";

type Page = "home" | "add" | "schedule" | "history" | "settings";

interface Props {
  current: Page;
  onChange: (page: Page) => void;
}

const navItems = [
  { id: "home" as Page, icon: "🏠", label: "Home" },
  { id: "schedule" as Page, icon: "📋", label: "Today" },
  { id: "add" as Page, icon: "➕", label: "Add" },
  { id: "history" as Page, icon: "📊", label: "History" },
  { id: "settings" as Page, icon: "⚙️", label: "Settings" },
];

export default function Navbar({ current, onChange }: Props) {
  const { settings } = useApp();

  return (
    <nav className={`navbar ${settings.simpleMode ? "simple-mode" : ""}`}>
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-btn ${current === item.id ? "active" : ""}`}
          onClick={() => onChange(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}