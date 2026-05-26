import React from "react";
import { Education } from "../../types/index";

interface Props {
  items: Education[];
  onUpdate: (id: string, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  visible: boolean;
}

export default function EducationForm({ items, onUpdate, onAdd, onRemove, visible }: Props) {
  return (
    <div className={`form-section ${visible ? "visible" : ""}`}>
      <div className="form-section-header">
        <h2>Education</h2>
        <button className="btn-add" onClick={onAdd}>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add
        </button>
      </div>

      {items.map((edu, i) => (
        <div className="entry-card" key={edu.id}>
          <div className="entry-card-header">
            <span>Education {i + 1}</span>
            <button className="btn-remove" onClick={() => onRemove(edu.id)}>Remove</button>
          </div>
          <div className="form-grid">
            <div className="form-field full">
              <label>Institution</label>
              <input
                value={edu.institution}
                onChange={(e) => onUpdate(edu.id, "institution", e.target.value)}
                placeholder="University Name"
              />
            </div>
            <div className="form-field">
              <label>Degree</label>
              <input
                value={edu.degree}
                onChange={(e) => onUpdate(edu.id, "degree", e.target.value)}
                placeholder="Bachelor of Science"
              />
            </div>
            <div className="form-field">
              <label>Field of Study</label>
              <input
                value={edu.field}
                onChange={(e) => onUpdate(edu.id, "field", e.target.value)}
                placeholder="Computer Science"
              />
            </div>
            <div className="form-field">
              <label>Start Year</label>
              <input
                type="number"
                value={edu.start}
                onChange={(e) => onUpdate(edu.id, "start", e.target.value)}
                placeholder="2019"
              />
            </div>
            <div className="form-field">
              <label>End Year</label>
              <input
                type="number"
                value={edu.end}
                onChange={(e) => onUpdate(edu.id, "end", e.target.value)}
                placeholder="2023"
              />
            </div>
            <div className="form-field">
              <label>GPA (optional)</label>
              <input
                value={edu.gpa}
                onChange={(e) => onUpdate(edu.id, "gpa", e.target.value)}
                placeholder="3.8"
              />
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "20px 0" }}>
          No education added yet.
        </p>
      )}
    </div>
  );
}