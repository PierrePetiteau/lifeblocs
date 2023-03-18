import { deviceHelpers } from "./deviceHelpers";
import { deviceListeners } from "./deviceListeners";
import { deviceState } from "./deviceState";

export const device = {
  state: deviceState,
  helpers: deviceHelpers,
  listeners: deviceListeners,
};
