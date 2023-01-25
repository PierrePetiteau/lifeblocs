import { Spacer } from "@atoms/Spacer";
import { View } from "@atoms/View";
import { FC } from "react";
import { ReactElement } from "react";
import { Text } from "@atoms/Text";

type Props = {
  headerLeft?: ReactElement;
  title?: string;
  headerRight?: ReactElement;
};

export const Header: FC<Props> = ({ headerLeft = null, title, headerRight = null }) => {
  return (
    <View flexDirection="row" paddingVertical={"24px"} paddingHorizontal={"32px"}>
      <View flexGrow={1} flexBasis={"20%"} justifyContent={"center"}>
        {headerLeft}
      </View>
      <View flexGrow={1} flexBasis={"60%"} justifyContent={"center"} alignItems={"center"}>
        {title ? (
          <Text variant="largeTitle" textAlign="center">
            {title}
          </Text>
        ) : null}
      </View>
      <View flexGrow={1} flexBasis={"20%"} justifyContent={"center"} alignItems="flex-end">
        {headerRight}
      </View>
    </View>
  );
};
