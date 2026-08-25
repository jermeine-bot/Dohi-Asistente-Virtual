import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppLogo } from '../../../src/components/common/AppLogo';
import { StatusBadge } from '../../../src/components/common/StatusBadge';
import { mockUser } from '../../../src/data/mockUser';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Puedes actualizar tus datos personales y teléfono de contacto.', [{ text: 'Entendido' }]);
  };

  const handlePrivacy = () => {
    Alert.alert('Privacidad de Datos Médicos', 'Tus datos clínicos e historial están protegidos con cifrado y confidencialidad médica conforme a las normativas de salud digital.', [{ text: 'Cerrar' }]);
  };

  const handleSecurity = () => {
    Alert.alert('Seguridad y PIN', 'Configura autenticación biométrica y contraseña de acceso seguro a DOHI.', [{ text: 'Cerrar' }]);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas salir de tu cuenta de DOHI?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => router.replace('/onboarding'),
        },
      ]
    );
  };

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
              <Image source={{ uri: mockUser.avatarUrl }} style={styles.avatar} />
              <TouchableOpacity
                onPress={handleEditProfile}
                activeOpacity={0.8}
                style={styles.editAvatarBadge}
              >
                <Feather name="camera" size={12} color={colors.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.userTextCol}>
              <AppText variant="xl" weight="bold" color={colors.navy}>
                {mockUser.name}
              </AppText>
              <AppText variant="sm" color={colors.textSecondary}>
                {mockUser.email}
              </AppText>
              <AppText variant="xs" color={colors.primary} weight="medium">
                {mockUser.phone}
              </AppText>
            </View>
          </View>

          {/* Quick Health Vitals Strip */}
          <View style={styles.vitalsStrip}>
            <View style={styles.vitalItem}>
              <AppText variant="xs" color={colors.textMuted}>Sangre</AppText>
              <AppText variant="base" weight="bold" color={colors.primary}>{mockUser.bloodType}</AppText>
            </View>
            <View style={styles.vitalDivider} />
            <View style={styles.vitalItem}>
              <AppText variant="xs" color={colors.textMuted}>Nacimiento</AppText>
              <AppText variant="sm" weight="bold" color={colors.navy}>14 May 1994</AppText>
            </View>
            <View style={styles.vitalDivider} />
            <View style={styles.vitalItem}>
              <AppText variant="xs" color={colors.textMuted}>Alergias</AppText>
              <AppText variant="sm" weight="bold" color={colors.error}>{mockUser.allergies.length}</AppText>
            </View>
          </View>
        </View>

        {/* Emergency Contact Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Feather name="shield" size={18} color={colors.primary} />
            <AppText variant="base" weight="bold" color={colors.navy} style={styles.sectionTitle}>
              Contacto de Emergencia
            </AppText>
          </View>
          <View style={styles.emergencyRow}>
            <View>
              <AppText variant="sm" weight="bold" color={colors.navy}>
                {mockUser.emergencyContact.name} ({mockUser.emergencyContact.relationship})
              </AppText>
              <AppText variant="xs" color={colors.textSecondary}>
                {mockUser.emergencyContact.phone}
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() => Alert.alert('Llamar Contacto', `Llamando a ${mockUser.emergencyContact.name}...`)}
              style={styles.callEmergencyBtn}
            >
              <Feather name="phone" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Allergies Badges */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <MaterialCommunityIcons name="alert-decagram-outline" size={18} color="#D97706" />
            <AppText variant="base" weight="bold" color={colors.navy} style={styles.sectionTitle}>
              Alergias Registradas
            </AppText>
          </View>
          <View style={styles.allergiesWrap}>
            {mockUser.allergies.map((allergy, index) => (
              <StatusBadge key={index} label={allergy} variant="warning" size="sm" />
            ))}
          </View>
        </View>

        {/* Settings & Configuration Options (Rule 30) */}
        <View style={styles.settingsCard}>
          <AppText variant="xs" weight="bold" color={colors.textMuted} style={styles.settingsCategory}>
            CONFIGURACIÓN Y PREFERENCIAS
          </AppText>

          {/* Notificaciones */}
          <View style={styles.settingItemRow}>
            <View style={styles.settingIconBox}>
              <Feather name="bell" size={18} color={colors.primary} />
            </View>
            <View style={styles.settingTextCol}>
              <AppText variant="sm" weight="semiBold" color={colors.navy}>
                Notificaciones y Recordatorios
              </AppText>
              <AppText variant="xs" color={colors.textSecondary}>
                Avisos de medicamentos y citas próximas
              </AppText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.gray200, true: colors.softBlue }}
              thumbColor={notificationsEnabled ? colors.primary : colors.gray400}
            />
          </View>

          {/* Seguridad Biométrica */}
          <View style={styles.settingItemRow}>
            <View style={styles.settingIconBox}>
              <Feather name="lock" size={18} color={colors.primary} />
            </View>
            <View style={styles.settingTextCol}>
              <AppText variant="sm" weight="semiBold" color={colors.navy}>
                Seguridad Biométrica
              </AppText>
              <AppText variant="xs" color={colors.textSecondary}>
                Desbloqueo con FaceID o Huella Digital
              </AppText>
            </View>
            <Switch
              value={biometricsEnabled}
              onValueChange={setBiometricsEnabled}
              trackColor={{ false: colors.gray200, true: colors.softBlue }}
              thumbColor={biometricsEnabled ? colors.primary : colors.gray400}
            />
          </View>

          {/* Modo Offline */}
          <View style={styles.settingItemRow}>
            <View style={styles.settingIconBox}>
              <Feather name="wifi-off" size={18} color={colors.primary} />
            </View>
            <View style={styles.settingTextCol}>
              <AppText variant="sm" weight="semiBold" color={colors.navy}>
                Modo Sin Conexión (Offline)
              </AppText>
              <AppText variant="xs" color={colors.textSecondary}>
                Guardar recetas y números de emergencia localmente
              </AppText>
            </View>
            <Switch
              value={offlineModeEnabled}
              onValueChange={setOfflineModeEnabled}
              trackColor={{ false: colors.gray200, true: colors.softBlue }}
              thumbColor={offlineModeEnabled ? colors.primary : colors.gray400}
            />
          </View>

          {/* Privacidad */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePrivacy}
            style={styles.settingClickableRow}
          >
            <View style={styles.settingIconBox}>
              <Feather name="eye-off" size={18} color={colors.primary} />
            </View>
            <View style={styles.settingTextCol}>
              <AppText variant="sm" weight="semiBold" color={colors.navy}>
                Privacidad y Protección de Datos
              </AppText>
            </View>
            <Feather name="chevron-right" size={18} color={colors.gray400} />
          </TouchableOpacity>

          {/* Cerrar Sesión */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleLogout}
            style={[styles.settingClickableRow, styles.logoutRow]}
          >
            <View style={[styles.settingIconBox, { backgroundColor: colors.errorLight }]}>
              <Feather name="log-out" size={18} color={colors.error} />
            </View>
            <View style={styles.settingTextCol}>
              <AppText variant="sm" weight="bold" color={colors.error}>
                Cerrar Sesión
              </AppText>
            </View>
            <Feather name="chevron-right" size={18} color={colors.error} />
          </TouchableOpacity>
        </View>

        {/* Dohi Official Brand Badge */}
        <View style={styles.brandFooterCard}>
          <AppLogo size={44} />
          <AppText variant="sm" weight="bold" color={colors.navy} style={styles.brandFooterTitle}>
            DOHI SALUD DIGITAL
          </AppText>
          <AppText variant="xs" color={colors.textMuted} align="center">
            Tu asistente inteligente de salud y telemedicina.{'\n'}Versión 1.0.0 • 2026
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
  emergencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray50,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  callEmergencyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allergiesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
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
