import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { DohiCharacter } from './DohiCharacter';
import { Message } from '../../types/Message';

export interface MessageBubbleProps {
  message: Message;
  onSelectSuggestion?: (suggestion: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onSelectSuggestion,
}) => {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <View style={styles.userContainer}>
        <View style={styles.userBubble}>
          <AppText variant="base" color={colors.white}>
            {message.text}
          </AppText>
          <AppText variant="xs" color="rgba(255, 255, 255, 0.75)" style={styles.timestampUser}>
            {message.timestamp}
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.assistantContainer}>
      <View style={styles.avatarWrapper}>
        <DohiCharacter pose="happy" size={38} />
      </View>

      <View style={styles.assistantContent}>
        <View style={styles.assistantBubble}>
          {message.isTyping ? (
            <View style={styles.typingRow}>
              <ActivityIndicator size="small" color={colors.primary} />
              <AppText variant="sm" color={colors.textSecondary} style={styles.typingText}>
                Dohi está respondiendo...
              </AppText>
            </View>
          ) : (
            <>
              <AppText variant="base" color={colors.textPrimary}>
                {message.text}
              </AppText>
              <AppText variant="xs" color={colors.textMuted} style={styles.timestampAssistant}>
                {message.timestamp}
              </AppText>
            </>
          )}
        </View>

        {/* Suggestion Chips */}
        {message.suggestions && message.suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {message.suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => onSelectSuggestion?.(suggestion)}
                style={styles.suggestionChip}
              >
                <AppText variant="xs" weight="medium" color={colors.primary}>
                  {suggestion}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.md,
    paddingLeft: 48,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    borderBottomRightRadius: radius.xs,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    maxWidth: '85%',
    ...shadows.sm,
  },
  timestampUser: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  assistantContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    paddingRight: 32,
  },
  avatarWrapper: {
    marginRight: spacing.sm,
    marginTop: 4,
  },
  assistantContent: {
    flex: 1,
  },
  assistantBubble: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    borderBottomLeftRadius: radius.xs,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.sm,
  },
  timestampAssistant: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  typingText: {
    marginLeft: spacing.sm,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  suggestionChip: {
    backgroundColor: colors.lightBlue,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderWidth: 1,
    borderColor: colors.softBlue,
    marginBottom: 4,
  },
});
