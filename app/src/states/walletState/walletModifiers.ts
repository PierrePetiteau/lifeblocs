import { showErrorAlert, showWarningAlert } from "@states/alertsState/alertsModifiers";
import { walletState } from "./walletState";

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export const tryConnectWallet = async () => {
  if (window.ethereum === undefined) {
    showWarningAlert({ message: "Ethereum wallet not detected." });
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    walletState.accounts.set(accounts);
  } catch (error) {
    switch ((error as ProviderRpcError).code) {
      case 4001: {
        showWarningAlert({ message: "Wallet connection rejected !" });
        break;
      }
      default: {
        showErrorAlert({ message: "Unknow error !" });
        break;
      }
    }
    walletState.accounts.set([]);
  }
};
