import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export type Button = {
  id: string;
  title: string;
  onPress: Function;
};

export type ModalType = {
  id: string;
  title: string;
  description: string;
  buttons: Button[];
};

type ModalsType = { queu: (ModalType | null)[] };

const initialModals: ModalsType = { queu: [] };
export const modalsState = observable(initialModals);

persistObservable(modalsState, { local: "modalsState", persistLocal: ObservablePersistLocalStorage });
