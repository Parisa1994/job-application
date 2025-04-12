import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormData } from "../JobApplicationForm";
import { skills, Skill } from "@/app/constants/jobData";

interface Step3Props {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const Step3: React.FC<Step3Props> = ({ control, errors }) => {
  return (
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
                        : (field.value || []).filter((s) => s !== skill.value);
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
  );
};

export default Step3;
