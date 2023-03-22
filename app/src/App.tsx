import { View } from "@atoms/View";
import { AppStackContainer } from "@navigation/AppStackContainer";
import { Alert } from "@organisms/Alert";
import { useAppListeners } from "hooks/useAppListeners";
import React from "react";
import "./App.css";

function App() {
  useAppListeners();

  return (
    <>
      <View width={"100vw"} height={"100vh"}>
        <AppStackContainer />
      </View>
      <Alert />
    </>
  );
}

export default App;
