import { Text } from "@atoms/Text";
import { View } from "@atoms/View";
import { Spacer } from "@atoms/Spacer";
import { MouseFollower } from "@atoms/MouseFollower";
import { walletState } from "@states/walletState/walletState";
import { Computed } from "@legendapp/state/react";
import { isAlertAlreadyExist, showSuccessAlert, showWarningAlert } from "@states/alertsState/alertsModifiers";
import { tryConnectWallet } from "@states/walletState/walletModifiers";

export const WalletIndicator = () => {
  return (
    <Computed>
      {() => {
        const [account] = walletState.accounts.get();
        const hasAccount = Boolean(account);
        const onClick = () => {
          if (hasAccount) {
            navigator.clipboard.writeText(account);
            const copiedAlert = { id: "copied", message: "Copied !", duration: 1000 };
            const alreadyCopiedAlert = { id: "already copied", message: "Already copied !", duration: 1000 };
            if (!isAlertAlreadyExist(copiedAlert.id)) {
              showSuccessAlert(copiedAlert);
            } else if (!isAlertAlreadyExist(alreadyCopiedAlert.id)) {
              showWarningAlert(alreadyCopiedAlert);
            }
          } else {
            tryConnectWallet();
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
