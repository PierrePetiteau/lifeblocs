import React, { CSSProperties, FC, ReactElement, useRef } from "react";
import { Text } from "@atoms/Text";
import { reactive, ShapeWith$, useSelector } from "@legendapp/state/react";
import { motion } from "framer-motion";
import { Border, Margin, Padding, Position } from "@atoms/View";

export type ButtonProps = (Padding & Margin & Position & Border) & {
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary" | "white";
  title?: string;
  onClick?: () => void;
  children?: ReactElement | null | (ReactElement | null)[];
};

const MotionButton = reactive(motion.button);

export const Button: FC<ShapeWith$<ButtonProps>> = ({
  variant = "contained",
  variant$,
  color = "primary",
  color$,
  title,
  title$,
  onClick,
  onClick$,

  children,

  ...props
}) => {
  const renderCount = ++useRef(0).current;
  const _title = useSelector(title$) ?? title;
  const _variant = useSelector(variant$) ?? variant;
  const _color = useSelector(color$) ?? color;
  const _onClick = useSelector(onClick$) ?? onClick;

  const style = {
    ...baseStyle,
    ...getVariantStyle({ variant: _variant, color: _color }),
    ...props,
  };

  return (
    <MotionButton {...props} style$={() => style} onClick$={() => _onClick} transition={{ duration: 0.15 }}>
      {children ? children : <Text variant="subhead">{`${_title}`} </Text>}
    </MotionButton>
  );
};

type GetVariantStyleOptions = {
  color: NonNullable<ButtonProps["color"]>;
  variant: NonNullable<ButtonProps["variant"]>;
};
type GetVariantStyle = (options: GetVariantStyleOptions) => CSSProperties;
const getVariantStyle: GetVariantStyle = ({ color, variant }) => {
  const colors = {
    primary: "linear-gradient(to bottom right, #8200B8, #B421B0, #F325A3, #FF9393)",
    secondary: "#36383C",
    white: "#FFFFFF",
  };

  return {
    backgroundImage: variant === "contained" && color === "primary" ? colors.primary : "transparent",
    backgroundColor: variant === "contained" && color !== "primary" ? colors[color] : "transparent",
    border: variant === "outlined" ? `2px solid` : "none",
    borderColor: colors[color],
  };
};

const baseStyle: CSSProperties = {
  flexDirection: "row",
  paddingTop: "8px",
  paddingBottom: "8px",
  paddingLeft: "16px",
  paddingRight: "16px",
  borderRadius: "4px",
  minWidth: "64px",
  cursor: "pointer",
};
