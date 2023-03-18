import { walletHelpers } from "./walletHelpers";
import { walletListeners } from "./walletListeners";
import { walletModifiers } from "./walletModifiers";
import { walletState } from "./walletState";

export const wallet = {
  state: walletState,
  helpers: walletHelpers,
  modifiers: walletModifiers,
  listeners: walletListeners,
};
