import { lifeblocsState } from "@states/lifeblocsState/lifeblocsState";
import { BlocResponseItem, lifeblocsHelpers } from "@states/lifeblocsState/lifeblocsHelpers";
import { wallet } from "@states/walletState";

const mintBloc = async (payload: { emoji: string; message: string }) => {
  const contract = lifeblocsHelpers.buildContract({ signer: wallet.helpers.getSigner() });
  const method = "safeMint";
  const params = [wallet.state.accounts[0].peek(), payload.emoji, payload.message];

  const txHash = await wallet.helpers.sendTransaction({ contract, method, params });

  console.log("---------", "txHash", txHash);
};

const syncUserBlocs = async () => {
  const contract = lifeblocsHelpers.buildContract();
  const ownerAddress = wallet.state.accounts[0].peek();

  const blocs: BlocResponseItem[] = await contract.getLifeFrom(ownerAddress);
  const parsedBlocs = lifeblocsHelpers.parseBlocs(blocs);
  console.log('---------', 'parsedBlocs', parsedBlocs);
  
  lifeblocsState.blocs.set(parsedBlocs);
};

export const lifeblocsModifiers = {
  syncUserBlocs,
  mintBloc,
};
