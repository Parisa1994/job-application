import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import CustomInput from "../CustomInput";
import { FormData } from "../JobApplicationForm";

interface Step1Props {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const Step1: React.FC<Step1Props> = ({ control, errors }) => {
  return (
    <div>
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <CustomInput
            label="Full Name"
            type="text"
            value={field.value || ""}
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
            value={field.value || ""}
            onChange={(value) => field.onChange(value)}
            error={errors.email?.message}
            required
          />
        )}
      />
    </div>
  );
};

export default Step1;
