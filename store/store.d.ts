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

export interface FormData {
  fullName: string;
  email: string;
  jobRole: JobRole;
  yearsOfExperience: number;
  skills: Skill[];
  coverLetter: string;
}

export interface FormState {
  currentStep: number;
  isSubmitting: boolean;
  submitted: boolean;
  formData: FormData;
  isDarkMode: boolean;
  isDataReady: boolean;
  setField: (
    field: keyof FormData | "submitted",
    value: FormData[keyof FormData] | boolean
  ) => void;
  nextStep: () => void;
  previousStep: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setDataReady: (isDataReady: boolean) => void;
  toggleDarkMode: () => void;
  resetForm: () => void;
}
