import { View } from "@atoms/View";
import { FC } from "react";
import { ReactElement } from "react";
import { Text } from "@atoms/Text";
import { Spacer } from "@atoms/Spacer";

type Props = {
  headerLeft?: ReactElement;
  headerRight?: ReactElement;
};

export const Header: FC<Props> = ({ headerLeft = null, headerRight = null }) => {
  return (
    <View flexDirection="row" paddingVertical={"8px"} position={"absolute"} width="100vw">
      <Spacer value={24} horizontal />
      <View justifyContent={"center"}>{headerLeft}</View>
      <Spacer horizontal />
      <View justifyContent={"center"} alignItems="flex-end">
        {headerRight}
      </View>
      <Spacer value={24} horizontal />
    </View>
  );
};
