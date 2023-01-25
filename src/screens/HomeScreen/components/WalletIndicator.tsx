import { Text } from "@atoms/Text";
import { View } from "@atoms/View";
import { Spacer } from "@atoms/Spacer";
import { ReactComponent as WalletIcon } from "@assets/svg/wallet_48.svg";

export const WalletIndicator = () => {
  return (
    <View flexDirection="row" alignItems={"center"}>
      <Text>0x65a...744</Text>
      <Spacer value={"16px"} horizontal />
      <WalletIcon width={32} fill="white" />
    </View>
  );
};
