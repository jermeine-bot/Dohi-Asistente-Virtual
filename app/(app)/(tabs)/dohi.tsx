import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { DohiCharacter } from '../../../src/components/dohi/DohiCharacter';
import { MessageBubble } from '../../../src/components/dohi/MessageBubble';
import { initialMockMessages } from '../../../src/data/mockMessages';
import { Message } from '../../../src/types/Message';

const DOHI_API_URL = 'http://192.168.1.234:3000/api/dohi/chat';

interface DohiHistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function DohiChatScreen() {
  const [messages, setMessages] =
    useState<Message[]>(initialMockMessages);

  const [inputText, setInputText] = useState('');

  const [isTyping, setIsTyping] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  };

  const buildHistory = (): DohiHistoryMessage[] => {
    return messages
      .filter(
        (message) =>
          message.sender === 'user' ||
          message.sender === 'assistant',
      )
      .filter(
        (message) =>
          typeof message.text === 'string' &&
          message.text.trim().length > 0,
      )
      .map((message) => ({
        role:
          message.sender === 'user'
            ? 'user'
            : 'assistant',
        content: message.text,
      }));
  };

  const sendMessageToDohi = async (
    text: string,
  ): Promise<string> => {
    const history = buildHistory();

    const response = await fetch(DOHI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: text,
        history,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          'No fue posible obtener una respuesta de Dohi.',
      );
    }

    return data.message;
  };

  const handleSend = async (
    textToSend?: string,
  ) => {
    const text = (
      textToSend || inputText
    ).trim();

    if (!text || isTyping) {
      return;
    }

    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString(
        [],
        {
          hour: '2-digit',
          minute: '2-digit',
        },
      ),
    };

    setMessages((prev) => [
      ...prev,
      userMsg,
    ]);

    if (!textToSend) {
      setInputText('');
    }

    setIsTyping(true);

    scrollToEnd();

    try {
     
      const answerText =
        await sendMessageToDohi(text);

      const assistantMsg: Message = {
        id: `msg-asst-${Date.now()}`,
        sender: 'assistant',
        text: answerText,
        timestamp: new Date().toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit',
          },
        ),
        suggestions: [
          'Agendar cita médica',
          'Ver mis medicamentos',
          'Técnicas de relajación',
        ],
      };

      setMessages((prev) => [
        ...prev,
        assistantMsg,
      ]);

      scrollToEnd();
    } catch (error) {
      console.error(
        'Error comunicando con Dohi:',
        error,
      );

      const errorMsg: Message = {
        id: `msg-error-${Date.now()}`,
        sender: 'assistant',
        text:
          'Lo siento, en este momento no puedo conectarme con mi servicio de orientación. Intenta nuevamente en unos momentos.',
        timestamp: new Date().toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit',
          },
        ),
      };

      setMessages((prev) => [
        ...prev,
        errorMsg,
      ]);

      scrollToEnd();
    } finally {
      setIsTyping(false);
    }
  };
  const handleClearChat = () => {
    setMessages(initialMockMessages);
    setInputText('');
    setIsTyping(false);
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarWrapper}>
            <DohiCharacter
              pose="happy"
              size={44}
            />
          </View>

          <View style={styles.headerTextCol}>
            <View style={styles.titleRow}>
              <AppText
                variant="base"
                weight="bold"
                color={colors.navy}
              >
                Dohi Asistente
              </AppText>

              <View style={styles.verifiedBadge}>
                <Feather
                  name="check"
                  size={10}
                  color={colors.white}
                />
              </View>
            </View>

            <View style={styles.statusRow}>
              <View style={styles.onlineDot} />

              <AppText
                variant="xs"
                color={colors.success}
                weight="medium"
              >
                En línea • Salud Inteligente
              </AppText>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClearChat}
          style={styles.clearChatButton}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}
        >
          <Feather
            name="rotate-ccw"
            size={18}
            color={colors.gray400}
          />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? 90 : 0
        }
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={
            styles.messagesContent
          }
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({
              animated: true,
            })
          }
        >

          <View style={styles.welcomeBanner}>
            <DohiCharacter
              pose="talking"
              size={80}
            />

            <AppText
              variant="sm"
              weight="bold"
              color={colors.navy}
              align="center"
              style={styles.welcomeTitle}
            >
              ¡Hola Juan! Estoy aquí para orientarte
            </AppText>

            <AppText
              variant="xs"
              color={colors.textSecondary}
              align="center"
            >
              Puedes consultarme dudas sobre tus
              síntomas, medicamentos, citas y
              primeros auxilios.
            </AppText>
          </View>

          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onSelectSuggestion={(suggestion) =>
                handleSend(suggestion)
              }
            />
          ))}

          {isTyping && (
            <MessageBubble
              message={{
                id: 'typing-indicator',
                sender: 'assistant',
                text: '',
                timestamp: '',
                isTyping: true,
              }}
            />
          )}
        </ScrollView>

        <View
          style={styles.inputBarContainer}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Pregúntale a Dohi sobre tu salud..."
              placeholderTextColor={
                colors.gray400
              }
              style={styles.textInput}
              multiline
              maxLength={300}
              editable={!isTyping}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleSend()}
              disabled={
                !inputText.trim() ||
                isTyping
              }
              style={[
                styles.sendButton,
                inputText.trim() &&
                !isTyping
                  ? styles.sendButtonActive
                  : styles.sendButtonDisabled,
              ]}
            >
              <Ionicons
                name="send"
                size={18}
                color={
                  inputText.trim() &&
                  !isTyping
                    ? colors.white
                    : colors.gray400
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    ...shadows.sm,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarWrapper: {
    marginRight: spacing.md,
  },

  headerTextCol: {
    justifyContent: 'center',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  verifiedBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.success,
    marginRight: 5,
  },

  clearChatButton: {
    padding: spacing.xs,
  },

  keyboardContainer: {
    flex: 1,
  },

  messagesContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: spacing.base,
  },

  welcomeBanner: {
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.softBlue,
  },

  welcomeTitle: {
    marginTop: spacing.xs,
    marginBottom: 2,
  },

  inputBarContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical:
      Platform.OS === 'ios'
        ? spacing.sm
        : 2,
    minHeight: 46,
  },

  textInput: {
    flex: 1,
    fontSize: 15,
    color: colors.navy,
    maxHeight: 100,
    paddingVertical: spacing.xs,
  },

  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },

  sendButtonActive: {
    backgroundColor: colors.primary,
  },

  sendButtonDisabled: {
    backgroundColor: colors.gray200,
  },
});