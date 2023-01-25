import { View } from "@atoms/View";
import React from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

function App() {
  return (
    <View width={"100vw"} height={"100vh"}>
      <HomeScreen />
    </View>
  );
}

export default App;
