import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { colors, Colors } from "@states/ThemeState/colors";
import { textVariants, TextVariants } from "@states/ThemeState/texts";

type Theme = TextVariants & Colors;
const theme: Theme = {...textVariants, ...colors };

export const ThemeState = observable(theme);

persistObservable(ThemeState, { local: "ThemeState", persistLocal: ObservablePersistLocalStorage });
