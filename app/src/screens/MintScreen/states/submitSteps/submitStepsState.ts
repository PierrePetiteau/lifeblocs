import { observable } from "@legendapp/state";
import { wallet } from "@states/walletState";

export type StepStatus = "initial" | "pending" | "completed";
export type SubmitStepKey = "connect_wallet" | "sign_transaction" | "nft_received";
export type Step = { key: SubmitStepKey; label: string; status: StepStatus };
export type Steps = { [K in SubmitStepKey]: Step };

const getWalletStatus = () => {
  return wallet.state.accounts.length > 0 ? "completed" : "initial";
};

export const getInitialSteps: () => Steps = () => ({
  connect_wallet: {
    key: "connect_wallet",
    label: "Connect your wallet",
    status: getWalletStatus(),
  },
  sign_transaction: {
    key: "sign_transaction",
    label: "Sign the transaction",
    status: "initial",
  },
  nft_received: {
    key: "nft_received",
    label: "Receive your NFT",
    status: "initial",
  },
});

export const submitStepsState = observable(getInitialSteps());
