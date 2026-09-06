import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppLogo } from '../../../src/components/common/AppLogo';
import { StatusBadge } from '../../../src/components/common/StatusBadge';
import { useAuth } from '../../../src/context/AuthContext';

export default function ProfileScreen() {
  const { user: authUser, logout } = useAuth();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  /*
   * Los datos del perfil vienen desde Supabase a través de AuthContext.
   *
   * authUser:
   * - name
   * - email
   * - phone
   * - gender
   * - age
   * - avatarUrl
   * - location
   * - bloodType
   */

  const handleEditProfile = () => {
    Alert.alert(
      'Editar Perfil',
      'La edición de tus datos personales estará disponible próximamente.',
      [{ text: 'Entendido' }]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      'Privacidad de Datos Médicos',
      'Tus datos personales y de salud son administrados de forma segura mediante Supabase y las políticas de seguridad configuradas en DOHI.',
      [{ text: 'Cerrar' }]
    );
  };

  const handleSecurity = () => {
    Alert.alert(
      'Seguridad y PIN',
      'La configuración de autenticación biométrica y seguridad adicional estará disponible próximamente.',
      [{ text: 'Cerrar' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas salir de tu cuenta de DOHI?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/(auth)/login');
            } catch (error) {
              console.error('Error cerrando sesión:', error);

              Alert.alert(
                'Error',
                'No fue posible cerrar la sesión. Inténtalo nuevamente.'
              );
            }
          },
        },
      ]
    );
  };

  /*
   * Mientras AuthContext termina de recuperar la sesión,
   * mostramos un indicador de carga.
   */
  if (!authUser) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

          <AppText
            variant="sm"
            color={colors.textSecondary}
            style={styles.loadingText}
          >
            Cargando perfil...
          </AppText>
        </View>
      </SafeAreaView>
    );
  }

  const currentUser = authUser;

  const avatarSource = currentUser.avatarUrl
    ? { uri: currentUser.avatarUrl }
    : undefined;

  const genderInitial =
    currentUser.gender === 'Masculino'
      ? 'M'
      : currentUser.gender === 'Femenino'
        ? 'F'
        : currentUser.gender === 'Otro'
          ? 'O'
          : '—';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card Header */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarRow}>
            <View style={styles.avatarContainer}>
              {avatarSource ? (
                <Image
                  source={avatarSource}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Feather
                    name="user"
                    size={30}
                    color={colors.primary}
                  />
                </View>
              )}

              <TouchableOpacity
                onPress={handleEditProfile}
                activeOpacity={0.8}
                style={styles.editAvatarBadge}
              >
                <Feather
                  name="camera"
                  size={12}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.userTextCol}>
              <AppText
                variant="xl"
                weight="bold"
                color={colors.navy}
              >
                {currentUser.name}
              </AppText>

              <AppText
                variant="sm"
                color={colors.textSecondary}
              >
                {currentUser.email}
              </AppText>

              <AppText
                variant="xs"
                color={colors.primary}
                weight="medium"
              >
                {currentUser.phone}
              </AppText>
            </View>
          </View>

          {/* Quick Health Vitals Strip */}
          <View style={styles.vitalsStrip}>
            <View style={styles.vitalItem}>
              <AppText
                variant="xs"
                color={colors.textMuted}
              >
                Sangre
              </AppText>

              <AppText
                variant="base"
                weight="bold"
                color={colors.primary}
              >
                {currentUser.bloodType}
              </AppText>
            </View>

            <View style={styles.vitalDivider} />

            <View style={styles.vitalItem}>
              <AppText
                variant="xs"
                color={colors.textMuted}
              >
                Edad / Sexo
              </AppText>

              <AppText
                variant="sm"
                weight="bold"
                color={colors.navy}
              >
                {currentUser.age} añ • {genderInitial}
              </AppText>
            </View>

            <View style={styles.vitalDivider} />

            <View style={styles.vitalItem}>
              <AppText
                variant="xs"
                color={colors.textMuted}
              >
                Ubicación
              </AppText>

              <AppText
                variant="xs"
                weight="bold"
                color={colors.navy}
                numberOfLines={1}
              >
                {currentUser.location}
              </AppText>
            </View>
          </View>
        </View>

        {/* Emergency Contact Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Feather
              name="shield"
              size={18}
              color={colors.primary}
            />

            <AppText
              variant="base"
              weight="bold"
              color={colors.navy}
              style={styles.sectionTitle}
            >
              Contacto de Emergencia
            </AppText>
          </View>

          <View style={styles.emptyMedicalData}>
            <Feather
              name="user-plus"
              size={20}
              color={colors.gray400}
            />

            <AppText
              variant="sm"
              color={colors.textSecondary}
              align="center"
              style={styles.emptyMedicalText}
            >
              No hay un contacto de emergencia registrado.
            </AppText>
          </View>
        </View>

        {/* Allergies Badges */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <MaterialCommunityIcons
              name="alert-decagram-outline"
              size={18}
              color="#D97706"
            />

            <AppText
              variant="base"
              weight="bold"
              color={colors.navy}
              style={styles.sectionTitle}
            >
              Alergias Registradas
            </AppText>
          </View>

          <View style={styles.emptyMedicalData}>
            <Feather
              name="check-circle"
              size={20}
              color={colors.success}
            />

            <AppText
              variant="sm"
              color={colors.textSecondary}
              align="center"
              style={styles.emptyMedicalText}
            >
              No hay alergias registradas.
            </AppText>
          </View>
        </View>

        {/* Settings & Configuration Options */}
        <View style={styles.settingsCard}>
          <AppText
            variant="xs"
            weight="bold"
            color={colors.textMuted}
            style={styles.settingsCategory}
          >
            CONFIGURACIÓN Y PREFERENCIAS
          </AppText>

          {/* Notificaciones */}
          <View style={styles.settingItemRow}>
            <View style={styles.settingIconBox}>
              <Feather
                name="bell"
                size={18}
                color={colors.primary}
              />
            </View>

            <View style={styles.settingTextCol}>
              <AppText
                variant="sm"
                weight="semiBold"
                color={colors.navy}
              >
                Notificaciones y Recordatorios
              </AppText>

              <AppText
                variant="xs"
                color={colors.textSecondary}
              >
                Avisos de medicamentos y citas próximas
              </AppText>
            </View>

            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{
                false: colors.gray200,
                true: colors.softBlue,
              }}
              thumbColor={
                notificationsEnabled
                  ? colors.primary
                  : colors.gray400
              }
            />
          </View>

          {/* Seguridad Biométrica */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSecurity}
          >
            <View style={styles.settingItemRow}>
              <View style={styles.settingIconBox}>
                <Feather
                  name="lock"
                  size={18}
                  color={colors.primary}
                />
              </View>

              <View style={styles.settingTextCol}>
                <AppText
                  variant="sm"
                  weight="semiBold"
                  color={colors.navy}
                >
                  Seguridad Biométrica
                </AppText>

                <AppText
                  variant="xs"
                  color={colors.textSecondary}
                >
                  Desbloqueo con FaceID o Huella Digital
                </AppText>
              </View>

              <Switch
                value={biometricsEnabled}
                onValueChange={setBiometricsEnabled}
                trackColor={{
                  false: colors.gray200,
                  true: colors.softBlue,
                }}
                thumbColor={
                  biometricsEnabled
                    ? colors.primary
                    : colors.gray400
                }
              />
            </View>
          </TouchableOpacity>

          {/* Modo Offline */}
          <View style={styles.settingItemRow}>
            <View style={styles.settingIconBox}>
              <Feather
                name="wifi-off"
                size={18}
                color={colors.primary}
              />
            </View>

            <View style={styles.settingTextCol}>
              <AppText
                variant="sm"
                weight="semiBold"
                color={colors.navy}
              >
                Modo Sin Conexión (Offline)
              </AppText>

              <AppText
                variant="xs"
                color={colors.textSecondary}
              >
                Guardar recetas y números de emergencia localmente
              </AppText>
            </View>

            <Switch
              value={offlineModeEnabled}
              onValueChange={setOfflineModeEnabled}
              trackColor={{
                false: colors.gray200,
                true: colors.softBlue,
              }}
              thumbColor={
                offlineModeEnabled
                  ? colors.primary
                  : colors.gray400
              }
            />
          </View>

          {/* Privacidad */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePrivacy}
            style={styles.settingClickableRow}
          >
            <View style={styles.settingIconBox}>
              <Feather
                name="eye-off"
                size={18}
                color={colors.primary}
              />
            </View>

            <View style={styles.settingTextCol}>
              <AppText
                variant="sm"
                weight="semiBold"
                color={colors.navy}
              >
                Privacidad y Protección de Datos
              </AppText>
            </View>

            <Feather
              name="chevron-right"
              size={18}
              color={colors.gray400}
            />
          </TouchableOpacity>

          {/* Cerrar Sesión */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleLogout}
            style={[
              styles.settingClickableRow,
              styles.logoutRow,
            ]}
          >
            <View
              style={[
                styles.settingIconBox,
                {
                  backgroundColor: colors.errorLight,
                },
              ]}
            >
              <Feather
                name="log-out"
                size={18}
                color={colors.error}
              />
            </View>

            <View style={styles.settingTextCol}>
              <AppText
                variant="sm"
                weight="bold"
                color={colors.error}
              >
                Cerrar Sesión
              </AppText>
            </View>

            <Feather
              name="chevron-right"
              size={18}
              color={colors.error}
            />
          </TouchableOpacity>
        </View>

        {/* Dohi Official Brand Badge */}
        <View style={styles.brandFooterCard}>
          <AppLogo size={44} />

          <AppText
            variant="sm"
            weight="bold"
            color={colors.navy}
            style={styles.brandFooterTitle}
          >
            DOHI SALUD DIGITAL
          </AppText>

          <AppText
            variant="xs"
            color={colors.textMuted}
            align="center"
          >
            Tu asistente inteligente de salud y telemedicina.
            {'\n'}
            Versión 1.0.0 • 2026
          </AppText>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: spacing.sm,
  },

  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    paddingBottom: spacing['2xl'],
  },

  profileHeaderCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },

  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },

  avatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: colors.primary,
  },

  avatarPlaceholder: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },

  userTextCol: {
    flex: 1,
  },

  vitalsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.gray50,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm + 2,
  },

  vitalItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: spacing.xs,
  },

  vitalDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.gray200,
  },

  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.sm,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  sectionTitle: {
    marginLeft: spacing.xs + 2,
  },

  emptyMedicalData: {
    minHeight: 70,
    backgroundColor: colors.gray50,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  emptyMedicalText: {
    marginTop: spacing.xs,
  },

  settingsCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
    marginBottom: spacing.base,
  },

  settingsCategory: {
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },

  settingItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },

  settingClickableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },

  logoutRow: {
    borderBottomWidth: 0,
    marginTop: spacing.xs,
  },

  settingIconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.lg,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  settingTextCol: {
    flex: 1,
  },

  brandFooterCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.base,
  },

  brandFooterTitle: {
    marginTop: spacing.xs,
    marginBottom: 2,
    letterSpacing: 1,
  },

  bottomSpacer: {
    height: 20,
  },
});