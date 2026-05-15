import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import { AppStackParamList } from './types';
import BottomTabNavigator from './BottomTabNavigator';
import SchemeDetailsScreen from '../screens/schemes/SchemeDetailsScreen';
import JoinSchemeScreen from '../screens/schemes/JoinSchemeScreen';
import PaymentScreen from '../screens/payments/PaymentScreen';
import PaymentHistoryScreen from '../screens/payments/PaymentHistoryScreen';
import InstallmentTrackerScreen from '../screens/installments/InstallmentTrackerScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.MAIN_TABS} component={BottomTabNavigator} />
      <Stack.Screen name={ROUTES.SCHEME_DETAILS} component={SchemeDetailsScreen} />
      <Stack.Screen name={ROUTES.JOIN_SCHEME} component={JoinSchemeScreen} />
      <Stack.Screen name={ROUTES.PAYMENT} component={PaymentScreen} />
      <Stack.Screen name={ROUTES.PAYMENT_HISTORY} component={PaymentHistoryScreen} />
      <Stack.Screen name={ROUTES.INSTALLMENT_TRACKER} component={InstallmentTrackerScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
