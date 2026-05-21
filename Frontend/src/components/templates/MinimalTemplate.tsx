import React from "react";
import { ResumeData } from "../../types";
import { formatDate } from "../../utils/helpers";

interface Props {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: Props) {
  const { personal, experience, education, skills, projects, certifications, achievements, sectionOrder, activeSections } = data;

  function renderSection(key: string) {
    if (!activeSections.includes(key as any)) return null;

    switch (key) {
      case "experience":
        if (!experience.length) return null;
        return (
          <div key="experience">
            <div className="section-title">Experience</div>
            {experience.map((exp) => (
              <div className="entry" key={exp.id}>
                <div className="entry-date">
                  {formatDate(exp.start)}<br />
                  {exp.current ? "Present" : formatDate(exp.end)}
                </div>
                <div>
                  <div className="entry-title">{exp.role || "Role"}</div>
                  <div className="entry-sub">{exp.company}</div>
                  {exp.description && <div className="entry-desc">{exp.description}</div>}
                </div>
              </div>
            ))}
          </div>
        );

      case "education":
        if (!education.length) return null;
        return (
          <div key="education">
            <div className="section-title">Education</div>
            {education.map((edu) => (
              <div className="entry" key={edu.id}>
                <div className="entry-date">
                  {edu.start} – {edu.end}
                </div>
                <div>
                  <div className="entry-title">{edu.institution || "Institution"}</div>
                  <div className="entry-sub">
                    {[edu.degree, edu.field].filter(Boolean).join(", ")}
                    {edu.gpa ? ` · ${edu.gpa} GPA` : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "skills":
        if (!skills.length) return null;
        return (
          <div key="skills">
            <div className="section-title">Skills</div>
            <div className="skills-list">
              {skills.map((s) => (
                <span key={s} className="skill-badge">{s}</span>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (!projects.length) return null;
        return (
          <div key="projects">
            <div className="section-title">Projects</div>
            {projects.map((proj) => (
              <div className="entry" key={proj.id}>
                <div className="entry-date">{proj.tech}</div>
                <div>
                  <div className="entry-title">{proj.name || "Project"}</div>
                  {proj.link && <div className="entry-sub">{proj.link}</div>}
                  {proj.description && <div className="entry-desc">{proj.description}</div>}
                </div>
              </div>
            ))}
          </div>
        );

      case "certifications":
        if (!certifications.length) return null;
        return (
          <div key="certifications">
            <div className="section-title">Certifications</div>
            {certifications.map((cert) => (
              <div className="entry" key={cert.id}>
                <div className="entry-date">{formatDate(cert.date)}</div>
                <div>
                  <div className="entry-title">{cert.name}</div>
                  <div className="entry-sub">{cert.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        );

      case "achievements":
        if (!achievements.length) return null;
        return (
          <div key="achievements">
            <div className="section-title">Achievements</div>
            {achievements.map((ach) => (
              <div className="entry" key={ach.id}>
                <div className="entry-date"></div>
                <div>
                  <div className="entry-title">{ach.title}</div>
                  {ach.description && <div className="entry-desc">{ach.description}</div>}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="tmpl-minimal">
      <div className="resume-name">{personal.name || "Your Name"}</div>
      <div className="resume-title">{personal.title}</div>
      <div className="resume-contact">
        {[personal.email, personal.phone, personal.location, personal.website]
          .filter(Boolean)
          .map((item) => (
            <span key={item} className="resume-contact-item">{item}</span>
          ))}
      </div>
      <hr className="resume-divider" />

      {personal.summary && (
        <div className="summary-text" style={{ marginTop: 16 }}>{personal.summary}</div>
      )}

      {sectionOrder.map((s) => renderSection(s))}
    </div>
  );
}