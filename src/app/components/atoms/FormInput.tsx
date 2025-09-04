import React, { useState } from "react";
import { useFormikContext } from "formik";

type FormInputProps = {
  name: string;
  type: "text" | "email" | "password" | "number" | "tel";
  placeholder: string;
  className?: string;
};

// Define a generic type for form values
interface MyFormValues {
  [key: string]: string | number; // Modify this according to your form structure
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  type,
  placeholder,
  className = "",
}) => {
  // Type the context with MyFormValues
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<MyFormValues>();

  const [isFocused, setIsFocused] = useState(false);

  // Handle focus and blur
  const handleFocus = () => setIsFocused(true);
  const handleBlurInternal = (e: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(e);
    setIsFocused(false);
  };

  const error =
    touched[name as keyof MyFormValues] && errors[name as keyof MyFormValues];

  return (
    <div className="my-3">
      <input
        type={type}
        name={name}
        value={values[name as keyof MyFormValues]}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlurInternal}
        className={`w-full border px-3 py-2 rounded-md ${
          isFocused ? "border-main-color" : "border-gray-300"
        } ${error ? "border-red-500" : ""} ${className}`}
      />
      {error && (
        <div className="absolute text-red-500 text-sm mt-1 left-0">{error}</div>
      )}
    </div>
  );
};

export default FormInput;
