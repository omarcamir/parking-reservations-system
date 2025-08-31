import { Ticket } from "@/app/types/TicketsProps";
import React from "react";

interface TicketCheckinProps {
  ticket: Ticket;
  onClose: () => void;
}

const TicketCard: React.FC<TicketCheckinProps> = ({ ticket, onClose }) => {
  const onPrint = () => {
    window.print();
  };

  return (
    <div className="max-w-sm mx-auto font-mono print-area">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-green-600 flex items-center justify-center">
          <span className="mr-2">✅</span> Check-in Successful
        </h2>
      </div>

      {/* Ticket Details */}
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-semibold">Ticket ID:</span>
          {ticket?.id.replace("t_", "T-")}
        </p>
        <p>
          <span className="font-semibold">Type:</span>
          {ticket?.type.charAt(0).toUpperCase() + ticket?.type.slice(1)}
        </p>
        <p>
          <span className="font-semibold">Gate:</span>
          {ticket?.gateId.replace("gate_", "Gate ").replace("_", "")}
        </p>
        <p>
          <span className="font-semibold">Zone:</span>
          {ticket?.zoneId.replace("zone_", "Zone ").replace("_", "")}
        </p>
        <p>
          <span className="font-semibold">Check-in:</span> {ticket?.checkinAt}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6 print:!hidden">
        <button
          onClick={onPrint}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-accent-color transition-all duration-200 cursor-pointer"
        >
          Print Ticket
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-all duration-200 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default React.memo(TicketCard);
