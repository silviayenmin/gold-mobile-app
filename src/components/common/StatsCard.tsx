import React from "react";
import { View, Text } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { Card } from "./Card";

interface StatsCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: "up" | "down";
  trendValue?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subValue,
  icon: Icon,
  iconColor = "#D4AF37",
  trend,
  trendValue,
}) => {
  return (
    <Card className="flex-1 min-w-[45%] m-1">
      <View className="flex-row justify-between items-start mb-2">
        <View className="bg-background/50 p-2 rounded-lg">
          <Icon size={20} color={iconColor} />
        </View>
        {trend && (
          <View className={`px-2 py-1 rounded-full ${trend === "up" ? "bg-success/20" : "bg-danger/20"}`}>
            <Text className={`text-[10px] font-bold ${trend === "up" ? "text-success" : "text-danger"}`}>
              {trendValue}
            </Text>
          </View>
        )}
      </View>
      <Text className="text-slate-400 text-xs mb-1 font-medium">{title}</Text>
      <Text className="text-textLight text-xl font-bold">{value}</Text>
      {subValue && <Text className="text-slate-500 text-[10px] mt-1">{subValue}</Text>}
    </Card>
  );
};
