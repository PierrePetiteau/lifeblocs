/* eslint-disable @typescript-eslint/no-unused-vars */
import { Network, Alchemy, AlchemySettings, Contract } from "alchemy-sdk";

const settings: AlchemySettings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
  maxRetries: 1,
};

const alchemy = new Alchemy(settings);
const alchemyProvider = await alchemy.config.getProvider();

const requestUserToSignTransactionWithMetamask = async () => {
  // create a signer with user address
  const signer = alchemyProvider.getSigner("walletAddress");

  // instanciate the contract
  const lifeblocsFactory = new Contract("contractAddress", "contractABI", signer);

  // create an unsigned transaction using "populateTransaction"
  const action = "buildMeAContract";
  const unsignedTx = await lifeblocsFactory.populateTransaction[action]();

  // send transaction to user metamask
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [unsignedTx],
  });

  // if user sign the transaction then
  // show a toast with a CTA to etherscan to follow the transaction
  console.log("---------", "txHash", txHash);


  // @PROBLEM
  // How to follow the status of the transaction
  // -> Create an event in the contract ?

};
