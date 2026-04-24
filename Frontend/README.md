src/
 ├── components/
 │    ├── layout/
 │    │     ├── AppShell.tsx
 │    │     ├── Sidebar.tsx
 │    │     └── Header.tsx
 │
 │    ├── medicines/
 │    │     ├── MedicineCard.tsx
 │    │     ├── MedicineForm.tsx
 │    │     └── QuickAdd.tsx
 │
 │    ├── schedule/
 │    │     ├── DailyTimeline.tsx
 │    │     └── DoseSlot.tsx
 │
 │    ├── interactions/
 │    │     ├── Checker.tsx
 │    │     ├── Alert.tsx
 │    │     └── Badge.tsx
 │
 │    └── ui/
 │          ├── Button.tsx
 │          ├── Modal.tsx
 │          ├── Toast.tsx
 │          └── Badge.tsx
 │
 ├── pages/
 │    ├── Dashboard.tsx
 │    ├── Medicines.tsx
 │    ├── Schedule.tsx
 │    ├── Interactions.tsx
 │    └── Settings.tsx
 │
 ├── hooks/
 │    ├── useMedicines.ts
 │    ├── useSchedule.ts
 │    ├── useInteractions.ts
 │    └── useReminders.ts
 │
 ├── store/
 │    ├── medicineStore.ts
 │    ├── scheduleStore.ts
 │    └── settingsStore.ts
 │
 ├── services/
 │    ├── interactionDB.ts
 │    ├── notifications.ts
 │    ├── storage.ts
 │    └── export.ts
 │
 ├── data/
 │    ├── interactions.json
 │    ├── commonMeds.ts
 │    └── i18n/
 │          ├── en.ts
 │          └── np.ts
 │
 ├── types/
 │    ├── medicine.ts
 │    ├── schedule.ts
 │    └── interaction.ts
 │
 ├── utils/
 │    ├── dateHelpers.ts
 │    ├── doseHelpers.ts
 │    └── formatters.ts
 │
 ├── App.tsx
 └── main.tsx