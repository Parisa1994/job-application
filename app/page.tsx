"use client";

import React from "react";
import { useFormStore } from "../store/store";
import { JobRole } from "../store/store.d";

const Page = () => {
  const {
    fullName,
    email,
    jobRole,
    yearsOfExperience,
    skills,
    coverLetter,
    isDarkMode,
    currentStep,
    setField,
    nextStep,
    previousStep,
    toggleDarkMode,
  } = useFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      fullName,
      email,
      jobRole,
      yearsOfExperience,
      skills,
      coverLetter,
    });
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Job Application Form</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Job Role</label>
                <select
                  value={jobRole}
                  onChange={(e) =>
                    setField("jobRole", e.target.value as JobRole | "")
                  }
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="frontend">Frontend Developer</option>
                  <option value="backend">Backend Developer</option>
                  <option value="fullstack">Full Stack Developer</option>
                  <option value="devops">DevOps Engineer</option>
                  <option value="designer">Designer</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Years of Experience</label>
                <input
                  type="number"
                  value={yearsOfExperience}
                  onChange={(e) =>
                    setField("yearsOfExperience", parseInt(e.target.value))
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={previousStep}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Previous
              </button>
            )}
            {currentStep < 2 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-auto"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
