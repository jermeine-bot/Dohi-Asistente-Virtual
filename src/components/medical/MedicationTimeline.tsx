import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { AppText } from '../common/AppText';
import { MedicationStatusBadge } from './MedicationStatusBadge';
import { Medication } from '../../types/Medication';

export interface MedicationTimelineProps {
  medications: Medication[];
  onToggleStatus?: (id: string) => void;
  onMedicationPress?: (med: Medication) => void;
}

export const MedicationTimeline: React.FC<MedicationTimelineProps> = ({
  medications,
  onToggleStatus,
  onMedicationPress,
}) => {
  return (
    <View style={styles.container}>
      {medications.map((med, index) => {
        const isLast = index === medications.length - 1;
        const isTaken = med.status === 'TOMADO';
        const isMissed = med.status === 'NO TOMADO';

        return (
          <View key={med.id} style={styles.timelineRow}>
            {/* Left timeline column: time & connector node */}
            <View style={styles.timelineLeftCol}>
              <AppText variant="xs" weight="bold" color={colors.navy} align="center">
                {med.time.split(' ')[0]}
              </AppText>
              <AppText variant="xs" color={colors.textMuted} align="center">
                {med.time.split(' ')[1]}
              </AppText>

              {/* Node indicator */}
              <View
                style={[
                  styles.nodeCircle,
                  isTaken && styles.nodeTaken,
                  isMissed && styles.nodeMissed,
                ]}
              >
                {isTaken ? (
                  <Feather name="check" size={10} color={colors.white} />
                ) : (
                  <View style={styles.innerDot} />
                )}
              </View>

              {/* Vertical line connecting to next item */}
              {!isLast && <View style={styles.verticalLine} />}
            </View>

            {/* Right medication card */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => onMedicationPress?.(med)}
              style={[styles.card, isTaken && styles.cardTaken]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.medTitleRow}>
                  <MaterialCommunityIcons
                    name="pill"
                    size={18}
                    color={isTaken ? colors.success : colors.primary}
                    style={styles.pillIcon}
                  />
                  <AppText
                    variant="base"
                    weight="bold"
                    color={isTaken ? colors.gray600 : colors.navy}
                    style={isTaken ? styles.textTaken : undefined}
                  >
                    {med.name}
                  </AppText>
                </View>
                <MedicationStatusBadge status={med.status} size="sm" />
              </View>

              <AppText variant="sm" color={colors.textSecondary} style={styles.dosageText}>
                {med.dosage} • {med.moment}
              </AppText>

              {med.instructions && (
                <AppText variant="xs" color={colors.textMuted} style={styles.instructionsText}>
                  {med.instructions}
                </AppText>
              )}

              {/* Action row to mark as taken */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onToggleStatus?.(med.id)}
                  style={[styles.actionButton, isTaken && styles.actionButtonTaken]}
                >
                  <Feather
                    name={isTaken ? 'check-circle' : 'circle'}
                    size={14}
                    color={isTaken ? colors.success : colors.primary}
                  />
                  <AppText
                    variant="xs"
                    weight="semiBold"
                    color={isTaken ? colors.success : colors.primary}
                    style={styles.actionText}
                  >
                    {isTaken ? 'Dosis completada' : 'Marcar como tomado'}
                  </AppText>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: spacing.base,
  },
  timelineLeftCol: {
    width: 60,
    alignItems: 'center',
    paddingTop: 2,
    position: 'relative',
  },
  nodeCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.lightBlue,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    zIndex: 2,
  },
  nodeTaken: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  nodeMissed: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  verticalLine: {
    position: 'absolute',
    top: 50,
    bottom: -20,
    width: 2,
    backgroundColor: colors.gray200,
    zIndex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTaken: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  medTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.xs,
  },
  pillIcon: {
    marginRight: 6,
  },
  textTaken: {
    textDecorationLine: 'line-through',
  },
  dosageText: {
    marginBottom: 4,
  },
  instructionsText: {
    marginBottom: spacing.sm,
  },
  actionRow: {
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    paddingTop: spacing.xs + 2,
    marginTop: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonTaken: {
    opacity: 0.85,
  },
  actionText: {
    marginLeft: 6,
  },
});
