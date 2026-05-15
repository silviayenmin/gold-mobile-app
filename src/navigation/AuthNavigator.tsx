import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "@/screens/auth/LoginScreen";
import { ROUTES } from "@/constants/routes";

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};
