import React, { FC } from "react";
import { ViewProps } from "@atoms/View";
import { reactive } from "@legendapp/state/react";
import { motion, MotionStyle } from "framer-motion";

type RowProps = ViewProps & { style?: MotionStyle };

const RowComponent: FC<RowProps> = ({ children, onClick, style }) => {
  return (
    <motion.div style={{ display: "flex", flexDirection: "row", ...style }} onClick={onClick}>
      {children}
    </motion.div>
  );
};

export const Row = reactive(RowComponent);
