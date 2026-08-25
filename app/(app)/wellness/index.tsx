import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { DohiCharacter } from '../../../src/components/dohi/DohiCharacter';

export default function WellnessSelectionScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="Bienestar Dohi" showLogo={true} onBack={() => router.back()} />

      <View style={styles.content}>
        {/* Dohi Mascot & Greeting */}
        <View style={styles.characterSection}>
          <DohiCharacter variant="hero" size={140} />
          <AppText variant="2xl" weight="bold" color={colors.navy} align="center" style={styles.title}>
            Cuéntame,{"\n"}¿Cómo te sientes?
          </AppText>
          <AppText variant="sm" color={colors.textSecondary} align="center" style={styles.subtitle}>
            Elige qué aspecto de tu salud deseas registrar o consultar el día de hoy:
          </AppText>
        </View>

        {/* 2 Options Cards */}
        <View style={styles.cardsContainer}>
          {/* 1. Psicológico */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(app)/wellness/emotional')}
            style={[styles.choiceCard, styles.cardEmotional]}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#EDE9FE' }]}>
              <FontAwesome5 name="brain" size={24} color="#7C3AED" />
            </View>

            <View style={styles.choiceTextCol}>
              <AppText variant="lg" weight="bold" color={colors.navy} style={styles.choiceTitle}>
                Psicológico y Emocional
              </AppText>
              <AppText variant="xs" color={colors.textSecondary}>
                "Quiero contarte cómo me siento anímicamente."
              </AppText>
            </View>

            <Feather name="chevron-right" size={20} color="#7C3AED" />
          </TouchableOpacity>

          {/* 2. Físico */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(app)/wellness/physical')}
            style={[styles.choiceCard, styles.cardPhysical]}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
              <FontAwesome5 name="heartbeat" size={24} color="#0284C7" />
            </View>

            <View style={styles.choiceTextCol}>
              <AppText variant="lg" weight="bold" color={colors.navy} style={styles.choiceTitle}>
                Físico y Corporal
              </AppText>
              <AppText variant="xs" color={colors.textSecondary}>
                "Quiero contarte cómo me siento físicamente."
              </AppText>
            </View>

            <Feather name="chevron-right" size={20} color="#0284C7" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    justifyContent: 'space-around',
  },
  characterSection: {
    alignItems: 'center',
  },
  title: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  subtitle: {
    maxWidth: 290,
    lineHeight: 20,
  },
  cardsContainer: {
    gap: spacing.base,
  },
  choiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius['2xl'],
    padding: spacing.lg,
    borderWidth: 1.5,
    ...shadows.card,
  },
  cardEmotional: {
    borderColor: '#DDD6FE',
  },
  cardPhysical: {
    borderColor: '#BAE6FD',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  choiceTextCol: {
    flex: 1,
    marginRight: spacing.xs,
  },
  choiceTitle: {
    marginBottom: 4,
  },
});
