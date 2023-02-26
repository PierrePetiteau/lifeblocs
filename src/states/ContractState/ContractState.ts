import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { Nft } from "alchemy-sdk";
import { alchemy } from "providers/alchemy";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS!;

export type ContractNft = Nft & { id: string };
export type ContractState = {
  address: string;
  nfts: ContractNft[];
};

export const contractState = observable<ContractState>({
  address: CONTRACT_ADDRESS,
  nfts: [],
});

persistObservable(contractState, { local: "contractState", persistLocal: ObservablePersistLocalStorage });

// modifiers
const syncContractNfts = async () => {
  try {
    const response = await alchemy.nft.getNftsForContract(contractState.address.peek());
    contractState.nfts.set(response.nfts.map((v) => ({ ...v, id: v.tokenId })));
  } catch (error) {
    contractState.nfts.set([]);
    console.log("---------", "error", error);
  }
};

// listeners
contractState.address.onChange(() => {
  syncContractNfts();
});

// debug
export const testAlchemy = () => {
  //   alchemy.nft.getNftsForOwner(OWNER_ADDRESS).then(console.log);
  //   console.log("---------", "OWNER_ADDRESS", OWNER_ADDRESS);
  const HAVAH_CONTRACT = "0x317a8Fe0f1C7102e7674aB231441E485c64c178A";
  contractState.address.set((prev) => (prev === CONTRACT_ADDRESS ? HAVAH_CONTRACT : CONTRACT_ADDRESS));
};
