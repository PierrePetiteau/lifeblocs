import { Contract } from "alchemy-sdk";
import { alchemyProvider } from "providers/alchemy";
import { CONTRACT_FACTORY_ADDRESS, lifeblocsContractState } from "./lifeblocsContractState";
import CONTRACT_FACTORY from "@contracts/LifeblocsFactory.json";

export const syncContractNfts = async () => {
  //   try {
  //     const response = await alchemy.nft.getNftsForContract(lifeblocsContractState.address.peek());
  //     lifeblocsContractState.nfts.set(response.nfts.map((v) => ({ ...v, id: v.tokenId })));
  //   } catch (error) {
  //     lifeblocsContractState.nfts.set([]);
  //     console.log("---------", "error", error);
  //   }
};

export const syncLifeblocsContract = async (ownerAddress: string) => {
  try {
    const lifeblocsFactory = new Contract(CONTRACT_FACTORY_ADDRESS, CONTRACT_FACTORY.abi, alchemyProvider);
    const lifeblocsContractAddress = await lifeblocsFactory.getContractBy(ownerAddress);
    console.log('---------', 'lifeblocsContractAddress', lifeblocsContractAddress);
  } catch (error) {
    lifeblocsContractState.contract.set({ address: undefined, status: undefined });
    console.log("---------", "error", error);
  }
};

// debug
export const testAlchemy = () => {
  //   alchemy.nft.getNftsForOwner(OWNER_ADDRESS).then(console.log);
  //   console.log("---------", "OWNER_ADDRESS", OWNER_ADDRESS);
};
