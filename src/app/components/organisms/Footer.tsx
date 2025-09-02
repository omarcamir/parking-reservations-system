import Link from "next/link";
import { navLinks } from "../utils/paths";
import Logo from "../atoms/Logo";

export default function Footer() {

  return (
    <footer className="bg-main-color text-white">
      <div className="container py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <Logo className="!text-white"/>
        <div className="flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.path}
              className="hover:text-accent-color text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="container py-3 text-center border-t border-gray-600">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Parking Reservation System
        </p>
      </div>
    </footer>
  );
}
