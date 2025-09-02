import React from "react";

type TogglerBtnProps = { toggleSidebar: () => void; className?: string };
const TogglerBtn = ({ toggleSidebar, className }: TogglerBtnProps) => {
  return (
    <button
      className="md:hidden"
      onClick={toggleSidebar}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={`text-main-color size-8 ${className}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 5h18M3 12h18M3 19h18"
        ></path>
      </svg>
    </button>
  );
};

export default TogglerBtn;
