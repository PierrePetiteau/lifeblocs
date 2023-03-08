import React, { CSSProperties, FC, useEffect } from "react";
import { reactive } from "@legendapp/state/react-components";
import { themeState } from "@states/themeState/themeState";
import { ViewProps } from "@atoms/View";
import { motion } from "framer-motion";
import { computed, observable } from "@legendapp/state";

const View = reactive(motion.div);
const mouse = observable<{ x: number; y: number }>({ x: 0, y: 0 });
const center = observable<{ x: number; y: number }>({ x: 0, y: 0 });
const rotateZ = computed<number>(() => {
  const radians = Math.atan2(center.x.get() - mouse.x.get(), center.y.get() - mouse.y.get());
  const degree = radians * (180 / Math.PI) * -1 + 180;
  return degree;
});

type MouseFollowerProps = ViewProps & {
  disabled?: boolean;
};

export const MouseFollower: FC<MouseFollowerProps> = ({
  disabled,
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

  ...props
}) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      mouse.x.set(event.pageX);
      mouse.y.set(event.pageY);
    };
    document.addEventListener("mousemove", listener);
    const removeListener = () => document.removeEventListener("mousemove", listener);
    return removeListener;
  }, []);

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
      ref={(el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        center.x.set(rect.left + rect.width / 2 - window.pageXOffset);
        center.y.set(rect.top + rect.height / 2 - window.pageYOffset);
      }}
      style$={() => ({ ...variantStyle, rotateZ: disabled ? 0 : rotateZ.get() })}
    >
      {children}
    </View>
  );
};
