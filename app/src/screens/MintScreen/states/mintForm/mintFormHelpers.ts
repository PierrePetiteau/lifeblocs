import { MintFormInputKey, mintFormState } from "./mintFormState";

const getInputIndex = (id: MintFormInputKey) => mintFormState.items.findIndex((v) => v.id === id);
const getInput = (id: MintFormInputKey) => mintFormState.items[getInputIndex(id)];
const getCurrentInputIndex = () => getInputIndex(mintFormState.currentItemId.get());
const getCurrentInput = () => getInput(mintFormState.currentItemId.get());

const isFirstInput = () => getCurrentInputIndex() === 0;
const isLastInput = () => getCurrentInputIndex() === mintFormState.items.length - 1;
const canSubmitForm = () => {
  if (!Boolean(getInput("message").value?.peek())) {
    return false;
  }
  if (!Boolean(getInput("emoji").value?.peek())) {
    return false;
  }
  return true;
};

export const mintFormHelpers = {
  getCurrentInputIndex,
  getCurrentInput,
  getInput,
  isFirstInput,
  isLastInput,
  canSubmitForm,
};
