import {create} from "zustand/react";

interface TitleStore {
  menuTitle: string;
  setMenuTitle: (value: string) => void;
}

const useTitleStore = create<TitleStore>((set) => ({
  menuTitle: '',
  setMenuTitle: (value: string) => set({menuTitle: value}),
}));

export default useTitleStore;