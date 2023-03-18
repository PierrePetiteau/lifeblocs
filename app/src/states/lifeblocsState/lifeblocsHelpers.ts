import { AlchemyProvider, Contract } from "alchemy-sdk";
import { alchemyProvider } from "providers/alchemy";
import { showErrorAlert } from "@states/alertsState/alertsModifiers";
import { CONSTANTS } from "@constants/constants";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts/json-rpc-provider";
import { Bloc, lifeblocsState } from "@states/lifeblocsState/lifeblocsState";

type BuildContractParams = {
  signer?: JsonRpcSigner | AlchemyProvider;
};

const buildFactoryContract = (params?: BuildContractParams) => {
  const contract = new Contract(
    CONSTANTS.lifeblocsFactoryAddress,
    CONSTANTS.lifeblocsFactoryAbi,
    params?.signer ?? alchemyProvider
  );
  return contract;
};

const buildContract = (params?: BuildContractParams) => {
  const { status, address } = lifeblocsState.contract.peek();

  if (!address || status !== "available") {
    throw Error(showErrorAlert({ message: "Contract is not available" }));
  }

  const contract = new Contract(address, CONSTANTS.lifeblocsAbi, params?.signer ?? alchemyProvider);
  return contract;
};

type BigIntWithToNumber = BigInt & { toNumber(): number };
export type BlocResponseItem = [BigIntWithToNumber, string, string, string, BigIntWithToNumber];

const parseBlocs: (blocs: BlocResponseItem[]) => Bloc[] = (blocs) => {
  const items = blocs.filter((v) => v[v.length - 1]);
  const parsedItems: Bloc[] = items.map((v, index) => ({
    id: index,
    tokenId: v[0].toNumber(),
    emoji: v[1],
    label: v[2],
    description: v[3],
    createdAt: v[4].toNumber() * 1000,
    isPlaceholder: false,
  }));

  const placeholderItems: Bloc[] = Array.from({ length: 30 }, (_, index) => ({
    id: index + items.length,
    isPlaceholder: true,
  }));

  return [...parsedItems, ...placeholderItems];
};

export const lifeblocsHelpers = {
  buildFactoryContract,
  buildContract,
  parseBlocs,
};
