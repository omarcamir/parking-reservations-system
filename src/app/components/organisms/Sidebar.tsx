"use client";
import { useState } from "react";
import { adminLinks } from "../utils/paths";
import Link from "next/link";
import TogglerBtn from "../atoms/TogglerBtn";

const Sidebar= () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <>
      {/* Background overlay when sidebar is open */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"} transition-all duration-200`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`h-full bg-gray-800 text-white transition-transform duration-300 transform ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full"
        } md:translate-x-0 md:h-auto md:w-64 md:relative absolute`} // `absolute` ensures no space is taken on mobile
      >
        <div className="md:hidden absolute top-3 -end-8 p-1 bg-main-color rounded-e-lg">
          <TogglerBtn
            toggleSidebar={toggleSidebar}
            className="text-white !size-6"
        />
        </div>

        {/* Sidebar navigation links */}
        <nav className="flex flex-col p-4">
         {adminLinks.map((link) => (
            <Link key={link.id} href={`/admin/${link.path}`} className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 rounded-lg">
              {link.icon} {/* JSX element for the icon */}
              <span>{link.label}</span>
            </Link>
        ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
