import React from "react";
import { jobRoles, skills } from "@/app/constants/jobData";
import { FormData } from "./JobApplicationForm";

interface SubmittedFormViewProps {
  formValues: FormData;
}

const SubmittedFormView: React.FC<SubmittedFormViewProps> = ({
  formValues,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Application Submitted
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium dark:text-gray-200">Full Name</h3>
          <p className="dark:text-gray-300">{formValues.fullName}</p>
        </div>
        <div>
          <h3 className="font-medium dark:text-gray-200">Email</h3>
          <p className="dark:text-gray-300">{formValues.email}</p>
        </div>
        <div>
          <h3 className="font-medium dark:text-gray-200">Job Role</h3>
          <p className="dark:text-gray-300">
            {jobRoles.find((r) => r.value === formValues.jobRole)?.label}
          </p>
        </div>
        <div>
          <h3 className="font-medium dark:text-gray-200">
            Years of Experience
          </h3>
          <p className="dark:text-gray-300">{formValues.yearsOfExperience}</p>
        </div>
        <div>
          <h3 className="font-medium dark:text-gray-200">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {formValues.skills?.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded"
              >
                {skills.find((s) => s.value === skill)?.label}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-medium dark:text-gray-200">Cover Letter</h3>
          <p className="dark:text-gray-300 whitespace-pre-wrap">
            {formValues.coverLetter}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmittedFormView;
