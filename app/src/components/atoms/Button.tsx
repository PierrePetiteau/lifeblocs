import React, { FC, ReactElement } from "react";
import { Text } from "@atoms/Text";
import { reactive } from "@legendapp/state/react";
import { motion, MotionStyle } from "framer-motion";
import { StyleSheet } from "@helpers/style";

export type ButtonProps = {
  variant?: "contained" | "outlined";
  isDisabled?: boolean;
  color?: "primary" | "secondary" | "white";
  title?: string;
  style?: MotionStyle;
  onClick?: () => void;
  children?: ReactElement | null | (ReactElement | null)[];
};

const MotionButton = reactive(motion.button);

export const Button: FC<ButtonProps> = ({
  variant = "contained",
  isDisabled = false,
  color = "primary",
  title,
  onClick,
  children,
  style = {},
}) => {
  const variantStyle = getVariantStyle({ variant, color });
  const disabledStyle = isDisabled ? styles.darken : {};

  return (
    <MotionButton
      style={{ ...styles.reset, ...variantStyle, ...disabledStyle, ...style }}
      onClick={() => {
        if (isDisabled) {
          return;
        }
        onClick?.();
      }}
      transition={{ duration: 0.15 }}
    >
      {children ? children : <Text variant="subhead">{`${title}`} </Text>}
    </MotionButton>
  );
};

type GetVariantStyleOptions = {
  color: NonNullable<ButtonProps["color"]>;
  variant: NonNullable<ButtonProps["variant"]>;
};
type GetVariantStyle = (options: GetVariantStyleOptions) => MotionStyle;
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

const styles: StyleSheet = {
  reset: {
    flexDirection: "row",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "16px",
    paddingRight: "16px",
    borderRadius: "4px",
    minWidth: "64px",
    cursor: "pointer",
  },
  darken: {
    filter: "brightness(0.5)",
    cursor: "auto",
  },
};
