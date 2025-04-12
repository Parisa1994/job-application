"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { jobRoles, skillValues, JobRole, Skill } from "@/app/constants/jobData";
import { Resolver } from "react-hook-form";
import { Step1, Step2, Step3, Step4 } from "./steps";

export type FormData = {
  fullName: string;
  email: string;
  jobRole: JobRole;
  yearsOfExperience: number;
  skills: Skill[];
  coverLetter: string;
};

const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Full name is required")
      .min(6, "Name must be at least 6 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    jobRole: yup
      .string()
      .oneOf(jobRoles.map((r) => r.value) as JobRole[])
      .required("Job role is required"),
    yearsOfExperience: yup
      .number()
      .required("Years of experience is required")
      .min(0, "Years must be 0 or greater"),
    skills: yup
      .array()
      .of(yup.string().oneOf(skillValues))
      .min(1, "Select at least one skill")
      .default([]),
    coverLetter: yup
      .string()
      .required("Cover letter is required")
      .min(10, "Cover letter must be at least 10 characters"),
  })
  .required();

interface JobApplicationFormProps {
  onSubmit: (data: FormData) => void;
  currentStep: number;
  isSubmitting: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  onSubmit,
  currentStep,
  isSubmitting,
  onNext,
  onPrevious,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    mode: "onChange",
    defaultValues: {
      skills: [],
    },
  });

  const formValues = watch();

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          !errors.fullName &&
          !errors.email &&
          formValues.fullName &&
          formValues.email
        );
      case 2:
        return (
          !errors.jobRole &&
          !errors.yearsOfExperience &&
          formValues.jobRole &&
          formValues.yearsOfExperience !== undefined
        );
      case 3:
        return !errors.skills && formValues.skills.length > 0;
      case 4:
        return !errors.coverLetter && formValues.coverLetter;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 control={control} errors={errors} />;
      case 2:
        return <Step2 control={control} errors={errors} />;
      case 3:
        return <Step3 control={control} errors={errors} />;
      case 4:
        return <Step4 control={control} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
    >
      <div className="flex justify-between mb-6">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-1/4 h-2 rounded-full mx-1 ${
              step <= currentStep
                ? "bg-blue-500"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      {renderStep()}

      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onPrevious}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>
        )}
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={onNext}
            disabled={!validateStep(currentStep)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || !validateStep(currentStep)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </form>
  );
};

export default JobApplicationForm;
