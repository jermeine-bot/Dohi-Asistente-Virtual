import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../theme';

export interface IconButtonProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  variant?: 'filled' | 'tinted' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  badgeCount?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  badgeCount,
  style,
  ...rest
}) => {
  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return { width: 36, height: 36, borderRadius: radius.full };
      case 'lg':
        return { width: 52, height: 52, borderRadius: radius.full };
      default:
        return { width: 44, height: 44, borderRadius: radius.full };
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'filled':
        return { backgroundColor: colors.primary };
      case 'tinted':
        return { backgroundColor: colors.lightBlue };
      case 'outline':
        return {
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.gray200,
        };
      default:
        return { backgroundColor: 'transparent' };
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.base, getSizeStyle(), getVariantStyle(), style]}
      {...rest}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
