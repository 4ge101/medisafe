import React from "react";
import { Project } from "../../types/index";

interface Props {
  items: Project[];
  onUpdate: (id: string, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  visible: boolean;
}

export default function ProjectsForm({ items, onUpdate, onAdd, onRemove, visible }: Props) {
  return (
    <div className={`form-section ${visible ? "visible" : ""}`}>
      <div className="form-section-header">
        <h2>Projects</h2>
        <button className="btn-add" onClick={onAdd}>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add
        </button>
      </div>

      {items.map((proj, i) => (
        <div className="entry-card" key={proj.id}>
          <div className="entry-card-header">
            <span>Project {i + 1}</span>
            <button className="btn-remove" onClick={() => onRemove(proj.id)}>Remove</button>
          </div>
          <div className="form-grid cols-1">
            <div className="form-field">
              <label>Project Name</label>
              <input
                value={proj.name}
                onChange={(e) => onUpdate(proj.id, "name", e.target.value)}
                placeholder="My Awesome Project"
              />
            </div>
            <div className="form-field">
              <label>Tech Stack</label>
              <input
                value={proj.tech}
                onChange={(e) => onUpdate(proj.id, "tech", e.target.value)}
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>
            <div className="form-field">
              <label>Link (optional)</label>
              <input
                value={proj.link}
                onChange={(e) => onUpdate(proj.id, "link", e.target.value)}
                placeholder="github.com/you/project"
              />
            </div>
            <div className="form-field">
              <label>Description</label>
              <textarea
                value={proj.description}
                onChange={(e) => onUpdate(proj.id, "description", e.target.value)}
                placeholder="What does it do? Impact? Users?"
              />
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "20px 0" }}>
          No projects added yet.
        </p>
      )}
    </div>
  );
}