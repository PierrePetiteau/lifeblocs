import { lifeblocsState } from "@states/lifeblocsState/lifeblocsState";

const onLifeblocsContractChanged = () => {
  return lifeblocsState.contract.onChange((contract) => {
    console.log("---------", "lifeblocsContractState", contract);
  });
};

export const lifeBlocsListeners = {
  onLifeblocsContractChanged,
};
