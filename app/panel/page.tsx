"use client";
import React, { useEffect } from "react";
import CustomInput from "./components/CustomInput";
import { JobRole, Skill } from "@/store/store.d";
import { useFormStore } from "@/store/store";

const jobRoles = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "fullstack", label: "Full Stack Developer" },
  { value: "devops", label: "DevOps Engineer" },
  { value: "designer", label: "UI/UX Designer" },
];

const skills = [
  { value: "react", label: "React" },
  { value: "css", label: "Css" },
  { value: "node", label: "Node.js" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "pwa", label: "PWA" },
  { value: "docker", label: "Docker" },
  { value: "next", label: "Next.js" },
  { value: "figma", label: "Figma" },
];

const JobPage = () => {
  const {
    fullName,
    email,
    jobRole,
    yearsOfExperience,
    skills: selectedSkills,
    coverLetter,
    isDarkMode,
    currentStep,
    isSubmitting,
    submitted,
    setField,
    toggleDarkMode,
    nextStep,
    previousStep,
    setSubmitting,
  } = useFormStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return fullName.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      case 2:
        return jobRole && yearsOfExperience >= 0;
      case 3:
        return selectedSkills.length > 0;
      case 4:
        return coverLetter.length >= 50;
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setField("submitted", true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold dark:text-white">
            Job Application Form
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
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
                <CustomInput
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(value) => setField("fullName", value as string)}
                  required
                />
                <CustomInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(value) => setField("email", value as string)}
                  required
                />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                    Job Role
                  </label>
                  <select
                    value={jobRole}
                    onChange={(e) =>
                      setField("jobRole", e.target.value as JobRole | "")
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Select a role</option>
                    {jobRoles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={yearsOfExperience}
                    onChange={(e) =>
                      setField("yearsOfExperience", Number(e.target.value))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="mb-4">
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
                        checked={selectedSkills.includes(skill.value as Skill)}
                        onChange={(e) => {
                          const newSkills = e.target.checked
                            ? [...selectedSkills, skill.value as Skill]
                            : selectedSkills.filter((s) => s !== skill.value);
                          setField("skills", newSkills);
                        }}
                        className="rounded text-blue-500"
                      />
                      <span className="dark:text-white">{skill.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <CustomInput
                label="Cover Letter"
                type="textarea"
                value={coverLetter}
                onChange={(value) => setField("coverLetter", value as string)}
                required
              />
            )}

            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={previousStep}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
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
        ) : (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Application Submitted
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium dark:text-gray-200">Full Name</h3>
                <p className="dark:text-gray-300">{fullName}</p>
              </div>
              <div>
                <h3 className="font-medium dark:text-gray-200">Email</h3>
                <p className="dark:text-gray-300">{email}</p>
              </div>
              <div>
                <h3 className="font-medium dark:text-gray-200">Job Role</h3>
                <p className="dark:text-gray-300">
                  {jobRoles.find((r) => r.value === jobRole)?.label}
                </p>
              </div>
              <div>
                <h3 className="font-medium dark:text-gray-200">
                  Years of Experience
                </h3>
                <p className="dark:text-gray-300">{yearsOfExperience}</p>
              </div>
              <div>
                <h3 className="font-medium dark:text-gray-200">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
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
                  {coverLetter}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPage;
