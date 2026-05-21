import { useState, useEffect } from "react";
import { ResumeData, SectionType } from "../types";
import { defaultData, saveToStorage, loadFromStorage } from "../utils/helpers";

export function useResumeData() {
  const [data, setData] = useState<ResumeData>(() => {
    return loadFromStorage() || defaultData;
  });

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  function updatePersonal(field: string, value: string) {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  }

  function updateExperience(id: string, field: string, value: string | boolean) {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  }

  function addExperience() {
    const newExp = {
      id: Math.random().toString(36).slice(2),
      company: "",
      role: "",
      start: "",
      end: "",
      current: false,
      description: "",
    };
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  }

  function removeExperience(id: string) {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  }

  function updateEducation(id: string, field: string, value: string) {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  }

  function addEducation() {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Math.random().toString(36).slice(2),
          institution: "",
          degree: "",
          field: "",
          start: "",
          end: "",
          gpa: "",
        },
      ],
    }));
  }

  function removeEducation(id: string) {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  }

  function updateSkills(skills: string[]) {
    setData((prev) => ({ ...prev, skills }));
  }

  function updateProject(id: string, field: string, value: string) {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  }

  function addProject() {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Math.random().toString(36).slice(2),
          name: "",
          description: "",
          tech: "",
          link: "",
        },
      ],
    }));
  }

  function removeProject(id: string) {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  }

  function updateCertification(id: string, field: string, value: string) {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  }

  function addCertification() {
    setData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: Math.random().toString(36).slice(2),
          name: "",
          issuer: "",
          date: "",
        },
      ],
    }));
  }

  function removeCertification(id: string) {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  }

  function updateAchievement(id: string, field: string, value: string) {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      ),
    }));
  }

  function addAchievement() {
    setData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        {
          id: Math.random().toString(36).slice(2),
          title: "",
          description: "",
        },
      ],
    }));
  }

  function removeAchievement(id: string) {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
  }

  function toggleSection(section: SectionType) {
    setData((prev) => {
      const active = prev.activeSections.includes(section)
        ? prev.activeSections.filter((s) => s !== section)
        : [...prev.activeSections, section];
      return { ...prev, activeSections: active };
    });
  }

  function reorderSections(newOrder: SectionType[]) {
    setData((prev) => ({ ...prev, sectionOrder: newOrder }));
  }

  function resetData() {
    setData(defaultData);
  }

  return {
    data,
    updatePersonal,
    updateExperience,
    addExperience,
    removeExperience,
    updateEducation,
    addEducation,
    removeEducation,
    updateSkills,
    updateProject,
    addProject,
    removeProject,
    updateCertification,
    addCertification,
    removeCertification,
    updateAchievement,
    addAchievement,
    removeAchievement,
    toggleSection,
    reorderSections,
    resetData,
  };
}