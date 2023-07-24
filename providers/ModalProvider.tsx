"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/Modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <Modal
        title={"Test Model"}
        description={"Description"}
        isOpen
        onChange={() => {}}
      >
        Children
      </Modal>
    </>
  );
};
export default ModalProvider;
