import { submitStepsHelpers } from "./submitStepsHelpers";
import { submitStepsListeners } from "./submitStepsListeners";
import { submitStepsModifiers } from "./submitStepsModifiers";
import { submitStepsState } from "./submitStepsState";

export const submitSteps = {
  state: submitStepsState,
  helpers: submitStepsHelpers,
  listeners: submitStepsListeners,
  modifiers: submitStepsModifiers,
};
