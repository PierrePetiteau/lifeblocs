import { showErrorAlert } from "@states/alertsState/alertsModifiers";
import { Contract } from "alchemy-sdk";
import { alchemyProvider } from "providers/alchemy";
import { walletState } from "./walletState";

const getSigner = () => {
  const [account] = walletState.accounts.peek();

  if (!account) {
    throw Error(showErrorAlert({ message: "Wallet is not connected" }));
  }

  const signer = alchemyProvider.getSigner(account);
  return signer;
};

type BuildUnsignedTxParams = { contract: Contract; method: string; params?: any[] };
const buildUnsignedTx = async ({ contract, method, params }: BuildUnsignedTxParams) => {
  if (params) {
    return await contract.populateTransaction[method](...params);
  }
  return await contract.populateTransaction[method]();
};

type SendTransactionParams = BuildUnsignedTxParams;
const sendTransaction = async ({ contract, method, params }: SendTransactionParams) => {
  const unsignedTx = await buildUnsignedTx({ contract, method, params });
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [unsignedTx],
  });
  return txHash;
};

export const walletHelpers = {
  getSigner,
  sendTransaction,
};
