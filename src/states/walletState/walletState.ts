import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { Nft } from "alchemy-sdk";
import { alchemy } from "providers/alchemy";
import { ExternalProvider } from "@ethersproject/providers";
import EventEmitter from "events";
import { showErrorAlert, showSuccessAlert, showWarningAlert } from "@states/alertsState/alertsState";

const OWNER_ADDRESS = process.env.REACT_APP_OWNER_ADDRESS!;

export type WalletNft = Nft & { id: string };
export type WalletState = {
  accounts: string[];
  nfts: WalletNft[];
};

export const walletState = observable<WalletState>({
  accounts: [],
  nfts: [],
});

persistObservable(walletState, { local: "walletState", persistLocal: ObservablePersistLocalStorage });

// modifiers
const syncWalletNfts = async () => {
  try {
    const walletAddress = walletState.accounts?.peek();
    const response = await alchemy.nft.getNftsForOwner(walletAddress[0]);
    walletState.nfts.set(response.ownedNfts.map((v) => ({ ...v, id: v.tokenId })));
  } catch (error) {
    walletState.nfts.set([]);
    console.log("---------", "error", error);
  }
};

// listeners
const { ethereum } = window as { ethereum?: ExternalProvider & EventEmitter };
ethereum?.on("accountsChanged", (accounts: Array<string>) => {
  walletState.accounts.set(accounts);
});

walletState.accounts.onChange((accounts) => {
  if (Boolean(accounts.length)) {
    syncWalletNfts();
  } else {
    walletState.nfts.set([]);
    showWarningAlert({ message: "Wallet disconnected !" });
  }
});

// helpers
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export const tryConnectWallet = async () => {
  try {
    const accounts = await ethereum?.request?.({ method: "eth_requestAccounts" });
    walletState.accounts.set(accounts);
    showSuccessAlert({ message: "Wallet successfully connected !" });
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
