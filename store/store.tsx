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
  fullName: "",
  email: "",
  jobRole: "" as JobRole | "",
  yearsOfExperience: 0,
  skills: [] as Skill[],
  coverLetter: "",
  isDarkMode: false,
  currentStep: 1,
  isSubmitting: false,
  submitted: false,
};

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      ...initialState,

      setField: <K extends keyof FormState>(field: K, value: FormState[K]) =>
        set((state: FormState) => ({ ...state, [field]: value })),

      resetForm: () => set(initialState),

      toggleDarkMode: () =>
        set((state: FormState) => ({ isDarkMode: !state.isDarkMode })),

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
    }
  )
);
