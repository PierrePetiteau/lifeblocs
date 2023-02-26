import { Row } from "@atoms/Row";
import { Spacer } from "@atoms/Spacer";
import { Text } from "@atoms/Text";
import { View } from "@atoms/View";
import { Computed, reactive } from "@legendapp/state/react";
import { alertsState } from "@states/alertsState/alertsState";
import { themeState } from "@states/themeState/themeState";
import { AnimatePresence, motion, Variant } from "framer-motion";

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
          <Div style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)" }}>
            <View backgroundColor="elevation2" borderRadius={10} overflow="hidden">
              <Row paddingHorizontal={24} paddingVertical={8}>
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
