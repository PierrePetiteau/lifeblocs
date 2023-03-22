import { StyleSheet } from "@helpers/style";
import { motion } from "framer-motion";
import { Spacer } from "@atoms/Spacer";
import { Switch } from "@legendapp/state/react";
import { MessageInput } from "@screens/MintScreen/components/MessageInput";
import { EmojiInput } from "@screens/MintScreen/components/EmojiInput";
import { SubmitInput } from "@screens/MintScreen/components/SubmitInput";
import { mintForm } from "../states/mintForm";
import { MintFormInputKey } from "../states/mintForm/mintFormState";
import { MintFormFooter } from "./MintFormFooter";

export const MintForm = () => {
  return (
    <motion.div style={styles.container}>
      <Switch<MintFormInputKey> value={mintForm.state.currentItemId}>
        {{
          message: () => <MessageInput index={0} />,
          emoji: () => <EmojiInput index={1} />,
          submit: () => <SubmitInput index={2} />,
        }}
      </Switch>
      <Spacer value={16} />
      <MintFormFooter />
    </motion.div>
  );
};

const styles: StyleSheet = {
  container: {
    width: "30vw",
  },
};
