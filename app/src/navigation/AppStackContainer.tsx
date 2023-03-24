import { View } from "@atoms/View";
import { Header } from "@molecules/Header/Header";

import { LeftMenu } from "@molecules/LeftMenu";
import { Button } from "@atoms/Button";
import { Row } from "@atoms/Row";
import { Text } from "@atoms/Text";
import { Spacer } from "@atoms/Spacer";
import { motion } from "framer-motion";
import { themeState } from "@states/themeState/themeState";
import { rgba } from "@states/themeState/colors";
import { AppLogoSVG } from "components/svg/AppLogoSVG";
import { AppStack } from "@navigation/AppStack";
import { WalletIndicator } from "@organisms/WalletIndicator";
import { wallet } from "@states/walletState";
import { StyleSheet } from "@helpers/style";
import { lifeblocs } from "@states/lifeblocsState";

export const AppStackContainer = () => {
  const transparent0 = rgba(themeState.elevation1.get().toHex(), 1);
  const transparent80 = rgba(themeState.elevation1.get().toHex(), 0.2);
  const transparent100 = rgba(themeState.elevation1.get().toHex(), 0);

  return (
    <View flex={1} backgroundColor="elevation1">
      <AppStack />
      <motion.div
        style={{
          top: 0,
          position: "absolute",
          height: "20vh",
          width: "100vw",
          backgroundImage: `linear-gradient(to bottom, ${transparent0}, ${transparent80}, ${transparent100})`,
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          bottom: 0,
          position: "absolute",
          height: "20vh",
          width: "100vw",
          backgroundImage: `linear-gradient(to top, ${transparent0}, ${transparent80}, ${transparent100})`,
          pointerEvents: "none",
        }}
      />
      <Header
        headerLeft={
          <Row alignItems={"center"} onClick={() => window.location.reload()}>
            <AppLogoSVG width={50} height={50} />
            <Spacer value={12} horizontal />
            <Text variant="title1">Lifeblocs</Text>
            <Spacer value={8} horizontal />
            <Text variant="title1" rotateZ={5}>
              🔓
            </Text>
          </Row>
        }
        headerRight={<WalletIndicator />}
      />
      <View flexDirection="row" flex={1}>
        <LeftMenu />
        <Button
          onClick={() => {
            lifeblocs.modifiers.syncUserBlocs();
          }}
          style={styles.buyMeACoffeeCTA}
          variant={"outlined"}
          color="secondary"
        >
          <Text variant="subhead">
            BuyMeACoffee
            <Spacer value={8} horizontal />
            <Text variant="largeTitle" rotateZ={5}>
              ☕️
            </Text>
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles: StyleSheet = {
  buyMeACoffeeCTA: {
    bottom: 24,
    right: 24,
    position: "absolute",
  },
};
