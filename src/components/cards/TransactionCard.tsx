import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Text } from '../common/Typography';
import { COLORS } from '../../constants/colors';
import StatusChip from '../common/StatusChip';
import { ChevronRight, CreditCard, Smartphone, Banknote } from 'lucide-react-native';

interface TransactionCardProps {
  transaction: {
    id: string;
    schemeName: string;
    amount: number;
    date: string;
    status: string;
    transactionId: string;
    installmentNo: number;
    method: string;
  };
  index: number;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const getMethodIcon = () => {
    const method = transaction.method || 'UPI';
    switch (method.toLowerCase()) {
      case 'upi':
        return <Smartphone size={16} color={COLORS.textMuted} />;
      case 'card':
        return <CreditCard size={16} color={COLORS.textMuted} />;
      case 'net banking':
        return <Banknote size={16} color={COLORS.textMuted} />;
      default:
        return <CreditCard size={16} color={COLORS.textMuted} />;
    }
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-dark-card border border-border p-5 rounded-2xl mb-4"
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text variant="body" weight="bold">
                {transaction.schemeName}
              </Text>
            </View>
            <Text variant="small" color={COLORS.textMuted} className="mt-1">
              Installment #{transaction.installmentNo} • {transaction.date}
            </Text>
          </View>
          <View className="items-end">
            <Text variant="body" weight="bold" color={COLORS.primary}>
              ₹{transaction.amount.toLocaleString()}
            </Text>
            <View className="mt-1">
              <StatusChip status={transaction.status} variant="outline" />
            </View>
          </View>
        </View>

        <View className="mt-4 pt-4 border-t border-border/50 flex-row justify-between items-center">
          <View className="flex-row items-center">
            {getMethodIcon()}
            <Text variant="small" color={COLORS.textMuted} className="ml-2">
              ID: {transaction.transactionId}
            </Text>
          </View>
          <ChevronRight size={18} color={COLORS.textMuted} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TransactionCard;
