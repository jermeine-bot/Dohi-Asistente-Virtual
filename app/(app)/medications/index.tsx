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
import { ProgressCircle } from '../../../src/components/common/ProgressCircle';
import { MedicationTimeline } from '../../../src/components/medical/MedicationTimeline';
import { mockWeekSchedules } from '../../../src/data/mockMedications';
import { Medication, MedicationStatus } from '../../../src/types/Medication';

export default function MedicationsScreen() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Wednesday (today)
  const [schedules, setSchedules] = useState(mockWeekSchedules);

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

  const handleAddMedication = () => {
    Alert.alert(
      'Agregar Medicamento',
      'Ingresa el nombre de tu medicamento recetado, dosis y horario para recibir recordatorios automáticos de Dohi.',
      [{ text: 'Entendido' }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with back & + button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={22} color={colors.navy} />
        </TouchableOpacity>

        <AppText variant="lg" weight="bold" color={colors.navy}>
          Mis Medicamentos
        </AppText>

        <TouchableOpacity
          onPress={handleAddMedication}
          activeOpacity={0.7}
          style={styles.addButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="plus" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

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
              {takenDoses === totalDoses
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
            <AppText variant="lg" weight="bold" color={colors.navy}>
              Horario de hoy
            </AppText>
            <AppText variant="xs" color={colors.textMuted}>
              {medications.length} programados
            </AppText>
          </View>

          <MedicationTimeline
            medications={medications}
            onToggleStatus={handleToggleStatus}
            onMedicationPress={(med) => {
              Alert.alert(
                med.name,
                `Dosis: ${med.dosage}\nHorario: ${med.time}\nMomento: ${med.moment}\nIndicaciones: ${med.instructions || 'Sin indicaciones especiales.'}`,
                [{ text: 'Cerrar' }]
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
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
});
