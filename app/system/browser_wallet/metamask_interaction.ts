/* eslint-disable @typescript-eslint/no-unused-vars */

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

const tryConnectWallet = async () => {
  if (window.ethereum === undefined) {
    // showWarningAlert({ message: "Ethereum wallet not detected." });
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    // accounts = ["0x65a15E673Cf8c1C264D2f4E3A6295E3050878744"]
  } catch (error) {
    switch ((error as ProviderRpcError).code) {
      case 4001: {
        // showWarningAlert({ message: "Wallet connection rejected !" });
        break;
      }
      default: {
        // showErrorAlert({ message: "Unknow error !" });
        break;
      }
    }
  }
};

const onBrowserAccountsChanged = () => {
  const listener = (accounts: string[]) => {
    console.log(accounts);
  };
  window.ethereum.on("accountsChanged", listener);

  return () => window.ethereum.removeListener("accountsChanged", listener);
};

const sendTransactionToMetamask = async () => {
  // send transaction to user metamask
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [],
  });
};

export {};
