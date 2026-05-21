import React from "react";
import { ResumeData } from "../../types";
import { formatDate } from "../../utils/helpers";

interface Props {
  data: ResumeData;
}

export default function CreativeTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications, achievements, sectionOrder, activeSections } = data;

  const initials = personal.name
    ? personal.name.split(" ").map((n) => n[0]).slice(0, 2).join("")
    : "?";

  function renderMainSection(key: string) {
    if (!activeSections.includes(key as any)) return null;

    switch (key) {
      case "experience":
        if (!experience.length) return null;
        return (
          <div key="experience">
            <div className="cr-main-section-title">Experience</div>
            {experience.map((exp) => (
              <div className="cr-entry" key={exp.id}>
                <div className="cr-entry-title">{exp.role || "Role"}</div>
                <div className="cr-entry-sub">{exp.company}</div>
                <div className="cr-entry-date">
                  {formatDate(exp.start)} – {exp.current ? "Present" : formatDate(exp.end)}
                </div>
                {exp.description && <div className="cr-entry-desc">{exp.description}</div>}
              </div>
            ))}
          </div>
        );

      case "education":
        if (!education.length) return null;
        return (
          <div key="education">
            <div className="cr-main-section-title">Education</div>
            {education.map((edu) => (
              <div className="cr-entry" key={edu.id}>
                <div className="cr-entry-title">{edu.institution || "Institution"}</div>
                <div className="cr-entry-sub">
                  {[edu.degree, edu.field].filter(Boolean).join(", ")}
                </div>
                <div className="cr-entry-date">
                  {edu.start} – {edu.end}
                  {edu.gpa ? ` · ${edu.gpa} GPA` : ""}
                </div>
              </div>
            ))}
          </div>
        );

      case "projects":
        if (!projects.length) return null;
        return (
          <div key="projects">
            <div className="cr-main-section-title">Projects</div>
            {projects.map((proj) => (
              <div className="cr-entry" key={proj.id}>
                <div className="cr-entry-title">{proj.name || "Project"}</div>
                {proj.tech && <div className="cr-entry-sub">{proj.tech}</div>}
                {proj.description && <div className="cr-entry-desc">{proj.description}</div>}
                {proj.link && (
                  <div className="cr-entry-date" style={{ marginTop: 3 }}>{proj.link}</div>
                )}
              </div>
            ))}
          </div>
        );

      case "certifications":
        if (!certifications.length) return null;
        return (
          <div key="certifications">
            <div className="cr-main-section-title">Certifications</div>
            {certifications.map((cert) => (
              <div className="cr-entry" key={cert.id}>
                <div className="cr-entry-title">{cert.name}</div>
                <div className="cr-entry-sub">{cert.issuer}</div>
                {cert.date && <div className="cr-entry-date">{formatDate(cert.date)}</div>}
              </div>
            ))}
          </div>
        );

      case "achievements":
        if (!achievements.length) return null;
        return (
          <div key="achievements">
            <div className="cr-main-section-title">Achievements</div>
            {achievements.map((ach) => (
              <div className="cr-entry" key={ach.id}>
                <div className="cr-entry-title">{ach.title}</div>
                {ach.description && <div className="cr-entry-desc">{ach.description}</div>}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  }

  const mainKeys = ["experience", "education", "projects", "certifications", "achievements"];
  const orderedMain = sectionOrder.filter((s) => mainKeys.includes(s));

  return (
    <div className="tmpl-creative">
      <div className="cr-sidebar">
        {personal.photo ? (
          <img src={personal.photo} alt="profile" className="cr-photo" />
        ) : (
          <div className="cr-photo-placeholder">{initials}</div>
        )}

        <div className="cr-name">{personal.name || "Your Name"}</div>
        <div className="cr-title">{personal.title || "Job Title"}</div>

        <div className="cr-section-title">Contact</div>
        {personal.email && <div className="cr-contact-item">{personal.email}</div>}
        {personal.phone && <div className="cr-contact-item">{personal.phone}</div>}
        {personal.location && <div className="cr-contact-item">{personal.location}</div>}
        {personal.website && <div className="cr-contact-item">{personal.website}</div>}
        {personal.linkedin && <div className="cr-contact-item">{personal.linkedin}</div>}

        {activeSections.includes("skills") && skills.length > 0 && (
          <>
            <div className="cr-section-title">Skills</div>
            <div className="cr-skills-list">
              {skills.map((s) => (
                <div key={s} className="cr-skill">{s}</div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="cr-main">
        {personal.summary && (
          <div className="cr-summary">{personal.summary}</div>
        )}
        {orderedMain.map((s) => renderMainSection(s))}
      </div>
    </div>
  );
}