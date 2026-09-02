import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { AppText } from '../../../src/components/common/AppText';
import { AlertPriorityBadge } from '../../../src/components/medical/AlertPriorityBadge';
import { mockEpidemiologicalAlerts } from '../../../src/data/mockEpidemiologicalAlerts';

export default function EpidemiologicalAlertDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const alertItem =
    mockEpidemiologicalAlerts.find((a) => a.id === id) || mockEpidemiologicalAlerts[0];

  const [notificationEnabled, setNotificationEnabled] = useState(
    alertItem.isNotificationActive || false
  );

  const handleToggleNotification = (val: boolean) => {
    setNotificationEnabled(val);
    Alert.alert(
      val ? '🔔 Notificaciones Activadas' : '🔕 Notificaciones Desactivadas',
      val
        ? `Recibirás avisos prioritarios en tu móvil sobre "${alertItem.title}" en la zona de ${alertItem.department}.`
        : `Has deshabilitado las notificaciones para esta alerta.`
    );
  };

  const handleCallEmergency = () => {
    Linking.openURL('tel:118');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        title="Alerta Sanitaria"
        subtitle={alertItem.source}
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.badgeRow}>
            <AlertPriorityBadge priority={alertItem.priority} size="md" />
            <AppText variant="xs" color={colors.textMuted}>
              {alertItem.updatedAt}
            </AppText>
          </View>

          <AppText variant="xl" weight="bold" color={colors.navy} style={styles.title}>
            {alertItem.title}
          </AppText>

          <AppText variant="sm" color={colors.textSecondary} style={styles.summary}>
            {alertItem.summary}
          </AppText>

          <View style={styles.sourceBox}>
            <Feather name="info" size={14} color={colors.primary} style={{ marginRight: 6 }} />
            <AppText variant="xs" weight="semiBold" color={colors.primary} style={{ flex: 1 }}>
              Fuente oficial: {alertItem.source}
            </AppText>
          </View>
        </View>

        {/* Notification Switch Card */}
        <View style={styles.switchCard}>
          <View style={styles.switchIconBox}>
            <Feather name="bell" size={20} color={colors.primary} />
          </View>
          <View style={styles.switchTextCol}>
            <AppText variant="sm" weight="bold" color={colors.navy}>
              Notificaciones de Zona
            </AppText>
            <AppText variant="xs" color={colors.textSecondary}>
              Recibir alertas locales en mi teléfono
            </AppText>
          </View>
          <Switch
            value={notificationEnabled}
            onValueChange={handleToggleNotification}
            trackColor={{ false: colors.gray300, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        {/* Affected Zones */}
        {alertItem.affectedZones && alertItem.affectedZones.length > 0 && (
          <View style={styles.sectionCard}>
            <AppText variant="base" weight="bold" color={colors.navy} style={{ marginBottom: spacing.sm }}>
              Zonas de Mayor Riesgo
            </AppText>
            <View style={styles.zonesRow}>
              {alertItem.affectedZones.map((zone, idx) => (
                <View key={idx} style={styles.zoneBadge}>
                  <Feather name="map-pin" size={12} color={colors.primary} style={{ marginRight: 4 }} />
                  <AppText variant="xs" weight="semiBold" color={colors.navy}>
                    {zone}
                  </AppText>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Symptoms Section */}
        {alertItem.symptoms && alertItem.symptoms.length > 0 && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <FontAwesome5 name="stethoscope" size={16} color="#DC2626" style={{ marginRight: 8 }} />
              <AppText variant="base" weight="bold" color={colors.navy}>
                Síntomas Característicos
              </AppText>
            </View>

            {alertItem.symptoms.map((symptom, idx) => (
              <View key={idx} style={styles.symptomRow}>
                <View style={styles.symptomDot} />
                <AppText variant="xs" weight="semiBold" color={colors.navy} style={{ flex: 1 }}>
                  {symptom}
                </AppText>
              </View>
            ))}
          </View>
        )}

        {/* Prevention Steps Checklist */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <Feather name="shield" size={18} color={colors.success} style={{ marginRight: 8 }} />
            <AppText variant="base" weight="bold" color={colors.navy}>
              Recomendaciones de Prevención
            </AppText>
          </View>

          {alertItem.preventionSteps.map((step, idx) => (
            <View key={idx} style={styles.stepRow}>
              <View style={styles.stepCheckCircle}>
                <Feather name="check" size={14} color={colors.success} />
              </View>
              <AppText variant="xs" color={colors.textPrimary} style={styles.stepText}>
                {step}
              </AppText>
            </View>
          ))}
        </View>

        {/* Emergency Call Banner */}
        <View style={styles.emergencyBanner}>
          <View style={styles.emergencyTextCol}>
            <AppText variant="base" weight="bold" color={colors.white}>
              ¿Presentas fiebre o síntomas de alarma?
            </AppText>
            <AppText variant="xs" color="rgba(255,255,255,0.9)" style={{ marginTop: 2 }}>
              Llama de inmediato a la línea directa de emergencias sanitarias.
            </AppText>
          </View>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleCallEmergency}
            style={styles.emergencyCallBtn}
          >
            <Feather name="phone-call" size={16} color={colors.error} style={{ marginRight: 6 }} />
            <AppText variant="xs" weight="bold" color={colors.error}>
              Llamar 118
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
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
    paddingTop: spacing.base,
    paddingBottom: spacing['2xl'],
  },
  heroCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    marginBottom: spacing.xs,
  },
  summary: {
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  sourceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: radius.lg,
    padding: spacing.sm + 2,
  },
  switchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  switchIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  switchTextCol: {
    flex: 1,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  zonesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  zoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  symptomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
    backgroundColor: colors.gray50,
    borderRadius: radius.lg,
    padding: spacing.sm + 2,
  },
  symptomDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    marginRight: spacing.sm,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  stepCheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  stepText: {
    flex: 1,
    lineHeight: 19,
  },
  emergencyBanner: {
    backgroundColor: colors.error,
    borderRadius: radius.xl,
    padding: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    ...shadows.card,
  },
  emergencyTextCol: {
    flex: 1,
    marginRight: spacing.sm,
  },
  emergencyCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
