import React from "react";
import { View, Text } from "react-native";

interface BadgeProps {
  label: string;
  variant?: "success" | "danger" | "warning" | "info" | "gold";
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = "info" }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-success/20 text-success border-success/30";
      case "danger":
        return "bg-danger/20 text-danger border-danger/30";
      case "warning":
        return "bg-accent/20 text-accent border-accent/30";
      case "gold":
        return "bg-primary/20 text-primary border-primary/30";
      default:
        return "bg-slate-700/50 text-slate-300 border-slate-600/50";
    }
  };

  const styles = getVariantStyles().split(" ");
  const bgStyle = styles[0];
  const textStyle = styles[1];
  const borderStyle = styles[2];

  return (
    <View className={`px-2 py-0.5 rounded-full border ${bgStyle} ${borderStyle}`}>
      <Text className={`text-[10px] font-bold uppercase ${textStyle}`}>{label}</Text>
    </View>
  );
};
