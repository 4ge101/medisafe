import React, { useRef } from "react";
import { PersonalInfo } from "../../types";

interface Props {
  data: PersonalInfo;
  onChange: (field: string, value: string) => void;
  visible: boolean;
}

export default function PersonalForm({ data, onChange, visible }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange("photo", ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={`form-section ${visible ? "visible" : ""}`}>
      <div className="form-section-header">
        <h2>Personal Info</h2>
      </div>

      <div className="photo-upload">
        <div className="photo-preview" onClick={() => fileRef.current?.click()}>
          {data.photo ? (
            <img src={data.photo} alt="profile" />
          ) : (
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          )}
        </div>
        <div>
          <button className="photo-upload-btn" onClick={() => fileRef.current?.click()}>
            Upload Photo
          </button>
          {data.photo && (
            <button
              className="photo-upload-btn"
              style={{ marginLeft: 8, color: "#dc2626" }}
              onClick={() => onChange("photo", "")}
            >
              Remove
            </button>
          )}
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
            JPG or PNG, max 2MB
          </p>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>Full Name</label>
          <input value={data.name} onChange={(e) => onChange("name", e.target.value)} placeholder="Alex Johnson" />
        </div>
        <div className="form-field">
          <label>Job Title</label>
          <input value={data.title} onChange={(e) => onChange("title", e.target.value)} placeholder="Senior Engineer" />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input value={data.email} onChange={(e) => onChange("email", e.target.value)} placeholder="you@email.com" />
        </div>
        <div className="form-field">
          <label>Phone</label>
          <input value={data.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="+1 555 000 0000" />
        </div>
        <div className="form-field">
          <label>Location</label>
          <input value={data.location} onChange={(e) => onChange("location", e.target.value)} placeholder="San Francisco, CA" />
        </div>
        <div className="form-field">
          <label>Website</label>
          <input value={data.website} onChange={(e) => onChange("website", e.target.value)} placeholder="yoursite.com" />
        </div>
        <div className="form-field full">
          <label>LinkedIn</label>
          <input value={data.linkedin} onChange={(e) => onChange("linkedin", e.target.value)} placeholder="linkedin.com/in/yourname" />
        </div>
        <div className="form-field full">
          <label>Summary</label>
          <textarea
            value={data.summary}
            onChange={(e) => onChange("summary", e.target.value)}
            placeholder="A short professional summary about yourself..."
            style={{ minHeight: 90 }}
          />
        </div>
      </div>
    </div>
  );
}