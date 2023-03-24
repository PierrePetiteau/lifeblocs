import { StyleSheet } from "@helpers/style";
import { motion } from "framer-motion";
import { createHexagon } from "@organisms/HexagonList/helpers/createHexagon";
import { Spacer } from "@atoms/Spacer";
import { MintForm } from "./components/MintForm";
import { Computed } from "@legendapp/state/react";
import { mintForm } from "./states/mintForm";
import { HexagonBloc } from "@molecules/HexagonBloc/HexagonBloc";
import { MintFormInputKey } from "./states/mintForm/mintFormState";

const hexagon = createHexagon({ edge: 300, margin: 0 });

type InputKetToFocus = {
  [key in MintFormInputKey]: "emoji" | "label" | undefined;
};

const inputKeyToFocus: InputKetToFocus = {
  message: "label",
  emoji: "emoji",
  submit: undefined,
};

export const MintScreen = () => {
  return (
    <motion.div style={styles.container}>
      <Spacer horizontal value={"250px"} />
      <Spacer horizontal />
      <Computed>
        {() => {
          return (
            <HexagonBloc
              label={mintForm.state.items[0].value}
              emoji={mintForm.state.items[1].value}
              shape={hexagon}
              focus={inputKeyToFocus[mintForm.state.currentItemId.get()]}
              scaleWhileHoverDisabled
            />
          );
        }}
      </Computed>
      <Spacer horizontal />
      <MintForm />
      <Spacer horizontal />
    </motion.div>
  );
};

const styles: StyleSheet = {
  container: {
    position: "fixed",
    width: "100vw",
    height: `100vh`,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
};
