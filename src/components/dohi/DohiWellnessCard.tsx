import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { AppButton } from '../common/AppButton';
import { DohiCharacter } from './DohiCharacter';

export interface DohiWellnessCardProps {
  onPressTalk?: () => void;
  onPressCard?: () => void;
}

export const DohiWellnessCard: React.FC<DohiWellnessCardProps> = ({
  onPressTalk,
  onPressCard,
}) => {
  const handleTalk = () => {
    if (onPressTalk) {
      onPressTalk();
    } else {
      router.push('/(app)/(tabs)/dohi');
    }
  };

  const handleCardPress = () => {
    if (onPressCard) {
      onPressCard();
    } else {
      router.push('/(app)/wellness');
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={handleCardPress}
      style={styles.card}
    >
      {/* Background Decorative Bubble Elements */}
      <View style={styles.bubbleTop} />
      <View style={styles.bubbleBottom} />

      <View style={styles.contentRow}>
        {/* Left Dohi Character */}
        <View style={styles.characterContainer}>
          <DohiCharacter pose="talking" size={105} />
        </View>

        {/* Right Content */}
        <View style={styles.textContainer}>
          <View style={styles.badgeRow}>
            <View style={styles.onlineDot} />
            <AppText variant="xs" weight="semiBold" color={colors.primary}>
              ASISTENTE DOHI
            </AppText>
          </View>

          <AppText variant="xl" weight="bold" color={colors.navy} style={styles.title}>
            Cuéntame
          </AppText>

          <AppText variant="base" weight="medium" color={colors.textSecondary} style={styles.subtitle}>
            ¿Cómo te sientes hoy?
          </AppText>

          <View style={styles.buttonWrapper}>
            <AppButton
              title="Hablar"
              variant="primary"
              size="sm"
              fullWidth={false}
              onPress={handleTalk}
              rightIcon={<Feather name="message-circle" size={16} color={colors.white} />}
              style={styles.talkButton}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightBlue,
    borderRadius: radius['2xl'],
    padding: spacing.base,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.softBlue,
    ...shadows.card,
  },
  bubbleTop: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#DCEBFA',
    opacity: 0.6,
  },
  bubbleBottom: {
    position: 'absolute',
    bottom: -30,
    left: 20,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E0EEFC',
    opacity: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  characterContainer: {
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  title: {
    marginBottom: 1,
  },
  subtitle: {
    marginBottom: spacing.md,
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
  },
  talkButton: {
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    minHeight: 38,
  },
});
