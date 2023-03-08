import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export const appState = observable({
  settings: {
    showSidebar: false,
    theme: "light",
  },
  user: {
    profile: {
      name: "",
      avatar: "",
    },
    messages: {},
  },
});

persistObservable(appState, { local: "appState", persistLocal: ObservablePersistLocalStorage });
