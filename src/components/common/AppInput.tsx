import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppText } from './AppText';

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <AppText
          variant="sm"
          weight="medium"
          color={colors.textPrimary}
          style={styles.label}
        >
          {label}
        </AppText>
      )}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error ? styles.inputWrapperError : null,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          placeholderTextColor={colors.gray400}
          style={[styles.input, inputStyle]}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {error ? (
        <AppText variant="xs" color={colors.error} style={styles.errorText}>
          {error}
        </AppText>
      ) : helperText ? (
        <AppText variant="xs" color={colors.textMuted} style={styles.helperText}>
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
    width: '100%',
  },
  label: {
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
  errorText: {
    marginTop: spacing.xs,
  },
  helperText: {
    marginTop: spacing.xs,
  },
});
