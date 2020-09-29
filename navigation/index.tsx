import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ColorSchemeName } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import ResultScreen from "../screens/ResultScreen";
import SelectionScreen from "../screens/SelectionScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen";

import Loader from "../components/Loader";
import { RootStackParamList } from "../types";
import { auth } from "../services/firebaseService";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
  };

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(onAuthStateChanged);

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);
  // if (isLoading) {
  //   return <Loader />;
  // }
  console.log(user, "dsadsads");
  // auth.signOut();
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
const Stack = createStackNavigator<RootStackParamList>();
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
      <Stack.Screen name="LeaderBoardScreen" component={LeaderBoardScreen} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  );
}
