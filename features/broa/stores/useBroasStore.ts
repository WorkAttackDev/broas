import { Broa } from ".prisma/client";
import create from "zustand";

type BroaStoreType = {
  broas: Broas[];
  setBroas: (broas: Broas[]) => void;
  addBroa: (broa: Broas) => void;
};

export const useBroasStore = create<BroaStoreType>((set) => ({
  broas: [],
  setBroas: (broas) => set((state) => ({ broas })),
  addBroa: (broa) => set((state) => ({ broas: state.broas.concat(broa) })),
}));
