import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';
import { AppText } from './AppText';

export interface LoadingStateProps {
  message?: string;
  style?: ViewStyle;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Cargando información médica...',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <AppText variant="sm" color={colors.textSecondary} align="center" style={styles.message}>
        {message}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  message: {
    marginTop: spacing.base,
  },
});
