import { Row } from "@atoms/Row";
import { Spacer } from "@atoms/Spacer";
import { Text } from "@atoms/Text";
import { StyleSheet } from "@helpers/style";
import { observable } from "@legendapp/state";
import { mintFormState } from "@screens/MintScreen/states/mintFormState";
import { lifeblocs } from "@states/lifeblocsState";
import { lifeBlocsListeners } from "@states/lifeblocsState/lifeblocsListeners";
import { lifeblocsContract } from "@states/lifeblocsState/lifeblocsState";
import { wallet } from "@states/walletState";
import { motion } from "framer-motion";
import { useEffect } from "react";

type Props = {
  index: number;
};

const stepsStatus = { initial: "", pending: "⏳", completed: "✅" };

const computeWalletStatus = () => {
  if (wallet.state.accounts.length > 0) {
    return stepsStatus.completed;
  }
  return stepsStatus.initial;
};

const steps = observable([
  { status: computeWalletStatus(), text: "Connect your wallet" },
  { status: stepsStatus.initial, text: "Sign the transaction" },
  { status: stepsStatus.initial, text: "Receive your NFT" },
]);

export const SubmitInput = ({ index }: Props) => {
  useEffect(() => {
    const listeners = [
      wallet.state.accounts.onChange(() => {
        steps[0].status.set(computeWalletStatus());
      }),
    ];
    const removeListeners = () => {
      listeners.map((dispose) => dispose?.());
    };

    return removeListeners;
  }, []);

  return (
    <>
      <Text variant="callout">{`${index + 1}/${mintFormState.items.length} · Let’s mint your first badge`}</Text>
      <Spacer value={16} />
      <motion.div>
        {steps.map((step, index) => {
          return (
            <Row>
              <Text color="gray10">{`${index}. ${step}`}</Text>
              <Spacer horizontal value={12} />
              <Text>✅</Text>
            </Row>
          );
        })}
        <Row>
          <Text color="gray10">1. Sign the transaction</Text>
          <Spacer horizontal value={12} />
          <Text>✅</Text>
        </Row>
        <Spacer value={12} />
        <Row>
          <Text color="gray10" style={[styles.darken]}>
            2. Receive your NFT
          </Text>
          <Spacer horizontal value={12} />
          <Text>⏳</Text>
        </Row>
      </motion.div>
    </>
  );
};

const styles: StyleSheet = {
  darken: {
    filter: "brightness(0.3)",
  },
};
