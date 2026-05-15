import React from 'react';
import { View } from 'react-native';
import { Text } from './Typography';
import { COLORS } from '../../constants/colors';

interface StatusChipProps {
  status: 'Paid' | 'Pending' | 'Failed' | string;
  variant?: 'outline' | 'filled';
}

const StatusChip: React.FC<StatusChipProps> = ({ status, variant = 'filled' }) => {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'success':
        return {
          bg: 'bg-success/10',
          text: COLORS.success,
          border: 'border-success/20',
        };
      case 'pending':
      case 'overdue':
        return {
          bg: 'bg-primary/10',
          text: COLORS.primary,
          border: 'border-primary/20',
        };
      case 'failed':
        return {
          bg: 'bg-danger/10',
          text: COLORS.danger,
          border: 'border-danger/20',
        };
      default:
        return {
          bg: 'bg-slate-700/10',
          text: COLORS.textMuted,
          border: 'border-slate-700/20',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View 
      className={`px-3 py-1 rounded-full ${variant === 'filled' ? config.bg : 'bg-transparent border'} ${variant === 'outline' ? config.border : ''}`}
    >
      <Text 
        variant="small" 
        weight="bold" 
        style={{ color: config.text }}
      >
        {status.toUpperCase()}
      </Text>
    </View>
  );
};

export default StatusChip;
