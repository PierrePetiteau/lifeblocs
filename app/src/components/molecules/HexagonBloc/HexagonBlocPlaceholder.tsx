import { motion } from "framer-motion";

import { StyleSheet } from "@helpers/style";
import { Hexagon } from "@organisms/HexagonList/helpers/createHexagon";
import { HexagonSVG } from "components/svg/HexagonSVG";

type Props = {
  shape: Hexagon;
};

export const HexagonBlocPlaceholder = ({ shape }: Props) => {
  return (
    <motion.div
      style={{
        ...styles.container,
        minHeight: `${shape.height + 2}px`,
        minWidth: `${shape.width + 2}px`,
      }}
    >
      <HexagonSVG
        height={`${shape.height}px`}
        width={`${shape.width}px`}
        style={styles.hexagonSVG}
        variant={"disabled"}
      />
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
};
