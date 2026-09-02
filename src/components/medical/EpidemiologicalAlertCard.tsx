import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { EpidemiologicalAlert } from '../../types/EpidemiologicalAlert';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { AlertPriorityBadge } from './AlertPriorityBadge';

interface EpidemiologicalAlertCardProps {
  alert: EpidemiologicalAlert;
  onPress: () => void;
}

export const EpidemiologicalAlertCard: React.FC<EpidemiologicalAlertCardProps> = ({
  alert,
  onPress,
}) => {
  const getBorderColor = () => {
    switch (alert.priority) {
      case 'HIGH':
        return '#FCA5A5';
      case 'ATTENTION':
        return '#FDBA74';
      case 'PREVENTIVE':
        return '#FDE68A';
      case 'INFO':
      default:
        return '#93C5FD';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, { borderColor: getBorderColor() }]}
    >
      <View style={styles.headerRow}>
        <AlertPriorityBadge priority={alert.priority} size="sm" />
        <View style={styles.locationTag}>
          <Feather name="map-pin" size={12} color={colors.navy} style={{ marginRight: 4 }} />
          <AppText variant="xs" weight="semiBold" color={colors.navy}>
            {alert.department}
          </AppText>
        </View>
      </View>

      <AppText variant="base" weight="bold" color={colors.navy} style={styles.title}>
        {alert.title}
      </AppText>

      <AppText variant="xs" color={colors.textSecondary} numberOfLines={2} style={styles.summary}>
        {alert.summary}
      </AppText>

      {alert.affectedZones && alert.affectedZones.length > 0 && (
        <View style={styles.zonesContainer}>
          <AppText variant="xs" weight="bold" color={colors.gray700} style={{ marginBottom: 4 }}>
            Zonas afectadas:
          </AppText>
          <View style={styles.zonesRow}>
            {alert.affectedZones.map((zone, idx) => (
              <View key={idx} style={styles.zoneChip}>
                <AppText variant="xs" color={colors.gray700}>
                  {zone}
                </AppText>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.footerRow}>
        <AppText variant="xs" color={colors.textMuted}>
          Actualizado: {alert.updatedAt}
        </AppText>

        <View style={styles.actionLink}>
          <AppText variant="xs" weight="bold" color={colors.primary}>
            Ver recomendaciones
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
    borderWidth: 1.5,
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs + 2,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.md,
  },
  title: {
    marginBottom: 4,
  },
  summary: {
    marginBottom: spacing.md,
  },
  zonesContainer: {
    backgroundColor: colors.gray50,
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  zonesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  zoneChip: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    paddingTop: spacing.xs + 2,
  },
  actionLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
