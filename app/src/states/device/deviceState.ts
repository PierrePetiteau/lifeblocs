import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export const deviceState = observable({
  windows: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
});

persistObservable(deviceState, { local: "deviceState", persistLocal: ObservablePersistLocalStorage });
