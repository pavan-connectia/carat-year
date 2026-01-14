import { create } from "zustand";

type DeleteDialogState = {
  isOpen: boolean;
  onConfirm?: () => void;
  open: (opts: { onConfirm?: () => void }) => void;
  close: () => void;
};

export const useDeleteDialog = create<DeleteDialogState>((set) => ({
  isOpen: false,

  onConfirm: undefined,
  open: ({ onConfirm }) => set({ isOpen: true, onConfirm }),
  close: () => set({ isOpen: false, onConfirm: undefined }),
}));
