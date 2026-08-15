import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { MedicationStatusBadge } from './MedicationStatusBadge';
import { Medication } from '../../types/Medication';

export interface MedicationCardProps {
  medication: Medication;
  onToggleStatus?: (id: string) => void;
  onPress?: () => void;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  onToggleStatus,
  onPress,
}) => {
  const isTaken = medication.status === 'TOMADO';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, isTaken && styles.cardTaken]}
    >
      <View style={styles.leftRow}>
        {/* Check toggle button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onToggleStatus?.(medication.id)}
          style={[
            styles.checkCircle,
            isTaken && styles.checkCircleActive,
            medication.status === 'NO TOMADO' && styles.checkCircleMissed,
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {isTaken ? (
            <Feather name="check" size={16} color={colors.white} />
          ) : medication.status === 'NO TOMADO' ? (
            <Feather name="x" size={16} color={colors.white} />
          ) : (
            <MaterialCommunityIcons name="pill" size={16} color={colors.gray400} />
          )}
        </TouchableOpacity>

        <View style={styles.infoCol}>
          <AppText
            variant="base"
            weight="bold"
            color={isTaken ? colors.gray600 : colors.navy}
            style={isTaken ? styles.textTaken : undefined}
          >
            {medication.name}
          </AppText>
          <AppText variant="sm" color={colors.textSecondary}>
            {medication.dosage} • {medication.moment}
          </AppText>
          {medication.instructions && (
            <AppText variant="xs" color={colors.textMuted} numberOfLines={1} style={styles.instructions}>
              {medication.instructions}
            </AppText>
          )}
        </View>
      </View>

      <View style={styles.rightCol}>
        <AppText variant="sm" weight="bold" color={colors.navy} align="right">
          {medication.time}
        </AppText>
        <View style={styles.badgeWrapper}>
          <MedicationStatusBadge status={medication.status} size="sm" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  cardTaken: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.md,
  },
  checkCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    backgroundColor: colors.gray50,
  },
  checkCircleActive: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkCircleMissed: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  infoCol: {
    flex: 1,
  },
  textTaken: {
    textDecorationLine: 'line-through',
    color: colors.gray500,
  },
  instructions: {
    marginTop: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
  },
  badgeWrapper: {
    marginTop: 6,
  },
});
