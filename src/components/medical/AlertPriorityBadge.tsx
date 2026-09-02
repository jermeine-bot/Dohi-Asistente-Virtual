import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { AlertPriority } from '../../types/EpidemiologicalAlert';
import { colors, radius, spacing } from '../../theme';
import { AppText } from '../common/AppText';

interface AlertPriorityBadgeProps {
  priority: AlertPriority;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const AlertPriorityBadge: React.FC<AlertPriorityBadgeProps> = ({
  priority,
  size = 'md',
  style,
}) => {
  const getBadgeConfig = () => {
    switch (priority) {
      case 'HIGH':
        return {
          label: 'ALTA PRIORIDAD',
          bgColor: '#FEE2E2',
          textColor: '#DC2626',
          borderColor: '#FCA5A5',
          dotColor: '#DC2626',
        };
      case 'ATTENTION':
        return {
          label: 'ATENCIÓN',
          bgColor: '#FFEDD5',
          textColor: '#EA580C',
          borderColor: '#FDBA74',
          dotColor: '#EA580C',
        };
      case 'PREVENTIVE':
        return {
          label: 'PREVENTIVA',
          bgColor: '#FEF3C7',
          textColor: '#D97706',
          borderColor: '#FDE68A',
          dotColor: '#D97706',
        };
      case 'INFO':
      default:
        return {
          label: 'INFORMATIVA',
          bgColor: '#DBEAFE',
          textColor: '#2563EB',
          borderColor: '#93C5FD',
          dotColor: '#2563EB',
        };
    }
  };

  const config = getBadgeConfig();
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.bgColor,
          borderColor: config.borderColor,
          paddingHorizontal: isSm ? spacing.xs + 2 : isLg ? spacing.md : spacing.sm + 2,
          paddingVertical: isSm ? 2 : isLg ? 6 : 4,
        },
        style,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: config.dotColor }]} />
      <AppText
        variant={isSm ? 'xs' : isLg ? 'sm' : 'xs'}
        weight="bold"
        style={{ color: config.textColor, letterSpacing: 0.5 }}
      >
        {config.label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
});
