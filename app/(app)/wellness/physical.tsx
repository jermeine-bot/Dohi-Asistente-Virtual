import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppButton } from '../../../src/components/common/AppButton';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { DohiCharacter } from '../../../src/components/dohi/DohiCharacter';

const symptomsList = [
  { id: 's1', label: 'Dolor de cabeza', icon: 'head-side-cough' },
  { id: 's2', label: 'Fatiga / Cansancio', icon: 'bed' },
  { id: 's3', label: 'Dolor muscular', icon: 'dumbbell' },
  { id: 's4', label: 'Malestar estomacal', icon: 'apple-alt' },
  { id: 's5', label: 'Fiebre leve', icon: 'thermometer-half' },
  { id: 's6', label: 'Congestión nasal', icon: 'wind' },
];

export default function PhysicalWellnessScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [intensity, setIntensity] = useState<number>(3); // 1 to 5
  const [description, setDescription] = useState('');

  const toggleSymptom = (label: string) => {
    if (selectedSymptoms.includes(label)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== label));
    } else {
      setSelectedSymptoms([...selectedSymptoms, label]);
    }
  };

  const handleSave = () => {
    Alert.alert(
      '¡Registro Físico Completado!',
      `Dohi ha registrado tus síntomas (Intensidad ${intensity}/5). Se recomienda reposo e hidratación. Si la molestia persiste, agenda una videoconsulta médica.`,
      [{ text: 'Entendido', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="Bienestar Físico" showLogo={true} onBack={() => router.back()} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <DohiCharacter variant="avatar" size={85} />
          <View style={styles.bannerTextCol}>
            <AppText variant="base" weight="bold" color={colors.navy}>
              Registro de Síntomas
            </AppText>
            <AppText variant="xs" color={colors.textSecondary}>
              Monitorea tus molestias para que tus médicos tengan un historial claro.
            </AppText>
          </View>
        </View>

        {/* Symptoms Grid */}
        <AppText variant="base" weight="bold" color={colors.navy} style={styles.sectionTitle}>
          ¿Qué síntomas estás experimentando?
        </AppText>

        <View style={styles.symptomsGrid}>
          {symptomsList.map((item) => {
            const isSelected = selectedSymptoms.includes(item.label);
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => toggleSymptom(item.label)}
                style={[
                  styles.symptomCard,
                  isSelected && styles.symptomCardSelected,
                ]}
              >
                <View style={[styles.iconCircle, isSelected && styles.iconCircleSelected]}>
                  <FontAwesome5
                    name={item.icon}
                    size={16}
                    color={isSelected ? colors.white : colors.primary}
                  />
                </View>
                <AppText
                  variant="xs"
                  weight={isSelected ? 'bold' : 'medium'}
                  color={isSelected ? colors.primary : colors.navy}
                  align="center"
                >
                  {item.label}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Intensity Level (1 to 5) */}
        <AppText variant="base" weight="bold" color={colors.navy} style={styles.sectionTitle}>
          Nivel de intensidad o molestia: ({intensity}/5)
        </AppText>

        <View style={styles.intensityRow}>
          {[1, 2, 3, 4, 5].map((lvl) => {
            const isSelected = intensity === lvl;
            return (
              <TouchableOpacity
                key={lvl}
                activeOpacity={0.8}
                onPress={() => setIntensity(lvl)}
                style={[
                  styles.intensityPill,
                  isSelected && styles.intensityPillSelected,
                ]}
              >
                <AppText
                  variant="base"
                  weight="bold"
                  color={isSelected ? colors.white : colors.navy}
                >
                  {lvl}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Description TextArea */}
        <AppText variant="base" weight="bold" color={colors.navy} style={styles.sectionTitle}>
          ¿Desde cuándo sientes estos síntomas?
        </AppText>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Ej: Empezó anoche después de cenar..."
          placeholderTextColor={colors.gray400}
          multiline
          numberOfLines={3}
          style={styles.textArea}
        />

        {/* Save Button */}
        <AppButton
          title="Guardar Registro Físico"
          variant="primary"
          size="lg"
          onPress={handleSave}
          style={styles.saveBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    paddingBottom: spacing['2xl'],
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  bannerTextCol: {
    flex: 1,
    marginLeft: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  symptomCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.gray200,
  },
  symptomCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.lightBlue,
    ...shadows.sm,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  iconCircleSelected: {
    backgroundColor: colors.primary,
  },
  intensityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  intensityPill: {
    flex: 1,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intensityPillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  textArea: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: radius.xl,
    padding: spacing.md,
    fontSize: 14,
    color: colors.navy,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: spacing.xl,
  },
  saveBtn: {
    width: '100%',
  },
});
