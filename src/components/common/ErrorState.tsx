import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';
import { AppText } from './AppText';
import { AppButton } from './AppButton';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Ha ocurrido un error',
  message = 'No se pudo cargar la información. Por favor revisa tu conexión e inténtalo de nuevo.',
  onRetry,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Feather name="alert-triangle" size={36} color={colors.error} />
      </View>
      <AppText variant="lg" weight="bold" color={colors.navy} align="center" style={styles.title}>
        {title}
      </AppText>
      <AppText variant="sm" color={colors.textSecondary} align="center" style={styles.message}>
        {message}
      </AppText>
      {onRetry && (
        <AppButton
          title="Reintentar"
          onPress={onRetry}
          variant="outline"
          size="md"
          fullWidth={false}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['2xl'],
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.errorLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  title: {
    marginBottom: spacing.xs,
  },
  message: {
    marginBottom: spacing.xl,
    maxWidth: 280,
  },
  button: {
    paddingHorizontal: spacing.xl,
  },
});
