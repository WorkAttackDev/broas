import { Broa } from ".prisma/client";
import create from "zustand";
import { MyBroaReactions } from "../../../shared/models/my_broa_reactions";
import { PaginationType } from "../../../shared/types";
import { isProduction } from "../../core/utils";

type BroaFilterType = {
  wrongVersion?: string;
};

type BroaStoreType = {
  broas: Broa[] | MyBroaReactions[];
  broasPagination: PaginationType;
  broaFilterBy: BroaFilterType;

  setBroas: (broas: Broa[] | MyBroaReactions[]) => void;
  setFilters: (filter: BroaFilterType) => void;
  addBroa: (broa: Broa | MyBroaReactions) => void;
};

export const PAGINATION_LIMIT = isProduction ? 20 : 2;

export const useBroasStore = create<BroaStoreType>((set) => ({
  broas: [],
  broasPagination: { page: 0, limit: PAGINATION_LIMIT, total: 0 },
  broaFilterBy: {},
  setBroas: (broas) => set((state) => ({ broas })),

  addBroa: (broa) => set((state) => ({ broas: [...state.broas, broa] })),

  setFilters: (filter) => set((state) => ({ broaFilterBy: filter })),
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
