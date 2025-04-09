"use client";

import React from "react";
import { useFormStore } from "@/store/store";
import JobApplicationForm from "./components/JobApplicationForm";
import SubmittedFormView from "./components/SubmittedFormView";
import { FormData } from "./components/JobApplicationForm";

const JobPage = () => {
  const {
    currentStep,
    isSubmitting,
    submitted,
    setField,
    setSubmitting,
    formData,
    nextStep,
    previousStep,
  } = useFormStore();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    Object.entries(data).forEach(([key, value]) => {
      setField(key as keyof FormData, value);
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setField("submitted", true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold dark:text-white">
            Job Application Form
          </h1>
        </div>

        {!submitted ? (
          <JobApplicationForm
            onSubmit={onSubmit}
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        ) : (
          <SubmittedFormView formValues={formData} />
        )}
      </div>
    </div>
  );
};

export default JobPage;
