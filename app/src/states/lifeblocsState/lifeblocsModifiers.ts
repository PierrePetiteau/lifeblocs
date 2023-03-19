import { lifeblocsState } from "@states/lifeblocsState/lifeblocsState";
import { BlocResponseItem, lifeblocsHelpers } from "@states/lifeblocsState/lifeblocsHelpers";
import { wallet } from "@states/walletState";

const mintBloc = async (payload: { emoji: string; message: string }) => {
  try {
    const contract = lifeblocsHelpers.buildContract({ signer: wallet.helpers.getSigner() });
    const method = "safeMint";
    const params = [wallet.state.accounts[0].peek(), payload.emoji, payload.message, ""];

    const txHash = await wallet.helpers.sendTransaction({ contract, method, params });

    console.log("---------", "txHash", txHash);
  } catch (error) {
    console.log("---------", "error", error);
  }
};

const syncUserBlocs = async () => {
  const contract = lifeblocsHelpers.buildContract();
  const ownerAddress = wallet.state.accounts[0].peek();

  const blocs: BlocResponseItem[] = await contract.getLifeFrom(ownerAddress);

  lifeblocsState.blocs.set(lifeblocsHelpers.parseBlocs(blocs));

  // const contract = lifeblocsHelpers.buildContract();
  // const blocs = await contract.getBlocsFrom(wallet.state.accounts[0].peek());
  // lifeblocsState.blocs.set(blocs);

  // const response = await alchemy.nft.getNftsForContract(lifeblocsState.address.peek());
  //     lifeblocsState.nfts.set(response.nfts.map((v) => ({ ...v, id: v.tokenId })));
  //   } catch (error) {
  //     lifeblocsState.nfts.set([]);
  //     console.log("---------", "error", error);
  //   }
};

export const lifeblocsModifiers = {
  syncUserBlocs,
  mintBloc,
};
