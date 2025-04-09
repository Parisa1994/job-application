import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  jobRoles,
  skills,
  skillValues,
  JobRole,
  Skill,
} from "@/app/constants/jobData";
import CustomInput from "./CustomInput";
import { Resolver } from "react-hook-form";

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
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

      {currentStep === 1 && (
        <div>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <CustomInput
                label="Full Name"
                type="text"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                error={errors.fullName?.message}
                required
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CustomInput
                label="Email"
                type="email"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                error={errors.email?.message}
                required
              />
            )}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <div className="mb-4">
            <Controller
              name="jobRole"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                    Job Role
                  </label>
                  <select
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Select a role</option>
                    {jobRoles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  {errors.jobRole && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.jobRole.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="mb-4">
            <Controller
              name="yearsOfExperience"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                  {errors.yearsOfExperience && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.yearsOfExperience.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="mb-4">
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                  Skills
                </label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {skills.map((skill) => (
                    <label
                      key={skill.value}
                      className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={field.value?.includes(skill.value as Skill)}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...(field.value || []), skill.value as Skill]
                            : (field.value || []).filter(
                                (s) => s !== skill.value
                              );
                          field.onChange(newValue);
                        }}
                        className="rounded text-blue-500"
                      />
                      <span className="dark:text-white">{skill.label}</span>
                    </label>
                  ))}
                </div>
                {errors.skills && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.skills.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      )}

      {currentStep === 4 && (
        <Controller
          name="coverLetter"
          control={control}
          render={({ field }) => (
            <CustomInput
              label="Cover Letter"
              type="textarea"
              value={field.value}
              onChange={(value) => field.onChange(value)}
              error={errors.coverLetter?.message}
              required
            />
          )}
        />
      )}

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
