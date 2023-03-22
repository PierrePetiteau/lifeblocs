import { Listener } from "@ethersproject/abstract-provider";
import { wallet } from "@states/walletState";
import { CONSTANTS } from "@constants/constants";
import { showSuccessAlert } from "@states/alertsState/alertsModifiers";
import { lifeblocsContract } from "@states/lifeblocsState/lifeblocsState";
import { submitStepsState } from "./submitStepsState";
import { submitStepsHelpers } from "./submitStepsHelpers";
import { lifeblocs } from "@states/lifeblocsState";
import { isAddressEqual } from "@helpers/isAddressEqual";

const onWalletAccountChange = () => {
  return wallet.state.accounts.onChange(() => {
    const walletStatus = submitStepsHelpers.getWalletStatus();
    submitStepsState.connect_wallet.status.set(walletStatus);
  });
};

const onNftReceived = () => {
  const listener: Listener = (from, to, amount, event) => {
    // console.log(`Transfer event: from=${from}, to=${to}, amount=${amount.toString()}`);

    const isSenderZeroAddress = from === CONSTANTS.addressZero;
    const isUserReceiver = isAddressEqual(wallet.state.accounts[0].get(), to);

    if (isSenderZeroAddress && isUserReceiver) {
      submitStepsState.nft_received.status.set("completed");
      lifeblocs.modifiers.syncUserBlocs();
      showSuccessAlert({ id: "mint_succeed", message: "NFT minted successfully" });
    }
  };

  lifeblocsContract.on("Transfer", listener);

  return () => lifeblocsContract.removeListener("Transfer", listener);
};

export const submitStepsListeners = {
  onWalletAccountChange,
  onNftReceived,
};
