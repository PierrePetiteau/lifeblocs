import { StyleSheet } from "@helpers/style";
import { motion } from "framer-motion";
import { Text } from "@atoms/Text";
import { Spacer } from "@atoms/Spacer";

export const ProjectScreen = () => {
  return (
    <motion.div style={styles.container}>
      <Text variant="largeTitle">Unlock your success collection 🔓</Text>
      <Spacer value={16} />
      <Text color={"gray10"}>Life is like a game 🎮</Text>
      <Spacer value={12} />
      <Text color={"gray10"}>You can build skills 💪 and complete quests 🧗</Text>
      <Spacer value={12} />
      <Text color={"gray10"}>Each time you level up is an opportunity to celebrate a bloc of your life 🥳</Text>
      <Spacer value={12} />
      <Text color={"gray10"}>
        And what's the better way to celebrate than unlocking this new success in your collection !? 🔓
      </Text>
      <Spacer value={12} />
      <Text color={"gray10"}>If you want to give a try, just navigate to Mint section</Text>
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
    flexDirection: "column",
  },
  descriptionContainer: {},
};
