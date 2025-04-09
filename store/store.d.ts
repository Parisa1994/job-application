export type JobRole =
  | "frontend"
  | "backend"
  | "fullstack"
  | "devops"
  | "designer";

export type Skill =
  | "react"
  | "node"
  | "typescript"
  | "python"
  | "aws"
  | "docker"
  | "kubernetes"
  | "figma";

export interface FormState {
  fullName: string;
  email: string;
  jobRole: JobRole | "";
  yearsOfExperience: number;
  skills: Skill[];
  coverLetter: string;
  isDarkMode: boolean;
  currentStep: number;
  isSubmitting: boolean;
  submitted: boolean;

  // Actions
  setField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
  resetForm: () => void;
  toggleDarkMode: () => void;
  setSubmitting: (value: boolean) => void;
  nextStep: () => void;
  previousStep: () => void;
}
