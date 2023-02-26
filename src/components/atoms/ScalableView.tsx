import React, { CSSProperties, FC } from "react";
import { reactive } from "@legendapp/state/react-components";
import { themeState } from "@states/themeState/themeState";
import { ViewProps } from "@atoms/View";
import { motion } from "framer-motion";
import { useObservable } from "@legendapp/state/react";

const View = reactive(motion.div);

type ScalableViewProps = ViewProps & { scaleTo?: number };

export const ScalableView: FC<ScalableViewProps> = ({
  children,
  backgroundColor,

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

  scaleTo = 1.1,

  ...props
}) => {
  const scale = useObservable<number>(1);

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
    backgroundColor: backgroundColor ? themeState?.[backgroundColor].get().toString("rgb") : undefined,
  };

  return (
    <View
      style$={() => variantStyle}
      transition={{ type: "spring", damping: 40, stiffness: 400 }}
      animate$={() => ({ scale: scale.get() })}
      onMouseEnter={() => scale.set(scaleTo)}
      onMouseLeave={() => scale.set(1)}
    >
      {children}
    </View>
  );
};
