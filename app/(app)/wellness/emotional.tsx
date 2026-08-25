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

const moods = [
  { id: 'm1', emoji: '😊', label: 'Excelente', color: '#10B981', note: 'Energético y motivado' },
  { id: 'm2', emoji: '🙂', label: 'Bien / Tranquilo', color: '#3B82F6', note: 'En calma' },
  { id: 'm3', emoji: '😐', label: 'Neutro / Regular', color: '#F59E0B', note: 'Día promedio' },
  { id: 'm4', emoji: '😔', label: 'Triste / Desanimado', color: '#8B5CF6', note: 'Baja energía' },
  { id: 'm5', emoji: '😫', label: 'Estresado / Abrumado', color: '#EF4444', note: 'Sobrecarga' },
];

const factors = ['Trabajo', 'Sueño / Descanso', 'Familia', 'Alimentación', 'Ejercicio', 'Salud'];

export default function EmotionalWellnessScreen() {
  const [selectedMood, setSelectedMood] = useState(moods[1]);
  const [selectedFactors, setSelectedFactors] = useState<string[]>(['Sueño / Descanso']);
  const [notes, setNotes] = useState('');

  const toggleFactor = (factor: string) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter(f => f !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  };

  const handleSave = () => {
    Alert.alert(
      '¡Registro de Bienestar Guardado!',
      `Dohi ha guardado tu estado anímico "${selectedMood.label}". Recomendación: Practica 5 minutos de respiración consciente.`,
      [{ text: 'Entendido', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="Bienestar Emocional" showLogo={true} onBack={() => router.back()} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <DohiCharacter variant="avatar" size={85} />
          <View style={styles.bannerTextCol}>
            <AppText variant="base" weight="bold" color={colors.navy}>
              Tu espacio de desahogo
            </AppText>
            <AppText variant="xs" color={colors.textSecondary}>
              Identificar tus emociones es el primer paso para cuidar tu salud mental.
            </AppText>
          </View>
        </View>

        {/* Mood Selector */}
        <AppText variant="base" weight="bold" color={colors.navy} style={styles.sectionTitle}>
          ¿Cómo describirías tu estado anímico hoy?
        </AppText>

        <View style={styles.moodsRow}>
          {moods.map((m) => {
            const isSelected = selectedMood.id === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                activeOpacity={0.8}
                onPress={() => setSelectedMood(m)}
                style={[
                  styles.moodCard,
                  isSelected && styles.moodCardSelected,
                ]}
              >
                <AppText variant="2xl" style={styles.moodEmoji}>{m.emoji}</AppText>
                <AppText
                  variant="xs"
                  weight={isSelected ? 'bold' : 'medium'}
                  color={isSelected ? colors.primary : colors.navy}
                  align="center"
                  style={styles.moodLabel}
                >
                  {m.label}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Factors Influencing Mood */}
        <AppText variant="base" weight="bold" color={colors.navy} style={styles.sectionTitle}>
          ¿Qué factores influyeron en tu estado?
        </AppText>

        <View style={styles.factorsWrap}>
          {factors.map((factor) => {
            const isSelected = selectedFactors.includes(factor);
            return (
              <TouchableOpacity
                key={factor}
                activeOpacity={0.8}
                onPress={() => toggleFactor(factor)}
                style={[
                  styles.factorPill,
                  isSelected && styles.factorPillSelected,
                ]}
              >
                <AppText
                  variant="xs"
                  weight={isSelected ? 'bold' : 'medium'}
                  color={isSelected ? colors.white : colors.navy}
                >
                  {factor}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notes Input */}
        <AppText variant="base" weight="bold" color={colors.navy} style={styles.sectionTitle}>
          Cuéntame más detalles (opcional):
        </AppText>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Escribe lo que sientes en tus propias palabras..."
          placeholderTextColor={colors.gray400}
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        {/* Save Button */}
        <AppButton
          title="Guardar Registro Emocional"
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
    backgroundColor: '#EDE9FE',
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  bannerTextCol: {
    flex: 1,
    marginLeft: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  moodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    gap: 6,
  },
  moodCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: 2,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.gray200,
  },
  moodCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.lightBlue,
    ...shadows.sm,
  },
  moodEmoji: {
    fontSize: 26,
    marginBottom: 2,
  },
  moodLabel: {
    fontSize: 10,
  },
  factorsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
    marginBottom: spacing.lg,
  },
  factorPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  factorPillSelected: {
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
    minHeight: 90,
    textAlignVertical: 'top',
    marginBottom: spacing.xl,
  },
  saveBtn: {
    width: '100%',
  },
});
