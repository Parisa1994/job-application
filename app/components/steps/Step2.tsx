import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormData } from "../JobApplicationForm";
import { jobRoles } from "@/app/constants/jobData";

interface Step2Props {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const Step2: React.FC<Step2Props> = ({ control, errors }) => {
  return (
    <div>
      <div className="mb-4">
        <Controller
          name="jobRole"
          control={control}
          render={({ field }) => (
            <div>
              <label htmlFor="job-role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Job Role
              </label>
              <select
                {...field}
                id="job-role"
                value={field.value ?? ""}
                aria-invalid={!!errors.jobRole}
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
              <label htmlFor="years-of-experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Years of Experience
              </label>
              <input
                type="number"
                {...field}
                id="years-of-experience"
                min={0}
                max={99}
                value={field.value ?? ""}
                aria-invalid={!!errors.yearsOfExperience}
                onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
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
  );
};

export default Step2;
