import { onAlertsChanged } from "@states/alertsState/alertsListeners";
import { device } from "@states/device";
import { wallet } from "@states/walletState";
import { useEffect } from "react";

export const useListeners = () => {
  useEffect(() => {
    const listeners = [
      device.listeners.onWindowResize(),
      wallet.listeners.onBrowserAccountsChanged(),
      wallet.listeners.onWalletAccountsChanged(),
      onAlertsChanged(),
    ];

    const removeListeners = () => {
      listeners.map((dispose) => dispose?.());
    };

    return removeListeners;
  }, []);
};
