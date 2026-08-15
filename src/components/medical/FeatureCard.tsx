import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { FeatureItem } from '../../types/Feature';

export interface FeatureCardProps {
  feature: FeatureItem;
  onPress?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  onPress,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (feature.route) {
      router.push(feature.route as any);
    }
  };

  const renderIcon = () => {
    const iconColor = feature.iconColor || colors.primary;
    switch (feature.iconName) {
      case 'cross':
        return <FontAwesome5 name="first-aid" size={22} color={iconColor} />;
      case 'video':
        return <Feather name="video" size={22} color={iconColor} />;
      case 'scan':
        return <MaterialCommunityIcons name="line-scan" size={24} color={iconColor} />;
      case 'activity':
        return <Feather name="activity" size={22} color={iconColor} />;
      default:
        return <Feather name="shield" size={22} color={iconColor} />;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={handlePress}
      style={styles.card}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: feature.backgroundColor || colors.lightBlue },
        ]}
      >
        {renderIcon()}
      </View>

      <View style={styles.contentCol}>
        <AppText variant="base" weight="bold" color={colors.navy} style={styles.title}>
          {feature.title}
        </AppText>
        <AppText variant="sm" color={colors.textSecondary} numberOfLines={2}>
          {feature.subtitle}
        </AppText>
      </View>

      <View style={styles.arrowContainer}>
        <Feather name="chevron-right" size={20} color={colors.gray400} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  contentCol: {
    flex: 1,
    marginRight: spacing.xs,
  },
  title: {
    marginBottom: 2,
  },
  arrowContainer: {
    paddingLeft: spacing.xs,
  },
});
