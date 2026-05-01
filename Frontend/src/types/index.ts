export type TimeSlot = "morning" | "afternoon" | "night" | "custom";

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  timeSlot: TimeSlot;
  customTime?: string;
  startDate: string;
  endDate: string;
  color: string;
  icon: string;
}

export interface DoseRecord {
  medicineId: string;
  date: string; // YYYY-MM-DD
  timeSlot: TimeSlot;
  status: "taken" | "missed" | "pending";
  takenAt?: string;
}

export interface AppSettings {
  simpleMode: boolean;
  nightMode: boolean;
  voiceEnabled: boolean;
  snoozeMinutes: number;
}