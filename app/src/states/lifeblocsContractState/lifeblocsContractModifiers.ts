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
  if (lifeblocsContractState.contract?.status?.peek() === "available") {
    showErrorAlert({ message: "Contract already exist" });
    return;
  }

  if (lifeblocsContractState.contract?.status?.peek() !== "not_found") {
    showErrorAlert({ message: "Contract status is unknow" });
    return;
  }

  try {
    // const lifeblocsFactory = new Contract(
    //   CONSTANTS.lifeblocsFactoryAddress,
    //   CONSTANTS.lifeblocsFactoryAbi,
    //   alchemyProvider
    // );
    // const res = await lifeblocsFactory.getContractBy(walletState.accounts[0].peek());
    // console.log("---------", "res", res);
    // const myContractAddress = "0xD88199d8D562724019fC01841e57ef28B890927D";


    // const signer = alchemyProvider.getSigner(walletState.accounts[0].peek());
    // const lifeblocsFactory = new Contract(CONSTANTS.lifeblocsFactoryAddress, CONSTANTS.lifeblocsFactoryAbi, signer);
    // const action = "buildMeAContract";
    // const unsignedTx = await lifeblocsFactory.populateTransaction[action]();

    // const txHash = await window.ethereum.request({
    //   method: "eth_sendTransaction",
    //   params: [unsignedTx],
    // });

    // const txHash = "0x2984c9c95581bf8c2fb289f7874daba86f9eb088f8bf2e8f2c6dcfe677041a2e";
    // console.log('---------', 'response', response);

    // const lifeblocsContractAddress = await lifeblocsFactory.buildMeAContract();
    // lifeblocsContractState.contract.set({ address: lifeblocsContractAddress, status: "available" });
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
