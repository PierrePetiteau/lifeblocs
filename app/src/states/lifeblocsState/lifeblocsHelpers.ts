import { AlchemyProvider, Contract } from "alchemy-sdk";
import { alchemyProvider } from "providers/alchemy";
import { CONSTANTS } from "@constants/constants";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts/json-rpc-provider";
import { Bloc } from "@states/lifeblocsState/lifeblocsState";

type BuildContractParams = {
  signer?: JsonRpcSigner | AlchemyProvider;
};

const buildContract = (params?: BuildContractParams) => {
  const contract = new Contract(
    CONSTANTS.lifeblocsContractAddress,
    CONSTANTS.lifeblocsContractAbi,
    params?.signer ?? alchemyProvider
  );
  return contract;
};

type BigIntWithToNumber = BigInt & { toNumber(): number };
export type BlocResponseItem = [BigIntWithToNumber, string, string, BigIntWithToNumber];

const parseBlocs: (blocs: BlocResponseItem[]) => Bloc[] = (blocs) => {
  const items = blocs.filter((v) => v[v.length - 1]);
  const parsedItems: Bloc[] = items.reverse().map((v, index) => ({
    id: index,
    tokenId: v[0].toNumber(),
    emoji: v[1],
    label: v[2],
    createdAt: v[3].toNumber() * 1000,
    isPlaceholder: false,
  }));

  return parsedItems;
};

export const lifeblocsHelpers = {
  buildContract,
  parseBlocs,
};
