import {create} from "zustand/react";

interface CommonStore {
  isNextPublicMode: string;
  setIsNextPublicMode: (value: string) => void;
}

const useCommonStore = create<CommonStore>((set) => ({
  isNextPublicMode: 'none',
  setIsNextPublicMode: (value: string) => set({isNextPublicMode: value}),
}));

export default useCommonStore;