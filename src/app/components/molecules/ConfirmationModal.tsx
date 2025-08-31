import Button from "../atoms/Button";
import Modal from "./Modal";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 text-center">
        <p className="text-lg font-semibold">{message}</p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={()=>{onConfirm(); onClose();}}
            text="Confirm"
            className="bg-green-700 text-white hover:bg-green-900"
          />
          <Button
            onClick={onClose}
            text="Cancel"
            className="bg-gray-300 text-gray-700 hover:bg-gray-400"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
