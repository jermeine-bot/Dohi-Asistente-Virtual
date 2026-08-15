import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';
import { AppText } from './AppText';
import { AppButton } from './AppButton';

export interface EmptyStateProps {
  icon?: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  description,
  actionTitle,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Feather name={icon} size={36} color={colors.primary} />
      </View>
      <AppText variant="lg" weight="bold" color={colors.navy} align="center" style={styles.title}>
        {title}
      </AppText>
      <AppText variant="sm" color={colors.textSecondary} align="center" style={styles.description}>
        {description}
      </AppText>
      {actionTitle && onAction && (
        <AppButton
          title={actionTitle}
          onPress={onAction}
          variant="primary"
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
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  title: {
    marginBottom: spacing.xs,
  },
  description: {
    marginBottom: spacing.xl,
    maxWidth: 280,
  },
  button: {
    paddingHorizontal: spacing.xl,
  },
});
