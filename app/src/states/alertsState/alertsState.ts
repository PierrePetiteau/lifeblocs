import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { Colors } from "@states/themeState/colors";

export type AlertType = { id: string; icon: string; message: string; color: keyof Colors; duration: number };
type AlertsType = { queu: (AlertType | null)[] };

const initialAlerts: AlertsType = { queu: [] };
export const alertsState = observable(initialAlerts);

persistObservable(alertsState, { local: "alertsState", persistLocal: ObservablePersistLocalStorage });
