import { useListeners } from "hooks/useListeners";
import { device } from "@states/device";
import { wallet } from "@states/walletState";
import { onAlertsChanged } from "@states/alertsState/alertsListeners";

const listeners = [
  device.listeners.onWindowResize,
  wallet.listeners.onBrowserAccountsChanged,
  wallet.listeners.onWalletAccountsChanged,
  onAlertsChanged,
];

export const useAppListeners = () => {
  useListeners(listeners);
};
