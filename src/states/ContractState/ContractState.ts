import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export const ContractState = observable({
  address: "0x27b379e36d4045B1B53Dbd400BDdd90c5b76Ca3c",
});

persistObservable(ContractState, { local: "ContractState", persistLocal: ObservablePersistLocalStorage });
