import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { AppButton } from '../common/AppButton';
import { DohiCharacter } from '../dohi/DohiCharacter';
import { Medication, MedicationStatus } from '../../types/Medication';

export interface AddMedicationModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (medication: Medication, applyToAllDays: boolean) => void;
}

const commonDosages = ['1 pastilla', '2 pastillas', '1 cápsula', '5 ml', '10 ml', '2 gotas'];
const commonTimes = ['07:00 AM', '08:00 AM', '12:00 PM', '02:00 PM', '06:00 PM', '08:00 PM', '10:00 PM'];
const moments = [
  { label: 'Desayuno', icon: 'weather-sunny' },
  { label: 'Almuerzo', icon: 'weather-sunny-alert' },
  { label: 'Cena', icon: 'weather-sunset' },
  { label: 'Antes de dormir', icon: 'weather-night' },
];

export const AddMedicationModal: React.FC<AddMedicationModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('1 pastilla');
  const [selectedTime, setSelectedTime] = useState('08:00 AM');
  const [customTime, setCustomTime] = useState('');
  const [selectedMoment, setSelectedMoment] = useState('Desayuno');
  const [instructions, setInstructions] = useState('');
  const [applyToAllDays, setApplyToAllDays] = useState(true);

  const resetForm = () => {
    setName('');
    setDosage('1 pastilla');
    setSelectedTime('08:00 AM');
    setCustomTime('');
    setSelectedMoment('Desayuno');
    setInstructions('');
    setApplyToAllDays(true);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      Alert.alert('Campo requerido', 'Por favor ingresa el nombre del medicamento.');
      return;
    }

    const finalTime = customTime.trim() || selectedTime;
    const finalDosage = dosage.trim() || '1 dosis';

    const newMedication: Medication = {
      id: `med-${Date.now()}`,
      name: trimmedName,
      dosage: finalDosage,
      moment: selectedMoment,
      time: finalTime,
      status: 'PENDIENTE',
      instructions: instructions.trim() || undefined,
      pillsRemaining: 30,
      durationDays: 7,
      colorHex: colors.primary,
    };

    onSave(newMedication, applyToAllDays);
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <View style={styles.headerTitleRow}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="pill" size={22} color={colors.primary} />
              </View>
              <View>
                <AppText variant="lg" weight="bold" color={colors.navy}>
                  Nuevo Medicamento
                </AppText>
                <AppText variant="xs" color={colors.textSecondary}>
                  Dohi te recordará la hora de tu toma
                </AppText>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleClose}
              activeOpacity={0.7}
              style={styles.closeBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather name="x" size={20} color={colors.gray600} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollBody}
          >
            {/* Mascot Banner */}
            <View style={styles.dohiBanner}>
              <DohiCharacter variant="avatar" size={48} />
              <AppText variant="xs" color={colors.textSecondary} style={styles.dohiBannerText}>
                Ingresa el tratamiento recetado por tu médico para mantener tu adherencia al 100%.
              </AppText>
            </View>

            {/* 1. Nombre del Medicamento */}
            <View style={styles.fieldGroup}>
              <AppText variant="sm" weight="bold" color={colors.navy} style={styles.label}>
                Nombre del Medicamento *
              </AppText>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Ej: Amoxicilina 500mg, Ibuprofeno, Insulina..."
                placeholderTextColor={colors.gray400}
                style={styles.input}
              />
            </View>

            {/* 2. Dosis */}
            <View style={styles.fieldGroup}>
              <AppText variant="sm" weight="bold" color={colors.navy} style={styles.label}>
                Dosis *
              </AppText>
              <TextInput
                value={dosage}
                onChangeText={setDosage}
                placeholder="Ej: 1 pastilla, 10 ml, 2 gotas..."
                placeholderTextColor={colors.gray400}
                style={styles.input}
              />
              {/* Quick Dosage Chips */}
              <View style={styles.chipsRow}>
                {commonDosages.map((d) => (
                  <TouchableOpacity
                    key={d}
                    activeOpacity={0.7}
                    onPress={() => setDosage(d)}
                    style={[
                      styles.chip,
                      dosage === d && styles.chipActive,
                    ]}
                  >
                    <AppText
                      variant="xs"
                      weight={dosage === d ? 'bold' : 'medium'}
                      color={dosage === d ? colors.primary : colors.navy}
                    >
                      {d}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* 3. Horario */}
            <View style={styles.fieldGroup}>
              <AppText variant="sm" weight="bold" color={colors.navy} style={styles.label}>
                Horario de Toma *
              </AppText>
              <View style={styles.chipsRow}>
                {commonTimes.map((t) => (
                  <TouchableOpacity
                    key={t}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedTime(t);
                      setCustomTime('');
                    }}
                    style={[
                      styles.chip,
                      selectedTime === t && !customTime && styles.chipActive,
                    ]}
                  >
                    <AppText
                      variant="xs"
                      weight={selectedTime === t && !customTime ? 'bold' : 'medium'}
                      color={selectedTime === t && !customTime ? colors.primary : colors.navy}
                    >
                      {t}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                value={customTime}
                onChangeText={(val) => {
                  setCustomTime(val);
                }}
                placeholder="O escribe otra hora (Ej: 09:30 AM)"
                placeholderTextColor={colors.gray400}
                style={[styles.input, { marginTop: spacing.xs }]}
              />
            </View>

            {/* 4. Momento del Día */}
            <View style={styles.fieldGroup}>
              <AppText variant="sm" weight="bold" color={colors.navy} style={styles.label}>
                Momento del Día
              </AppText>
              <View style={styles.momentsRow}>
                {moments.map((m) => {
                  const isSelected = selectedMoment === m.label;
                  return (
                    <TouchableOpacity
                      key={m.label}
                      activeOpacity={0.8}
                      onPress={() => setSelectedMoment(m.label)}
                      style={[
                        styles.momentCard,
                        isSelected && styles.momentCardActive,
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={m.icon as any}
                        size={20}
                        color={isSelected ? colors.primary : colors.gray600}
                      />
                      <AppText
                        variant="xs"
                        weight={isSelected ? 'bold' : 'medium'}
                        color={isSelected ? colors.primary : colors.navy}
                        style={styles.momentText}
                      >
                        {m.label}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* 5. Instrucciones */}
            <View style={styles.fieldGroup}>
              <AppText variant="sm" weight="bold" color={colors.navy} style={styles.label}>
                Indicaciones Médicas (Opcional)
              </AppText>
              <TextInput
                value={instructions}
                onChangeText={setInstructions}
                placeholder="Ej: Tomar con alimentos y suficiente agua..."
                placeholderTextColor={colors.gray400}
                multiline
                numberOfLines={2}
                style={[styles.input, styles.textArea]}
              />
            </View>

            {/* 6. Aplicar a toda la semana */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setApplyToAllDays(!applyToAllDays)}
              style={styles.switchRow}
            >
              <View style={[styles.checkbox, applyToAllDays && styles.checkboxActive]}>
                {applyToAllDays && <Feather name="check" size={14} color={colors.white} />}
              </View>
              <View style={styles.switchTextCol}>
                <AppText variant="sm" weight="semiBold" color={colors.navy}>
                  Programar para todos los días de la semana
                </AppText>
                <AppText variant="xs" color={colors.textSecondary}>
                  Añade este horario a los 7 días de tu calendario
                </AppText>
              </View>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              <AppButton
                title="Guardar Medicamento"
                variant="primary"
                size="lg"
                onPress={handleSave}
                leftIcon={<Feather name="check" size={18} color={colors.white} />}
                style={styles.saveButton}
              />
              <TouchableOpacity
                onPress={handleClose}
                activeOpacity={0.7}
                style={styles.cancelBtn}
              >
                <AppText variant="sm" weight="medium" color={colors.textMuted}>
                  Cancelar
                </AppText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? spacing.xl : spacing.base,
    ...shadows.lg,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollBody: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
  },
  dohiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: radius.xl,
    padding: spacing.md,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.softBlue,
  },
  dohiBannerText: {
    flex: 1,
    marginLeft: spacing.md,
    lineHeight: 18,
  },
  fieldGroup: {
    marginBottom: spacing.base,
  },
  label: {
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.gray50,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? spacing.md : spacing.sm + 2,
    fontSize: 14,
    color: colors.navy,
  },
  textArea: {
    minHeight: 65,
    textAlignVertical: 'top',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  chipActive: {
    backgroundColor: colors.lightBlue,
    borderColor: colors.primary,
  },
  momentsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: 4,
  },
  momentCard: {
    flexBasis: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.gray200,
  },
  momentCardActive: {
    backgroundColor: colors.lightBlue,
    borderColor: colors.primary,
  },
  momentText: {
    marginLeft: spacing.xs,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray50,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.gray400,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  switchTextCol: {
    flex: 1,
  },
  actionsContainer: {
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  saveButton: {
    width: '100%',
  },
  cancelBtn: {
    paddingVertical: spacing.xs,
  },
});
