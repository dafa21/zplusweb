import { create } from "zustand";

const useNavigation = create((set) => ({
  menuActive: null,
  setMenuActive: (menu) => set(() => ({ menuActive: menu })),
}));

export default useNavigation;
