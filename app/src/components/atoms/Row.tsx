import React, { FC, ReactElement } from "react";
import { reactive } from "@legendapp/state/react";
import { motion, MotionStyle } from "framer-motion";

type RowProps = { style?: MotionStyle; onClick?: () => void; children?: ReactElement | null | (ReactElement | null)[] };

const RowComponent: FC<RowProps> = ({ children, onClick, style }) => {
  return (
    <motion.div style={{ display: "flex", flexDirection: "row", ...style }} onClick={onClick}>
      {children}
    </motion.div>
  );
};

export const Row = reactive(RowComponent);
