import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { StatusBadge } from '../common/StatusBadge';
import { AppButton } from '../common/AppButton';
import { Appointment } from '../../types/Appointment';

export interface AppointmentCardProps {
  appointment: Appointment;
  onPress?: () => void;
  onPressAction?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onPress,
  onPressAction,
}) => {
  const isVirtual = appointment.type === 'VIRTUAL';

  const getStatusVariant = () => {
    switch (appointment.status) {
      case 'CONFIRMADA':
        return 'success' as const;
      case 'PENDIENTE':
        return 'warning' as const;
      case 'CANCELADA':
        return 'danger' as const;
      default:
        return 'neutral' as const;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      {/* Header with Doctor & Status */}
      <View style={styles.headerRow}>
        <View style={styles.doctorInfoRow}>
          <Image
            source={{ uri: appointment.doctorAvatar }}
            style={styles.avatar}
          />
          <View style={styles.doctorTextCol}>
            <AppText variant="base" weight="bold" color={colors.navy}>
              {appointment.doctorName}
            </AppText>
            <AppText variant="sm" color={colors.primary} weight="medium">
              {appointment.specialty}
            </AppText>
          </View>
        </View>
        <StatusBadge
          label={appointment.status}
          variant={getStatusVariant()}
          size="sm"
        />
      </View>

      {/* Date & Time Container */}
      <View style={styles.dateTimeContainer}>
        <View style={styles.detailItem}>
          <Feather name="calendar" size={14} color={colors.primary} />
          <AppText variant="xs" weight="semiBold" color={colors.navy} style={styles.detailText}>
            {appointment.date}
          </AppText>
        </View>

        <View style={styles.detailItem}>
          <Feather name="clock" size={14} color={colors.primary} />
          <AppText variant="xs" weight="semiBold" color={colors.navy} style={styles.detailText}>
            {appointment.time}
          </AppText>
        </View>

        <View style={styles.detailItem}>
          <Feather name={isVirtual ? 'video' : 'map-pin'} size={14} color={isVirtual ? '#10B981' : colors.primary} />
          <AppText variant="xs" color={colors.textSecondary} style={styles.detailText} numberOfLines={1}>
            {isVirtual ? 'Consulta Virtual' : appointment.location.split('-')[0]}
          </AppText>
        </View>
      </View>

      {/* Action Footer */}
      {appointment.status === 'CONFIRMADA' && (
        <View style={styles.footerRow}>
          <AppButton
            title={isVirtual ? 'Unirse a la llamada' : 'Ver indicaciones'}
            variant={isVirtual ? 'primary' : 'secondary'}
            size="sm"
            onPress={onPressAction}
            leftIcon={<Feather name={isVirtual ? 'video' : 'navigation'} size={14} color={isVirtual ? colors.white : colors.primary} />}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightBlue,
    marginRight: spacing.md,
  },
  doctorTextCol: {
    flex: 1,
  },
  dateTimeContainer: {
    backgroundColor: colors.gray50,
    borderRadius: radius.lg,
    padding: spacing.sm + 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
  },
  footerRow: {
    marginTop: spacing.xs,
  },
});
