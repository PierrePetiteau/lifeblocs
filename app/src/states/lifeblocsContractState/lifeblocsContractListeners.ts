import { lifeblocsContractState } from "./lifeblocsContractState";

export const onLifeblocsContractChanged = () => {
  return lifeblocsContractState.contract.onChange((contract) => {
    console.log("---------", "lifeblocsContractState", contract);
  });
};
