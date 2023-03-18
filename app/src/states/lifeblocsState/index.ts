import { lifeblocsHelpers } from "./lifeblocsHelpers";
import { lifeBlocsListeners } from "./lifeblocsListeners";
import { lifeblocsModifiers } from "./lifeblocsModifiers";
import { lifeblocsState } from "./lifeblocsState";

export const lifeblocs = {
  state: lifeblocsState,
  helpers: lifeblocsHelpers,
  modifiers: lifeblocsModifiers,
  listeners: lifeBlocsListeners,
};
