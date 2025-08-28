
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-gray-600 text-white px-6 py-2 rounded-md shadow hover:bg-gray-700 transition-all duration-200 inline-flex items-center gap-2"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;