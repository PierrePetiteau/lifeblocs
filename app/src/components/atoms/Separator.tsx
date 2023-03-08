import { themeState } from "@states/themeState/themeState";
import React, { CSSProperties, FC } from "react";

type SeparatorProps = {
  vertical?: true;
};

export const Separator: FC<SeparatorProps> = ({ vertical = false }) => {
  const variantStyle: CSSProperties = {
    height: !vertical ? "1px" : "100%",
    width: vertical ? "1px" : "100%",
    backgroundColor: themeState.elevation2.get().toString("rgb"),
    flexShrink: 0
  };

  return <div style={variantStyle} />;
};
