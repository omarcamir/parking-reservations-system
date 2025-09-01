import React from "react";

interface LoaderProps {
  size?: number; // Optional size prop
}

const Loader: React.FC<LoaderProps> = ({ size = 40 }) => {
  return (
    <div
      className="border-t-main-color border-gray-300 rounded-full animate-spin"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${size / 10}px`, // Adjust border width based on size
      }}
    />
  );
};

export default Loader;
