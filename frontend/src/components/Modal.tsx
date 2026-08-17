import { createPortal } from "react-dom";
import "../css/Modal.css";
import Button from "./Button";
import type { PropsWithChildren } from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  title,
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) {
  return createPortal(
    <div className={`md-background ${isOpen ? "open" : ""}`}>
      <div className={`modal-container ${isOpen ? "open" : ""}`}>
        <div className="upper-content">
          <div className="close-btn">
            <Button variant="icon" icon="x-circle" onClick={onClose} />
          </div>
          <div className="md-title">
            <h2>{title}</h2>
          </div>
        </div>
        <div className="main-content">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
