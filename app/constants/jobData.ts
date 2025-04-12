export const jobRoles = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "fullstack", label: "Full Stack Developer" },
  { value: "devops", label: "DevOps Engineer" },
  { value: "designer", label: "UI/UX Designer" },
] as const;

export const skills = [
  { value: "react", label: "React" },
  { value: "node", label: "Node.js" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "aws", label: "AWS" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "figma", label: "Figma" },
] as const;

export const skillValues = [
  "react",
  "node",
  "typescript",
  "python",
  "aws",
  "docker",
  "kubernetes",
  "figma",
] as const;

export type JobRole = (typeof jobRoles)[number]["value"];
export type Skill = (typeof skills)[number]["value"];
