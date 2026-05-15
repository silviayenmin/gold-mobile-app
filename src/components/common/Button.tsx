import React from 'react';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { Text } from './Typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
}) => {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  
  const content = (
    <View className="flex-row items-center justify-center py-4 px-6">
      {loading ? (
        <ActivityIndicator color={isPrimary ? COLORS.white : COLORS.primary} />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text
            weight="bold"
            color={isOutline ? COLORS.primary : COLORS.white}
          >
            {title}
          </Text>
        </>
      )}
    </View>
  );

  if (isPrimary && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        className="rounded-xl overflow-hidden my-2"
      >
        <LinearGradient
          colors={GRADIENTS.gold as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`rounded-xl my-2 border ${
        isOutline ? 'border-primary' : 'bg-transparent'
      } ${disabled ? 'opacity-50' : ''}`}
    >
      {content}
    </TouchableOpacity>
  );
};
