import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormState } from "./store.d";

const initialState: Omit<
  FormState,
  | "setField"
  | "nextStep"
  | "previousStep"
  | "setSubmitting"
  | "toggleDarkMode"
  | "resetForm"
> = {
  currentStep: 1,
  isSubmitting: false,
  submitted: false,
  isDarkMode: false,
  formData: {
    fullName: "",
    email: "",
    jobRole: "frontend",
    yearsOfExperience: 0,
    skills: [],
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
            return { submitted: value as boolean };
          }
          return {
            formData: {
              ...state.formData,
              [field]: value,
            },
          };
        }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 4),
        })),

      previousStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      setSubmitting: (isSubmitting) =>
        set(() => ({
          isSubmitting,
        })),

      toggleDarkMode: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        })),

      resetForm: () => set(() => initialState),
    }),
    {
      name: "form-store", // key in localStorage
      partialize: (state) => ({ isDarkMode: state.isDarkMode }), // only persist theme
    }
  )
);
