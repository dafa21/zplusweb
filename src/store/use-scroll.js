import { create } from "zustand";

const useScroll = create((set) => ({
  scrollValue: 0,
  isTopScroll: true,
  setScrollValue: (scrollValue) => set(() => ({ scrollValue })),
  setTopScroll: (isTopScroll) => set(() => ({ isTopScroll })),
}));

export default useScroll;
