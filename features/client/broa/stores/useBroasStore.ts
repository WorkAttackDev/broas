import { Broa } from ".prisma/client";
import create from "zustand";
import { MyBroaReactions } from "../../../shared/models/my_broa_reactions";
import { PaginationType } from "../../../shared/types";

type BroaStoreType = {
  broas: Broa[] | MyBroaReactions[];
  broasPagination: PaginationType;

  setBroas: (broas: Broa[] | MyBroaReactions[]) => void;
  addBroa: (broa: Broa | MyBroaReactions) => void;
};

export const useBroasStore = create<BroaStoreType>((set) => ({
  broas: [],
  broasPagination: { page: 0, limit: 20, total: 0 },
  setBroas: (broas) => set((state) => ({ broas })),
  addBroa: (broa) => set((state) => ({ broas: [...state.broas, broa] })),
}));

export const globalSetBroaPaginated = (
  broas: Broa[] | MyBroaReactions[],
  pagination: PaginationType
) =>
  useBroasStore.setState((state) => ({
    ...state,
    broas,
    broasPagination: pagination,
  }));
