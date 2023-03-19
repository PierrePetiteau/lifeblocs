import { motion } from "framer-motion";

import { StyleSheet } from "@helpers/style";
import { Spacer } from "@atoms/Spacer";
import { Text } from "@atoms/Text";
import { Hexagon } from "@organisms/HexagonList/helpers/createHexagon";
import { Bloc } from "@states/lifeblocsState/lifeblocsState";
import { HexagonSVG } from "components/svg/HexagonSVG";
import { ObservableObject } from "@legendapp/state";

type Props = {
  item: ObservableObject<Bloc>;
  shape: Hexagon;
};

export const HexagonBloc = ({ item, shape }: Props) => {
  const _item = item.peek();
  return (
    <motion.div
      style={{
        ...styles.container,
        minHeight: `${shape.height + 2}px`,
        minWidth: `${shape.width + 2}px`,
      }}
      whileHover={{ scale: 1.05 }}
    >
      <HexagonSVG height={`${shape.height}px`} width={`${shape.width}px`} style={styles.hexagonSVG} />
      <Spacer value={shape.height / 4} />
      <motion.div style={styles.emojisContainer}>
        <Text style={[styles.emoji, { fontSize: "800%" }]} rotateZ={-15}>
          {_item.emoji}
        </Text>
        <Text style={[styles.emoji, { fontSize: "800%" }]} rotateZ={10}>
          ✨
        </Text>
      </motion.div>
      <motion.div style={styles.labelContainer}>
        <Text style={[styles.label]}>{_item.label}</Text>
      </motion.div>
    </motion.div>
  );
};

const styles: StyleSheet = {
  container: {
    clipPath: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  hexagonSVG: {
    position: "absolute",
    clipPath: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
  },
  emojisContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginTop: "14%",
  },
  emoji: {
    height: "400%",
  },
  labelContainer: {
    zIndex: 10,
    flex: 0.7,
    justifyContent: "center",
    display: "flex",
  },
  label: {
    fontSize: "140%",
    lineHeight: "3vmin",
    textAlign: "center",
    transform: "rotateZ(-5deg)",
  },
};
