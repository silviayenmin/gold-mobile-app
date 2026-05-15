import React from "react";
import { View, Text } from "react-native";

export const RevenueChart = () => {
  return (
    <View className="bg-card rounded-2xl p-6 mt-6 items-center justify-center h-48 border border-slate-800">
      <Text className="text-primary text-lg font-bold">Revenue Analytics</Text>
      <Text className="text-slate-500 text-xs mt-2">Chart Rendering...</Text>
      
      <View className="flex-row items-end space-x-2 mt-4 h-20">
        <View className="w-8 bg-primary/20 h-10 rounded-t-lg" />
        <View className="w-8 bg-primary/40 h-16 rounded-t-lg" />
        <View className="w-8 bg-primary/60 h-12 rounded-t-lg" />
        <View className="w-8 bg-primary/80 h-20 rounded-t-lg" />
        <View className="w-8 bg-primary h-14 rounded-t-lg" />
      </View>
    </View>
  );
};
