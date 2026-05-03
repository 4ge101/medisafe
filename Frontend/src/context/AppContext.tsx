import React, { createContext, useContext, useState, useEffect } from "react";
import type { Medicine, DoseRecord, AppSettings } from "../types";

interface AppContextType {
  medicines: Medicine[];
  doseRecords: DoseRecord[];
  settings: AppSettings;
  addMedicine: (med: Medicine) => void;
  deleteMedicine: (id: string) => void;
  markDose: (medicineId: string, date: string, timeSlot: string, status: "taken" | "missed") => void;
  updateSettings: (s: Partial<AppSettings>) => void;
  getTodayDoses: () => { medicine: Medicine; record: DoseRecord }[];
  getHistory: () => { date: string; taken: number; total: number }[];
}

const AppContext = createContext<AppContextType | null>(null);

const defaultSettings: AppSettings = {
  simpleMode: false,
  nightMode: false,
  voiceEnabled: true,
  snoozeMinutes: 5,
};

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [medicines, setMedicines] = useState<Medicine[]>(() => load("ms_meds", []));
  const [doseRecords, setDoseRecords] = useState<DoseRecord[]>(() => load("ms_doses", []));
  const [settings, setSettings] = useState<AppSettings>(() => ({ ...defaultSettings, ...load("ms_cfg", {}) }));

  useEffect(() => { localStorage.setItem("ms_meds", JSON.stringify(medicines)); }, [medicines]);
  useEffect(() => { localStorage.setItem("ms_doses", JSON.stringify(doseRecords)); }, [doseRecords]);
  useEffect(() => { localStorage.setItem("ms_cfg", JSON.stringify(settings)); }, [settings]);

  // auto night mode
  useEffect(() => {
    const check = () => {
      const h = new Date().getHours();
      const isNight = h >= 20 || h < 6;
      setSettings((prev) => ({ ...prev, nightMode: isNight }));
    };
    check();
    const t = setInterval(check, 60000);
    return () => clearInterval(t);
  }, []);

  const addMedicine = (med: Medicine) => {
    setMedicines((prev) => [...prev, med]);
  };

  const deleteMedicine = (id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const markDose = (medicineId: string, date: string, timeSlot: string, status: "taken" | "missed") => {
    setDoseRecords((prev) => {
      const idx = prev.findIndex((r) => r.medicineId === medicineId && r.date === date && r.timeSlot === timeSlot);
      const rec: DoseRecord = {
        medicineId,
        date,
        timeSlot,
        status,
        takenAt: status === "taken" ? new Date().toISOString() : undefined,
      };
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = rec;
        return updated;
      }
      return [...prev, rec];
    });
  };

  const updateSettings = (s: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...s }));
  };

  const getTodayDoses = () => {
    const today = new Date().toISOString().split("T")[0];
    const result: { medicine: Medicine; record: DoseRecord }[] = [];
    medicines.forEach((med) => {
      if (med.startDate <= today && med.endDate >= today) {
        const record = doseRecords.find(
          (r) => r.medicineId === med.id && r.date === today && r.timeSlot === med.timeSlot
        ) || { medicineId: med.id, date: today, timeSlot: med.timeSlot, status: "pending" as const };
        result.push({ medicine: med, record });
      }
    });
    return result;
  };

  const getHistory = () => {
    const history = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const date = d.toISOString().split("T")[0];
      const taken = doseRecords.filter((r) => r.date === date && r.status === "taken").length;
      const total = medicines.filter((m) => m.startDate <= date && m.endDate >= date).length;
      history.push({ date, taken, total });
    }
    return history;
  };

  return (
    <AppContext.Provider value={{ medicines, doseRecords, settings, addMedicine, deleteMedicine, markDose, updateSettings, getTodayDoses, getHistory }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}