import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { StatusBadge } from '../common/StatusBadge';
import { Medication } from '../../types/Medication';

export interface MedicationPreviewCardProps {
  medication?: Medication;
  onPressSeeAll?: () => void;
}

export const MedicationPreviewCard: React.FC<MedicationPreviewCardProps> = ({
  medication = {
    id: 'med-2',
    name: 'Ibuprofeno',
    dosage: '600mg',
    moment: 'Desayuno',
    time: '10:00 AM',
    status: 'PENDIENTE',
  },
  onPressSeeAll,
}) => {
  const handleSeeAll = () => {
    if (onPressSeeAll) {
      onPressSeeAll();
    } else {
      router.push('/(app)/medications');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <AppText variant="lg" weight="bold" color={colors.navy}>
          Próxima Medicación
        </AppText>
        <TouchableOpacity
          onPress={handleSeeAll}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AppText variant="sm" weight="semiBold" color={colors.primary}>
            Ver todo
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Main Card */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={handleSeeAll}
        style={styles.card}
      >
        <View style={styles.pillIconContainer}>
          <MaterialCommunityIcons name="pill" size={26} color={colors.primary} />
        </View>

        <View style={styles.medicationInfo}>
          <AppText variant="base" weight="bold" color={colors.navy}>
            {medication.name}
          </AppText>
          <AppText variant="sm" color={colors.textSecondary}>
            {medication.dosage} • {medication.moment}
          </AppText>
        </View>

        <View style={styles.timeAndStatus}>
          <AppText variant="base" weight="bold" color={colors.navy} align="right">
            {medication.time.replace(' AM', '').replace(' PM', '')}
          </AppText>
          <StatusBadge
            label="EN 45 MIN"
            variant="warning"
            size="sm"
            style={styles.statusBadge}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  pillIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  medicationInfo: {
    flex: 1,
  },
  timeAndStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    marginTop: 4,
  },
});
