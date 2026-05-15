import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { LucideIcon } from "lucide-react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  loading?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  icon: Icon,
  className = "",
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary";
      case "secondary":
        return "bg-card";
      case "outline":
        return "bg-transparent border border-primary";
      case "danger":
        return "bg-danger";
      default:
        return "bg-primary";
    }
  };

  const getTextClasses = () => {
    switch (variant) {
      case "outline":
        return "text-primary";
      default:
        return "text-background font-bold";
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      className={`h-14 rounded-xl flex-row items-center justify-center px-6 ${getVariantClasses()} ${
        disabled ? "opacity-50" : ""
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#D4AF37" : "#0F172A"} />
      ) : (
        <View className="flex-row items-center">
          {Icon && <Icon size={20} color={variant === "outline" ? "#D4AF37" : "#0F172A"} className="mr-2" />}
          <Text className={`text-base ${getTextClasses()}`}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
