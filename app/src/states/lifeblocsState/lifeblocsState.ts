import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export const CONTRACT_FACTORY_ADDRESS = process.env.REACT_APP_LIFEBLOCS_CONTRACT_FACTORY_ADDRESS!;

export type Bloc =
  | {
      id: number;
      tokenId: number;
      emoji: string;
      label: string;
      description: string;
      createdAt: number;
      isPlaceholder: false;
    }
  | { id: number; isPlaceholder: true };
export type LifeblocsState = {
  contract: { address?: string; status?: "not_found" | "available" };
  blocs: Bloc[];
};

export const lifeblocsState = observable<LifeblocsState>({
  contract: { address: undefined, status: undefined },
  blocs: [],
});

persistObservable(lifeblocsState, {
  local: "lifeblocsState",
  persistLocal: ObservablePersistLocalStorage,
});
