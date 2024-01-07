"use client";

import { create } from "zustand";

type UseSubscriptionModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSubscriptionModal = create<UseSubscriptionModalStore>(
  (set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  })
);
