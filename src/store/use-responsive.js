import { create } from "zustand";

const useResponsive = create((set) => ({
  isMobile: false,
  setResponsive: (isMobile) => set(() => ({ isMobile })),
}));

export default useResponsive;
