import { useAddEmployeeMutation } from "@/app/rtkQuery/services/admin";
import * as Yup from "yup";
import { addUserFormInputs } from "@/app/components/utils/forms";
import { useToast } from "@/app/contexts/ToastProvider";
import DynamicForm from "../../DynamicForm";

type AddUserFormProps = {
  setIsModalOpen: (isOpen: boolean) => void;
};

interface AddUserFormValues {
  username: string;
  name: string;
  role: string;
  password: string;
}

const AddUserForm = ({ setIsModalOpen }: AddUserFormProps) => {
  const [addEmployee, { isLoading: isAdding }] = useAddEmployeeMutation();
  const { showToast } = useToast();

  const initialValues = {
    username: "",
    name: "",
    role: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const onSubmit = async (values: AddUserFormValues) => {
    try {
      // console.log(values);
      const result = await addEmployee(values).unwrap();
      console.log("API result:", result); // This should log if the API was successful
      showToast("User is Added", "success");
      setIsModalOpen(false);
    } catch (error) {
      // Handle error case
      console.error("Error adding employee:", error);
      // Show error toast
      showToast("Failed to add user. Please try again.", "error");
    }
  };

  return (
    <DynamicForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      formInputs={addUserFormInputs}
      onCancel={() => setIsModalOpen(false)}
      isLoading={isAdding}
      submitText="Save"
      cancelText="Cancel"
    />
  );
};

export default AddUserForm;
