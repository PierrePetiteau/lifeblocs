import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export type MintFormInputKey = "message" | "emoji" | "submit";
export type MintInput = { id: MintFormInputKey; value?: string };

type MintForm<Keys> = {
  items: MintInput[];
  currentItemId: Keys;
};

export const getInitialForm: () => MintForm<MintFormInputKey> = () => ({
  items: [{ id: "message", value: "" }, { id: "emoji", value: "" }, { id: "submit" }],
  currentItemId: "message",
});

export const mintFormState = observable(getInitialForm());

persistObservable(mintFormState, { local: "mintFormState", persistLocal: ObservablePersistLocalStorage });
