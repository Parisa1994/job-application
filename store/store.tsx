import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormState, JobRole, Skill } from "./store.d";

type FormStateWithoutActions = Omit<
  FormState,
  | "setField"
  | "resetForm"
  | "toggleDarkMode"
  | "setSubmitting"
  | "nextStep"
  | "previousStep"
>;

const initialState: FormStateWithoutActions = {
  currentStep: 1,
  isSubmitting: false,
  submitted: false,
  isDarkMode: false,
  formData: {
    fullName: "",
    email: "",
    jobRole: "frontend" as JobRole,
    yearsOfExperience: 0,
    skills: [] as Skill[],
    coverLetter: "",
  },
};

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      ...initialState,

      setField: (field, value) =>
        set((state) => {
          if (field === "submitted") {
            return { ...state, submitted: value as boolean };
          }
          return {
            ...state,
            formData: {
              ...state.formData,
              [field]: value,
            },
          };
        }),

      resetForm: () => set(initialState),

      toggleDarkMode: () =>
        set((state: FormState) => {
          const newDarkMode = !state.isDarkMode;
          if (typeof window !== "undefined") {
            localStorage.setItem("theme", newDarkMode ? "dark" : "light");
            if (newDarkMode) {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }
          return { isDarkMode: newDarkMode };
        }),

      setSubmitting: (value: boolean) => set({ isSubmitting: value }),

      nextStep: () =>
        set((state: FormState) => ({ currentStep: state.currentStep + 1 })),

      previousStep: () =>
        set((state: FormState) => ({
          currentStep: Math.max(1, state.currentStep - 1),
        })),
    }),
    {
      name: "job-application-storage",
      partialize: (state) => ({
        ...state,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
