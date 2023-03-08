import { onAlertsChanged } from "@states/alertsState/alertsListeners";
import { onLifeblocsContractChanged } from "@states/lifeblocsContractState/lifeblocsContractListeners";
import { onBrowserAccountsChanged, onWalletAccountsChanged } from "@states/walletState/walletListeners";
import { useEffect } from "react";

export const useListeners = () => {
  useEffect(() => {
    const listeners = [
      onBrowserAccountsChanged(),
      onWalletAccountsChanged(),
      onLifeblocsContractChanged(),
      onAlertsChanged(),
    ];

    const removeListeners = () => {
      listeners.map((dispose) => dispose?.());
    };

    return removeListeners;
  }, []);
};
