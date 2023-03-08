/* eslint-disable react/jsx-pascal-case */
import React, { CSSProperties, FC, ReactElement } from "react";
import { reactive } from "@legendapp/state/react-components";
import { Colors } from "@states/themeState/colors";
import { themeState } from "@states/themeState/themeState";
import { HTMLMotionProps, motion } from "framer-motion";

const Div = reactive(motion.div);

export type Padding = {
  paddingLeft?: CSSProperties["paddingLeft"];
  paddingTop?: CSSProperties["paddingTop"];
  paddingRight?: CSSProperties["paddingRight"];
  paddingBottom?: CSSProperties["paddingBottom"];
  paddingHorizontal?: CSSProperties["padding"];
  paddingVertical?: CSSProperties["padding"];
  padding?: CSSProperties["padding"];
};

export type Margin = {
  marginLeft?: CSSProperties["marginLeft"];
  marginTop?: CSSProperties["marginTop"];
  marginRight?: CSSProperties["marginRight"];
  marginBottom?: CSSProperties["marginBottom"];
  marginHorizontal?: CSSProperties["margin"];
  marginVertical?: CSSProperties["margin"];
  margin?: CSSProperties["margin"];
};

export type Position = {
  position?: CSSProperties["position"];
  left?: CSSProperties["left"];
  top?: CSSProperties["top"];
  right?: CSSProperties["right"];
  bottom?: CSSProperties["bottom"];
};

export type Border = {
  border?: CSSProperties["border"];
  borderRadius?: CSSProperties["borderRadius"];
  borderColor?: keyof Colors;
  borderWidth?: CSSProperties["borderWidth"];
};

export type Transformations = {
  scaleX?: number | string;
  scaleY?: number | string;
  scaleZ?: number | string;

  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;

  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
};

export type MotionProps = {
  motionProps?: HTMLMotionProps<"div">;
};

export type ViewProps = (Padding & Margin & Position & Border & Transformations & MotionProps) & {
  flex?: CSSProperties["flex"];
  display?: CSSProperties["display"];
  flexDirection?: CSSProperties["flexDirection"];
  flexGrow?: CSSProperties["flexGrow"];
  flexShrink?: CSSProperties["flexShrink"];
  flexBasis?: CSSProperties["flexBasis"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  alignSelf?: CSSProperties["alignSelf"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  overflow?: CSSProperties["overflow"];
  scrollBehavior?: CSSProperties["scrollBehavior"];
  onClick?: () => void;

  backgroundColor?: keyof Colors;
  children?: ReactElement | null | (ReactElement | null)[];
};

const ViewComponent: FC<ViewProps> = ({
  motionProps = {},
  children,
  backgroundColor,
  borderColor,
  onClick,

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
  translateX,
  translateY,
  translateZ,

  ...props
}) => {
  const transform = [
    Boolean(scaleX) ? `scaleX(${scaleX})` : null,
    Boolean(scaleY) ? `scaleY(${scaleY})` : null,
    Boolean(scaleZ) ? `scaleZ(${scaleZ})` : null,
    Boolean(rotateX) ? `rotateX(${rotateX}deg)` : null,
    Boolean(rotateY) ? `rotateY(${rotateY}deg)` : null,
    Boolean(rotateZ) ? `rotateZ(${rotateZ}deg)` : null,
    Boolean(translateX) ? `translateX(${translateX})` : null,
    Boolean(translateY) ? `translateY(${translateY})` : null,
    Boolean(translateZ) ? `translateZ(${translateZ})` : null,
  ].filter((v) => v);

  const variantStyle: CSSProperties = {
    display: "flex",
    ...props,
    paddingLeft: paddingLeft ?? paddingHorizontal,
    paddingRight: paddingRight ?? paddingHorizontal,
    paddingTop: paddingTop ?? paddingVertical,
    paddingBottom: paddingBottom ?? paddingVertical,
    marginLeft: marginLeft ?? marginHorizontal,
    marginRight: marginRight ?? marginHorizontal,
    marginTop: marginTop ?? marginVertical,
    marginBottom: marginBottom ?? marginVertical,
    flexDirection: props.flexDirection ?? "column",
    cursor: onClick ? "pointer" : undefined,
    userSelect: onClick ? "none" : undefined,
    backgroundColor: backgroundColor ? themeState?.[backgroundColor].get().toString("rgb") : undefined,
    borderColor: borderColor ? themeState?.[borderColor].get().toString("rgb") : undefined,
    transform: transform.length ? transform.join(" ") : undefined,
  };

  return (
    <Div {...motionProps} style$={variantStyle} onClick={onClick}>
      {children}
    </Div>
  );
};

export const View = reactive(ViewComponent);
