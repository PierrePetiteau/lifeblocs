import React, { CSSProperties, FC, ReactElement } from "react";
import { enableLegendStateReact } from "@legendapp/state/react";
import { Legend } from "@legendapp/state/react-components";
import { Colors } from "@states/ThemeState/colors";
import { ThemeState } from "@states/ThemeState/ThemeState";

enableLegendStateReact();

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
  horizontalMargin?: CSSProperties["margin"];
  verticalMargin?: CSSProperties["margin"];
  margin?: CSSProperties["margin"];
};

export type Position = {
  position?: CSSProperties["position"];
  left?: CSSProperties["left"];
  top?: CSSProperties["top"];
  right?: CSSProperties["right"];
  bottom?: CSSProperties["bottom"];
};

type ViewProps = (Padding & Margin & Position) & {
  flex?: CSSProperties["flex"];
  display?: CSSProperties["display"];
  flexDirection?: CSSProperties["flexDirection"];
  flexGrow?: CSSProperties["flexGrow"];
  flexShrink?: CSSProperties["flexShrink"];
  flexBasis?: CSSProperties["flexBasis"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  alignSelf?: CSSProperties["alignSelf"];
  borderRadius?: CSSProperties["borderRadius"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];

  backgroundColor?: keyof Colors;
  children?: ReactElement | null | (ReactElement | null)[];
};

export const View: FC<ViewProps> = ({
  children,
  backgroundColor,

  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  horizontalMargin,
  verticalMargin,

  paddingLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingHorizontal,
  paddingVertical,

  ...props
}) => {
  const variantStyle: CSSProperties = {
    display: "flex",
    ...props,
    paddingLeft: paddingLeft ?? paddingHorizontal,
    paddingRight: paddingRight ?? paddingHorizontal,
    paddingTop: paddingTop ?? paddingVertical,
    paddingBottom: paddingBottom ?? paddingVertical,
    marginLeft: marginLeft ?? horizontalMargin,
    marginRight: marginRight ?? horizontalMargin,
    marginTop: marginTop ?? verticalMargin,
    marginBottom: marginBottom ?? verticalMargin,
    flexDirection: props.flexDirection ?? "column",
    backgroundColor: backgroundColor ? ThemeState?.[backgroundColor].get().toString("rgb") : undefined,
  };

  return <Legend.div style$={variantStyle}>{children}</Legend.div>;
};
