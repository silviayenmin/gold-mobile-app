import React from 'react';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { Text } from './Typography';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  colors?: string[];
  containerStyle?: string;
  icon?: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  colors = GRADIENTS.gold as any,
  containerStyle = '',
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`rounded-2xl overflow-hidden shadow-xl ${containerStyle} ${disabled ? 'opacity-50' : ''}`}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="py-4 px-6 items-center justify-center flex-row"
      >
        {loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <>
            {icon && <View className="mr-2">{icon}</View>}
            <Text weight="bold" color={COLORS.white} style={{ fontSize: 16 }}>
              {title}
            </Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
