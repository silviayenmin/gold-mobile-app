import React from 'react';
import { View } from 'react-native';
import { Text } from './Typography';
import { COLORS } from '../../constants/colors';
import { SearchX } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  message, 
  icon = <SearchX size={64} color={COLORS.border} /> 
}) => {
  return (
    <View className="items-center justify-center py-12 px-6">
      <View className="mb-6 p-6 bg-dark-card rounded-full border border-border/50">
        {icon}
      </View>
      <Text variant="h3" weight="bold" className="text-center">
        {title}
      </Text>
      <Text variant="body" color={COLORS.textMuted} className="text-center mt-2 leading-6">
        {message}
      </Text>
    </View>
  );
};

export default EmptyState;
