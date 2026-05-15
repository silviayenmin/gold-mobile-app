import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { LucideIcon } from "lucide-react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  containerClassName = "",
  ...props
}) => {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && <Text className="text-textLight mb-2 text-sm font-medium">{label}</Text>}
      <View
        className={`flex-row items-center bg-card border rounded-xl px-4 h-14 ${
          error ? "border-danger" : "border-slate-700"
        }`}
      >
        {Icon && <Icon size={20} color="#94A3B8" className="mr-3" />}
        <TextInput
          placeholderTextColor="#64748B"
          className="flex-1 text-textLight text-base"
          {...props}
        />
      </View>
      {error && <Text className="text-danger text-xs mt-1 ml-1">{error}</Text>}
    </View>
  );
};
