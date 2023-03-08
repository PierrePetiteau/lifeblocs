import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { colors, Colors } from "@states/themeState/colors";
import { textVariants, TextVariants } from "@states/themeState/texts";

type Theme = TextVariants & Colors;
const theme: Theme = {...textVariants, ...colors };

export const themeState = observable(theme);

persistObservable(themeState, { local: "themeState", persistLocal: ObservablePersistLocalStorage });
