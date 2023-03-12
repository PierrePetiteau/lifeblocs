import { Contract, Utils } from "alchemy-sdk";
import { alchemyProvider } from "providers/alchemy";
import { lifeblocsContractState } from "./lifeblocsContractState";
import { showErrorAlert } from "@states/alertsState/alertsModifiers";
import { CONSTANTS } from "@constants/constants";
import { walletState } from "@states/walletState/walletState";

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
    const lifeblocsFactory = new Contract(
      CONSTANTS.lifeblocsFactoryAddress,
      CONSTANTS.lifeblocsFactoryAbi,
      alchemyProvider
    );
    const lifeblocsContractAddress = await lifeblocsFactory.getContractBy(ownerAddress);
    if (Utils.isHexString(lifeblocsContractAddress, 20) && lifeblocsContractAddress !== CONSTANTS.addressZero) {
      lifeblocsContractState.contract.set({ address: lifeblocsContractAddress, status: "available" });
    } else {
      lifeblocsContractState.contract.set({ status: "not_found" });
    }
  } catch (error) {
    lifeblocsContractState.contract.set({ address: undefined, status: undefined });
    console.log("---------", "error", error);
  }
};

export const buildMeAContract = async () => {
  if (lifeblocsContractState.contract?.status?.peek() !== "not_found") {
    showErrorAlert({ message: "Contract status is unknow" });
    return;
  }

  try {
    const lifeblocsFactory = new Contract(
      CONSTANTS.lifeblocsFactoryAddress,
      CONSTANTS.lifeblocsFactoryAbi,
      alchemyProvider.getSigner(walletState.accounts[0].peek())
    );
    const lifeblocsContractAddress = await lifeblocsFactory.buildMeAContract();
    lifeblocsContractState.contract.set({ address: lifeblocsContractAddress, status: "available" });
  } catch (error) {
    console.log("---------", "error", error);
  }
};

export const mintMySuccess = async (payload: { emoji: string; message: string }) => {
  const { status, address } = lifeblocsContractState.contract.peek();
  if (!address || status !== "available") {
    showErrorAlert({ message: "Contract is not available" });
    return;
  }

  try {
    const lifeblocs = new Contract(address, CONSTANTS.lifeblocsAbi, alchemyProvider);
    await lifeblocs.safeMint(walletState.accounts[0].peek(), payload.emoji, payload.message, "");
  } catch (error) {
    console.log("---------", "error", error);
  }
};

// debug
export const testAlchemy = () => {
  //   alchemy.nft.getNftsForOwner(OWNER_ADDRESS).then(console.log);
  //   console.log("---------", "OWNER_ADDRESS", OWNER_ADDRESS);
};
