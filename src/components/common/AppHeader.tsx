import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';
import { AppText } from './AppText';
import { AppLogo } from './AppLogo';

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showLogo?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  style?: ViewStyle;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  showLogo = false,
  onBack,
  rightElement,
  style,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.header, style]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Feather name="arrow-left" size={22} color={colors.navy} />
          </TouchableOpacity>
        )}

        {showLogo && (
          <View style={styles.logoWrapper}>
            <AppLogo size={32} />
          </View>
        )}

        <View style={styles.titleContainer}>
          <AppText variant="lg" weight="bold" color={colors.navy} numberOfLines={1}>
            {title}
          </AppText>
          {subtitle && (
            <AppText variant="xs" color={colors.textSecondary} numberOfLines={1}>
              {subtitle}
            </AppText>
          )}
        </View>
      </View>

      {rightElement && <View style={styles.rightContainer}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    minHeight: 56,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: spacing.md,
    padding: spacing.xs,
  },
  logoWrapper: {
    marginRight: spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  rightContainer: {
    marginLeft: spacing.md,
  },
});

export default AppHeader;
