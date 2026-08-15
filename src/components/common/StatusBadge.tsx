import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { AppText } from './AppText';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'neutral' | 'live';

export interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'md',
  icon,
  style,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: colors.statusTakenBg, text: colors.statusTakenText };
      case 'warning':
        return { bg: colors.statusPendingBg, text: colors.statusPendingText };
      case 'danger':
        return { bg: colors.statusMissedBg, text: colors.statusMissedText };
      case 'info':
        return { bg: colors.lightBlue, text: colors.primary };
      case 'primary':
        return { bg: colors.primary, text: colors.white };
      case 'live':
        return { bg: '#EF4444', text: '#FFFFFF' };
      default:
        return { bg: colors.gray100, text: colors.gray600 };
    }
  };

  const { bg, text } = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bg,
          paddingVertical: size === 'sm' ? 2 : 4,
          paddingHorizontal: size === 'sm' ? spacing.xs + 2 : spacing.sm + 2,
        },
        style,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <AppText
        variant={size === 'sm' ? 'xs' : 'sm'}
        weight="semiBold"
        color={text}
        style={styles.text}
      >
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    letterSpacing: 0.3,
  },
});
