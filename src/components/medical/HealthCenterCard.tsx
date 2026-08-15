import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { StatusBadge } from '../common/StatusBadge';
import { HealthCenter } from '../../types/HealthCenter';

export interface HealthCenterCardProps {
  center: HealthCenter;
  onPress?: () => void;
  onCallEmergency?: () => void;
}

export const HealthCenterCard: React.FC<HealthCenterCardProps> = ({
  center,
  onPress,
  onCallEmergency,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <Image source={{ uri: center.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <StatusBadge
            label={center.type}
            variant="info"
            size="sm"
          />
          <View style={styles.ratingRow}>
            <Feather name="star" size={13} color="#F59E0B" />
            <AppText variant="xs" weight="bold" color={colors.navy} style={styles.ratingText}>
              {center.rating.toFixed(1)}
            </AppText>
            {center.distanceKm && (
              <AppText variant="xs" color={colors.textMuted} style={styles.distanceText}>
                • {center.distanceKm}
              </AppText>
            )}
          </View>
        </View>

        <AppText variant="base" weight="bold" color={colors.navy} numberOfLines={2} style={styles.name}>
          {center.name}
        </AppText>

        <View style={styles.detailRow}>
          <Feather name="map-pin" size={13} color={colors.gray400} />
          <AppText variant="xs" color={colors.textSecondary} numberOfLines={1} style={styles.detailText}>
            {center.address}
          </AppText>
        </View>

        <View style={styles.detailRow}>
          <Feather name="clock" size={13} color={colors.gray400} />
          <AppText variant="xs" color={center.isOpen24h ? colors.success : colors.textSecondary} numberOfLines={1} style={styles.detailText}>
            {center.openHours}
          </AppText>
        </View>

        {/* Services tags */}
        <View style={styles.servicesRow}>
          {center.services.slice(0, 3).map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <AppText variant="xs" color={colors.navy}>
                {service}
              </AppText>
            </View>
          ))}
          {center.services.length > 3 && (
            <View style={styles.serviceTag}>
              <AppText variant="xs" color={colors.primary} weight="medium">
                +{center.services.length - 3} más
              </AppText>
            </View>
          )}
        </View>

        {/* Action button: Emergency phone */}
        <View style={styles.footerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onCallEmergency}
            style={styles.emergencyButton}
          >
            <Feather name="phone-call" size={13} color={colors.primary} />
            <AppText variant="xs" weight="semiBold" color={colors.primary} style={styles.emergencyText}>
              {center.phone}
            </AppText>
          </TouchableOpacity>

          <View style={styles.detailsAction}>
            <AppText variant="xs" weight="semiBold" color={colors.primary}>
              Ver detalles
            </AppText>
            <Feather name="chevron-right" size={14} color={colors.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    overflow: 'hidden',
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: colors.gray100,
  },
  content: {
    padding: spacing.base,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 3,
  },
  distanceText: {
    marginLeft: 3,
  },
  name: {
    marginBottom: spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 6,
    flex: 1,
  },
  servicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: spacing.sm,
  },
  serviceTag: {
    backgroundColor: colors.gray100,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    paddingTop: spacing.sm,
    marginTop: 4,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  emergencyText: {
    marginLeft: 5,
  },
  detailsAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
