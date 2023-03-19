import { StyleSheet } from "@helpers/style";
import { motion } from "framer-motion";
import { Text } from "@atoms/Text";
import { Spacer } from "@atoms/Spacer";

const description = [
  "Life is like a game 🎮",
  "You can build skills 💪 and complete quests 🧗",
  "Each time you level up is an opportunity to celebrate a bloc of your life 🥳",
  "And what's the better way to celebrate than unlocking this new success in your collection !? 🔓",
  "If you want to give a try, just navigate to Mint section",
];

export const ProjectScreen = () => {
  return (
    <motion.div style={styles.container}>
      <Spacer horizontal value={"150px"} />
      <motion.div style={styles.body}>
        <Text variant="largeTitle">Unlock your success collection 🔓</Text>
        <Spacer value={16} />
        {description.map((text) => (
          <>
            <motion.div style={styles.line}>
              <Text color={"gray10"}>{"-"}</Text>
              <Spacer horizontal value={12} />
              <Text color={"gray10"}>{text}</Text>
            </motion.div>
            <Spacer value={12} />
          </>
        ))}
      </motion.div>
    </motion.div>
  );
};

const styles: StyleSheet = {
  container: {
    position: "fixed",
    width: "100vw",
    height: `100vh`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    width: "62%",
  },
  line: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
  },
};
