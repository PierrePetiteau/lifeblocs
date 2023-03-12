import LifeblocsFactoryJSON from "@contracts/LifeblocsFactory.json";
import LifeblocsJSON from "@contracts/Lifeblocs.json";

export const CONSTANTS = {
  addressZero: "0x0000000000000000000000000000000000000000",
  lifeblocsFactoryAddress: process.env.REACT_APP_LIFEBLOCS_CONTRACT_FACTORY_ADDRESS!,
  lifeblocsFactoryAbi: LifeblocsFactoryJSON.abi,
  lifeblocsAbi: LifeblocsJSON.abi,
};
