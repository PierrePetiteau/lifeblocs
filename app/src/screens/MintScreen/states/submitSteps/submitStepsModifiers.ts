import { getInitialSteps, submitStepsState } from "./submitStepsState";

const resetSteps = () => submitStepsState.set(getInitialSteps());

export const submitStepsModifiers = {
  resetSteps,
};
