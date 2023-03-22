import LifeblocsContractJSON from "@contracts/LifeblocsContract.json";

export const CONSTANTS = {
  addressZero: "0x0000000000000000000000000000000000000000",
  lifeblocsContractAddress: process.env.REACT_APP_CONTRACT_ADDRESS_POLYGON_MUMBAI!,
  lifeblocsContractAbi: LifeblocsContractJSON.abi,
};
