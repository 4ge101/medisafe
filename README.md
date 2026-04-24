💊 MediSafe — Smart Medicine Reminder & Interaction Checker
MediSafe is a modern web app that helps users manage medications safely, combining smart reminders with drug interaction detection to prevent harmful combinations.

🚀 Features


⏰ Medicine reminders (never miss a dose)


💊 Add, edit, and delete medicines


📅 Daily schedule with timeline view


⚠️ Drug interaction checker (core feature)


🧠 Risk levels: Safe / Caution / Danger


📢 Smart alerts with explanations


📴 Offline support (works without internet)


🌍 Multi-language (English / Nepali)


🔊 Accessibility-friendly UI



🧩 Tech Stack


Frontend: React + TypeScript


State Management: Zustand


Styling: Tailwind CSS


Storage: localStorage


Notifications: Web Notifications API



📁 Project Structure
src/
├── components/
│    ├── layout/ (AppShell, Sidebar, Header)
│    ├── medicines/ (MedicineCard, MedicineForm, QuickAdd)
│    ├── schedule/ (DailyTimeline, DoseSlot)
│    ├── interactions/ (Checker, Alert, Badge)
│    └── ui/ (Button, Modal, Toast, Badge)
│
├── pages/ (Dashboard, Medicines, Schedule, Interactions, Settings)
├── hooks/ (useMedicines, useSchedule, useInteractions, useReminders)
├── store/ (medicineStore, scheduleStore, settingsStore)
├── services/ (interactionDB, notifications, storage, export)
├── data/ (interactions.json, commonMeds, i18n)
├── types/ (medicine, schedule, interaction)
├── utils/ (dateHelpers, doseHelpers, formatters)
├── App.tsx
└── main.tsx

⚙️ Getting Started


Clone the repository
git clone https://github.com/your-username/medisafe.git


Go to project folder
cd medisafe


Install dependencies
npm install


Run development server
npm run dev



🧠 How It Works


Medicines are stored locally using localStorage


Schedule is generated based on dosage timing


Interaction checker uses a predefined dataset


Compares medicine pairs and returns risk level + explanation



⚠️ Disclaimer
This app is a health support tool, not a replacement for professional medical advice.
Always consult a qualified healthcare provider before making medical decisions.

🎯 Hackathon Focus


Solves real-world medication safety problems


Works offline for accessibility


Provides instant and simple health insights


Designed for fast, clear demo presentation



🚧 Future Improvements


AI-powered interaction explanations


Medicine barcode / image scanner


Cloud sync across devices


Doctor / hospital integration



👨‍💻 Author
Built By Mohammad Sami Ali 🚀
