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
import { useAuth } from '../../src/context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await login(email, password);
      router.replace('/(app)/(tabs)');
    } catch (err) {
      Alert.alert('Error', 'No se pudo iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await login();
      router.replace('/(app)/(tabs)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Brand Header */}
          <View style={styles.header}>
            <AppLogo size={36} />
            <View style={styles.badge}>
              <AppText variant="xs" weight="bold" color={colors.primary}>
                SALUD DIGITAL
              </AppText>
            </View>
          </View>

          {/* Mascot Greeting */}
          <View style={styles.mascotContainer}>
            <View style={styles.bubbleHalo} />
            <DohiCharacter pose="waving" size={130} />
            <View style={styles.welcomeBox}>
              <AppText variant="2xl" weight="bold" color={colors.navy} align="center">
                ¡Bienvenido a DOHI! 🩺
              </AppText>
              <AppText
                variant="sm"
                color={colors.textSecondary}
                align="center"
                style={styles.subtitle}
              >
                Accede a tu expediente médico, citas y orientación en salud inteligente.
              </AppText>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <AppInput
              label="Correo Electrónico"
              placeholder="ejemplo@salud.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              leftIcon={<Feather name="mail" size={18} color={colors.textMuted} />}
            />

            <AppInput
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              error={errors.password}
              leftIcon={<Feather name="lock" size={18} color={colors.textMuted} />}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={18}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              }
            />

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.rememberMeRow}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxActive,
                  ]}
                >
                  {rememberMe && <Feather name="check" size={12} color={colors.white} />}
                </View>
                <AppText variant="xs" color={colors.textSecondary} weight="medium">
                  Recordarme
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/(auth)/forgot-password')}
                activeOpacity={0.7}
              >
                <AppText variant="xs" weight="semiBold" color={colors.primary}>
                  ¿Olvidaste tu contraseña?
                </AppText>
              </TouchableOpacity>
            </View>

            {/* Main Action Button */}
            <AppButton
              title="Iniciar Sesión"
              variant="primary"
              size="lg"
              loading={loading}
              onPress={handleLogin}
              style={styles.loginButton}
              rightIcon={<Feather name="arrow-right" size={18} color={colors.white} />}
            />

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <AppText variant="xs" color={colors.textMuted} style={styles.dividerText}>
                o
              </AppText>
              <View style={styles.dividerLine} />
            </View>

            {/* Quick Demo Login */}
            <AppButton
              title="Ingresar como Paciente Demo"
              variant="outline"
              size="md"
              disabled={loading}
              onPress={handleDemoLogin}
              leftIcon={<Feather name="user-check" size={16} color={colors.primary} />}
            />
          </View>

          {/* Footer Register Link */}
          <View style={styles.footerContainer}>
            <AppText variant="sm" color={colors.textSecondary}>
              ¿Aún no tienes una cuenta?{' '}
            </AppText>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <AppText variant="sm" weight="bold" color={colors.primary}>
                Regístrate aquí
              </AppText>
            </TouchableOpacity>
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
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  badge: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  mascotContainer: {
    alignItems: 'center',
    marginVertical: spacing.xs,
    position: 'relative',
  },
  bubbleHalo: {
    position: 'absolute',
    top: 5,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E0F2FE',
    opacity: 0.7,
  },
  welcomeBox: {
    marginTop: spacing.xs,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 4,
    maxWidth: 300,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: radius['2xl'],
    padding: spacing.xl,
    marginTop: spacing.md,
    ...shadows.md,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    marginTop: -spacing.xs,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: radius.xs,
    borderWidth: 1.5,
    borderColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  loginButton: {
    borderRadius: radius.xl,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray200,
  },
  dividerText: {
    marginHorizontal: spacing.md,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
});
