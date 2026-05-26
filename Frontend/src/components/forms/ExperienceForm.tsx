import React from "react";
import { Experience } from "../../types/index";

interface Props {
  items: Experience[];
  onUpdate: (id: string, field: string, value: string | boolean) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  visible: boolean;
}

export default function ExperienceForm({ items, onUpdate, onAdd, onRemove, visible }: Props) {
  return (
    <div className={`form-section ${visible ? "visible" : ""}`}>
      <div className="form-section-header">
        <h2>Experience</h2>
        <button className="btn-add" onClick={onAdd}>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add
        </button>
      </div>

      {items.map((exp, i) => (
        <div className="entry-card" key={exp.id}>
          <div className="entry-card-header">
            <span>Position {i + 1}</span>
            <button className="btn-remove" onClick={() => onRemove(exp.id)}>Remove</button>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label>Company</label>
              <input
                value={exp.company}
                onChange={(e) => onUpdate(exp.id, "company", e.target.value)}
                placeholder="Company Inc."
              />
            </div>
            <div className="form-field">
              <label>Role / Title</label>
              <input
                value={exp.role}
                onChange={(e) => onUpdate(exp.id, "role", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div className="form-field">
              <label>Start Date</label>
              <input
                type="month"
                value={exp.start}
                onChange={(e) => onUpdate(exp.id, "start", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>End Date</label>
              <input
                type="month"
                value={exp.end}
                onChange={(e) => onUpdate(exp.id, "end", e.target.value)}
                disabled={exp.current}
              />
            </div>
            <div className="form-field full">
              <div className="checkbox-row">
                <input
                  type="checkbox"
                  id={`cur-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => onUpdate(exp.id, "current", e.target.checked)}
                />
                <label htmlFor={`cur-${exp.id}`}>I currently work here</label>
              </div>
            </div>
            <div className="form-field full">
              <label>Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => onUpdate(exp.id, "description", e.target.value)}
                placeholder="Key achievements and responsibilities..."
              />
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "20px 0" }}>
          No experience added yet. Click Add to get started.
        </p>
      )}
    </div>
  );
}