import { deviceState } from "./deviceState";

const onWindowResize = () => {
  const listener = () => {
    deviceState.windows.set({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  window.addEventListener("resize", listener);

  return () => window.removeEventListener("resize", listener);
};

export const deviceListeners = {
  onWindowResize,
};
