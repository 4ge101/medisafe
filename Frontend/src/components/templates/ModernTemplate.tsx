import React from "react";
import { ResumeData } from "../../types";
import { formatDate } from "../../utils/helpers";

interface Props {
  data: ResumeData;
}

export default function ModernTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications, achievements, sectionOrder, activeSections } = data;

  function renderSection(key: string) {
    if (!activeSections.includes(key as any)) return null;

    switch (key) {
      case "experience":
        if (!experience.length) return null;
        return (
          <div className="section-block" key="experience">
            <div className="section-title">Experience</div>
            {experience.map((exp) => (
              <div className="entry" key={exp.id}>
                <div className="entry-title">{exp.role || "Role"}</div>
                <div className="entry-sub">{exp.company || "Company"}</div>
                <div className="entry-date">
                  {formatDate(exp.start)} – {exp.current ? "Present" : formatDate(exp.end)}
                </div>
                {exp.description && <div className="entry-desc">{exp.description}</div>}
              </div>
            ))}
          </div>
        );

      case "education":
        if (!education.length) return null;
        return (
          <div className="section-block" key="education">
            <div className="section-title">Education</div>
            {education.map((edu) => (
              <div className="entry" key={edu.id}>
                <div className="entry-title">{edu.institution || "Institution"}</div>
                <div className="entry-sub">
                  {[edu.degree, edu.field].filter(Boolean).join(", ")}
                </div>
                <div className="entry-date">
                  {edu.start} – {edu.end}
                  {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                </div>
              </div>
            ))}
          </div>
        );

      case "projects":
        if (!projects.length) return null;
        return (
          <div className="section-block" key="projects">
            <div className="section-title">Projects</div>
            {projects.map((proj) => (
              <div className="entry" key={proj.id}>
                <div className="entry-title">{proj.name || "Project"}</div>
                {proj.tech && <div className="entry-sub">{proj.tech}</div>}
                {proj.description && <div className="entry-desc">{proj.description}</div>}
                {proj.link && (
                  <div className="entry-date" style={{ marginTop: 3 }}>{proj.link}</div>
                )}
              </div>
            ))}
          </div>
        );

      case "certifications":
        if (!certifications.length) return null;
        return (
          <div className="section-block" key="certifications">
            <div className="section-title">Certifications</div>
            {certifications.map((cert) => (
              <div className="entry" key={cert.id}>
                <div className="entry-title">{cert.name || "Certification"}</div>
                <div className="entry-sub">{cert.issuer}</div>
                {cert.date && <div className="entry-date">{formatDate(cert.date)}</div>}
              </div>
            ))}
          </div>
        );

      case "achievements":
        if (!achievements.length) return null;
        return (
          <div className="section-block" key="achievements">
            <div className="section-title">Achievements</div>
            {achievements.map((ach) => (
              <div className="entry" key={ach.id}>
                <div className="entry-title">{ach.title || "Achievement"}</div>
                {ach.description && <div className="entry-desc">{ach.description}</div>}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  }

  const mainSections = ["experience", "education", "projects", "certifications", "achievements"];
  const orderedMain = sectionOrder.filter((s) => mainSections.includes(s));

  return (
    <div className="tmpl-modern">
      <div className="resume-header">
        <div>
          <div className="resume-name">{personal.name || "Your Name"}</div>
          <div className="resume-title">{personal.title || "Job Title"}</div>
          <div className="resume-contact">
            {personal.email && (
              <div className="resume-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                {personal.email}
              </div>
            )}
            {personal.phone && (
              <div className="resume-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                </svg>
                {personal.phone}
              </div>
            )}
            {personal.location && (
              <div className="resume-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                {personal.location}
              </div>
            )}
            {personal.website && (
              <div className="resume-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                </svg>
                {personal.website}
              </div>
            )}
          </div>
        </div>
        {personal.photo && (
          <img src={personal.photo} alt="profile" className="resume-photo" />
        )}
      </div>

      <div className="resume-body">
        <div className="resume-main">
          {personal.summary && (
            <div className="summary-text">{personal.summary}</div>
          )}
          {orderedMain.map((s) => renderSection(s))}
        </div>

        {activeSections.includes("skills") && skills.length > 0 && (
          <div className="resume-sidebar">
            <div className="section-block">
              <div className="section-title">Skills</div>
              <div className="skills-list">
                {skills.map((s) => (
                  <span key={s} className="skill-badge">{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}