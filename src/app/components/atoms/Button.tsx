import Loader from "./Loader";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  type,
  className = "",
  disabled = false,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 flex items-center justify-center gap-2 rounded-md transition-colors duration-200 ${className} ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      {isLoading && <Loader size={20} />}
      <span>{text}</span>
    </button>
  );
};

export default Button;
