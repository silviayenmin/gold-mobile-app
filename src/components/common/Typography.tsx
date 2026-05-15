import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface CustomTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
  weight?: 'regular' | 'semibold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export const Text: React.FC<CustomTextProps> = ({
  children,
  variant = 'body',
  weight = 'regular',
  color = COLORS.text,
  align = 'left',
  style,
  ...props
}) => {
  const getFontFamily = () => {
    switch (weight) {
      case 'semibold': return 'Inter-SemiBold';
      case 'bold': return 'Inter-Bold';
      default: return 'Inter-Regular';
    }
  };

  const getFontSize = () => {
    switch (variant) {
      case 'h1': return 32;
      case 'h2': return 24;
      case 'h3': return 20;
      case 'caption': return 14;
      case 'small': return 12;
      default: return 16;
    }
  };

  return (
    <RNText
      style={[
        {
          fontFamily: getFontFamily(),
          fontSize: getFontSize(),
          color,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
