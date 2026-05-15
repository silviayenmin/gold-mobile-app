import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Wallet,
  CalendarClock,
  TrendingUp
} from "lucide-react-native";
import { DashboardScreen } from "@/screens/dashboard/DashboardScreen";
import { CustomerListScreen } from "@/screens/customers/CustomerListScreen";
import { SchemeManagementScreen } from "@/screens/schemes/SchemeManagementScreen";
import { PaymentManagementScreen } from "@/screens/payments/PaymentManagementScreen";
import { DueCustomersScreen } from "@/screens/installments/DueCustomersScreen";
import { BannerOffersScreen } from "@/screens/banners/BannerOffersScreen";
import { ROUTES } from "@/constants/routes";
import { COLORS } from "@/constants/app";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const Placeholder = ({ name }: { name: string }) => (
  <View className="flex-1 bg-background items-center justify-center">
    <Text className="text-textLight text-xl">{name} Screen</Text>
  </View>
);

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.CARD,
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: "#64748B",
      }}
    >
      <Tab.Screen
        name={ROUTES.DASHBOARD}
        component={DashboardScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.CUSTOMERS}
        component={CustomerListScreen}
        options={{
          tabBarLabel: "Customers",
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.SCHEMES}
        component={SchemeManagementScreen}
        options={{
          tabBarLabel: "Schemes",
          tabBarIcon: ({ color, size }) => <TrendingUp size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.PAYMENTS}
        component={PaymentManagementScreen}
        options={{
          tabBarLabel: "Payments",
          tabBarIcon: ({ color, size }) => <Wallet size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.INSTALLMENTS}
        component={DueCustomersScreen}
        options={{
          tabBarLabel: "Dues",
          tabBarIcon: ({ color, size }) => <CalendarClock size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.BANNERS}
        component={BannerOffersScreen}
        options={{
          tabBarLabel: "Offers",
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
