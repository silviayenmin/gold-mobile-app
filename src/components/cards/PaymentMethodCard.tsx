import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../common/Typography';
import { COLORS } from '../../constants/colors';
import { CheckCircle2 } from 'lucide-react-native';

interface PaymentMethodCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: (id: string) => void;
  description?: string;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  id,
  name,
  icon,
  selected,
  onSelect,
  description,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      activeOpacity={0.7}
      className={`bg-dark-card border p-4 rounded-2xl flex-row items-center mb-4 ${
        selected ? 'border-primary bg-primary/5' : 'border-border'
      }`}
    >
      <View className={`w-12 h-12 rounded-xl items-center justify-center ${selected ? 'bg-primary/20' : 'bg-dark'}`}>
        {icon}
      </View>
      <View className="flex-1 ml-4">
        <Text weight="bold" color={selected ? COLORS.primary : COLORS.white}>
          {name}
        </Text>
        {description && (
          <Text variant="small" color={COLORS.textMuted} className="mt-1">
            {description}
          </Text>
        )}
      </View>
      {selected && (
        <View>
          <CheckCircle2 color={COLORS.primary} size={20} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PaymentMethodCard;
