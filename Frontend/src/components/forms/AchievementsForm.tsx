import React from "react";
import { Achievement } from "../../types";

interface Props {
  items: Achievement[];
  onUpdate: (id: string, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  visible: boolean;
}

export default function AchievementsForm({ items, onUpdate, onAdd, onRemove, visible }: Props) {
  return (
    <div className={`form-section ${visible ? "visible" : ""}`}>
      <div className="form-section-header">
        <h2>Achievements</h2>
        <button className="btn-add" onClick={onAdd}>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add
        </button>
      </div>

      {items.map((ach, i) => (
        <div className="entry-card" key={ach.id}>
          <div className="entry-card-header">
            <span>Achievement {i + 1}</span>
            <button className="btn-remove" onClick={() => onRemove(ach.id)}>Remove</button>
          </div>
          <div className="form-grid cols-1">
            <div className="form-field">
              <label>Title</label>
              <input
                value={ach.title}
                onChange={(e) => onUpdate(ach.id, "title", e.target.value)}
                placeholder="Hackathon Winner"
              />
            </div>
            <div className="form-field">
              <label>Description</label>
              <textarea
                value={ach.description}
                onChange={(e) => onUpdate(ach.id, "description", e.target.value)}
                placeholder="What did you accomplish? Quantify if possible."
              />
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "20px 0" }}>
          No achievements added yet.
        </p>
      )}
    </div>
  );
}