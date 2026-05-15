import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '../constants/routes';
import { BottomTabParamList } from './types';
import HomeDashboardScreen from '../screens/dashboard/HomeDashboardScreen';
import SchemeListingScreen from '../screens/schemes/SchemeListingScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { Home, LayoutGrid, User } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeDashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.SCHEME_LIST}
        component={SchemeListingScreen}
        options={{
          tabBarLabel: 'Schemes',
          tabBarIcon: ({ color, size }) => <LayoutGrid color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
