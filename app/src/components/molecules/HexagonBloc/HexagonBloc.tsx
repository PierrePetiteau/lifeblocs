import { useMemo } from "react";
import { motion, MotionStyle } from "framer-motion";

import { StyleSheet } from "@helpers/style";
import { Spacer } from "@atoms/Spacer";
import { Text } from "@atoms/Text";
import { Hexagon } from "@organisms/HexagonList/helpers/createHexagon";
import { HexagonSVG } from "components/svg/HexagonSVG";
import { ObservablePrimitiveChildFns } from "@legendapp/state";
import { Computed } from "@legendapp/state/react";

type Props = {
  label: ObservablePrimitiveChildFns<string>;
  emoji: ObservablePrimitiveChildFns<string>;
  shape: Hexagon;
  focus?: "emoji" | "label";
  scaleWhileHoverDisabled?: boolean;
};

export const DEFAULT_EMOJI = "📖";
export const DEFAULT_MESSAGE = "Write my first book";

export const HexagonBloc = ({ emoji, label, shape, focus, scaleWhileHoverDisabled }: Props) => {
  return (
    <Computed>
      {() => {
        const svgVariant = Boolean(focus) ? "darken" : undefined;

        const getEmojiAdditionalStyle = (type: "custom" | "sparkle") => {
          let style: MotionStyle = {
            fontSize: `${shape.edge / 40}rem`,
          };
          if (type === "sparkle" && Boolean(focus)) {
            style.filter = "brightness(0.3)";
          }
          if (type === "custom" && Boolean(focus) && focus !== "emoji") {
            style.filter = "brightness(0.3)";
          }
          return style;
        };

        const getLabelAdditionalStyle = () => {
          let style: MotionStyle = {
            fontSize: `${shape.edge / 200}rem`,
            lineHeight: `${shape.edge / 200 + 0.5}rem`,
          };
          if (Boolean(focus) && focus !== "label") {
            style.filter = "brightness(0.3)";
          }
          return style;
        };

        const _label = label.get().length ? label.get() : DEFAULT_MESSAGE;
        const _emoji = emoji.get().length ? emoji.get() : DEFAULT_EMOJI;

        return (
          <motion.div
            style={{
              ...styles.container,
              minHeight: `${shape.height + 2}px`,
              minWidth: `${shape.width + 2}px`,
              maxWidth: `${shape.width + 2}px`,
            }}
            whileHover={scaleWhileHoverDisabled ? undefined : { scale: 1.05 }}
          >
            <HexagonSVG
              height={`${shape.height}px`}
              width={`${shape.width}px`}
              style={styles.hexagonSVG}
              variant={svgVariant}
            />
            <Spacer value={shape.edge * 0.75} />
            <motion.div style={styles.emojisContainer}>
              <Text style={getEmojiAdditionalStyle("custom")} rotateZ={-15}>
                {_emoji}
              </Text>
              <Text style={getEmojiAdditionalStyle("sparkle")} rotateZ={10}>
                ✨
              </Text>
            </motion.div>
            <Spacer value={shape.edge * 0.16} />
            <motion.div style={styles.labelContainer}>
              <Text style={[styles.label, getLabelAdditionalStyle()]}>{_label}</Text>
            </motion.div>
          </motion.div>
        );
      }}
    </Computed>
  );
};

const styles: StyleSheet = {
  container: {
    clipPath: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  hexagonSVG: {
    position: "absolute",
    clipPath: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
  },
  emojisContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  labelContainer: {
    zIndex: 10,
    display: "flex",
    flexGrow: 0.6,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "10%",
    paddingRight: "10%",
    // backgroundColor: "blue",
  },
  label: {
    textAlign: "center",
    transform: "rotateZ(-5deg)",
    // backgroundColor: "red",
    // maxWidth: "60%",
  },
};
