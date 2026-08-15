import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../src/theme';
import { AppText } from '../../src/components/common/AppText';
import { AppButton } from '../../src/components/common/AppButton';
import { DohiCharacter } from '../../src/components/dohi/DohiCharacter';

export default function OnboardingConsultationsScreen() {
  const handleNext = () => {
    router.push('/onboarding/appointments');
  };

  const handleSkip = () => {
    router.replace('/(app)/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={22} color={colors.navy} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSkip}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AppText variant="sm" weight="medium" color={colors.gray400}>
            Saltar
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <View style={styles.badgeTop}>
          <Feather name="video" size={16} color={colors.primary} />
          <AppText variant="xs" weight="bold" color={colors.primary} style={styles.badgeText}>
            TELEMEDICINA EN VIVO
          </AppText>
        </View>

        <View style={styles.bubbleHalo} />
        <DohiCharacter variant="home" size={185} />
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <AppText variant="3xl" weight="bold" color={colors.navy} align="center" style={styles.title}>
          Consultas Virtuales
        </AppText>

        <AppText
          variant="base"
          color={colors.textSecondary}
          align="center"
          style={styles.description}
        >
          Habla con médicos expertos por chat o video desde la comodidad de tu hogar.
        </AppText>

        {/* Step Indicator: ○ ● ○ */}
        <View style={styles.indicatorContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>

        {/* Action Button */}
        <AppButton
          title="Siguiente →"
          variant="primary"
          size="lg"
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xs,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeTop: {
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
    zIndex: 3,
  },
  badgeText: {
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  bubbleHalo: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#E6F4EA',
    opacity: 0.7,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
  },
  description: {
    maxWidth: 290,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray200,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  button: {
    borderRadius: radius.xl,
  },
});
