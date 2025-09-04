"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@/app/components/atoms/Button";
import FormInput from "@/app/components/atoms/FormInput";

// Match FormInput props (future-proof union for flexibility)
type InputField = {
  name: string;
  type: "number" | "text" | "email" | "password" | "tel"; // strict union
  placeholder?: string; // optional, but we’ll fallback to ""
};

type DynamicFormProps<T> = {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<Partial<T>>;
  onSubmit: (values: T) => Promise<void> | void;
  formInputs: InputField[];
  onCancel?: () => void;
  isLoading?: boolean;
  submitText?: string;
  cancelText?: string;
};

const DynamicForm = <T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
  formInputs,
  onCancel,
  isLoading = false,
  submitText = "Submit",
  cancelText = "Cancel",
}: DynamicFormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        {formInputs.map((inp) => (
          <FormInput
            key={inp.name}
            name={inp.name}
            type={inp.type}
            placeholder={inp.placeholder ?? ""} // ✅ fallback avoids undefined error
          />
        ))}

        <div className="flex justify-end gap-2 mt-4">
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              text={cancelText}
            />
          )}
          <Button
            type="submit"
            className="px-4 py-2 bg-main-color hover:bg-blue-950 text-white rounded-md"
            text={submitText}
            isLoading={isLoading}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default DynamicForm;
