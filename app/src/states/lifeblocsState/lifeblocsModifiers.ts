import { Utils } from "alchemy-sdk";
import { CONSTANTS } from "@constants/constants";
import { lifeblocsState } from "@states/lifeblocsState/lifeblocsState";
import { BlocResponseItem, lifeblocsHelpers } from "@states/lifeblocsState/lifeblocsHelpers";
import { showErrorAlert } from "@states/alertsState/alertsModifiers";
import { wallet } from "@states/walletState";

const syncContract = async (ownerAddress: string) => {
  try {
    const lifeblocsFactory = lifeblocsHelpers.buildFactoryContract();
    const lifeblocsContractAddress = await lifeblocsFactory.getContractBy(ownerAddress);
    if (Utils.isHexString(lifeblocsContractAddress, 20) && lifeblocsContractAddress !== CONSTANTS.addressZero) {
      lifeblocsState.contract.set({ address: lifeblocsContractAddress, status: "available" });
    } else {
      lifeblocsState.contract.set({ status: "not_found" });
    }
  } catch (error) {
    lifeblocsState.contract.set({ address: undefined, status: undefined });
    console.log("---------", "error", error);
  }
};

const buildMeAContract = async () => {
  if (lifeblocsState.contract?.status?.peek() === "available") {
    showErrorAlert({ message: "Contract already exist" });
    return;
  }

  if (lifeblocsState.contract?.status?.peek() !== "not_found") {
    showErrorAlert({ message: "Contract status is unknow" });
    return;
  }

  try {
    const contract = lifeblocsHelpers.buildFactoryContract({ signer: wallet.helpers.getSigner() });
    const method = "buildMeAContract";
    const txHash = await wallet.helpers.sendTransaction({ contract, method });
    // const txHash = "0x2984c9c95581bf8c2fb289f7874daba86f9eb088f8bf2e8f2c6dcfe677041a2e";
    // const lifeblocsContractAddress = "0xD88199d8D562724019fC01841e57ef28B890927D";
    // lifeblocsState.contract.set({ address: lifeblocsContractAddress, status: "available" });
  } catch (error) {
    console.log("---------", "error", error);
  }
};

const mintMySuccess = async (payload: { emoji: string; message: string }) => {
  const { status, address } = lifeblocsState.contract.peek();
  if (!address || status !== "available") {
    showErrorAlert({ message: "Contract is not available" });
    return;
  }

  try {
    const contract = lifeblocsHelpers.buildContract({ signer: wallet.helpers.getSigner() });
    const method = "safeMint";
    const params = [wallet.state.accounts[0].peek(), payload.emoji, payload.message, ""];

    const txHash = await wallet.helpers.sendTransaction({ contract, method, params });

    console.log("---------", "txHash", txHash);
  } catch (error) {
    console.log("---------", "error", error);
  }
};

const syncContractNfts = async () => {
  const contract = lifeblocsHelpers.buildContract({ signer: wallet.helpers.getSigner() });
  const blocs: BlocResponseItem[] = await contract.getMyBlocs();
  
  lifeblocsState.blocs.set(lifeblocsHelpers.parseBlocs(blocs));

  // const contract = lifeblocsHelpers.buildContract();
  // const blocs = await contract.getBlocsFrom(wallet.state.accounts[0].peek());
  // lifeblocsState.blocs.set(blocs);

  // const response = await alchemy.nft.getNftsForContract(lifeblocsState.address.peek());
  //     lifeblocsState.nfts.set(response.nfts.map((v) => ({ ...v, id: v.tokenId })));
  //   } catch (error) {
  //     lifeblocsState.nfts.set([]);
  //     console.log("---------", "error", error);
  //   }
};

export const lifeblocsModifiers = {
  syncContract,
  syncContractNfts,
  buildMeAContract,
  mintMySuccess,
};
