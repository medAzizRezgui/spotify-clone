"use client";

import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <AuthModal />
    </>
  );
};
export default ModalProvider;
