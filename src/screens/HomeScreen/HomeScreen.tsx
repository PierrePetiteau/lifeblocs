import { useRef } from "react";
import { ReactComponent as AppIcon } from "@assets/svg/app_logo.svg";
import { Legend } from "@legendapp/state/react-components";
import { AppState } from "@states/AppState";

import { Text } from "@atoms/Text";
import { View } from "@atoms/View";
import { Spacer } from "@atoms/Spacer";
import { Header } from "@molecules/Header/Header";

import { WalletIndicator } from "@screens/HomeScreen/components/WalletIndicator";
import { LeftMenu } from "@molecules/LeftMenu";

export default function HomeScreen() {
  const renderCount = ++useRef(0).current;

  return (
    <View flex={1} backgroundColor="elevation1">
      <Header
        headerLeft={<AppIcon width={80} onClick={() => window.location.reload()} />}
        title="Web3 achievements"
        headerRight={<WalletIndicator />}
      />
      <View flex={1} flexDirection="row">
        <LeftMenu buttons={[{ title: "Settings" }, { title: "Collection" }, { title: "Mint" }]} initialIndex={1} />

        <View flex={1}></View>
      </View>
      <View flexDirection="row" height={"100px"} backgroundColor="blue" />
    </View>
  );
}
