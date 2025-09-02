// components/molecules/TablePlaceholder.tsx

import React from "react";

const TablePlaceholder = () => {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-700 border-b">Loading...</th>
            <th className="px-4 py-2 font-medium text-gray-700 border-b">Loading...</th>
            <th className="px-4 py-2 font-medium text-gray-700 border-b">Loading...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
              <div className="animate-pulse flex justify-center items-center">
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              </div>
              Loading...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablePlaceholder;
