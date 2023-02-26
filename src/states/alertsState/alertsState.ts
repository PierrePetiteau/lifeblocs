import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { Colors } from "@states/themeState/colors";

export type AlertType = { id: string; icon: string; message: string; color: keyof Colors; duration: number };
type AlertsType = { queu: (AlertType | null)[] };

const initialAlerts: AlertsType = { queu: [] };
export const alertsState = observable(initialAlerts);

persistObservable(alertsState, { local: "alertsState", persistLocal: ObservablePersistLocalStorage });

alertsState.queu.onChange((queu) => {
  if (queu.length && queu[0] === null) {
    setTimeout(() => {
      alertsState.queu.shift();
    }, 0);
  }
});

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
