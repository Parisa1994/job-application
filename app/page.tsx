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
    isDataReady,
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
    <div className="min-h-screen p-4 md:p-8 transition-colors">
      <div className="container">
        {/* کامپوننت کن هدر را */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold dark:text-white">
            Job Application Form
          </h1>
        </div>
        {/* کامپوننت کن هدر را */}
        {isDataReady ? (
          !submitted ? (
            <JobApplicationForm
              onSubmit={onSubmit}
              currentStep={currentStep}
              isSubmitting={isSubmitting}
              onNext={nextStep}
              onPrevious={previousStep}
            />
          ) : (
            <SubmittedFormView formValues={formData} />
          )
        ) : (
          <>loading..</>
        )}
      </div>
    </div>
  );
};

export default JobPage;
