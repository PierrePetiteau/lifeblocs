import React, { CSSProperties, FC } from "react";

type SpacerProps = {
  horizontal?: true;
  value?: CSSProperties["width"] | CSSProperties["height"];
};

export const Spacer: FC<SpacerProps> = ({ horizontal = false, value }) => {
  const variantStyle: CSSProperties = {
    flexDirection: horizontal ? "row" : "column",
    height: !horizontal && value ? value : undefined,
    width: horizontal && value ? value : undefined,
    flexGrow: !value ? 1 : undefined,
  };

  return <div style={variantStyle} />;
};
