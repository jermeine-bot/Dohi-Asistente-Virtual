import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { HealthCampaign } from '../../types/HealthCampaign';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { StatusBadge } from '../common/StatusBadge';

interface HealthCampaignCardProps {
  campaign: HealthCampaign;
  onPress: () => void;
  onPressReminder?: () => void;
  onPressShare?: () => void;
}

export const HealthCampaignCard: React.FC<HealthCampaignCardProps> = ({
  campaign,
  onPress,
  onPressReminder,
  onPressShare,
}) => {
  const getCategoryColor = () => {
    switch (campaign.category) {
      case 'VACUNACION':
        return { bg: '#EFF6FF', text: '#2563EB', icon: 'shield' as const };
      case 'DENGUE_ABATE':
        return { bg: '#FEF2F2', text: '#DC2626', icon: 'alert-triangle' as const };
      case 'ODONTOLOGIA':
        return { bg: '#F0FDF4', text: '#16A34A', icon: 'smile' as const };
      case 'OFTALMOLOGIA':
        return { bg: '#FAF5FF', text: '#9333EA', icon: 'eye' as const };
      case 'SALUD_MATERNA':
        return { bg: '#FDF2F8', text: '#DB2777', icon: 'heart' as const };
      case 'MEDICINA_GENERAL':
      default:
        return { bg: '#FEF3C7', text: '#D97706', icon: 'activity' as const };
    }
  };

  const catStyle = getCategoryColor();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={[styles.categoryBadge, { backgroundColor: catStyle.bg }]}>
          <Feather name={catStyle.icon} size={14} color={catStyle.text} style={styles.catIcon} />
          <AppText variant="xs" weight="bold" style={{ color: catStyle.text }}>
            {campaign.categoryLabel}
          </AppText>
        </View>

        <StatusBadge
          label={campaign.status === 'EN_CURSO' ? 'EN CURSO' : 'PROGRAMADA'}
          variant={campaign.status === 'EN_CURSO' ? 'success' : 'info'}
          size="sm"
        />
      </View>

      {/* Title & Description */}
      <AppText variant="base" weight="bold" color={colors.navy} style={styles.title}>
        {campaign.title}
      </AppText>
      <AppText variant="xs" color={colors.textSecondary} numberOfLines={2} style={styles.description}>
        {campaign.description}
      </AppText>

      {/* Info Items */}
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={14} color={colors.primary} style={styles.infoIcon} />
          <AppText variant="xs" weight="semiBold" color={colors.navy} numberOfLines={1} style={styles.flexOne}>
            {campaign.municipality}, {campaign.department} • {campaign.neighborhood}
          </AppText>
        </View>

        <View style={styles.infoRow}>
          <Feather name="calendar" size={14} color={colors.gray500} style={styles.infoIcon} />
          <AppText variant="xs" color={colors.textSecondary} style={styles.flexOne}>
            {campaign.startDate} al {campaign.endDate} ({campaign.timeSchedule})
          </AppText>
        </View>
      </View>

      {/* Footer Actions */}
      <View style={styles.footerRow}>
        <View style={styles.leftActions}>
          {onPressReminder && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPressReminder}
              style={[
                styles.actionBtn,
                campaign.reminderSet && styles.actionBtnActive,
              ]}
            >
              <Feather
                name="bell"
                size={14}
                color={campaign.reminderSet ? colors.white : colors.primary}
              />
              <AppText
                variant="xs"
                weight="semiBold"
                style={{
                  color: campaign.reminderSet ? colors.white : colors.primary,
                  marginLeft: 4,
                }}
              >
                {campaign.reminderSet ? 'Recordatorio' : 'Recordar'}
              </AppText>
            </TouchableOpacity>
          )}

          {onPressShare && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPressShare}
              style={styles.actionBtnSecondary}
            >
              <Feather name="share-2" size={14} color={colors.navy} />
              <AppText variant="xs" weight="semiBold" color={colors.navy} style={{ marginLeft: 4 }}>
                Compartir
              </AppText>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.detailLink}>
          <AppText variant="xs" weight="bold" color={colors.primary}>
            Ver detalle
          </AppText>
          <Feather name="chevron-right" size={16} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.md,
  },
  catIcon: {
    marginRight: 4,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    marginBottom: spacing.md,
  },
  infoBox: {
    backgroundColor: colors.gray50,
    borderRadius: radius.lg,
    padding: spacing.sm + 2,
    marginBottom: spacing.md,
    gap: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 6,
  },
  flexOne: {
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    paddingTop: spacing.xs + 2,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.full,
    backgroundColor: colors.lightBlue,
  },
  actionBtnActive: {
    backgroundColor: colors.primary,
  },
  actionBtnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.full,
    backgroundColor: colors.gray100,
  },
  detailLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
