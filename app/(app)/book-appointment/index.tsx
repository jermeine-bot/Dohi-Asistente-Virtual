import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppButton } from '../../../src/components/common/AppButton';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { mockDoctors } from '../../../src/data/mockDoctors';
import { Doctor, Specialty } from '../../../src/types/Doctor';

const specialtiesList: { name: Specialty; icon: string; count: number }[] = [
  { name: 'Medicina General', icon: 'stethoscope', count: 8 },
  { name: 'Pediatría', icon: 'baby', count: 5 },
  { name: 'Cardiología', icon: 'heartbeat', count: 4 },
  { name: 'Dermatología', icon: 'hand-holding-medical', count: 6 },
  { name: 'Psicología', icon: 'brain', count: 7 },
  { name: 'Nutrición', icon: 'apple-alt', count: 3 },
  { name: 'Ginecología', icon: 'female', count: 4 },
  { name: 'Oftalmología', icon: 'eye', count: 3 },
];

const availableDates = [
  { date: '18 Ago', dayName: 'Lun', full: 'Lunes 18 de Agosto, 2026' },
  { date: '19 Ago', dayName: 'Mar', full: 'Martes 19 de Agosto, 2026' },
  { date: '20 Ago', dayName: 'Mié', full: 'Miércoles 20 de Agosto, 2026' },
  { date: '21 Ago', dayName: 'Jue', full: 'Jueves 21 de Agosto, 2026' },
  { date: '22 Ago', dayName: 'Vie', full: 'Viernes 22 de Agosto, 2026' },
];

export default function BookAppointmentScreen() {
  const [step, setStep] = useState<number>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>('Medicina General');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(mockDoctors[0]);
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].full);
  const [selectedSlot, setSelectedSlot] = useState<string>('09:30 AM');
  const [appointmentType, setAppointmentType] = useState<'PRESENCIAL' | 'VIRTUAL'>('PRESENCIAL');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const filteredDoctors = mockDoctors.filter(d => d.specialty === selectedSpecialty);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setIsSuccessModalVisible(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return '1. Selecciona Especialidad';
      case 2:
        return '2. Selecciona Médico';
      case 3:
        return '3. Elige la Fecha';
      case 4:
        return '4. Selecciona Horario';
      case 5:
        return '5. Confirmar Cita';
      default:
        return 'Reservar Cita';
    }
  };

  if (isSuccessModalVisible) {
    return (
      <SafeAreaView style={styles.successContainer}>
        <View style={styles.successCard}>
          <View style={styles.successIconCircle}>
            <Feather name="check-circle" size={48} color={colors.success} />
          </View>

          <AppText variant="2xl" weight="bold" color={colors.navy} align="center" style={styles.successTitle}>
            ¡Cita Reservada con Éxito!
          </AppText>

          <AppText variant="sm" color={colors.textSecondary} align="center" style={styles.successSubtitle}>
            Hemos agendado tu cita médica. Recibirás un recordatorio automático en DOHI.
          </AppText>

          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <AppText variant="xs" color={colors.textMuted}>Médico:</AppText>
              <AppText variant="sm" weight="bold" color={colors.navy}>{selectedDoctor?.name}</AppText>
            </View>
            <View style={styles.summaryRow}>
              <AppText variant="xs" color={colors.textMuted}>Especialidad:</AppText>
              <AppText variant="sm" weight="medium" color={colors.primary}>{selectedSpecialty}</AppText>
            </View>
            <View style={styles.summaryRow}>
              <AppText variant="xs" color={colors.textMuted}>Fecha y Hora:</AppText>
              <AppText variant="sm" weight="bold" color={colors.navy}>{selectedDate} • {selectedSlot}</AppText>
            </View>
            <View style={styles.summaryRow}>
              <AppText variant="xs" color={colors.textMuted}>Modalidad:</AppText>
              <AppText variant="sm" weight="semiBold" color={appointmentType === 'VIRTUAL' ? '#10B981' : colors.primary}>
                {appointmentType === 'VIRTUAL' ? 'Consulta Virtual' : 'Presencial'}
              </AppText>
            </View>
          </View>

          <AppButton
            title="Ver mis Citas"
            variant="primary"
            size="lg"
            onPress={() => {
              setIsSuccessModalVisible(false);
              router.replace('/(app)/(tabs)/appointments');
            }}
            style={styles.successButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <AppHeader
        title="Reservar Cita"
        subtitle={`Paso ${step} de 5`}
        onBack={handleBack}
      />

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(step / 5) * 100}%` }]} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="xl" weight="bold" color={colors.navy} style={styles.stepHeader}>
          {getStepTitle()}
        </AppText>

        {/* STEP 1: Especialidad */}
        {step === 1 && (
          <View style={styles.gridContainer}>
            {specialtiesList.map((item) => {
              const isSelected = selectedSpecialty === item.name;
              return (
                <TouchableOpacity
                  key={item.name}
                  activeOpacity={0.8}
                  onPress={() => setSelectedSpecialty(item.name)}
                  style={[
                    styles.specialtyCard,
                    isSelected && styles.specialtyCardSelected,
                  ]}
                >
                  <View style={[styles.specialtyIconCircle, isSelected && styles.specialtyIconSelected]}>
                    <FontAwesome5
                      name={item.icon}
                      size={20}
                      color={isSelected ? colors.white : colors.primary}
                    />
                  </View>
                  <AppText
                    variant="sm"
                    weight={isSelected ? 'bold' : 'medium'}
                    color={isSelected ? colors.primary : colors.navy}
                    align="center"
                  >
                    {item.name}
                  </AppText>
                  <AppText variant="xs" color={colors.textMuted} align="center">
                    {item.count} médicos
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* STEP 2: Médico */}
        {step === 2 && (
          <View>
            <AppText variant="sm" color={colors.textSecondary} style={styles.stepHint}>
              Médicos disponibles en {selectedSpecialty}:
            </AppText>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => {
                const isSelected = selectedDoctor?.id === doctor.id;
                return (
                  <TouchableOpacity
                    key={doctor.id}
                    activeOpacity={0.9}
                    onPress={() => setSelectedDoctor(doctor)}
                    style={[
                      styles.doctorCard,
                      isSelected && styles.doctorCardSelected,
                    ]}
                  >
                    <Image source={{ uri: doctor.avatarUrl }} style={styles.doctorAvatar} />
                    <View style={styles.doctorInfo}>
                      <AppText variant="base" weight="bold" color={colors.navy}>
                        {doctor.name}
                      </AppText>
                      <AppText variant="sm" color={colors.primary} weight="medium">
                        {doctor.specialty} • {doctor.experienceYears} años exp.
                      </AppText>
                      <View style={styles.ratingRow}>
                        <Feather name="star" size={13} color="#F59E0B" />
                        <AppText variant="xs" weight="bold" color={colors.navy} style={styles.ratingText}>
                          {doctor.rating} ({doctor.reviewCount} opiniones)
                        </AppText>
                      </View>
                      <AppText variant="xs" color={colors.textMuted} style={styles.clinicText}>
                        {doctor.clinic}
                      </AppText>
                    </View>
                    <View style={styles.radioCircle}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              mockDoctors.slice(0, 2).map((doctor) => (
                <TouchableOpacity
                  key={doctor.id}
                  activeOpacity={0.9}
                  onPress={() => setSelectedDoctor(doctor)}
                  style={styles.doctorCard}
                >
                  <Image source={{ uri: doctor.avatarUrl }} style={styles.doctorAvatar} />
                  <View style={styles.doctorInfo}>
                    <AppText variant="base" weight="bold" color={colors.navy}>
                      {doctor.name}
                    </AppText>
                    <AppText variant="sm" color={colors.primary}>
                      {doctor.specialty}
                    </AppText>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {/* STEP 3: Fecha */}
        {step === 3 && (
          <View>
            <AppText variant="sm" color={colors.textSecondary} style={styles.stepHint}>
              Selecciona el día de tu consulta médica:
            </AppText>
            {availableDates.map((d) => {
              const isSelected = selectedDate === d.full;
              return (
                <TouchableOpacity
                  key={d.full}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDate(d.full)}
                  style={[
                    styles.dateOptionCard,
                    isSelected && styles.dateOptionSelected,
                  ]}
                >
                  <View style={styles.dateIconWrapper}>
                    <Feather
                      name="calendar"
                      size={20}
                      color={isSelected ? colors.primary : colors.gray500}
                    />
                  </View>
                  <View style={styles.dateTextCol}>
                    <AppText variant="base" weight={isSelected ? 'bold' : 'medium'} color={colors.navy}>
                      {d.full}
                    </AppText>
                    <AppText variant="xs" color={colors.textMuted}>
                      Horarios disponibles en mañana y tarde
                    </AppText>
                  </View>
                  <View style={styles.radioCircle}>
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* STEP 4: Horario y Modalidad */}
        {step === 4 && (
          <View>
            <AppText variant="base" weight="bold" color={colors.navy} style={styles.subSectionTitle}>
              Modalidad de atención:
            </AppText>
            <View style={styles.typeSelectorRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setAppointmentType('PRESENCIAL')}
                style={[
                  styles.typeOption,
                  appointmentType === 'PRESENCIAL' && styles.typeOptionSelected,
                ]}
              >
                <Feather name="map-pin" size={18} color={appointmentType === 'PRESENCIAL' ? colors.primary : colors.gray500} />
                <AppText variant="sm" weight="semiBold" color={appointmentType === 'PRESENCIAL' ? colors.primary : colors.navy} style={styles.typeText}>
                  Presencial (Sede)
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setAppointmentType('VIRTUAL')}
                style={[
                  styles.typeOption,
                  appointmentType === 'VIRTUAL' && styles.typeOptionSelected,
                ]}
              >
                <Feather name="video" size={18} color={appointmentType === 'VIRTUAL' ? '#10B981' : colors.gray500} />
                <AppText variant="sm" weight="semiBold" color={appointmentType === 'VIRTUAL' ? '#10B981' : colors.navy} style={styles.typeText}>
                  Consulta Virtual
                </AppText>
              </TouchableOpacity>
            </View>

            <AppText variant="base" weight="bold" color={colors.navy} style={styles.subSectionTitle}>
              Selecciona el horario:
            </AppText>
            <View style={styles.slotsGrid}>
              {['08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'].map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <TouchableOpacity
                    key={slot}
                    activeOpacity={0.8}
                    onPress={() => setSelectedSlot(slot)}
                    style={[
                      styles.slotPill,
                      isSelected && styles.slotPillSelected,
                    ]}
                  >
                    <AppText
                      variant="sm"
                      weight={isSelected ? 'bold' : 'medium'}
                      color={isSelected ? colors.white : colors.navy}
                    >
                      {slot}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* STEP 5: Confirmación y Resumen */}
        {step === 5 && (
          <View style={styles.reviewCard}>
            <View style={styles.reviewDoctorRow}>
              <Image source={{ uri: selectedDoctor?.avatarUrl }} style={styles.reviewAvatar} />
              <View style={styles.reviewDoctorText}>
                <AppText variant="lg" weight="bold" color={colors.navy}>
                  {selectedDoctor?.name}
                </AppText>
                <AppText variant="sm" color={colors.primary} weight="medium">
                  {selectedSpecialty}
                </AppText>
                <AppText variant="xs" color={colors.textMuted}>
                  {selectedDoctor?.clinic}
                </AppText>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.reviewDetailRow}>
              <Feather name="calendar" size={16} color={colors.primary} />
              <AppText variant="sm" color={colors.navy} style={styles.reviewDetailText}>
                {selectedDate}
              </AppText>
            </View>

            <View style={styles.reviewDetailRow}>
              <Feather name="clock" size={16} color={colors.primary} />
              <AppText variant="sm" color={colors.navy} style={styles.reviewDetailText}>
                {selectedSlot}
              </AppText>
            </View>

            <View style={styles.reviewDetailRow}>
              <Feather name={appointmentType === 'VIRTUAL' ? 'video' : 'map-pin'} size={16} color={colors.primary} />
              <AppText variant="sm" color={colors.navy} style={styles.reviewDetailText}>
                {appointmentType === 'VIRTUAL' ? 'Videoconsulta Virtual por Dohi Meet' : selectedDoctor?.clinic}
              </AppText>
            </View>

            <View style={styles.feeBox}>
              <AppText variant="sm" color={colors.textSecondary}>Tarifa estimada:</AppText>
              <AppText variant="lg" weight="bold" color={colors.navy}>
                {selectedDoctor?.consultationFee || 'C$ 500'}
              </AppText>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <AppButton
          title={step === 5 ? 'Confirmar y Reservar Cita' : 'Continuar →'}
          variant="primary"
          size="lg"
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.gray200,
    width: '100%',
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    paddingBottom: spacing['3xl'],
  },
  stepHeader: {
    marginBottom: spacing.base,
  },
  stepHint: {
    marginBottom: spacing.md,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  specialtyCard: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.gray200,
    ...shadows.sm,
  },
  specialtyCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.lightBlue,
  },
  specialtyIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  specialtyIconSelected: {
    backgroundColor: colors.primary,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  doctorCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F4F9FF',
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightBlue,
    marginRight: spacing.md,
  },
  doctorInfo: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    marginLeft: 4,
  },
  clinicText: {
    marginTop: 2,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  dateOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    ...shadows.sm,
  },
  dateOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.lightBlue,
  },
  dateIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  dateTextCol: {
    flex: 1,
  },
  subSectionTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  typeSelectorRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.base,
  },
  typeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.gray200,
  },
  typeOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.lightBlue,
  },
  typeText: {
    marginLeft: 8,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  slotPill: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.base,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  slotPillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  reviewCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  reviewDoctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: spacing.md,
  },
  reviewDoctorText: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: spacing.base,
  },
  reviewDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  reviewDetailText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  feeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightBlue,
    padding: spacing.base,
    borderRadius: radius.lg,
    marginTop: spacing.sm,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  successContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  successCard: {
    backgroundColor: colors.white,
    borderRadius: radius['2xl'],
    padding: spacing['2xl'],
    alignItems: 'center',
    ...shadows.lg,
  },
  successIconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  successTitle: {
    marginBottom: spacing.xs,
  },
  successSubtitle: {
    marginBottom: spacing.xl,
  },
  summaryBox: {
    backgroundColor: colors.gray50,
    borderRadius: radius.xl,
    padding: spacing.base,
    width: '100%',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successButton: {
    width: '100%',
  },
});
