import { useEffect } from "react";

type Dispose = () => void;
type Listener = () => Dispose;

export const useListeners = (listeners: Listener[]) => {
  useEffect(() => {
    const disposers = listeners.map((listener) => listener());

    const removeListeners = () => {
      disposers.map((dispose) => dispose?.());
    };

    return removeListeners;
  }, [listeners]);
};
