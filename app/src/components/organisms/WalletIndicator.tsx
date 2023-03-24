import { Text } from "@atoms/Text";
import { View } from "@atoms/View";
import { Spacer } from "@atoms/Spacer";
import { MouseFollower } from "@atoms/MouseFollower";
import { Computed } from "@legendapp/state/react";
import { wallet } from "@states/walletState";

export const WalletIndicator = () => {
  return (
    <Computed>
      {() => {
        const [account] = wallet.state.accounts.get();
        const hasAccount = Boolean(account);
        const onClick = () => {
          if (hasAccount) {
            wallet.state.accounts.set([]);
          } else {
            wallet.modifiers.tryConnectWallet();
          }
        };
        return (
          <View flexDirection="row" alignItems={"center"} onClick={onClick}>
            {hasAccount ? <Text>{account.slice(0, 5) + "..." + account.slice(-3)}</Text> : null}
            <Spacer value={"12px"} horizontal />
            <MouseFollower disabled={hasAccount}>
              <View
                width={40}
                height={40}
                border={"3px solid"}
                borderColor={hasAccount ? "green" : "orange"}
                borderRadius={100}
                justifyContent={"center"}
                alignItems="center"
              >
                <Text variant="largeTitle">🦊</Text>
              </View>
            </MouseFollower>
          </View>
        );
      }}
    </Computed>
  );
};
