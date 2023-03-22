import { StyleSheet } from "@helpers/style";
import { motion } from "framer-motion";
import { Spacer } from "@atoms/Spacer";
import { Button } from "@atoms/Button";
import { Computed } from "@legendapp/state/react";
import { mintForm } from "../states/mintForm";
import { submitSteps } from "../states/submitSteps";
import { wallet } from "@states/walletState";

export const MintFormFooter = () => {
  return (
    <motion.div style={styles.buttonsRow}>
      <Computed>
        {() => {
          if (mintForm.helpers.isFirstInput()) {
            return null;
          }
          if (submitSteps.state.sign_transaction.status.get() !== "initial") {
            return false;
          }

          return (
            <Button
              title="Previous"
              variant="contained"
              color="secondary"
              onClick={() => {
                mintForm.modifiers.focusPreviousField();
              }}
            />
          );
        }}
      </Computed>
      <Spacer horizontal value={20} />
      <Computed>
        {() => {
          const isLastInput = mintForm.helpers.isLastInput();
          const submitStepLabel = submitSteps.helpers.getSubmitButtonLabel() ?? "";

          const canPressNext = () => {
            const currentInput = mintForm.helpers.getCurrentInput();
            switch (currentInput.id.get()) {
              case "message":
              case "emoji": {
                return Boolean(currentInput.value?.get());
              }
              case "submit": {
                if (submitSteps.state.nft_received.status.get() === "completed") {
                  return true;
                }
                if (submitSteps.state.sign_transaction.status.get() !== "initial") {
                  return false;
                }
                return true;
              }
            }
          };

          const handleSubmitStep = async () => {
            switch (submitSteps.helpers.getCurrentStep()) {
              case "connect_wallet": {
                try {
                  submitSteps.state.connect_wallet.status.set("pending");
                  wallet.modifiers.tryConnectWallet();
                } catch (error) {
                  submitSteps.state.connect_wallet.status.set("initial");
                }
                break;
              }
              case "sign_transaction": {
                try {
                  submitSteps.state.sign_transaction.status.set("pending");
                  await mintForm.modifiers.submitForm();
                  console.log('---------', 'submitForm');
                  
                  submitSteps.state.sign_transaction.status.set("completed");
                  submitSteps.state.nft_received.status.set("pending");
                } catch (error) {
                  submitSteps.state.sign_transaction.status.set("initial");
                }
                break;
              }
              case null: {
                mintForm.modifiers.resetForm();
                submitSteps.modifiers.resetSteps();
                break;
              }
            }
          };

          const handlePress = () => {
            if (mintForm.helpers.isLastInput()) {
              handleSubmitStep();
              return;
            }
            mintForm.modifiers.focusNextField();
          };

          return (
            <Button
              title={isLastInput ? submitStepLabel : "Next"}
              variant="contained"
              color="primary"
              isDisabled={!canPressNext()}
              onClick={() => handlePress()}
            />
          );
        }}
      </Computed>
      <Spacer horizontal value={3} />
    </motion.div>
  );
};

const styles: StyleSheet = {
  buttonsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
  },
};
