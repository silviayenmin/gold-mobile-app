import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, LucideIcon } from "lucide-react-native";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightIcon?: LucideIcon;
  onRightPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  rightIcon: RightIcon,
  onRightPress,
}) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between px-4 py-4 bg-background">
      <View className="flex-row items-center">
        {showBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4 bg-card p-2 rounded-lg"
          >
            <ChevronLeft size={24} color="#D4AF37" />
          </TouchableOpacity>
        )}
        <Text className="text-textLight text-xl font-bold">{title}</Text>
      </View>
      {RightIcon && (
        <TouchableOpacity onPress={onRightPress} className="bg-card p-2 rounded-lg">
          <RightIcon size={24} color="#D4AF37" />
        </TouchableOpacity>
      )}
    </View>
  );
};
