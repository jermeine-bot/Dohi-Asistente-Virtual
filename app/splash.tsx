import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../src/theme';
import { AppText } from '../src/components/common/AppText';
import { AppLogo } from '../src/components/common/AppLogo';

const { width } = Dimensions.get('window');

const loadingSteps = [
  { threshold: 0, text: 'Iniciando servicios de salud...' },
  { threshold: 35, text: 'Preparando tu expediente clínico...' },
  { threshold: 70, text: 'Sincronizando asistente Dohi...' },
  { threshold: 95, text: '¡Todo listo para tu bienestar!' },
];

export default function SplashScreen() {
  const [progressPercent, setProgressPercent] = useState(0);
  const [statusMessage, setStatusMessage] = useState(loadingSteps[0].text);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance Animation for Logo
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse Glow Loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress Bar Animation (0 to 100%)
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 2500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    // Listener to update numeric percentage and dynamic status text
    const listenerId = progressAnim.addListener(({ value }) => {
      const rounded = Math.min(Math.round(value), 100);
      setProgressPercent(rounded);

      const matchedStep = [...loadingSteps].reverse().find(step => rounded >= step.threshold);
      if (matchedStep) {
        setStatusMessage(matchedStep.text);
      }
    });

    // Navigate to Onboarding when finished
    const navigateTimer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2800);

    return () => {
      progressAnim.removeListener(listenerId);
      clearTimeout(navigateTimer);
    };
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative Gradient Halos */}
      <View style={styles.backgroundHaloTop} />
      <View style={styles.backgroundHaloBottom} />

      <View style={styles.content}>
        {/* Animated Single Central Logo with Soft Glow */}
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { scale: pulseAnim }],
            },
          ]}
        >
          <View style={styles.logoCard}>
            <AppLogo size={120} />
          </View>
        </Animated.View>

        {/* Brand Name & Tagline */}
        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <AppText variant="3xl" weight="bold" color={colors.navy} style={styles.brandTitle}>
            DOHI
          </AppText>

          <View style={styles.badgeRow}>
            <View style={styles.statusDot} />
            <AppText variant="xs" weight="bold" color={colors.primary} style={styles.badgeText}>
              SALUD DIGITAL INTELIGENTE
            </AppText>
          </View>

          <AppText
            variant="sm"
            color={colors.textSecondary}
            align="center"
            style={styles.slogan}
          >
            Tu salud en buenas manos,{"\n"}donde sea que estés.
          </AppText>
        </Animated.View>

        {/* Mobile Loading Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarTrack}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>

          {/* Status Text & Percentage Row */}
          <View style={styles.progressInfoRow}>
            <AppText variant="xs" weight="medium" color={colors.textSecondary} style={styles.statusMsg}>
              {statusMessage}
            </AppText>
            <AppText variant="xs" weight="bold" color={colors.primary}>
              {progressPercent}%
            </AppText>
          </View>
        </View>
      </View>

      {/* Security & Version Footer */}
      <View style={styles.footer}>
        <View style={styles.securityRow}>
          <Feather name="shield" size={12} color={colors.success} style={styles.shieldIcon} />
          <AppText variant="xs" color={colors.textMuted} align="center">
            Cifrado médico seguro • Versión 1.0.0
          </AppText>
        </View>
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
    paddingVertical: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundHaloTop: {
    position: 'absolute',
    top: -120,
    right: -80,
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    backgroundColor: colors.lightBlue,
    opacity: 0.6,
  },
  backgroundHaloBottom: {
    position: 'absolute',
    bottom: -100,
    left: -80,
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    backgroundColor: '#E0EEFC',
    opacity: 0.5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: spacing['2xl'],
  },
  logoWrapper: {
    marginBottom: spacing.lg,
  },
  logoCard: {
    width: 144,
    height: 144,
    borderRadius: 36,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(22, 127, 209, 0.12)',
    ...shadows.lg,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  brandTitle: {
    letterSpacing: 3,
    marginBottom: spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.full,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.softBlue,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  badgeText: {
    letterSpacing: 0.8,
  },
  slogan: {
    maxWidth: 260,
    lineHeight: 20,
  },
  progressContainer: {
    width: '100%',
    maxWidth: 300,
    marginTop: spacing.sm,
  },
  progressBarTrack: {
    width: '100%',
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.gray100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3.5,
  },
  progressInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs + 2,
  },
  statusMsg: {
    flex: 1,
    marginRight: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldIcon: {
    marginRight: 5,
  },
});
