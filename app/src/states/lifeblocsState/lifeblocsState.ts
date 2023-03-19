import { CONSTANTS } from "@constants/constants";
import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { Contract } from "alchemy-sdk";
import { alchemyProvider } from "providers/alchemy";

export type Bloc = {
  id: number;
  tokenId: number;
  emoji: string;
  label: string;
  createdAt: number;
};

export type LifeblocsState = {
  blocs: Bloc[];
};

export const lifeblocsState = observable<LifeblocsState>({ blocs: [] });
export const lifeblocsContract = new Contract(
  CONSTANTS.lifeblocsContractAddress,
  CONSTANTS.lifeblocsContractAbi,
  alchemyProvider
);

persistObservable(lifeblocsState, {
  local: "lifeblocsState",
  persistLocal: ObservablePersistLocalStorage,
});
