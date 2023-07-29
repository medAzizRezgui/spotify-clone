import { create } from "zustand";

interface SubscribeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSubscribeModal = create<SubscribeModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
export default useSubscribeModal;
