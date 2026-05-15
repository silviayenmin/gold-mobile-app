import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../common/Typography';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

interface SummaryCardProps {
  title: string;
  amount: number;
  subtitle?: string;
  isGoldGradient?: boolean;
  children?: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  amount, 
  subtitle, 
  isGoldGradient = true,
  children 
}) => {
  return (
    <LinearGradient
      colors={isGoldGradient ? (GRADIENTS.gold as any) : ['#1E293B', '#0F172A']}
      className="p-6 rounded-3xl overflow-hidden shadow-lg"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View>
        <Text 
          variant="small" 
          weight="bold" 
          color={isGoldGradient ? COLORS.white : COLORS.textMuted} 
          style={{ opacity: isGoldGradient ? 0.8 : 1, letterSpacing: 1 }}
        >
          {title.toUpperCase()}
        </Text>
        <View className="flex-row items-baseline mt-2">
          <Text 
            variant="h1" 
            weight="bold" 
            color={isGoldGradient ? COLORS.white : COLORS.primary}
            style={{ fontSize: 32 }}
          >
            ₹{amount.toLocaleString()}
          </Text>
        </View>
        {subtitle && (
          <Text 
            variant="small" 
            color={isGoldGradient ? COLORS.white : COLORS.textMuted} 
            className="mt-1"
            style={{ opacity: isGoldGradient ? 0.7 : 1 }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {children && <View className="mt-4">{children}</View>}
    </LinearGradient>
  );
};

export default SummaryCard;
