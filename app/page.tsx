"use client";

import React from "react";
import { useFormStore } from "@/store/store";
import JobApplicationForm from "./components/JobApplicationForm";
import SubmittedFormView from "./components/SubmittedFormView";
import { FormData } from "./components/JobApplicationForm";
import Header from "./components/Header";
import Loading from "./components/Loading";

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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <Header
        title="Job Application Form"
        subtitle="Please fill out the form below to apply for the position"
      />
      <div className="container mx-auto px-4 py-12">
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
          <Loading message="Loading application form..." />
        )}
      </div>
    </main>
  );
};

export default JobPage;
