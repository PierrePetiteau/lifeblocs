import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { showSuccessAlert } from "@states/alertsState/alertsModifiers";
import { lifeblocs } from "@states/lifeblocsState";
import { wallet } from "@states/walletState";

export type MintFormInputKey = "message" | "emoji" | "submit";
export type MintInput = { id: MintFormInputKey; value?: string };

type MintForm<Keys> = {
  items: MintInput[];
  currentItemId: Keys;
};

const createForm = (inputs: MintForm<MintFormInputKey>) => inputs;

const initialForm = createForm({
  items: [{ id: "message", value: "" }, { id: "emoji", value: "" }, { id: "submit" }],
  currentItemId: "message",
});

export const mintFormState = observable(initialForm);

persistObservable(mintFormState, { local: "mintFormState", persistLocal: ObservablePersistLocalStorage });

export const resetForm = () => mintFormState.set(initialForm);
export const getInputIndex = () => mintFormState.items.findIndex((v) => v.id === mintFormState.currentItemId.peek());
export const isFirstInput = () => getInputIndex() === 0;
export const isLastInput = () => getInputIndex() === mintFormState.items.length - 1;
export const updateField = (id: MintFormInputKey, value: string) => {
  const index = mintFormState.items.findIndex((v) => v.id === id);
  mintFormState.items[index].value?.set(value);
};
export const getField = (id: MintFormInputKey) => {
  return mintFormState.items.find((v) => v.id === id);
};

export const submitForm = async () => {
  const payload = {
    emoji: getField("emoji")?.value ?? "",
    message: getField("message")?.value ?? "",
  };

  // await lifeblocs.modifiers.syncContract(wallet.state.accounts[0].peek());
  // if (lifeblocs.state.contract?.status?.peek() === "not_found") {
  //   await lifeblocs.modifiers.buildMeAContract();
  // }
  // console.log("---------", "mintMySuccess");

  // await lifeblocs.modifiers.mintMySuccess(payload);
  // console.log("---------", "mintMySuccess done");

  await lifeblocs.modifiers.syncUserBlocs();

  showSuccessAlert({ id: "mint_succed", message: "NFT minted successfully" });
};

export const handlePressPrevious = () => {
  const current = mintFormState.currentItemId.peek();
  const index = mintFormState.items.findIndex((v) => v.id === current);
  const isFirst = index === 0;

  if (isFirst) {
    return;
  }
  const previousId = mintFormState.items[index - 1].id.peek();
  mintFormState.currentItemId.set(previousId);
};

export const handlePressNext = () => {
  const current = mintFormState.currentItemId.peek();
  const index = mintFormState.items.findIndex((v) => v.id === current);
  const isFinal = mintFormState.items.length - 1 === index;

  if (isFinal) {
    submitForm();
  } else {
    const nextId = mintFormState.items[index + 1].id.peek();
    mintFormState.currentItemId.set(nextId);
  }
};
