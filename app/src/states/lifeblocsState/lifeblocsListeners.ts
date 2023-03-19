import { CONSTANTS } from "@constants/constants";
import { Listener } from "@ethersproject/abstract-provider";
import { showSuccessAlert } from "@states/alertsState/alertsModifiers";
import { wallet } from "@states/walletState";
import { lifeblocsContract } from "./lifeblocsState";

const onTransfer = () => {
  const listener: Listener = (from, to, amount, event) => {
    console.log(`Transfer event: from=${from}, to=${to}, amount=${amount.toString()}`);
    if (from === CONSTANTS.addressZero && to === wallet.state.accounts[0].peek()) {
      showSuccessAlert({ id: "mint_succeed", message: "NFT minted successfully" });
    }
  };

  lifeblocsContract.on("Transfer", listener);

  return () => lifeblocsContract.removeListener("Transfer", listener);
};

export const lifeBlocsListeners = {
  onTransfer,
};
