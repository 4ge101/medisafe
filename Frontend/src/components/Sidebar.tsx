import React from "react";
import { SectionType } from "../../types";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  sectionOrder: SectionType[];
  activeSections: SectionType[];
  onToggleSection: (s: SectionType) => void;
  onReorder: (order: SectionType[]) => void;
  onDownload: () => void;
  onReset: () => void;
}

const NAV_ITEMS = [
  {
    id: "personal",
    label: "Personal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
  },
  {
    id: "education",
    label: "Education",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10l-10-7L2 10l10 7 10-7z" />
        <path d="M6 12v6c0 1.1 2.7 2 6 2s6-.9 6-2v-6" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="6" />
        <path d="M9 22l3-3 3 3M12 14v5" />
      </svg>
    ),
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const ALL_SECTIONS: SectionType[] = [
  "experience", "education", "skills", "projects", "certifications", "achievements",
];

export default function Sidebar({
  activeTab,
  onTabChange,
  sectionOrder,
  activeSections,
  onToggleSection,
  onReorder,
  onDownload,
  onReset,
}: Props) {
  const dragItem = React.useRef<number | null>(null);
  const dragOver = React.useRef<number | null>(null);

  function handleDragStart(index: number) {
    dragItem.current = index;
  }

  function handleDragEnter(index: number) {
    dragOver.current = index;
  }

  function handleDragEnd() {
    if (dragItem.current === null || dragOver.current === null) return;
    if (dragItem.current === dragOver.current) return;

    const newOrder = [...sectionOrder];
    const dragged = newOrder.splice(dragItem.current, 1)[0];
    newOrder.splice(dragOver.current, 0, dragged);

    onReorder(newOrder);
    dragItem.current = null;
    dragOver.current = null;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>
          Resume<span>.</span>
        </h1>
        <p>Build your story</p>
      </div>

      <div className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${activeTab === item.id ? "active" : ""}`}
            onClick={() => onTabChange(item.id)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      <div className="sidebar-sections">
        <h3>Sections</h3>
        {ALL_SECTIONS.map((section) => (
          <label key={section} className="section-toggle">
            <input
              type="checkbox"
              checked={activeSections.includes(section)}
              onChange={() => onToggleSection(section)}
            />
            <span>{section}</span>
          </label>
        ))}
      </div>

      <div className="sidebar-sections" style={{ borderBottom: "none" }}>
        <h3>Section Order (drag)</h3>
        <div className="section-order-list">
          {sectionOrder.map((section, index) => (
            <div
              key={section}
              className="section-order-item"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="drag-handle">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </div>
              <span>{section}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-bottom">
        <button className="btn-primary" onClick={onDownload}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download PDF
        </button>
        <button className="btn-ghost" onClick={onReset}>
          Reset to Default
        </button>
      </div>
    </div>
  );
}