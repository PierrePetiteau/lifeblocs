import { FC } from "react";
import { View } from "@atoms/View";
import { Spacer } from "@atoms/Spacer";
import { Button } from "@atoms/Button";
import { For } from "@legendapp/state/react";
import { navigate, NavigationListItem, navigationState } from "@states/navigationState/navigationState";

type Props = {};

export const LeftMenu: FC<Props> = () => {
  return (
    <View flexBasis={"250px"} position="absolute" top={"50%"} translateY="-50%">
      <Spacer />
      <View paddingHorizontal={"32px"} display="flex" flexDirection="column">
        <For<NavigationListItem, NavigationListItem> each={navigationState.items}>
          {(item) => {
            const onClick = () => {
              navigate(item.id.peek());
            };
            return (
              <View flexDirection="row" marginVertical={20}>
                <Button
                  onClick={onClick}
                  title$={() => item.title.peek()}
                  variant={"outlined"}
                  color$={() => (item.id.get() === navigationState.currentItemId?.get() ? "white" : "secondary")}
                />
                <Spacer />
              </View>
            );
          }}
        </For>
      </View>
      <Spacer />
    </View>
  );
};
