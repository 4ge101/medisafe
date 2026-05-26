import React, { useState, useEffect, useRef } from "react";
import "./styles/global.css";
import { useResumeData } from "./hooks/useResumeData";
import { TemplateName, ThemeMode } from "./types/index";
import Sidebar from "./components/Sidebar";
import PersonalForm from "./components/forms/PersonalForm";
import ExperienceForm from "./components/forms/ExperienceForm";
import EducationForm from "./components/forms/EducationForm";
import SkillsForm from "./components/forms/SkillsForm";
import ProjectsForm from "./components/forms/ProjectsForm";
import CertificationsForm from "./components/forms/CertificationsForm";
import AchievementsForm from "./components/forms/AchievementsForm";
import ResumePreview from "./components/ResumePreview";

export default function App() {
  const [activeTab, setActiveTab] = useState("personal");
  const [template, setTemplate] = useState<TemplateName>("modern");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const previewRef = useRef<{ downloadPDF: () => void } | null>(null);

  const {
    data,
    updatePersonal,
    updateExperience, addExperience, removeExperience,
    updateEducation, addEducation, removeEducation,
    updateSkills,
    updateProject, addProject, removeProject,
    updateCertification, addCertification, removeCertification,
    updateAchievement, addAchievement, removeAchievement,
    toggleSection,
    reorderSections,
    resetData,
  } = useResumeData();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  function handleDownload() {
    const btn = document.querySelector(".preview-toolbar .btn-primary") as HTMLButtonElement;
    if (btn) btn.click();
  }

  return (
    <div className="app-layout">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sectionOrder={data.sectionOrder}
        activeSections={data.activeSections}
        onToggleSection={toggleSection}
        onReorder={reorderSections}
        onDownload={handleDownload}
        onReset={resetData}
      />

      <div className="form-panel">
        <PersonalForm
          data={data.personal}
          onChange={updatePersonal}
          visible={activeTab === "personal"}
        />
        <ExperienceForm
          items={data.experience}
          onUpdate={updateExperience}
          onAdd={addExperience}
          onRemove={removeExperience}
          visible={activeTab === "experience"}
        />
        <EducationForm
          items={data.education}
          onUpdate={updateEducation}
          onAdd={addEducation}
          onRemove={removeEducation}
          visible={activeTab === "education"}
        />
        <SkillsForm
          skills={data.skills}
          onUpdate={updateSkills}
          visible={activeTab === "skills"}
        />
        <ProjectsForm
          items={data.projects}
          onUpdate={updateProject}
          onAdd={addProject}
          onRemove={removeProject}
          visible={activeTab === "projects"}
        />
        <CertificationsForm
          items={data.certifications}
          onUpdate={updateCertification}
          onAdd={addCertification}
          onRemove={removeCertification}
          visible={activeTab === "certifications"}
        />
        <AchievementsForm
          items={data.achievements}
          onUpdate={updateAchievement}
          onAdd={addAchievement}
          onRemove={removeAchievement}
          visible={activeTab === "achievements"}
        />
      </div>

      <ResumePreview
        data={data}
        template={template}
        onTemplateChange={setTemplate}
        theme={theme}
        onThemeChange={toggleTheme}
      />
    </div>
  );
}