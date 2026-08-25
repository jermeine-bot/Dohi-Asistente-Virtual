import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../src/theme';
import { AppText } from '../../src/components/common/AppText';
import { AppLogo } from '../../src/components/common/AppLogo';
import { AppButton } from '../../src/components/common/AppButton';
import { DohiCharacter } from '../../src/components/dohi/DohiCharacter';

export default function OnboardingWelcomeScreen() {
  const handleNext = () => {
    router.push('/onboarding/consultations');
  };

  const handleSkip = () => {
    router.replace('/(app)/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Row with Skip button */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <AppLogo size={36} />
          <AppText variant="lg" weight="bold" color={colors.primary} style={styles.logoText}>
            DOHI
          </AppText>
        </View>
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

      {/* Main Illustration & Character */}
      <View style={styles.illustrationContainer}>
        <View style={styles.bubbleHalo} />
        <DohiCharacter variant="hero" size={190} />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <AppText variant="3xl" weight="bold" color={colors.navy} align="center" style={styles.title}>
          Bienvenido a Dohi
        </AppText>

        <AppText
          variant="base"
          color={colors.textSecondary}
          align="center"
          style={styles.description}
        >
          Tu salud en buenas manos,{"\n"}donde sea que estés.
        </AppText>

        {/* Step Indicator: ● ○ ○ */}
        <View style={styles.indicatorContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
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
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    marginLeft: spacing.xs + 2,
    letterSpacing: 1,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bubbleHalo: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.lightBlue,
    opacity: 0.8,
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
