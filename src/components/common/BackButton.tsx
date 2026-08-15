import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';

export interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  color = colors.navy,
  backgroundColor = colors.gray100,
  style,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[styles.button, { backgroundColor }, style]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Feather name="arrow-left" size={20} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
