"use client";
import React, { useEffect, useRef } from "react";
import Loader from "../atoms/Loader";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  Loading?: boolean | React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  Loading,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Close modal on click outside
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;
  if (Loading) {
    return typeof Loading === "boolean" ? <Loader /> : <>{Loading}</>;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 "
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative ${className}`}
      >
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
