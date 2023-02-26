/* eslint-disable react/jsx-pascal-case */
import React, { CSSProperties, FC, useRef } from "react";
import { Colors } from "@states/themeState/colors";
import { themeState } from "@states/themeState/themeState";
import { Margin, Padding, Position } from "@atoms/View";
import { reactive } from "@legendapp/state/react";
import { motion } from "framer-motion";

const MotionImg = reactive(motion.img);

type ImageProps = (Padding & Margin & Position) & {
  src: string;

  flex?: CSSProperties["flex"];
  flexGrow?: CSSProperties["flexGrow"];
  flexShrink?: CSSProperties["flexShrink"];
  flexBasis?: CSSProperties["flexBasis"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  alignSelf?: CSSProperties["alignSelf"];
  borderRadius?: CSSProperties["borderRadius"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  overflow?: CSSProperties["overflow"];

  backgroundColor?: keyof Colors;
};

export const Image: FC<ImageProps> = ({
  src,

  backgroundColor,

  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  marginHorizontal,
  marginVertical,

  padding,
  paddingLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingHorizontal,
  paddingVertical,

  ...props
}) => {
  const renderCount = ++useRef(0).current;

  const variantStyle: CSSProperties = {
    display: "flex",
    ...props,
    paddingLeft: paddingLeft ?? paddingHorizontal ?? padding,
    paddingRight: paddingRight ?? paddingHorizontal ?? padding,
    paddingTop: paddingTop ?? paddingVertical ?? padding,
    paddingBottom: paddingBottom ?? paddingVertical ?? padding,
    marginLeft: marginLeft ?? marginHorizontal,
    marginRight: marginRight ?? marginHorizontal,
    marginTop: marginTop ?? marginVertical,
    marginBottom: marginBottom ?? marginVertical,
    backgroundColor: backgroundColor ? themeState?.[backgroundColor].get().toString("rgb") : undefined,
  };

  return (
    <>
      {/* {renderCount} */}
      <MotionImg style$={() => variantStyle} src={src} />
    </>
  );
};
