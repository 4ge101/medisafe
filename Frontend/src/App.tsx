import { useState, useEffect, useRef } from "react";
import "./App.css";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import ReminderPopup from "./components/ReminderPopup";
import Home from "./pages/Home";
import AddMedicine from "./pages/AddMedicine";
import Schedule from "./pages/Schedule";
import History from "./pages/History";
import Settings from "./pages/Settings";
import type { Medicine } from "./types";
import { getTimeSlotTime, todayStr } from "./utils/helpers";

type Page = "home" | "add" | "schedule" | "history" | "settings";

function AppInner() {
  const [page, setPage] = useState<Page>("home");
  const { settings, medicines, markDose } = useApp();
  const [activeReminder, setActiveReminder] = useState<{ medicine: Medicine; timeSlot: string } | null>(null);
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const t = todayStr();
      medicines.forEach((med) => {
        if (med.startDate > t || med.endDate < t) return;
        const { hour, minute } = getTimeSlotTime(med.timeSlot, med.customTime);
        if (now.getHours() === hour && now.getMinutes() === minute) {
          const key = `${med.id}_${med.timeSlot}_${t}`;
          if (!firedRef.current.has(key)) {
            firedRef.current.add(key);
            setActiveReminder({ medicine: med, timeSlot: med.timeSlot });
          }
        }
      });
    };
    check();
    const timer = setInterval(check, 30000);
    return () => clearInterval(timer);
  }, [medicines]);

  useEffect(() => {
    const checkNight = () => {
      const h = new Date().getHours();
      if (h >= 20 || h < 6) {
        // night mode auto-handled in context
      }
    };
    checkNight();
    const t = setInterval(checkNight, 60000);
    return () => clearInterval(t);
  }, []);

  const handleTaken = () => {
    if (!activeReminder) return;
    markDose(activeReminder.medicine.id, todayStr(), activeReminder.timeSlot, "taken");
    setActiveReminder(null);
  };

  const handleSnooze = () => {
    const rem = activeReminder;
    if (!rem) return;
    setActiveReminder(null);
    setTimeout(() => setActiveReminder(rem), settings.snoozeMinutes * 60 * 1000);
  };

  return (
    <div className={`app-shell ${settings.nightMode ? "night-mode" : ""} ${settings.simpleMode ? "simple-mode" : ""}`}>
      {page === "home" && <Home onNavigate={(p) => setPage(p as Page)} />}
      {page === "add" && <AddMedicine onDone={() => setPage("home")} />}
      {page === "schedule" && <Schedule />}
      {page === "history" && <History />}
      {page === "settings" && <Settings />}
      <Navbar current={page} onChange={setPage} />
      {activeReminder && (
        <ReminderPopup
          medicine={activeReminder.medicine}
          timeSlot={activeReminder.timeSlot}
          onTaken={handleTaken}
          onSnooze={handleSnooze}
          onDismiss={() => setActiveReminder(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}