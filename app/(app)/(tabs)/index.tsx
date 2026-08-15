import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { DohiWellnessCard } from '../../../src/components/dohi/DohiWellnessCard';
import { MedicationPreviewCard } from '../../../src/components/medical/MedicationPreviewCard';
import { FeatureCard } from '../../../src/components/medical/FeatureCard';
import { mockUser } from '../../../src/data/mockUser';
import { mockTodayMedications } from '../../../src/data/mockMedications';
import { mockFeatures, mockQuickAccess } from '../../../src/data/mockFeatures';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const nextMedication = mockTodayMedications.find(m => m.status === 'PENDIENTE') || mockTodayMedications[1];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      >
        {/* Header Section (Rule 8) */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <AppText variant="2xl" weight="bold" color={colors.navy} style={styles.greeting}>
              Hola, {mockUser.name.split(' ')[0]}!
            </AppText>
            <AppText variant="sm" color={colors.textSecondary}>
              ¿Cómo estás el día de hoy?
            </AppText>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/(app)/appointment-assistant')}
              style={styles.bellButton}
            >
              <Feather name="bell" size={20} color={colors.navy} />
              {mockUser.unreadNotifications > 0 && (
                <View style={styles.notificationDot} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/(app)/(tabs)/profile')}
              style={styles.avatarWrapper}
            >
              <Image source={{ uri: mockUser.avatarUrl }} style={styles.avatar} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dohi Wellness Card (Rule 9) */}
        <View style={styles.section}>
          <DohiWellnessCard
            onPressTalk={() => router.push('/(app)/(tabs)/dohi')}
            onPressCard={() => router.push('/(app)/wellness')}
          />
        </View>

        {/* Next Medication Preview (Rule 10) */}
        <View style={styles.section}>
          <MedicationPreviewCard
            medication={nextMedication}
            onPressSeeAll={() => router.push('/(app)/medications')}
          />
        </View>

        {/* Features Section (Rule 11) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="lg" weight="bold" color={colors.navy}>
              Funcionalidades
            </AppText>
          </View>

          {mockFeatures.slice(0, 2).map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </View>

        {/* Quick Access Circles (Rule 12) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="lg" weight="bold" color={colors.navy}>
              Accesos Rápidos
            </AppText>
          </View>

          <View style={styles.quickAccessRow}>
            {mockQuickAccess.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => router.push(item.route as any)}
                style={styles.quickAccessItem}
              >
                <View style={[styles.quickAccessCircle, { backgroundColor: item.bgColor }]}>
                  {item.iconName === 'calendar' ? (
                    <Feather name="calendar" size={22} color={item.color} />
                  ) : item.iconName === 'map-pin' ? (
                    <Feather name="map-pin" size={22} color={item.color} />
                  ) : (
                    <Feather name="file-text" size={22} color={item.color} />
                  )}
                </View>
                <AppText variant="xs" weight="semiBold" color={colors.navy} align="center" style={styles.quickAccessText}>
                  {item.title}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing['2xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingTop: spacing.xs,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    marginBottom: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    position: 'relative',
    ...shadows.sm,
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.primary,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  section: {
    marginBottom: spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  quickAccessRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.base,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  quickAccessItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  quickAccessCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs + 2,
  },
  quickAccessText: {
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 16,
  },
});
