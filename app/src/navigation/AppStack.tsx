import { Switch } from "@legendapp/state/react";
import { BlocsScreen } from "@screens/BlocsScreen/BlocsScreen";
import DebugScreen from "@screens/DebugScreen/DebugScreen";
import { MintScreen } from "@screens/MintScreen/MintScreen";
import { ProjectScreen } from "@screens/ProjectScreen/ProjectScreen";
import { MainStackListItemsKey, navigationState } from "@states/navigationState/navigationState";

export const AppStack = () => {
  return (
    <Switch<MainStackListItemsKey> value={navigationState.currentItemId}>
      {{
        project: () => <ProjectScreen />,
        blocs: () => <BlocsScreen />,
        mint: () => <MintScreen />,
      }}
    </Switch>
  );
};
