import { FC } from "react";
import { View } from "@atoms/View";
import { Spacer } from "@atoms/Spacer";
import { Button } from "@atoms/Button";
import { For } from "@legendapp/state/react";
import { observable } from "@legendapp/state";

type LeftMenuButton = { id: number; title: string; onClick?: () => void };
type LeftMenuButtons = { items: LeftMenuButton[]; selection?: number };

type Props = {
  buttons: Omit<LeftMenuButton, "id">[];
  initialIndex?: number;
};

export const LeftMenu: FC<Props> = ({ buttons, initialIndex }) => {
  const { items, selection } = observable<LeftMenuButtons>({
    items: buttons.map((v, i) => ({ id: i, title: v.title, onClick: v.onClick })),
    selection: initialIndex,
  });

  return (
    <View>
      <Spacer />
      <View paddingHorizontal={"32px"} display="flex" flexDirection="column">
        <For<LeftMenuButton, LeftMenuButton> each={items}>
          {(item) => {
            const onClick = () => {
              selection?.set(item.id.peek());
            };
            return (
              <View flexDirection="row" verticalMargin={20}>
                <Button
                  onClick={onClick}
                  title$={() => item.title.peek()}
                  variant$={() => (item.id.get() === selection?.get() ? "contained" : "outlined")}
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
