import { lifeblocs } from "@states/lifeblocsState";
import { mintFormHelpers } from "./mintFormHelpers";
import { getInitialForm, MintFormInputKey, mintFormState } from "./mintFormState";

const resetForm = () => mintFormState.set(getInitialForm());
const updateField = (id: MintFormInputKey, value: string) => {
  const index = mintFormState.items.findIndex((v) => v.id === id);
  mintFormState.items[index].value?.set(value);
};

const submitForm = async () => {
  if (!mintFormHelpers.canSubmitForm()) {
    return;
  }

  const payload = {
    emoji: mintFormHelpers.getInput("emoji").value?.peek()!,
    message: mintFormHelpers.getInput("message").value?.peek()!,
  };
  await lifeblocs.modifiers.mintBloc(payload);
};

const focusPreviousField = () => {
  if (mintFormHelpers.isFirstInput()) {
    return;
  }
  const index = mintFormHelpers.getCurrentInputIndex();
  const previousId = mintFormState.items[index - 1].id.peek();
  mintFormState.currentItemId.set(previousId);
};

const focusNextField = () => {
  if (mintFormHelpers.isLastInput()) {
    return;
  }
  const index = mintFormHelpers.getCurrentInputIndex();
  const nextId = mintFormState.items[index + 1].id.peek();
  mintFormState.currentItemId.set(nextId);
};

export const mintFormModifiers = {
  resetForm,
  updateField,
  submitForm,
  focusPreviousField,
  focusNextField,
};
