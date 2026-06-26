import React, { useRef } from "react";
import "./Modal.css";

interface ModalProps {
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
    children = <></>,
    isOpen = true,
    onClose = () => { },
}) => {
    const modalRef = useRef(null);

    return (
        <>
            {isOpen && (
                <div className="modal-overlay" ref={modalRef} onClick={onClose}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
