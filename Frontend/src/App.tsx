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

  // reminder state
  const [activeReminder, setActiveReminder] = useState<{
    medicine: Medicine;
    timeSlot: string;
  } | null>(null);
  const snoozeTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // check for reminders every 30 seconds
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const today = todayStr();

      medicines.forEach(med => {
        if (med.startDate > today || med.endDate < today) return;

        const slots = med.timeSlot === "custom"
          ? [{ slot: "custom", hour: parseInt(med.customTime?.split(":")[0] || "8"), minute: parseInt(med.customTime?.split(":")[1] || "0") }]
          : [{ slot: med.timeSlot, ...getTimeSlotTime(med.timeSlot) }];

        slots.forEach(({ slot, hour, minute }) => {
          const schedHour = now.getHours() === hour;
          const schedMin = now.getMinutes() === minute || now.getMinutes() === minute + 1;

          if (schedHour && schedMin) {
            const key = `${med.id}_${slot}_${today}`;
            if (!snoozeTimers.current[key + "_done"]) {
              snoozeTimers.current[key + "_done"] = setTimeout(() => {}, 0); // mark as triggered
              setActiveReminder({ medicine: med, timeSlot: slot });
            }
          }
        });
      });
    };

    checkReminders();
    const timer = setInterval(checkReminders, 30000);
    return () => clearInterval(timer);
  }, [medicines]);

  const handleTaken = () => {
    if (!activeReminder) return;
    markDose(activeReminder.medicine.id, todayStr(), activeReminder.timeSlot, "taken");
    setActiveReminder(null);
  };

  const handleSnooze = () => {
    const rem = activeReminder;
    if (!rem) return;
    setActiveReminder(null);
    setTimeout(() => {
      setActiveReminder(rem);
    }, settings.snoozeMinutes * 60 * 1000);
  };

  const handleDismiss = () => {
    setActiveReminder(null);
  };

  return (
    <div className={`app-shell ${settings.nightMode ? "night-mode" : ""}`}>
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
          onDismiss={handleDismiss}
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