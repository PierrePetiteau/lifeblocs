import { FC } from "react";
import { View } from "@atoms/View";
import { Spacer } from "@atoms/Spacer";
import { Button } from "@atoms/Button";
import { For } from "@legendapp/state/react";

type CollectionItem = { id: number };
type CollectionList = { items: CollectionItem[]; selection?: number };

type Props = {};

export const Collection: FC<Props> = () => {
  return (
    <View>
      <Spacer />
      <View paddingHorizontal={"32px"} display="flex" flexDirection="row">
        {/* <For<CollectionItem, CollectionItem> each={items}>
          {(item) => {
            return (
              <View flexDirection="row" verticalMargin={20}>
              </View>
            );
          }}
        </For> */}
      </View>
      <Spacer />
    </View>
  );
};
