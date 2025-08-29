import Link from "next/link";
import { navLinks } from "../utils/paths";

export default function Footer() {
  return (
    <footer className="bg-main-color text-white mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Parking Reservation System
        </p>
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
    </footer>
  );
}
