"use client";
import React from "react";
import CustomInput from "./components/CustomInput";

const jobRoles = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "fullstack", label: "Full Stack Developer" },
  { value: "devops", label: "DevOps Engineer" },
  { value: "designer", label: "UI/UX Designer" },
];

const skills = [
  { value: "react", label: "React" },
  { value: "node", label: "Node.js" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "aws", label: "AWS" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "figma", label: "Figma" },
];

const JobPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold dark:text-white">
            Job Application Form
          </h1>
          <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            mode
          </button>
        </div>
        <form>
          <CustomInput label="Full Name" type="text" required />
          <CustomInput label="Email" type="email" required />
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
              Job Role
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white">
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
              Skills
            </label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {skills.map((skill) => (
                <label
                  key={skill.value}
                  className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <input type="checkbox" className="rounded text-blue-500" />
                  <span className="dark:text-white">{skill.label}</span>
                </label>
              ))}
            </div>
            <CustomInput label="Cover Letter" type="textarea" required />
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPage;
