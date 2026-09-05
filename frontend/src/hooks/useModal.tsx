import { useState } from "react";

export type ModalType =
  | "error"
  | "about"
  | "hint"
  | "try"
  | "loading"
  | "reset"
  | "success"
  | null;

export function useModal() {
  const [modal, setModal] = useState<ModalType>(null);
  const onOpen = (type: ModalType) => setModal(type);
  const onClose = () => setModal(null);

  return { modal, onOpen, onClose };
}
