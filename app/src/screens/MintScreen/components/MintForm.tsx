import { StyleSheet } from "@helpers/style";
import { motion } from "framer-motion";
import { Spacer } from "@atoms/Spacer";
import { Button } from "@atoms/Button";
import { Computed, Switch } from "@legendapp/state/react";
import {
  MintFormInputKey,
  mintFormState,
  handlePressNext,
  handlePressPrevious,
} from "@screens/MintScreen/states/mintFormState";
import { MessageInput } from "@screens/MintScreen/components/MessageInput";
import { EmojiInput } from "@screens/MintScreen/components/EmojiInput";
import { SubmitInput } from "@screens/MintScreen/components/SubmitInput";

export const MintForm = () => {
  return (
    <motion.div style={styles.container}>
      <Switch<MintFormInputKey> value={mintFormState.currentItemId}>
        {{
          message: () => <MessageInput index={0} />,
          emoji: () => <EmojiInput index={1} />,
          submit: () => <SubmitInput index={2} />,
        }}
      </Switch>

      <Spacer value={16} />
      <motion.div style={styles.buttonsRow}>
        <Computed>
          {() =>
            mintFormState.currentItemId.get() !== "message" ? (
              <Button title="Previous" variant="contained" color="secondary" onClick={() => handlePressPrevious()} />
            ) : null
          }
        </Computed>
        <Spacer horizontal value={20} />
        <Computed>
          {() => (
            <Button
              title={mintFormState.currentItemId.get() === "submit" ? "Sign" : "Next"}
              variant="contained"
              color="primary"
              onClick={() => handlePressNext()}
            />
          )}
        </Computed>
        <Spacer horizontal value={3} />
      </motion.div>
    </motion.div>
  );
};

const styles: StyleSheet = {
  container: {
    width: "30vw",
  },
  buttonsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
  },
};
