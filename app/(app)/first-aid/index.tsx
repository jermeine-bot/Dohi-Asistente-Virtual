import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppButton } from '../../../src/components/common/AppButton';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { StatusBadge } from '../../../src/components/common/StatusBadge';
import { mockFirstAidTopics } from '../../../src/data/mockFirstAid';
import { FirstAidTopic } from '../../../src/types/FirstAid';

export default function FirstAidScreen() {
  const [selectedTopic, setSelectedTopic] = useState<FirstAidTopic>(mockFirstAidTopics[0]);

  const handleCallEmergency = (number: string) => {
    Alert.alert(
      'Llamada de Emergencia',
      `¿Deseas marcar inmediatamente a la línea de emergencia ${number}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamar', style: 'destructive', onPress: () => Alert.alert('Llamando', `Marcando al ${number}...`) },
      ]
    );
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'flame':
        return <Feather name="zap" size={20} color="#DC2626" />;
      case 'droplet':
        return <Feather name="droplet" size={20} color="#DC2626" />;
      case 'thermometer':
        return <FontAwesome5 name="temperature-high" size={18} color="#D97706" />;
      case 'heart':
        return <Feather name="heart" size={20} color="#DC2626" />;
      default:
        return <Feather name="alert-circle" size={20} color="#DC2626" />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        title="Primeros Auxilios"
        subtitle="Guía rápida de procedimientos médicos"
        onBack={() => router.back()}
      />

      {/* Emergency Hotline Bar */}
      <View style={styles.emergencyBar}>
        <View style={styles.emergencyLeft}>
          <Feather name="phone-call" size={18} color={colors.white} />
          <AppText variant="xs" weight="bold" color={colors.white} style={styles.emergencyBarText}>
            LÍNEA DE EMERGENCIA:
          </AppText>
        </View>
        <View style={styles.emergencyBtnsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleCallEmergency('118')}
            style={styles.callBadgeBtn}
          >
            <AppText variant="xs" weight="bold" color={colors.error}>
              118 Policía/Nac
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleCallEmergency('128')}
            style={styles.callBadgeBtn}
          >
            <AppText variant="xs" weight="bold" color={colors.error}>
              128 Cruz Roja
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Horizontal Category Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topicsScroll}
        >
          {mockFirstAidTopics.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <TouchableOpacity
                key={topic.id}
                activeOpacity={0.8}
                onPress={() => setSelectedTopic(topic)}
                style={[
                  styles.topicPill,
                  isSelected && styles.topicPillSelected,
                ]}
              >
                {getTopicIcon(topic.iconName)}
                <AppText
                  variant="xs"
                  weight={isSelected ? 'bold' : 'medium'}
                  color={isSelected ? colors.white : colors.navy}
                  style={styles.topicPillText}
                >
                  {topic.title.split(' ')[0]}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Selected Topic Guide Card */}
        <View style={styles.guideCard}>
          <View style={styles.guideHeader}>
            <View style={styles.badgeRow}>
              <StatusBadge
                label={selectedTopic.severity}
                variant={selectedTopic.severity === 'Crítico' ? 'danger' : 'warning'}
                size="sm"
              />
              <AppText variant="xs" color={colors.textMuted}>
                {selectedTopic.category}
              </AppText>
            </View>

            <AppText variant="xl" weight="bold" color={colors.navy} style={styles.topicTitle}>
              {selectedTopic.title}
            </AppText>

            <AppText variant="sm" color={colors.textSecondary}>
              {selectedTopic.shortDesc}
            </AppText>
          </View>

          {/* Steps List */}
          <View style={styles.stepsSection}>
            <AppText variant="base" weight="bold" color={colors.navy} style={styles.sectionHeader}>
              Procedimiento Paso a Paso:
            </AppText>

            {selectedTopic.steps.map((step) => (
              <View key={step.stepNumber} style={styles.stepItem}>
                <View style={styles.stepNumberCircle}>
                  <AppText variant="sm" weight="bold" color={colors.white}>
                    {step.stepNumber}
                  </AppText>
                </View>
                <View style={styles.stepTextCol}>
                  <AppText variant="sm" weight="bold" color={colors.navy}>
                    {step.title}
                  </AppText>
                  <AppText variant="xs" color={colors.textSecondary} style={styles.stepDescription}>
                    {step.description}
                  </AppText>
                  {step.importantNote && (
                    <View style={styles.warningNote}>
                      <Feather name="alert-triangle" size={12} color="#D97706" />
                      <AppText variant="xs" color="#92400E" style={styles.warningNoteText}>
                        {step.importantNote}
                      </AppText>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Dos and Don'ts */}
          <View style={styles.dosDontsRow}>
            {/* Dos */}
            <View style={[styles.boxCol, styles.dosBox]}>
              <View style={styles.boxTitleRow}>
                <Feather name="check-circle" size={14} color="#16A34A" />
                <AppText variant="xs" weight="bold" color="#16A34A" style={styles.boxTitle}>
                  QUÉ HACER
                </AppText>
              </View>
              {selectedTopic.dos.map((item, idx) => (
                <AppText key={idx} variant="xs" color={colors.navy} style={styles.bulletItem}>
                  • {item}
                </AppText>
              ))}
            </View>

            {/* Don'ts */}
            <View style={[styles.boxCol, styles.dontsBox]}>
              <View style={styles.boxTitleRow}>
                <Feather name="x-circle" size={14} color="#DC2626" />
                <AppText variant="xs" weight="bold" color="#DC2626" style={styles.boxTitle}>
                  QUÉ EVITAR
                </AppText>
              </View>
              {selectedTopic.donts.map((item, idx) => (
                <AppText key={idx} variant="xs" color={colors.navy} style={styles.bulletItem}>
                  • {item}
                </AppText>
              ))}
            </View>
          </View>

          {/* Direct Emergency Call Button */}
          <AppButton
            title="Llamar a Emergencias (118 / 128)"
            variant="danger"
            size="md"
            onPress={() => handleCallEmergency('118')}
            leftIcon={<Feather name="phone-call" size={16} color={colors.white} />}
            style={styles.callActionButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emergencyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.error,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  emergencyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyBarText: {
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  emergencyBtnsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  callBadgeBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    paddingBottom: spacing['2xl'],
  },
  topicsScroll: {
    paddingBottom: spacing.base,
    gap: spacing.sm,
  },
  topicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.sm,
  },
  topicPillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  topicPillText: {
    marginLeft: 6,
  },
  guideCard: {
    backgroundColor: colors.white,
    borderRadius: radius['2xl'],
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  guideHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    paddingBottom: spacing.base,
    marginBottom: spacing.base,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  topicTitle: {
    marginBottom: 4,
  },
  stepsSection: {
    marginBottom: spacing.base,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: spacing.base,
  },
  stepNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  stepTextCol: {
    flex: 1,
  },
  stepDescription: {
    marginTop: 2,
    lineHeight: 18,
  },
  warningNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: spacing.xs + 2,
    borderRadius: radius.md,
    marginTop: spacing.xs,
  },
  warningNoteText: {
    marginLeft: 6,
    flex: 1,
  },
  dosDontsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  boxCol: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  dosBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  dontsBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  boxTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  boxTitle: {
    marginLeft: 4,
  },
  bulletItem: {
    marginBottom: 3,
    fontSize: 11,
  },
  callActionButton: {
    marginTop: spacing.xs,
  },
});
