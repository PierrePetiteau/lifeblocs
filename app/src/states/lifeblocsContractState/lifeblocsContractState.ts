import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { Nft } from "alchemy-sdk";

export const CONTRACT_FACTORY_ADDRESS = process.env.REACT_APP_LIFEBLOCS_CONTRACT_FACTORY_ADDRESS!;

export type ContractNft = Nft & { id: string };
export type ContractState = {
  contract: { address?: string; status?: "not_found" | "available" };
  nfts: ContractNft[];
};

export const lifeblocsContractState = observable<ContractState>({
  contract: { address: undefined, status: undefined },
  nfts: [],
});

persistObservable(lifeblocsContractState, {
  local: "lifeblocsContractState",
  persistLocal: ObservablePersistLocalStorage,
});
