import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { enableLegendStateReact } from "@legendapp/state/react";
import DebugScreen from "@screens/DebugScreen/DebugScreen";

enableLegendStateReact();

// window.onresize = function () {
//   window.location.reload();
// };

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
    {/* <DebugScreen /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
