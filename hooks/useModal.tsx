"use client";

import { create } from "zustand";

type UseModalStore = {
  id?: string;
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
};

export const useModal = create<UseModalStore>((set) => ({
  isOpen: false,
  id: "",
  onClose: () => set({ isOpen: false }),
  onOpen: (id?: string) => set({ isOpen: true, id }),
}));
