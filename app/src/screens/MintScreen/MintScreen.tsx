import { StyleSheet } from "@helpers/style";
import { HexagonSVG } from "components/svg/HexagonSVG";
import { motion } from "framer-motion";
import { createHexagon } from "@organisms/HexagonList/helpers/createHexagon";
import { Text } from "@atoms/Text";
import { Spacer } from "@atoms/Spacer";
import { MintForm } from "./components/MintForm";
import { Computed } from "@legendapp/state/react";
import { mintForm } from "./states/mintForm";

const DEFAULT_EMOJI = "📖";
const DEFAULT_MESSAGE = "Write my first book";

const hexagon = createHexagon({ edge: 30, margin: 0 });

export const MintScreen = () => {
  return (
    <motion.div style={styles.container}>
      <Spacer horizontal value={"250px"} />
      <Spacer horizontal />
      <motion.div style={styles.internalContainer}>
        <Computed>
          {() => {
            const current = mintForm.state.currentItemId.get();
            return (
              <HexagonSVG
                height={`${hexagon.height}vmin`}
                width={`${hexagon.width}vmin`}
                variant={current !== "submit" ? "darken" : undefined}
                style={styles.hexagonSVG}
              />
            );
          }}
        </Computed>
        <Spacer value={"22vmin"} />
        <motion.div style={styles.emojisContainer}>
          <Computed>
            {() => {
              const current = mintForm.state.currentItemId.get();
              const isDarken = current !== "emoji" && current !== "submit";
              const additionalStyle = isDarken ? styles.darken : {};

              return (
                <Text style={[styles.emoji, additionalStyle]} rotateZ={-15} placeholder={DEFAULT_EMOJI}>
                  {mintForm.state.items[1].value?.get()}
                </Text>
              );
            }}
          </Computed>

          <Computed>
            {() => {
              const current = mintForm.state.currentItemId.get();
              const isDarken = current !== "submit";
              const additionalStyle = isDarken ? styles.darken : {};
              return (
                <Text style={[styles.emoji, additionalStyle]} rotateZ={10}>
                  ✨
                </Text>
              );
            }}
          </Computed>
        </motion.div>
        <motion.div style={styles.labelContainer}>
          <Computed>
            {() => {
              const current = mintForm.state.currentItemId.get();
              const isDarken = current !== "message" && current !== "submit";
              const additionalStyle = isDarken ? styles.darken : {};

              return (
                <Text placeholder={DEFAULT_MESSAGE} style={[styles.label, additionalStyle]}>
                  {mintForm.state.items[0].value?.get()}
                </Text>
              );
            }}
          </Computed>
        </motion.div>
      </motion.div>
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
  hexagonSVG: {
    position: "absolute",
    clipPath: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
  },
  internalContainer: {
    height: `${hexagon.height}vmin`,
    width: `${hexagon.width}vmin`,
    clipPath: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  emojisContainer: {
    flexDirection: "row",
  },
  emoji: {
    fontSize: "16vmin",
    padding: "1vmin",
  },
  darken: {
    filter: "brightness(0.3)",
  },
  labelContainer: {
    zIndex: 10,
    flex: 0.7,
    justifyContent: "center",
    display: "flex",
  },
  label: {
    fontSize: "2.4vmin",
    lineHeight: "3vmin",
    textAlign: "center",
    transform: "rotateZ(-5deg)",
  },
  textInput: {
    border: "3px solid #FFFFFF",
    backgroundImage: "none",
    backgroundColor: "transparent",
    boxShadow: "none",
    borderRadius: "8px",
    padding: "10px",
    width: "24vw",
  },
  buttonsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
  },
};
