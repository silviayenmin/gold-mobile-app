import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { COLORS } from '../../constants/colors';
import { Text } from './Typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, ...props }) => {
  return (
    <View className="mb-4">
      {label && (
        <Text variant="small" weight="semibold" color={COLORS.textMuted} style={{ marginBottom: 8 }}>
          {label}
        </Text>
      )}
      <View 
        className={`flex-row items-center bg-dark-card border rounded-xl px-4 py-1 ${
          error ? 'border-danger' : 'border-border'
        }`}
      >
        {icon && <View className="mr-3">{icon}</View>}
        <TextInput
          placeholderTextColor={COLORS.textMuted}
          className="flex-1 py-3 text-white font-inter"
          style={{ fontFamily: 'Inter-Regular' }}
          {...props}
        />
      </View>
      {error && (
        <Text variant="small" color={COLORS.danger} style={{ marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
};
