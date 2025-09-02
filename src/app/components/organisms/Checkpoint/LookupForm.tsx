import { useState } from "react";
import Button from "../../atoms/Button";
import PasteIcon from "../../assets/icons/PasteIcon";

type LookupFormProps = {
  ticketId: string;
  setTicketId: (value: string) => void;
  isFetchingTicket: boolean;
  handleLookup: () => void;
  resetPage: () => void; // Add resetPage prop
};

const LookupForm = ({
  ticketId,
  setTicketId,
  isFetchingTicket,
  handleLookup,
  resetPage,
}: LookupFormProps) => {
  const [pasting, setPasting] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isFetchingTicket) {
      handleLookup();
    }
  };
   const handlePasteClick = async () => {
    try {
      setPasting(true);
      const text = await navigator.clipboard.readText();
      if (text) setTicketId(text.trim());
    } catch (err) {
      console.error("Failed to paste from clipboard:", err);
    } finally {
      setPasting(false);
    }
  };
  return (
    <div className="w-full flex justify-start">
      <div className="flex flex-wrap gap-2 mb-6 w-full lg:w-1/2">
        <div className="relative flex-1">
          <input
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="Enter Ticket ID"
            className="border rounded-lg px-3 py-2 w-full pr-10" // padding-right for icon
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={handlePasteClick}
            disabled={pasting}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
            title="Paste from clipboard"
          >
            <PasteIcon />
          </button>
        </div>
        <Button
          text="Scan / Lookup"
          isLoading={isFetchingTicket}
          disabled={isFetchingTicket}
          onClick={() => {
            resetPage();
            handleLookup();
          }}
          className="bg-main-color text-white w-full md:w-auto"
        />
        <Button
          text="Reset"
          onClick={resetPage} // Trigger resetPage here
          className="bg-gray-100 w-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default LookupForm;
