import { Row } from "@atoms/Row";
import { Spacer } from "@atoms/Spacer";
import { Text } from "@atoms/Text";
import { View } from "@atoms/View";
import { StyleSheet } from "@helpers/style";
import { Computed, reactive } from "@legendapp/state/react";
import { alertsState } from "@states/alertsState/alertsState";
import { themeState } from "@states/themeState/themeState";
import { motion, Variant } from "framer-motion";

const Div = reactive(motion.div);
type Variants<Keys extends string> = {
  [key in Keys]: Variant;
};

type VariantKeys = "hidden" | "visible";

const progressBarVariants: Variants<VariantKeys> = {
  hidden: { width: 0 },
  visible: { width: "100%" },
};

export const Alert = () => {
  return (
    <Computed>
      {() => {
        const handleAnimationComplete = () => {
          alertsState.queu[0].set(null);
        };

        const alert = alertsState.queu[0].get();

        if (!alert) {
          return null;
        }

        return (
          <Div style={styles.container}>
            <View backgroundColor="elevation2" borderRadius={10} overflow="hidden">
              <Row style={styles.rowContainer}>
                <Text variant="title1" rotateZ={-5}>
                  {alert.icon}
                </Text>
                <Spacer value={16} horizontal />
                <Text variant="subhead">{alert.message}</Text>
              </Row>
              <Div
                style$={() => {
                  const color = themeState[alert.color].get().toString("rgb");
                  return { backgroundColor: color, height: 1 };
                }}
                initial={"hidden"}
                animate={"visible"}
                variants={progressBarVariants}
                transition={{ duration: alert.duration / 1000 }}
                onAnimationComplete={handleAnimationComplete}
              />
            </View>
          </Div>
        );
      }}
    </Computed>
  );
};

const styles: StyleSheet = {
  container: {
    position: "absolute",
    top: 24,
    left: "50%",
    transform: "translateX(-50%)",
  },
  rowContainer: {
    paddingLeft: 24,
    paddingRight: 34,
    paddingTop: 8,
    paddingBottom: 8,
  },
};
