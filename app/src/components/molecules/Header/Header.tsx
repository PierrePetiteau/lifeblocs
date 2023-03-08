import { View } from "@atoms/View";
import { FC } from "react";
import { ReactElement } from "react";
import { Text } from "@atoms/Text";
import { Spacer } from "@atoms/Spacer";

type Props = {
  headerLeft?: ReactElement;
  title?: string;
  headerRight?: ReactElement;
};

export const Header: FC<Props> = ({ headerLeft = null, title, headerRight = null }) => {
  return (
    <View flexDirection="row" paddingVertical={"8px"} position={"absolute"} width="100vw">
      <Spacer value={24} horizontal />
      <View flexGrow={1} flexShrink={0} flexBasis={"30%"} justifyContent={"center"}>
        {headerLeft}
      </View>
      <View
        flexGrow={1}
        flexShrink={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {title ? (
          <Text variant="mediumTitle" textAlign="center">
            {title}
          </Text>
        ) : null}
      </View>
      <View flexGrow={1} flexShrink={0} flexBasis={"30%"} justifyContent={"center"} alignItems="flex-end">
        {headerRight}
      </View>
      <Spacer value={24} horizontal />
    </View>
  );
};
