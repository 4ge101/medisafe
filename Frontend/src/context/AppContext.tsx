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

const MEDICINE_COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"];
const MEDICINE_ICONS = ["💊", "💉", "🩺", "🌿", "🧪", "💙", "⭐"];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    try {
      const saved = localStorage.getItem("medisafe_medicines");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [doseRecords, setDoseRecords] = useState<DoseRecord[]>(() => {
    try {
      const saved = localStorage.getItem("medisafe_doses");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem("medisafe_settings");
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem("medisafe_medicines", JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem("medisafe_doses", JSON.stringify(doseRecords));
  }, [doseRecords]);

  useEffect(() => {
    localStorage.setItem("medisafe_settings", JSON.stringify(settings));
  }, [settings]);

  // Auto night mode based on time
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      const isNight = hour >= 20 || hour < 6;
      setSettings(prev => ({ ...prev, nightMode: isNight }));
    };
    checkTime();
    const timer = setInterval(checkTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const addMedicine = (med: Medicine) => {
    const colorIndex = medicines.length % MEDICINE_COLORS.length;
    const iconIndex = medicines.length % MEDICINE_ICONS.length;
    setMedicines(prev => [...prev, {
      ...med,
      color: med.color || MEDICINE_COLORS[colorIndex],
      icon: med.icon || MEDICINE_ICONS[iconIndex],
    }]);
  };

  const deleteMedicine = (id: string) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
  };

  const markDose = (medicineId: string, date: string, timeSlot: string, status: "taken" | "missed") => {
    setDoseRecords(prev => {
      const existing = prev.findIndex(
        r => r.medicineId === medicineId && r.date === date && r.timeSlot === timeSlot
      );
      const newRecord: DoseRecord = {
        medicineId,
        date,
        timeSlot: timeSlot as any,
        status,
        takenAt: status === "taken" ? new Date().toISOString() : undefined,
      };
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newRecord;
        return updated;
      }
      return [...prev, newRecord];
    });
  };

  const updateSettings = (s: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...s }));
  };

  const getTodayDoses = () => {
    const today = new Date().toISOString().split("T")[0];
    const result: { medicine: Medicine; record: DoseRecord }[] = [];

    medicines.forEach(med => {
      if (med.startDate <= today && med.endDate >= today) {
        const timeSlots = med.timeSlot === "custom" ? ["custom"] : [med.timeSlot];
        timeSlots.forEach(slot => {
          const record = doseRecords.find(
            r => r.medicineId === med.id && r.date === today && r.timeSlot === slot
          ) || {
            medicineId: med.id,
            date: today,
            timeSlot: slot as any,
            status: "pending" as const,
          };
          result.push({ medicine: med, record });
        });
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
      const dayRecords = doseRecords.filter(r => r.date === date);
      const taken = dayRecords.filter(r => r.status === "taken").length;
      const total = medicines.filter(m => m.startDate <= date && m.endDate >= date).length;
      history.push({ date, taken, total });
    }
    return history;
  };

  return (
    <AppContext.Provider value={{
      medicines,
      doseRecords,
      settings,
      addMedicine,
      deleteMedicine,
      markDose,
      updateSettings,
      getTodayDoses,
      getHistory,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}