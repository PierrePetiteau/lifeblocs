/* eslint-disable react/jsx-pascal-case */
import React, { FC, useRef } from "react";
import { reactive } from "@legendapp/state/react-components";
import { Colors } from "@states/themeState/colors";
import { TextVariants } from "@states/themeState/texts";
import { themeState } from "@states/themeState/themeState";
import { motion, MotionStyle } from "framer-motion";
import { isArray, Selector } from "@legendapp/state";
import { Text } from "@atoms/Text";
import { StyleSheet } from "@helpers/style";
import { Spacer } from "@atoms/Spacer";

const MotionTextInput = reactive(motion.input);

export type TextProps = {
  label: string;
  value$?: Selector<string | number | readonly string[] | undefined>;
  onChange?: (event: string) => void;
  variant?: keyof TextVariants;
  color?: keyof Colors;
  style?: MotionStyle | MotionStyle[];
  placeholder?: string;
  maxLength?: HTMLInputElement["maxLength"];
};

export const TextInput: FC<TextProps> = ({
  label,
  variant = "body",
  color = "text",
  value$,
  onChange,
  placeholder,
  maxLength,
  style,
}) => {
  const renderCount = ++useRef(0).current;
  const inputRef = useRef<HTMLInputElement>(null);

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
    outline: "none",
    resize: "none",
    color: themeState[color].get().toString("rgb"),
    ...themeState[variant].get(),
    ...getStyles(),
  });

  return (
    <motion.div style={styles.container}>
      <Text variant="callout" style={styles.label}>
        {label}
      </Text>
      <Spacer value={4} />
      <MotionTextInput
        ref={inputRef}
        style$={variantStyle}
        value$={value$}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </motion.div>
  );
};

const styles: StyleSheet = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    paddingLeft: "3px",
  },
};
