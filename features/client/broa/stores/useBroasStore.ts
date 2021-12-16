import { Broa } from ".prisma/client";
import create from "zustand";

type BroaStoreType = {
  broas: Broa[];
  setBroas: (broas: Broa[]) => void;
  addBroa: (broa: Broa) => void;
};

export const useBroasStore = create<BroaStoreType>((set) => ({
  broas: [],
  setBroas: (broas) => set((state) => ({ broas })),
  addBroa: (broa) => set((state) => ({ broas: state.broas.concat(broa) })),
}));
