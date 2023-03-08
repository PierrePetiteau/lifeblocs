import { syncContractNfts } from "./lifeblocsContractModifiers";
import { lifeblocsContractState } from "./lifeblocsContractState";

export const onLifeblocsContractChanged = () => {
  return lifeblocsContractState.contract.address?.onChange(() => {
    syncContractNfts();
  });
};
