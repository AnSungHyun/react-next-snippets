import {create} from "zustand/react";

interface TitleStore {
  menuTitle: string;
  setMenuTitle: (value: string | undefined) => void;
}

const useTitleStore = create<TitleStore>((set) => ({
  menuTitle: '',
  setMenuTitle: (value: string | undefined) => set({menuTitle: value}),
}));

export default useTitleStore;