export function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.85;
  u.pitch = 1;
  u.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find((v) => v.lang.startsWith("en") && v.name.includes("Google"));
  if (preferred) u.voice = preferred;
  window.speechSynthesis.speak(u);
}

export function getTimeSlotTime(slot: string, customTime?: string): { hour: number; minute: number } {
  if (slot === "morning") return { hour: 8, minute: 0 };
  if (slot === "afternoon") return { hour: 13, minute: 0 };
  if (slot === "night") return { hour: 21, minute: 0 };
  if (slot === "custom" && customTime) {
    const [h, m] = customTime.split(":").map(Number);
    return { hour: h, minute: m };
  }
  return { hour: 8, minute: 0 };
}

export function getTimeSlotLabel(slot: string): string {
  if (slot === "morning") return "🌅 Morning · 8:00 AM";
  if (slot === "afternoon") return "☀️ Afternoon · 1:00 PM";
  if (slot === "night") return "🌙 Night · 9:00 PM";
  return "⏰ Custom";
}

export function getSlotShortTime(slot: string): string {
  if (slot === "morning") return "8:00 AM";
  if (slot === "afternoon") return "1:00 PM";
  if (slot === "night") return "9:00 PM";
  return "Custom";
}

export function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function formatDate(ds: string): string {
  const d = new Date(ds);
  const diff = Math.round((Date.now() - d.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}