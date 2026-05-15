import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from './Typography';
import { COLORS } from '../../constants/colors';

interface SectionHeaderProps {
  title: string;
  onPressViewAll?: () => void;
  showViewAll?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  onPressViewAll, 
  showViewAll = true 
}) => {
  return (
    <View className="flex-row justify-between items-end mb-4 px-1">
      <Text variant="h3" weight="bold">
        {title}
      </Text>
      {showViewAll && onPressViewAll && (
        <TouchableOpacity onPress={onPressViewAll}>
          <Text variant="small" color={COLORS.primary} weight="semibold">
            View All
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
