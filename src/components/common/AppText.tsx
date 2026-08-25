import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export interface AppTextProps extends RNTextProps {
  variant?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'base',
  weight = 'regular',
  color = colors.textPrimary,
  align = 'left',
  style,
  ...rest
}) => {
  const getFontFamily = () => {
    switch (weight) {
      case 'medium':
        return typography.fontFamily.medium;
      case 'semiBold':
        return typography.fontFamily.semiBold;
      case 'bold':
        return typography.fontFamily.bold;
      default:
        return typography.fontFamily.regular;
    }
  };

  return (
    <RNText
      style={[
        styles.base,
        {
          fontSize: typography.sizes[variant],
          lineHeight: typography.lineHeights[variant],
          fontWeight: typography.weights[weight],
          fontFamily: getFontFamily(),
          color,
          textAlign: align,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
