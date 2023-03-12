import { showSuccessAlert, showWarningAlert } from "@states/alertsState/alertsModifiers";
import { syncLifeblocsContract } from "@states/lifeblocsContractState/lifeblocsContractModifiers";
import { walletState } from "@states/walletState/walletState";

export const onBrowserAccountsChanged = () => {
  const listener = (accounts: string[]) => {
    walletState.accounts.set(accounts);
  };
  window.ethereum.on("accountsChanged", listener);

  return () => window.ethereum.removeListener("accountsChanged", listener);
};

export const onWalletAccountsChanged = () => {
  return walletState.accounts.onChange((accounts) => {
    console.log("---------", "accountsChanged", accounts);
    if (Boolean(accounts.length)) {
      syncLifeblocsContract(accounts[0]);
      showSuccessAlert({ message: "Wallet successfully connected !" });
    } else {
      showWarningAlert({ message: "Wallet disconnected !" });
    }
  });
};
