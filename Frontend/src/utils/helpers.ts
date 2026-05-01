export function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1;
  utterance.volume = 1;
  // pick a clear voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith("en") && v.name.includes("Google"));
  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.speak(utterance);
}

export function getTimeSlotLabel(slot: string): string {
  switch (slot) {
    case "morning": return "Morning (8:00 AM)";
    case "afternoon": return "Afternoon (1:00 PM)";
    case "night": return "Night (9:00 PM)";
    default: return "Custom Time";
  }
}

export function getTimeSlotTime(slot: string): { hour: number; minute: number } {
  switch (slot) {
    case "morning": return { hour: 8, minute: 0 };
    case "afternoon": return { hour: 13, minute: 0 };
    case "night": return { hour: 21, minute: 0 };
    default: return { hour: 8, minute: 0 };
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}