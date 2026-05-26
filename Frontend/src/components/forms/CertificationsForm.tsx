import React from "react";
import { Certification } from "../../types/index";

interface Props {
  items: Certification[];
  onUpdate: (id: string, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  visible: boolean;
}

export default function CertificationsForm({ items, onUpdate, onAdd, onRemove, visible }: Props) {
  return (
    <div className={`form-section ${visible ? "visible" : ""}`}>
      <div className="form-section-header">
        <h2>Certifications</h2>
        <button className="btn-add" onClick={onAdd}>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add 
        </button>
      </div>

      {items.map((cert, i) => (
        <div className="entry-card" key={cert.id}>
          <div className="entry-card-header">
            <span>Cert {i + 1}</span>
            <button className="btn-remove" onClick={() => onRemove(cert.id)}>Remove</button>
          </div>
          <div className="form-grid">
            <div className="form-field full">
              <label>Certification Name</label>
              <input
                value={cert.name}
                onChange={(e) => onUpdate(cert.id, "name", e.target.value)}
                placeholder="AWS Solutions Architect"
              />
            </div>
            <div className="form-field">
              <label>Issuing Organization</label>
              <input
                value={cert.issuer}
                onChange={(e) => onUpdate(cert.id, "issuer", e.target.value)}
                placeholder="Amazon Web Services"
              />
            </div>
            <div className="form-field">
              <label>Date</label>
              <input
                type="month"
                value={cert.date}
                onChange={(e) => onUpdate(cert.id, "date", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "20px 0" }}>
          No certifications added yet.
        </p>
      )}
    </div>
  );
}