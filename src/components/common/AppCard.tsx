import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { colors, radius, spacing, shadows } from '../../theme';

export interface AppCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'outlined' | 'flat' | 'tinted';
  padding?: keyof typeof spacing;
  activeOpacity?: number;
}

export const AppCard: React.FC<AppCardProps> = ({
  children,
  onPress,
  style,
  variant = 'elevated',
  padding = 'base',
  activeOpacity = 0.7,
}) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.gray200,
        };
      case 'flat':
        return {
          backgroundColor: colors.gray100,
        };
      case 'tinted':
        return {
          backgroundColor: colors.lightBlue,
        };
      default: // elevated
        return {
          backgroundColor: colors.white,
          ...shadows.card,
        };
    }
  };

  const cardPadding = spacing[padding];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}
        style={[
          styles.base,
          { padding: cardPadding },
          getVariantStyle(),
          style,
        ]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.base,
        { padding: cardPadding },
        getVariantStyle(),
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
});
