import React, { useRef } from "react";
import { ResumeData, TemplateName, ThemeMode } from "../../types";
import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";

interface Props {
  data: ResumeData;
  template: TemplateName;
  onTemplateChange: (t: TemplateName) => void;
  theme: ThemeMode;
  onThemeChange: () => void;
}

export default function ResumePreview({ data, template, onTemplateChange, theme, onThemeChange }: Props) {
  const resumeRef = useRef<HTMLDivElement>(null);

  async function downloadPDF() {
    const el = resumeRef.current;
    if (!el) return;

    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    pdf.save(`${data.personal.name || "resume"}.pdf`);
  }

  function renderTemplate() {
    switch (template) {
      case "modern": return <ModernTemplate data={data} />;
      case "minimal": return <MinimalTemplate data={data} />;
      case "creative": return <CreativeTemplate data={data} />;
      default: return <ModernTemplate data={data} />;
    }
  }

  return (
    <div className="preview-panel">
      <div className="preview-toolbar">
        <h2>Live Preview</h2>

        <select
          className="template-select"
          value={template}
          onChange={(e) => onTemplateChange(e.target.value as TemplateName)}
        >
          <option value="modern">Modern</option>
          <option value="minimal">Minimal</option>
          <option value="creative">Creative</option>
        </select>

        <button className="theme-toggle" onClick={onThemeChange}>
          {theme === "light" ? (
            <>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
              Dark
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              Light
            </>
          )}
        </button>

        <button
          className="btn-primary"
          style={{ width: "auto", padding: "7px 14px" }}
          onClick={downloadPDF}
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="resume-wrapper" ref={resumeRef}>
        {renderTemplate()}
      </div>
    </div>
  );
}