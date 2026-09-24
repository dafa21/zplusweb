import { create } from "zustand";

const useBreadcrumb = create((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs) => set(() => ({ breadcrumbs })),
}));

export default useBreadcrumb;
