import { wallet } from "@states/walletState";
import { StepStatus, SubmitStepKey, submitStepsState } from "./submitStepsState";

export type StepStatusEmoji = "⏳" | "✅" | null;
export type StepStatusEmojiMap = { [K in StepStatus]: StepStatusEmoji };
export type StepKeyButtonLabel = "Connect" | "Sign" | "Navigate to blocs";

const statusEmojiMap: StepStatusEmojiMap = {
  initial: null,
  pending: "⏳",
  completed: "✅",
};

const getWalletStatus: () => StepStatus = () => {
  return wallet.state.accounts.length > 0 ? "completed" : "initial";
};

const getEmojiFrom = (stepKey: SubmitStepKey) => {
  const status = submitStepsState[stepKey].status.get();
  return statusEmojiMap[status];
};

const isCompleted = (stepKey: SubmitStepKey) => {
  return submitStepsState[stepKey].status.get() === "completed";
};

const getCurrentStep: () => SubmitStepKey | null = () => {
  if (!isCompleted("connect_wallet")) {
    return "connect_wallet";
  }
  if (!isCompleted("sign_transaction")) {
    return "sign_transaction";
  }
  if (!isCompleted("nft_received")) {
    return "nft_received";
  }
  return null;
};

const isCurrentStep = (stepKey: SubmitStepKey) => {
  return stepKey === getCurrentStep();
};

const getSubmitButtonLabel = () => {
  const currentStep = getCurrentStep();

  switch (currentStep) {
    case "connect_wallet": {
      return "Connect";
    }
    case "sign_transaction":
    case "nft_received": {
      return "Sign";
    }
    case null: {
      return "Mint again";
    }
  }
};

export const submitStepsHelpers = {
  getWalletStatus,
  getEmojiFrom,
  isCompleted,
  getCurrentStep,
  isCurrentStep,
  getSubmitButtonLabel,
};
