import { alertsState, AlertType } from "./alertsState";

const showAlert = async (alert: AlertType) => {
  alertsState.queu.push(alert);
};

export const isAlertAlreadyExist = (id: string) => {
  return alertsState.queu
    .peek()
    .map((v) => v?.id)
    .includes(id);
};

export const showSuccessAlert = ({
  id = "none",
  icon = "✅",
  message = "Success !",
  color = "green",
  duration = 3000,
}: Partial<AlertType>) => {
  showAlert({ id, icon, message, color, duration });
};

export const showWarningAlert = ({
  id = "none",
  icon = "⚠️",
  message = "Warning !",
  color = "orange",
  duration = 3000,
}: Partial<AlertType>) => {
  showAlert({ id, icon, message, color, duration });
};

export const showErrorAlert = ({
  id = "none",
  icon = "❌",
  message = "Error !",
  color = "red",
  duration = 3000,
}: Partial<AlertType>) => {
  showAlert({ id, icon, message, color, duration });
};
