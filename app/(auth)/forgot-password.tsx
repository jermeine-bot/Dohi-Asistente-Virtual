import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../src/theme';
import { AppText } from '../../src/components/common/AppText';
import { AppLogo } from '../../src/components/common/AppLogo';
import { AppInput } from '../../src/components/common/AppInput';
import { AppButton } from '../../src/components/common/AppButton';
import { DohiCharacter } from '../../src/components/dohi/DohiCharacter';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSend = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Ingresa un correo electrónico válido');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="arrow-left" size={22} color={colors.navy} />
          </TouchableOpacity>
          <AppLogo size={32} />
          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Mascot Illustration */}
          <View style={styles.mascotContainer}>
            <View style={styles.bubbleHalo} />
            <DohiCharacter pose={sent ? 'celebrating' : 'thinking'} size={120} />
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {!sent ? (
              <>
                <AppText variant="xl" weight="bold" color={colors.navy} align="center">
                  ¿Olvidaste tu contraseña? 🔐
                </AppText>
                <AppText
                  variant="sm"
                  color={colors.textSecondary}
                  align="center"
                  style={styles.subtitle}
                >
                  Ingresa tu correo electrónico registrado y te enviaremos instrucciones para restablecerla.
                </AppText>

                <View style={styles.inputSpacing}>
                  <AppInput
                    label="Correo Electrónico"
                    placeholder="paciente@salud.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={error}
                    leftIcon={<Feather name="mail" size={18} color={colors.textMuted} />}
                  />
                </View>

                <AppButton
                  title="Enviar Instrucciones"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  onPress={handleSend}
                  style={styles.sendButton}
                  rightIcon={<Feather name="send" size={18} color={colors.white} />}
                />
              </>
            ) : (
              <>
                <View style={styles.successIconBox}>
                  <Feather name="check-circle" size={48} color={colors.success} />
                </View>
                <AppText variant="xl" weight="bold" color={colors.navy} align="center">
                  ¡Correo Enviado! 📩
                </AppText>
                <AppText
                  variant="sm"
                  color={colors.textSecondary}
                  align="center"
                  style={styles.subtitle}
                >
                  Hemos enviado las instrucciones de recuperación a <AppText variant="sm" weight="bold" color={colors.primary}>{email}</AppText>. Revisa tu bandeja de entrada o spam.
                </AppText>

                <AppButton
                  title="Volver a Iniciar Sesión"
                  variant="primary"
                  size="lg"
                  onPress={() => router.replace('/(auth)/login')}
                  style={styles.sendButton}
                />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingVertical: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexGrow: 1,
    justifyContent: 'center',
  },
  mascotContainer: {
    alignItems: 'center',
    marginVertical: spacing.xs,
    position: 'relative',
  },
  bubbleHalo: {
    position: 'absolute',
    top: 5,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#E0F2FE',
    opacity: 0.7,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius['2xl'],
    padding: spacing.xl,
    marginTop: spacing.md,
    ...shadows.md,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    maxWidth: 290,
    lineHeight: 20,
  },
  inputSpacing: {
    width: '100%',
  },
  sendButton: {
    borderRadius: radius.xl,
    width: '100%',
    marginTop: spacing.sm,
  },
  successIconBox: {
    marginBottom: spacing.md,
  },
});
