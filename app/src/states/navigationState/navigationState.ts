import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export type MainStackListItemsKey = "project" | "blocs" | "mint";
export type NavigationListItem = { id: MainStackListItemsKey; title: string };

type NavigationStack<Keys> = {
  items: NavigationListItem[];
  currentItemId: Keys;
};

const createNavigationStack = (stack: NavigationStack<MainStackListItemsKey>) => stack;

const navigationStack = createNavigationStack({
  items: [
    { id: "project", title: "Project" },
    { id: "blocs", title: "Blocs" },
    { id: "mint", title: "Mint" },
  ],
  currentItemId: "project",
});

export const navigationState = observable(navigationStack);

persistObservable(navigationState, { local: "navigationState", persistLocal: ObservablePersistLocalStorage });

export const navigate = (itemId: typeof navigationStack.currentItemId) => navigationState.currentItemId.set(itemId);
