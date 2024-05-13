import { create } from "zustand";

interface BlurActions {
  blurState: boolean;
  setBlur: (value: boolean) => void;
}

export const useBlurActions = create<BlurActions>((set) => ({
  blurState: false,
  setBlur: (value) => set({ blurState: value }),
}));
