import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import CustomInput from "../CustomInput";
import { FormData } from "../JobApplicationForm";

interface Step4Props {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const Step4: React.FC<Step4Props> = ({ control, errors }) => {
  return (
    <Controller
      name="coverLetter"
      control={control}
      render={({ field }) => (
        <CustomInput
          label="Cover Letter"
          type="textarea"
          value={field.value || ""}
          onChange={(value) => field.onChange(value)}
          error={errors.coverLetter?.message}
          required
        />
      )}
    />
  );
};

export default Step4;
