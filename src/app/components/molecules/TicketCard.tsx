"use client";
import { Ticket } from "@/app/types/TicketsProps";
import React, { useState } from "react";
import CopyIcon from "../assets/icons/CopyIcon";

interface TicketCheckinProps {
  ticket: Ticket;
  onClose?: () => void;
  title?: string;
  showPrint?: boolean;
}

const TicketCard: React.FC<TicketCheckinProps> = ({
  ticket,
  onClose,
  title,
  showPrint = true,
}) => {
  const [copied, setCopied] = useState(false);
  const onPrint = () => {
    window.print();
  };
  const handleCopy = async () => {
    if (!ticket?.id) return;
    try {
      await navigator.clipboard.writeText(ticket.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy ticket ID:", err);
    }
  };
  return (
    <div className="max-w-sm mx-auto font-mono print-area">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-green-600 flex items-center justify-center">
          <span className="mr-2">✅</span> {title}
        </h2>
      </div>

      {/* Ticket Details */}
      <div className="space-y-2 text-sm">
        <p className="flex items-center gap-2">
          <span className="font-semibold">Ticket ID:</span>
          <span>{ticket?.id}</span>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-gray-200 transition cursor-pointer"
            title="Copy Ticket ID"
          >
            <CopyIcon size={16} />
          </button>
          {copied && <span className="text-green-600 text-xs">Copied!</span>}
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
      {(onClose || showPrint) && (
        <div className="flex justify-between mt-6 print:!hidden">
          {showPrint && (
            <button
              onClick={onPrint}
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-accent-color transition-all duration-200 cursor-pointer"
            >
              Print Ticket
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-all duration-200 cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(TicketCard);
