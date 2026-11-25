import React, { useId } from "react";

interface CustomInputProps {
  label: string;
  type: "text" | "email" | "number" | "textarea";
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  required = false,
  className = "",
}) => {
  const id = useId();
  const errorId = `${id}-error`;
  const baseClasses =
    "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors";
  const errorClasses = error ? "border-red-500" : "border-gray-300";

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} ${errorClasses} ${className} min-h-[120px]`}
        />
      ) : (
        <input
          id={id}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          type={type}
          value={value}
          onChange={(e) =>
            onChange(
              type === "number" ? Number(e.target.value) : e.target.value
            )
          }
          className={`${baseClasses} ${errorClasses} ${className}`}
        />
      )}

      {error && <p id={errorId} className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomInput;
