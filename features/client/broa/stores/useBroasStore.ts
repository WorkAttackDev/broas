import { Broa } from ".prisma/client";
import create from "zustand";
import { MyBroaReactions } from "../../../shared/models/my_broa_reactions";

type BroaStoreType = {
  broas: Broa[] | MyBroaReactions[];
  setBroas: (broas: Broa[] | MyBroaReactions[]) => void;
  addBroa: (broa: Broa | MyBroaReactions) => void;
};

export const useBroasStore = create<BroaStoreType>((set) => ({
  broas: [],
  setBroas: (broas) => set((state) => ({ broas })),
  addBroa: (broa) => set((state) => ({ broas: [...state.broas, broa] })),
}));
