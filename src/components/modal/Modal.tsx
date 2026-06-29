import React, { useEffect, useRef } from "react";
import "./Modal.css";

interface ModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children = <></>,
  isOpen = true,
  onClose = () => {},
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key == "Escape") onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
