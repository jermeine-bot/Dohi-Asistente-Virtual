import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
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
import { useAuth } from '../../src/context/AuthContext';

const avatarPresets = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', // Mujer 1
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', // Hombre 1
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', // Mujer 2
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', // Hombre 2
];

const genderOptions = ['Femenino', 'Masculino', 'Otro'] as const;
const bloodTypeOptions = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+'];
const locationOptions = ['Managua', 'León', 'Estelí', 'Granada', 'Matagalpa', 'Chinandega', 'Masaya'];

export default function RegisterScreen() {
  const { register } = useAuth();

  // Form State
  const [selectedAvatar, setSelectedAvatar] = useState(avatarPresets[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'Masculino' | 'Femenino' | 'Otro'>('Femenino');
  const [age, setAge] = useState('25');
  const [location, setLocation] = useState('Managua');
  const [bloodType, setBloodType] = useState('O+');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'El nombre completo es requerido';
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    if (!phone.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!age || isNaN(Number(age)) || Number(age) <= 0 || Number(age) > 120) {
      newErrors.age = 'Ingresa una edad válida (1 - 120 años)';
    }
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        name,
        email,
        phone,
        avatarUrl: selectedAvatar,
        gender,
        age: Number(age),
        location: `${location}, Nicaragua`,
        bloodType,
      });

      Alert.alert(
        '¡Cuenta Creada!',
        'Tu expediente de salud en DOHI se ha creado exitosamente.',
        [{ text: 'Ingresar a DOHI', onPress: () => router.replace('/(app)/(tabs)') }]
      );
    } catch (err) {
      Alert.alert('Error', 'No se pudo crear la cuenta. Intenta de nuevo.');
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
        {/* Header Navigation */}
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
          {/* Title & Subtitle */}
          <View style={styles.titleContainer}>
            <AppText variant="2xl" weight="bold" color={colors.navy} align="center">
              Crear Cuenta de Salud 🩺
            </AppText>
            <AppText
              variant="sm"
              color={colors.textSecondary}
              align="center"
              style={styles.subtitle}
            >
              Completa tus datos personales para configurar tu expediente clínico.
            </AppText>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Avatar Selector */}
            <View style={styles.avatarSection}>
              <AppText variant="sm" weight="medium" color={colors.textPrimary} style={styles.sectionLabel}>
                Foto de Perfil / Avatar
              </AppText>

              <View style={styles.avatarPreviewRow}>
                <View style={styles.mainAvatarWrapper}>
                  <Image source={{ uri: selectedAvatar }} style={styles.mainAvatar} />
                  <View style={styles.cameraBadge}>
                    <Feather name="camera" size={14} color={colors.white} />
                  </View>
                </View>

                <View style={styles.presetGrid}>
                  {avatarPresets.map((preset, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedAvatar(preset)}
                      activeOpacity={0.8}
                      style={[
                        styles.presetItem,
                        selectedAvatar === preset && styles.presetActive,
                      ]}
                    >
                      <Image source={{ uri: preset }} style={styles.presetImage} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Datos Personales */}
            <AppInput
              label="Nombre Completo"
              placeholder="Ej. María Fernanda González"
              value={name}
              onChangeText={setName}
              error={errors.name}
              leftIcon={<Feather name="user" size={18} color={colors.textMuted} />}
            />

            <AppInput
              label="Correo Electrónico"
              placeholder="maria@ejemplo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              leftIcon={<Feather name="mail" size={18} color={colors.textMuted} />}
            />

            <AppInput
              label="Teléfono / WhatsApp"
              placeholder="+505 8888 8888"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              error={errors.phone}
              leftIcon={<Feather name="phone" size={18} color={colors.textMuted} />}
            />

            {/* Grid Row: Sexo & Edad */}
            <View style={styles.row}>
              {/* Sexo */}
              <View style={[styles.col, { flex: 1.3 }]}>
                <AppText variant="sm" weight="medium" color={colors.textPrimary} style={styles.inputLabel}>
                  Sexo / Género
                </AppText>
                <View style={styles.genderRow}>
                  {genderOptions.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[
                        styles.genderChip,
                        gender === opt && styles.genderChipActive,
                      ]}
                      onPress={() => setGender(opt)}
                    >
                      <AppText
                        variant="xs"
                        weight={gender === opt ? 'bold' : 'medium'}
                        color={gender === opt ? colors.primary : colors.textSecondary}
                      >
                        {opt}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Edad */}
              <View style={[styles.col, { flex: 0.8 }]}>
                <AppInput
                  label="Edad"
                  placeholder="25"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  error={errors.age}
                  leftIcon={<Feather name="calendar" size={16} color={colors.textMuted} />}
                />
              </View>
            </View>

            {/* Grid Row: Lugar & Tipo de Sangre */}
            <View style={styles.row}>
              {/* Lugar / Ciudad */}
              <View style={[styles.col, { flex: 1.2 }]}>
                <AppText variant="sm" weight="medium" color={colors.textPrimary} style={styles.inputLabel}>
                  Departamento / Ciudad
                </AppText>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
                  {locationOptions.map((loc) => (
                    <TouchableOpacity
                      key={loc}
                      style={[
                        styles.locationChip,
                        location === loc && styles.locationChipActive,
                      ]}
                      onPress={() => setLocation(loc)}
                    >
                      <AppText
                        variant="xs"
                        weight={location === loc ? 'bold' : 'medium'}
                        color={location === loc ? colors.white : colors.navy}
                      >
                        {loc}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Tipo de Sangre */}
              <View style={[styles.col, { flex: 0.8 }]}>
                <AppText variant="sm" weight="medium" color={colors.textPrimary} style={styles.inputLabel}>
                  Tipo de Sangre
                </AppText>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
                  {bloodTypeOptions.map((blood) => (
                    <TouchableOpacity
                      key={blood}
                      style={[
                        styles.bloodChip,
                        bloodType === blood && styles.bloodChipActive,
                      ]}
                      onPress={() => setBloodType(blood)}
                    >
                      <AppText
                        variant="xs"
                        weight="bold"
                        color={bloodType === blood ? colors.white : colors.error}
                      >
                        {blood}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Contraseñas */}
            <AppInput
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              error={errors.password}
              leftIcon={<Feather name="lock" size={18} color={colors.textMuted} />}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={18}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              }
            />

            <AppInput
              label="Confirmar Contraseña"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              error={errors.confirmPassword}
              leftIcon={<Feather name="shield" size={18} color={colors.textMuted} />}
            />

            {/* Checkbox Términos */}
            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setAcceptTerms(!acceptTerms)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, acceptTerms && styles.checkboxActive]}>
                {acceptTerms && <Feather name="check" size={12} color={colors.white} />}
              </View>
              <AppText variant="xs" color={colors.textSecondary} style={{ flex: 1, lineHeight: 18 }}>
                Acepto los <AppText variant="xs" weight="bold" color={colors.primary}>Términos de Servicio</AppText> y la <AppText variant="xs" weight="bold" color={colors.primary}>Política de Privacidad Médica</AppText> de DOHI.
              </AppText>
            </TouchableOpacity>

            {errors.terms && (
              <AppText variant="xs" color={colors.error} style={{ marginBottom: spacing.sm }}>
                {errors.terms}
              </AppText>
            )}

            {/* Submit Button */}
            <AppButton
              title="Crear Cuenta de Salud"
              variant="primary"
              size="lg"
              loading={loading}
              onPress={handleRegister}
              style={styles.submitButton}
              rightIcon={<Feather name="check-circle" size={18} color={colors.white} />}
            />
          </View>

          {/* Footer Navigation */}
          <View style={styles.footerContainer}>
            <AppText variant="sm" color={colors.textSecondary}>
              ¿Ya tienes una cuenta?{' '}
            </AppText>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <AppText variant="sm" weight="bold" color={colors.primary}>
                Inicia Sesión aquí
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
    paddingBottom: spacing.xl,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  subtitle: {
    marginTop: 4,
    maxWidth: 320,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: radius['2xl'],
    padding: spacing.xl,
    ...shadows.md,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  avatarPreviewRow: {
    alignItems: 'center',
    gap: spacing.md,
  },
  mainAvatarWrapper: {
    position: 'relative',
  },
  mainAvatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  presetGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  presetItem: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: colors.gray200,
    overflow: 'hidden',
  },
  presetActive: {
    borderColor: colors.primary,
    transform: [{ scale: 1.1 }],
  },
  presetImage: {
    width: '100%',
    height: '100%',
  },
  inputLabel: {
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.base,
  },
  col: {
    justifyContent: 'flex-start',
  },
  genderRow: {
    flexDirection: 'row',
    backgroundColor: colors.gray100,
    borderRadius: radius.lg,
    padding: 3,
    gap: 2,
    height: 48,
    alignItems: 'center',
  },
  genderChip: {
    flex: 1,
    height: '100%',
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderChipActive: {
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  chipsScroll: {
    flexDirection: 'row',
    maxHeight: 48,
  },
  locationChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radius.lg,
    backgroundColor: colors.gray100,
    marginRight: 6,
    height: 48,
    justifyContent: 'center',
  },
  locationChipActive: {
    backgroundColor: colors.primary,
  },
  bloodChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radius.lg,
    backgroundColor: '#FEE2E2',
    marginRight: 6,
    height: 48,
    justifyContent: 'center',
  },
  bloodChipActive: {
    backgroundColor: colors.error,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: spacing.md,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: radius.xs,
    borderWidth: 1.5,
    borderColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  submitButton: {
    borderRadius: radius.xl,
    marginTop: spacing.xs,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
});
