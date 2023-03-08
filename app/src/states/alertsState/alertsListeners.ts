import { alertsState } from "./alertsState";

export const onAlertsChanged = () => {
  return alertsState.queu.onChange((queu) => {
    if (queu.length && queu[0] === null) {
      setTimeout(() => {
        alertsState.queu.shift();
      }, 0);
    }
  });
};
