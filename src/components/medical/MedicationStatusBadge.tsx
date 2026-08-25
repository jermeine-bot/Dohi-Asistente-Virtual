import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { AppText } from '../common/AppText';
import { MedicationStatus } from '../../types/Medication';

export interface MedicationStatusBadgeProps {
  status: MedicationStatus;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const MedicationStatusBadge: React.FC<MedicationStatusBadgeProps> = ({
  status,
  size = 'md',
  style,
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'TOMADO':
        return {
          bg: colors.statusTakenBg,
          text: colors.statusTakenText,
          icon: <Feather name="check-circle" size={size === 'sm' ? 12 : 14} color={colors.statusTakenText} />,
          label: 'TOMADO',
        };
      case 'PENDIENTE':
        return {
          bg: colors.statusPendingBg,
          text: colors.statusPendingText,
          icon: <Feather name="clock" size={size === 'sm' ? 12 : 14} color={colors.statusPendingText} />,
          label: 'PENDIENTE',
        };
      case 'NO TOMADO':
        return {
          bg: colors.statusMissedBg,
          text: colors.statusMissedText,
          icon: <Feather name="x-circle" size={size === 'sm' ? 12 : 14} color={colors.statusMissedText} />,
          label: 'NO TOMADO',
        };
    }
  };

  const { bg, text, icon, label } = getBadgeConfig();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bg,
          paddingVertical: size === 'sm' ? 2 : 4,
          paddingHorizontal: size === 'sm' ? spacing.xs + 2 : spacing.sm + 4,
        },
        style,
      ]}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <AppText
        variant={size === 'sm' ? 'xs' : 'sm'}
        weight="semiBold"
        color={text}
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
  iconContainer: {
    marginRight: 4,
  },
});
