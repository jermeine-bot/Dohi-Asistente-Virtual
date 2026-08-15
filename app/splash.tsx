import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../src/theme';
import { AppText } from '../src/components/common/AppText';
import { AppLogo } from '../src/components/common/AppLogo';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundCircle} />
      <View style={styles.backgroundCircleSmall} />

      <View style={styles.content}>
        {/* Official Brand Logo from images */}
        <View style={styles.brandContainer}>
          <AppLogo size={160} style={styles.logoImage} />

          <View style={styles.pulseTag}>
            <View style={styles.pulseDot} />
            <AppText variant="xs" weight="bold" color={colors.primary}>
              SALUD DIGITAL INTELIGENTE
            </AppText>
          </View>

          <AppText
            variant="base"
            weight="medium"
            color={colors.textSecondary}
            align="center"
            style={styles.slogan}
          >
            Tu salud en buenas manos,{"\n"}donde sea que estés.
          </AppText>
        </View>
      </View>

      <View style={styles.footer}>
        <AppText variant="xs" color={colors.textMuted} align="center">
          DOHI • Versión 1.0.0 • Hecho para tu bienestar
        </AppText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundCircle: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    backgroundColor: colors.lightBlue,
    opacity: 0.7,
  },
  backgroundCircleSmall: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#E0EEFC',
    opacity: 0.6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  characterContainer: {
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  brandContainer: {
    alignItems: 'center',
  },
  logoImage: {
    marginBottom: spacing.sm,
  },
  pulseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.softBlue,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  slogan: {
    maxWidth: 280,
    lineHeight: 22,
  },
  footer: {
    marginBottom: spacing.sm,
  },
});
