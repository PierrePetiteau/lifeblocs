import { View } from "@atoms/View";
import { AppStackContainer } from "@navigation/AppStackContainer";
import { Alert } from "@organisms/Alert";
import React from "react";
import "./App.css";

function App() {
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
