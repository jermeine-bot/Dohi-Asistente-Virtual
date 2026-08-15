import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from './AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'white' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = true,
  disabled,
  style,
  textStyle,
  ...rest
}) => {
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.lg,
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled || loading ? 0.6 : 1,
    };

    // Padding based on size
    switch (size) {
      case 'sm':
        baseStyle.paddingVertical = spacing.sm;
        baseStyle.paddingHorizontal = spacing.md;
        baseStyle.minHeight = 36;
        break;
      case 'lg':
        baseStyle.paddingVertical = spacing.base;
        baseStyle.paddingHorizontal = spacing.xl;
        baseStyle.minHeight = 56;
        break;
      default: // md
        baseStyle.paddingVertical = spacing.md;
        baseStyle.paddingHorizontal = spacing.lg;
        baseStyle.minHeight = 48;
        break;
    }

    // Color & background based on variant
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = colors.lightBlue;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1.5;
        baseStyle.borderColor = colors.primary;
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        break;
      case 'white':
        baseStyle.backgroundColor = colors.white;
        baseStyle.shadowColor = colors.navy;
        baseStyle.shadowOffset = { width: 0, height: 2 };
        baseStyle.shadowOpacity = 0.08;
        baseStyle.shadowRadius = 6;
        baseStyle.elevation = 3;
        break;
      case 'danger':
        baseStyle.backgroundColor = colors.error;
        break;
      default: // primary
        baseStyle.backgroundColor = colors.primary;
        baseStyle.shadowColor = colors.primary;
        baseStyle.shadowOffset = { width: 0, height: 4 };
        baseStyle.shadowOpacity = 0.25;
        baseStyle.shadowRadius = 8;
        baseStyle.elevation = 4;
        break;
    }

    return baseStyle;
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'secondary':
        return colors.primary;
      case 'outline':
        return colors.primary;
      case 'ghost':
        return colors.primary;
      case 'white':
        return colors.primary;
      case 'danger':
        return colors.white;
      default:
        return colors.white;
    }
  };

  const getTextVariant = () => {
    switch (size) {
      case 'sm':
        return 'sm' as const;
      case 'lg':
        return 'lg' as const;
      default:
        return 'base' as const;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[getContainerStyle(), style]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getTextColor()}
          style={styles.spinner}
        />
      ) : (
        <>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <AppText
            variant={getTextVariant()}
            weight="semiBold"
            color={getTextColor()}
            style={textStyle}
          >
            {title}
          </AppText>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
  spinner: {
    paddingVertical: 2,
  },
});
