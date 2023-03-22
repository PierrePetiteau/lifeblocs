import { Row } from "@atoms/Row";
import { Spacer } from "@atoms/Spacer";
import { Text } from "@atoms/Text";
import { StyleSheet } from "@helpers/style";
import { Computed } from "@legendapp/state/react";
import { motion } from "framer-motion";
import { useListeners } from "hooks/useListeners";
import { mintForm } from "../states/mintForm";
import { submitSteps } from "../states/submitSteps";
import { SubmitStepKey } from "../states/submitSteps/submitStepsState";

type Props = {
  index: number;
};

const { state, helpers, listeners } = submitSteps;

export const SubmitInput = ({ index }: Props) => {
  useListeners([listeners.onWalletAccountChange, listeners.onNftReceived]);

  const renderStep = (index: number, stepKey: SubmitStepKey) => (
    <Computed>
      {() => {
        const isCurrentStep = helpers.isCurrentStep(stepKey);
        const style = isCurrentStep ? undefined : styles.darken;
        const label = `${index}. ${state[stepKey].label.get()}`;
        const emoji = helpers.getEmojiFrom(stepKey);
        const emojiCurrentIndicator = isCurrentStep ? "👈" : "";

        return (
          <Row style={style}>
            <Text color="gray10">{label}</Text>
            <Spacer horizontal value={12} />
            <Text>{emoji ?? emojiCurrentIndicator}</Text>
          </Row>
        );
      }}
    </Computed>
  );

  return (
    <>
      <Text variant="callout">{`${index + 1}/${mintForm.state.items.length} · Let’s mint your badge`}</Text>
      <Spacer value={16} />
      <motion.div>
        {renderStep(1, "connect_wallet")}
        <Spacer value={12} />
        {renderStep(2, "sign_transaction")}
        <Spacer value={12} />
        {renderStep(3, "nft_received")}
      </motion.div>
    </>
  );
};

const styles: StyleSheet = {
  darken: {
    filter: "brightness(0.5)",
  },
};
