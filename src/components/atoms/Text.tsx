import React, { CSSProperties, FC } from "react";
import { enableLegendStateReact } from "@legendapp/state/react";
import { Legend } from "@legendapp/state/react-components";
import { Colors } from "@states/ThemeState/colors";
import { TextVariants } from "@states/ThemeState/texts";
import { ThemeState } from "@states/ThemeState/ThemeState";
import { Margin, Padding } from "@atoms/View";

enableLegendStateReact();

type Props = (Padding & Margin) & {
  variant?: keyof TextVariants;
  color?: keyof Colors;
  backgroundColor?: keyof Colors;
  textAlign?: CSSProperties["textAlign"];
  children?: string | string[];
};

export const Text: FC<Props> = ({
  variant = "body",
  color = "text",
  backgroundColor,
  children,

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
  const variantStyle: () => CSSProperties = () => ({
    ...props,
    backgroundColor: backgroundColor ? ThemeState?.[backgroundColor].get().toString("rgb") : undefined,
    paddingLeft: paddingLeft ?? paddingHorizontal,
    paddingRight: paddingRight ?? paddingHorizontal,
    paddingTop: paddingTop ?? paddingVertical,
    paddingBottom: paddingBottom ?? paddingVertical,
    marginLeft: marginLeft ?? horizontalMargin,
    marginRight: marginRight ?? horizontalMargin,
    marginTop: marginTop ?? verticalMargin,
    marginBottom: marginBottom ?? verticalMargin,
    color: ThemeState[color].get().toString("rgb"),
    ...ThemeState[variant].get(),
  });

  return <Legend.span style$={variantStyle}>{children}</Legend.span>;
};
