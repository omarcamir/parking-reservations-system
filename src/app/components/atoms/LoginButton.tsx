import Link from "next/link";

const LoginButton = () => {
  return (
    <Link
      href="/login"
      className="bg-main-color text-white px-4 py-2 rounded hover:bg-accent-color transition duration-200"
    >
      Login
    </Link>
  );
};

export default LoginButton;
