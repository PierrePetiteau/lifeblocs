import { View } from "@atoms/View";
import { AppStackContainer } from "@navigation/AppStackContainer";
import { Alert } from "@organisms/Alert";
import React from "react";
import "./App.css";

import { useListeners } from "hooks/useListeners";

function App() {
  useListeners();

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
