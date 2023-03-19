import { showSuccessAlert, showWarningAlert } from "@states/alertsState/alertsModifiers";
import { lifeblocs } from "@states/lifeblocsState";
import { walletState } from "@states/walletState/walletState";

const onBrowserAccountsChanged = () => {
  const listener = (accounts: string[]) => {
    walletState.accounts.set(accounts);
  };
  window.ethereum.on("accountsChanged", listener);

  return () => window.ethereum.removeListener("accountsChanged", listener);
};

const onWalletAccountsChanged = () => {
  return walletState.accounts.onChange((accounts) => {
    console.log("---------", "accountsChanged", accounts);
    if (Boolean(accounts.length)) {
      lifeblocs.modifiers.syncUserBlocs();
      showSuccessAlert({ message: "Wallet successfully connected !" });
    } else {
      showWarningAlert({ message: "Wallet disconnected !" });
    }
  });
};

export const walletListeners = {
  onBrowserAccountsChanged,
  onWalletAccountsChanged,
};
