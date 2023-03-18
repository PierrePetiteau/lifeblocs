import { onAlertsChanged } from "@states/alertsState/alertsListeners";
import { device } from "@states/device";
import { lifeblocs } from "@states/lifeblocsState";
import { wallet } from "@states/walletState";
import { useEffect } from "react";

export const useListeners = () => {
  useEffect(() => {
    const listeners = [
      device.listeners.onWindowResize(),
      wallet.listeners.onBrowserAccountsChanged(),
      wallet.listeners.onWalletAccountsChanged(),
      lifeblocs.listeners.onLifeblocsContractChanged(),
      onAlertsChanged(),
    ];

    const removeListeners = () => {
      listeners.map((dispose) => dispose?.());
    };

    return removeListeners;
  }, []);
};
