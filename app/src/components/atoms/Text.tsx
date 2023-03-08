/* eslint-disable react/jsx-pascal-case */
import React, { FC, ReactElement, useRef } from "react";
import { reactive } from "@legendapp/state/react-components";
import { Colors } from "@states/themeState/colors";
import { TextVariants } from "@states/themeState/texts";
import { themeState } from "@states/themeState/themeState";
import { Margin, Padding, Transformations } from "@atoms/View";
import { motion, MotionStyle } from "framer-motion";
import { isArray } from "@legendapp/state";

const MotionText = reactive(motion.span);

type Font = {
  fontWeight?: MotionStyle["fontWeight"];
};

export type TextProps = (Padding & Margin & Transformations & Font) & {
  placeholder?: string;
  variant?: keyof TextVariants;
  color?: keyof Colors;
  backgroundColor?: keyof Colors;
  textAlign?: MotionStyle["textAlign"];
  textOverflow?: MotionStyle["textOverflow"];
  width?: MotionStyle["width"];
  height?: MotionStyle["height"];
  overflow?: MotionStyle["overflow"];
  whiteSpace?: MotionStyle["whiteSpace"];
  lineClamp?: MotionStyle["lineClamp"];
  style?: MotionStyle | MotionStyle[];

  children?: string | ReactElement | null | (string | ReactElement | null)[];
};

export const Text: FC<TextProps> = ({
  placeholder,
  variant = "body",
  color = "text",
  backgroundColor,
  children,
  lineClamp,
  style,

  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  marginHorizontal,
  marginVertical,

  paddingLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingHorizontal,
  paddingVertical,

  scaleX,
  scaleY,
  scaleZ,
  rotateX,
  rotateY,
  rotateZ,

  ...props
}) => {
  const renderCount = ++useRef(0).current;

  const transform = [
    Boolean(scaleX) ? `scaleX(${scaleX})` : null,
    Boolean(scaleY) ? `scaleY(${scaleY})` : null,
    Boolean(scaleZ) ? `scaleZ(${scaleZ})` : null,
    Boolean(rotateX) ? `rotateX(${rotateX}deg)` : null,
    Boolean(rotateY) ? `rotateY(${rotateY}deg)` : null,
    Boolean(rotateZ) ? `rotateZ(${rotateZ}deg)` : null,
  ].filter((v) => v);

  const getStyles = () => {
    let _styles = {};
    if (isArray(style)) {
      for (const _style of style) {
        _styles = { ..._styles, ..._style };
      }
    } else {
      _styles = { ...style };
    }
    return _styles;
  };

  const variantStyle: () => MotionStyle = () => ({
    flexDirection: "row",
    alignItems: "center",
    display: lineClamp ? "-webkit-box" : "inline-flex",
    WebkitBoxOrient: lineClamp ? "vertical" : undefined,
    WebkitLineClamp: lineClamp ?? undefined,
    backgroundColor: backgroundColor ? themeState?.[backgroundColor].get().toString("rgb") : undefined,
    paddingLeft: paddingLeft ?? paddingHorizontal,
    paddingRight: paddingRight ?? paddingHorizontal,
    paddingTop: paddingTop ?? paddingVertical,
    paddingBottom: paddingBottom ?? paddingVertical,
    marginLeft: marginLeft ?? marginHorizontal,
    marginRight: marginRight ?? marginHorizontal,
    marginTop: marginTop ?? marginVertical ?? 0,
    marginBottom: marginBottom ?? marginVertical ?? 0,
    color: themeState[color].get().toString("rgb"),
    transform: transform.length ? transform.join(" ") : undefined,
    ...themeState[variant].get(),
    ...props,
    ...getStyles(),
  });
  const getText = () => {
    if (Boolean(placeholder) && (!children || children === "")) {
      return placeholder;
    }
    return children;
  };
  return <MotionText style$={variantStyle}>{getText()}</MotionText>;
};
