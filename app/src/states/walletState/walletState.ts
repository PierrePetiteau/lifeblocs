import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export type WalletState = {
  accounts: string[];
};

export const walletState = observable<WalletState>({
  accounts: [],
});

persistObservable(walletState, { local: "walletState", persistLocal: ObservablePersistLocalStorage });
