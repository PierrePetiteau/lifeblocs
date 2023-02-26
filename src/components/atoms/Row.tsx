import React, { FC } from "react";
import { View, ViewProps } from "@atoms/View";
import { reactive } from "@legendapp/state/react";

type RowProps = ViewProps;

const RowComponent: FC<RowProps> = ({
  children,
  onClick,

  ...props
}) => {
  return (
    <View {...props} display="flex" flexDirection={"row"} onClick={onClick}>
      {children}
    </View>
  );
};

export const Row = reactive(RowComponent);
