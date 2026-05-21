import { ResumeData } from "../types";

export const defaultData: ResumeData = {
  personal: {
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    email: "alex@email.com",
    phone: "+1 (555) 000-0000",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    linkedin: "linkedin.com/in/alexjohnson",
    photo: "",
    summary:
      "Passionate engineer with 5+ years building scalable web applications. Love clean code, great UX, and solving hard problems.",
  },
  experience: [
    {
      id: "exp1",
      company: "TechCorp Inc.",
      role: "Senior Software Engineer",
      start: "2021-03",
      end: "",
      current: true,
      description:
        "Led development of microservices architecture serving 2M+ users. Reduced API latency by 40% through caching strategies.",
    },
    {
      id: "exp2",
      company: "StartupXYZ",
      role: "Full Stack Developer",
      start: "2019-06",
      end: "2021-02",
      current: false,
      description:
        "Built React + Node.js SaaS platform from scratch. Shipped 12 features per quarter in a fast-paced environment.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      start: "2015",
      end: "2019",
      gpa: "3.8",
    },
  ],
  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "AWS",
    "GraphQL",
    "Python",
  ],
  projects: [
    {
      id: "proj1",
      name: "DevFlow",
      description:
        "Open-source developer productivity tool with 2k+ GitHub stars.",
      tech: "React, Node.js, PostgreSQL",
      link: "github.com/alex/devflow",
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022-08",
    },
  ],
  achievements: [
    {
      id: "ach1",
      title: "Hackathon Winner",
      description:
        "1st place at SF Hacks 2022 out of 200+ teams for building an accessibility tool.",
    },
  ],
  sectionOrder: [
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "achievements",
  ],
  activeSections: [
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "achievements",
  ],
};

export function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  if (!month) return year;
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export function saveToStorage(data: ResumeData) {
  localStorage.setItem("resume_data", JSON.stringify(data));
}

export function loadFromStorage(): ResumeData | null {
  const raw = localStorage.getItem("resume_data");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}