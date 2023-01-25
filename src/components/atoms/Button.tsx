import React, { CSSProperties, FC, useRef } from "react";
import { Text } from "@atoms/Text";
import { ThemeState } from "@states/ThemeState/ThemeState";
import { reactive, ShapeWith$, useSelector } from "@legendapp/state/react";
import { motion } from "framer-motion";

export type ButtonProps = {
  variant?: "contained" | "outlined";
  title?: string;
  onClick?: () => void;
};

const MotionButton$ = reactive(motion.button);

export const Button: FC<ShapeWith$<ButtonProps>> = ({
  variant = "contained",
  variant$,
  title,
  title$,
  onClick,
  onClick$,
}) => {
  const renderCount = ++useRef(0).current;
  const _title = useSelector(title$) ?? title;
  const _variant = useSelector(variant$) ?? variant;
  const _onClick = useSelector(onClick$) ?? onClick;

  return (
    <MotionButton$
      style$={() => ({ ...baseStyle, ...variantStyles[_variant] })}
      onClick$={() => _onClick}
      transition={{ duration: 0.15 }}
    >
      <Text variant="subhead">{`${_title} ${renderCount}`} </Text>
    </MotionButton$>
  );
};

const variantStyles: {
  [key in NonNullable<ButtonProps["variant"]>]: CSSProperties;
} = {
  contained: {
    backgroundImage: "linear-gradient(to bottom right, #8200B8, #B421B0, #F325A3, #FF9393)",
    borderWidth: "1px",
    borderColor: ThemeState.border.get().toString("rgb"),
  },
  outlined: {
    borderWidth: "1px",
    borderColor: ThemeState.border.get().toString("rgb"),
    backgroundColor: "transparent",
  },
};

const baseStyle: CSSProperties = {
  paddingTop: "8px",
  paddingBottom: "8px",
  paddingLeft: "16px",
  paddingRight: "16px",
  borderRadius: "4px",
  minWidth: "64px",
};
