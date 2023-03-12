import { modalsState } from "./modalsState";

export const onAlertsChanged = () => {
  return modalsState.queu.onChange((queu) => {
    if (queu.length && queu[0] === null) {
      setTimeout(() => {
        modalsState.queu.shift();
      }, 0);
    }
  });
};
