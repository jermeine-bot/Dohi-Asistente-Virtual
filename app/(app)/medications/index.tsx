import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppButton } from '../../../src/components/common/AppButton';
import { ProgressCircle } from '../../../src/components/common/ProgressCircle';
import { MedicationTimeline } from '../../../src/components/medical/MedicationTimeline';
import { AddMedicationModal } from '../../../src/components/medical/AddMedicationModal';
import { mockWeekSchedules } from '../../../src/data/mockMedications';
import { Medication, MedicationStatus } from '../../../src/types/Medication';
import { AppHeader } from '../../../src/components/common/AppHeader';

export default function MedicationsScreen() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Wednesday (today)
  const [schedules, setSchedules] = useState(mockWeekSchedules);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const currentSchedule = schedules[selectedDayIndex];
  const medications = currentSchedule.medications;

  const totalDoses = medications.length;
  const takenDoses = medications.filter(m => m.status === 'TOMADO').length;
  const progressPercentage = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;

  const handleToggleStatus = (medId: string) => {
    setSchedules(prev => {
      return prev.map((sched, sIdx) => {
        if (sIdx !== selectedDayIndex) return sched;
        const updatedMeds = sched.medications.map(med => {
          if (med.id !== medId) return med;
          const nextStatus: MedicationStatus = med.status === 'TOMADO' ? 'PENDIENTE' : 'TOMADO';
          return { ...med, status: nextStatus };
        });
        return { ...sched, medications: updatedMeds };
      });
    });
  };

  const handleSaveMedication = (newMed: Medication, applyToAllDays: boolean) => {
    setSchedules(prev => {
      return prev.map((sched, sIdx) => {
        if (applyToAllDays || sIdx === selectedDayIndex) {
          // Check if it's already there to avoid dupes
          const nextMeds = [...sched.medications, { ...newMed, id: `med-${Date.now()}-${sIdx}` }];
          // Sort by time roughly
          return { ...sched, medications: nextMeds };
        }
        return sched;
      });
    });

    Alert.alert(
      '¡Medicamento Agregado!',
      `Dohi ha programado "${newMed.name}" (${newMed.dosage}) a las ${newMed.time} (${newMed.moment}).`,
      [{ text: 'Entendido' }]
    );
  };

  const handleDeleteMedication = (medId: string, medName: string) => {
    Alert.alert(
      'Eliminar Medicamento',
      `¿Deseas eliminar "${medName}" de tu horario de hoy?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setSchedules(prev => {
              return prev.map((sched, sIdx) => {
                if (sIdx !== selectedDayIndex) return sched;
                const filtered = sched.medications.filter(m => m.id !== medId);
                return { ...sched, medications: filtered };
              });
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with AppHeader & showLogo */}
      <AppHeader
        title="Mis Medicamentos"
        showLogo={true}
        onBack={() => router.back()}
        rightElement={
          <TouchableOpacity
            onPress={() => setIsAddModalOpen(true)}
            activeOpacity={0.7}
            style={styles.addButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="plus" size={20} color={colors.white} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Month Selector Title */}
        <View style={styles.monthRow}>
          <AppText variant="base" weight="bold" color={colors.navy}>
            Agosto 2026
          </AppText>
          <View style={styles.todayPill}>
            <AppText variant="xs" weight="semiBold" color={colors.primary}>
              Semana actual
            </AppText>
          </View>
        </View>

        {/* Horizontal Days Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysScroll}
        >
          {schedules.map((schedule, index) => {
            const isSelected = index === selectedDayIndex;
            return (
              <TouchableOpacity
                key={schedule.date}
                activeOpacity={0.8}
                onPress={() => setSelectedDayIndex(index)}
                style={[
                  styles.dayCard,
                  isSelected && styles.dayCardSelected,
                ]}
              >
                <AppText
                  variant="xs"
                  weight={isSelected ? 'bold' : 'medium'}
                  color={isSelected ? colors.white : colors.textMuted}
                >
                  {schedule.dayName}
                </AppText>
                <AppText
                  variant="lg"
                  weight="bold"
                  color={isSelected ? colors.white : colors.navy}
                  style={styles.dayNumber}
                >
                  {schedule.dayNumber}
                </AppText>
                {schedule.isToday && (
                  <View
                    style={[
                      styles.todayDot,
                      { backgroundColor: isSelected ? colors.white : colors.primary },
                    ]}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Progress Card (Rule 16) */}
        <View style={styles.progressCard}>
          <View style={styles.progressTextCol}>
            <AppText variant="xs" weight="bold" color={colors.primary} style={styles.progressLabel}>
              PROGRESO DE HOY
            </AppText>
            <AppText variant="lg" weight="bold" color={colors.navy} style={styles.progressTitle}>
              Has tomado {takenDoses} de {totalDoses} dosis
            </AppText>
            <AppText variant="xs" color={colors.textSecondary}>
              {totalDoses === 0
                ? 'No tienes medicamentos programados para este día.'
                : takenDoses === totalDoses
                ? '¡Excelente! Has completado todas tus tomas del día.'
                : `Te faltan ${totalDoses - takenDoses} medicamentos por tomar.`}
            </AppText>
          </View>

          <View style={styles.progressCircleWrapper}>
            <ProgressCircle
              progress={progressPercentage}
              size={90}
              strokeWidth={8}
            />
          </View>
        </View>

        {/* Today's Schedule Timeline (Rule 14, 15) */}
        <View style={styles.scheduleSection}>
          <View style={styles.scheduleHeaderRow}>
            <View>
              <AppText variant="lg" weight="bold" color={colors.navy}>
                Horario de {currentSchedule.dayName} {currentSchedule.dayNumber}
              </AppText>
              <AppText variant="xs" color={colors.textMuted}>
                {medications.length} {medications.length === 1 ? 'medicamento programado' : 'medicamentos programados'}
              </AppText>
            </View>

            <TouchableOpacity
              onPress={() => setIsAddModalOpen(true)}
              activeOpacity={0.8}
              style={styles.addInlineBtn}
            >
              <Feather name="plus-circle" size={16} color={colors.primary} />
              <AppText variant="xs" weight="bold" color={colors.primary} style={styles.addInlineText}>
                Agregar
              </AppText>
            </TouchableOpacity>
          </View>

          {medications.length > 0 ? (
            <MedicationTimeline
              medications={medications}
              onToggleStatus={handleToggleStatus}
              onMedicationPress={(med) => {
                Alert.alert(
                  med.name,
                  `Dosis: ${med.dosage}\nHorario: ${med.time}\nMomento: ${med.moment}\nIndicaciones: ${med.instructions || 'Sin indicaciones especiales.'}`,
                  [
                    { text: 'Cerrar', style: 'cancel' },
                    {
                      text: 'Eliminar',
                      style: 'destructive',
                      onPress: () => handleDeleteMedication(med.id, med.name),
                    },
                  ]
                );
              }}
            />
          ) : (
            <View style={styles.emptyStateCard}>
              <MaterialCommunityIcons name="pill" size={44} color={colors.gray400} />
              <AppText variant="base" weight="bold" color={colors.navy} style={styles.emptyTitle}>
                Sin medicamentos programados
              </AppText>
              <AppText variant="xs" color={colors.textSecondary} align="center" style={styles.emptySubtitle}>
                No tienes tomas registradas para este día. Puedes agregar tus pastillas o jarabes con el botón de abajo.
              </AppText>
              <AppButton
                title="Agregar Medicamento +"
                variant="primary"
                size="sm"
                onPress={() => setIsAddModalOpen(true)}
                style={styles.emptyBtn}
              />
            </View>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Interactive Add Medication Modal */}
      <AddMedicationModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveMedication}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    paddingBottom: spacing['2xl'],
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  todayPill: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  daysScroll: {
    paddingBottom: spacing.base,
    gap: spacing.sm,
  },
  dayCard: {
    width: 58,
    height: 74,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  dayCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...shadows.primaryGlow,
  },
  dayNumber: {
    marginVertical: 2,
  },
  todayDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  progressCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing.base,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  progressTextCol: {
    flex: 1,
    paddingRight: spacing.md,
  },
  progressLabel: {
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  progressTitle: {
    marginBottom: 4,
  },
  progressCircleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleSection: {
    marginTop: spacing.sm,
  },
  scheduleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  addInlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  addInlineText: {
    marginLeft: 4,
  },
  emptyStateCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.sm,
    marginTop: spacing.xs,
  },
  emptyTitle: {
    marginTop: spacing.sm,
    marginBottom: 4,
  },
  emptySubtitle: {
    maxWidth: 280,
    marginBottom: spacing.lg,
    lineHeight: 18,
  },
  emptyBtn: {
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
  },
  bottomSpacer: {
    height: 24,
  },
});
