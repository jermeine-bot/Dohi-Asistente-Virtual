import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Linking,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { AppText } from '../../../src/components/common/AppText';
import { StatusBadge } from '../../../src/components/common/StatusBadge';
import { mockHealthCampaigns } from '../../../src/data/mockHealthCampaigns';

export default function HealthCampaignDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const campaign = mockHealthCampaigns.find((c) => c.id === id) || mockHealthCampaigns[0];
  const [reminderSet, setReminderSet] = useState(campaign.reminderSet || false);

  const handleToggleReminder = () => {
    const nextState = !reminderSet;
    setReminderSet(nextState);
    Alert.alert(
      nextState ? '🔔 Recordatorio Programado' : '🔕 Recordatorio Cancelado',
      nextState
        ? `Se ha guardado un recordatorio para el ${campaign.startDate} a las 08:00 AM para la jornada "${campaign.title}".`
        : `Has cancelado la notificación.`
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `📢 *Jornada de Salud DOHI*\n\n🏥 *${campaign.title}*\n📍 Ubicación: ${campaign.neighborhood}, ${campaign.municipality}, ${campaign.department}\n📍 Dirección: ${campaign.address}\n📅 Fecha: ${campaign.startDate} al ${campaign.endDate}\n⏰ Horario: ${campaign.timeSchedule}\n\n¡Comparte con tus vecinos y familia!`,
      });
    } catch (e) {
      console.log('Error sharing:', e);
    }
  };

  const handleCallOrganizer = () => {
    if (campaign.contactPhone) {
      Linking.openURL(`tel:${campaign.contactPhone.replace(/[^0-9+]/g, '')}`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        title="Detalle de Jornada"
        subtitle={campaign.organizer}
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Banner Card */}
        <View style={styles.heroCard}>
          <View style={styles.badgeRow}>
            <View style={styles.categoryBadge}>
              <Feather name="shield" size={14} color={colors.primary} style={{ marginRight: 4 }} />
              <AppText variant="xs" weight="bold" color={colors.primary}>
                {campaign.categoryLabel}
              </AppText>
            </View>

            <StatusBadge
              label={campaign.status === 'EN_CURSO' ? 'EN CURSO' : 'PROGRAMADA'}
              variant={campaign.status === 'EN_CURSO' ? 'success' : 'info'}
              size="sm"
            />
          </View>

          <AppText variant="xl" weight="bold" color={colors.navy} style={styles.title}>
            {campaign.title}
          </AppText>

          <AppText variant="sm" color={colors.textSecondary} style={styles.description}>
            {campaign.description}
          </AppText>
        </View>

        {/* Location & Time Info */}
        <View style={styles.sectionCard}>
          <AppText variant="base" weight="bold" color={colors.navy} style={{ marginBottom: spacing.sm }}>
            Ubicación y Horario
          </AppText>

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Feather name="map-pin" size={18} color={colors.primary} />
            </View>
            <View style={styles.infoTextCol}>
              <AppText variant="xs" weight="bold" color={colors.navy}>
                {campaign.neighborhood}
              </AppText>
              <AppText variant="xs" color={colors.textSecondary}>
                {campaign.address} ({campaign.municipality}, {campaign.department})
              </AppText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Feather name="calendar" size={18} color={colors.primary} />
            </View>
            <View style={styles.infoTextCol}>
              <AppText variant="xs" weight="bold" color={colors.navy}>
                {campaign.startDate} al {campaign.endDate}
              </AppText>
              <AppText variant="xs" color={colors.textSecondary}>
                Horario continuo: {campaign.timeSchedule}
              </AppText>
            </View>
          </View>

          {campaign.contactPhone && (
            <>
              <View style={styles.divider} />
              <TouchableOpacity activeOpacity={0.7} onPress={handleCallOrganizer} style={styles.infoRow}>
                <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
                  <Feather name="phone" size={18} color="#16A34A" />
                </View>
                <View style={styles.infoTextCol}>
                  <AppText variant="xs" weight="bold" color="#16A34A">
                    {campaign.contactPhone}
                  </AppText>
                  <AppText variant="xs" color={colors.textSecondary}>
                    Toca para llamar al organizador ({campaign.organizer})
                  </AppText>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Services List */}
        <View style={styles.sectionCard}>
          <AppText variant="base" weight="bold" color={colors.navy} style={{ marginBottom: spacing.sm }}>
            Servicios Incluidos
          </AppText>
          {campaign.services.map((service, index) => (
            <View key={index} style={styles.checkItemRow}>
              <View style={styles.checkIcon}>
                <Feather name="check" size={14} color={colors.success} />
              </View>
              <AppText variant="xs" weight="semiBold" color={colors.navy} style={{ flex: 1 }}>
                {service}
              </AppText>
            </View>
          ))}
        </View>

        {/* Requirements List */}
        <View style={styles.sectionCard}>
          <AppText variant="base" weight="bold" color={colors.navy} style={{ marginBottom: spacing.sm }}>
            Requisitos de Asistencia
          </AppText>
          {campaign.requirements.map((req, index) => (
            <View key={index} style={styles.reqItemRow}>
              <View style={styles.reqDot} />
              <AppText variant="xs" color={colors.textSecondary} style={{ flex: 1 }}>
                {req}
              </AppText>
            </View>
          ))}
        </View>

        {/* Actions Row */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleToggleReminder}
            style={[styles.mainActionBtn, reminderSet && styles.mainActionBtnActive]}
          >
            <Feather
              name="bell"
              size={18}
              color={reminderSet ? colors.white : colors.primary}
              style={{ marginRight: 8 }}
            />
            <AppText
              variant="sm"
              weight="bold"
              style={{ color: reminderSet ? colors.white : colors.primary }}
            >
              {reminderSet ? 'Recordatorio Programado' : 'Guardar Recordatorio'}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleShare}
            style={styles.shareActionBtn}
          >
            <FontAwesome5 name="whatsapp" size={18} color="#25D366" style={{ marginRight: 8 }} />
            <AppText variant="sm" weight="bold" color={colors.navy}>
              Compartir por WhatsApp
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
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.md,
  },
  title: {
    marginBottom: spacing.xs,
  },
  description: {
    lineHeight: 20,
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  infoTextCol: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray100,
    marginVertical: spacing.sm + 2,
  },
  checkItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  reqItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  reqDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: spacing.sm,
    marginLeft: 4,
  },
  actionsContainer: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  mainActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  mainActionBtnActive: {
    backgroundColor: colors.primary,
  },
  shareActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray300,
    ...shadows.sm,
  },
});
