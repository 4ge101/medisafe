import React, { useState } from "react";

interface Props {
  skills: string[];
  onUpdate: (skills: string[]) => void;
  visible: boolean;
}

export default function SkillsForm({ skills, onUpdate, visible }: Props) {
  const [input, setInput] = useState("");

  function addSkill() {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    onUpdate([...skills, trimmed]);
    setInput("");
  }

  function removeSkill(skill: string) {
    onUpdate(skills.filter((s) => s !== skill));
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  }

  return (
    <div className={`form-section ${visible ? "visible" : ""}`}>
      <div className="form-section-header">
        <h2>Skills</h2>
      </div>

      <div className="skills-input-wrap">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a skill and press Enter..."
        />
        <button className="btn-skill-add" onClick={addSkill}>Add</button>
      </div>

      <div className="skills-tags">
        {skills.map((skill) => (
          <div className="skill-tag" key={skill} onClick={() => removeSkill(skill)}>
            {skill}
            <span className="skill-tag-x">×</span>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8 }}>
          No skills added. Type above and press Enter.
        </p>
      )}
    </div>
  );
}