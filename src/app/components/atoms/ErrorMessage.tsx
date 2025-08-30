interface ErrorMessageProps {
  message?: string;
  retry?: () => void;
}

export default function ErrorMessage({
  message = "Something went wrong.",
  retry,
}: ErrorMessageProps) {
  return (
    <div className="col-span-full bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md flex justify-between items-center">
      <span>{message}</span>
      {retry && (
        <button
          onClick={retry}
          className="ml-4 text-sm text-red-700 underline hover:text-red-900"
        >
          Retry
        </button>
      )}
    </div>
  );
}
