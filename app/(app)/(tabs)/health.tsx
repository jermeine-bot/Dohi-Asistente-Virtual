import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppLogo } from '../../../src/components/common/AppLogo';
import { StatusBadge } from '../../../src/components/common/StatusBadge';
import { mockWeightData } from '../../../src/data/mockWeight';
import { mockDocuments } from '../../../src/data/mockDocuments';

export default function HealthHubScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with AppLogo */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <AppLogo size={28} />
            <AppText variant="xs" weight="bold" color={colors.primary} style={styles.badgeText}>
              DOHI SALUD
            </AppText>
          </View>
          <AppText variant="2xl" weight="bold" color={colors.navy}>
            Centro de Salud
          </AppText>
          <AppText variant="sm" color={colors.textSecondary}>
            Herramientas y seguimiento integral para tu bienestar
          </AppText>
        </View>

        {/* 1. Control de Peso e IMC Highlight Card */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push('/(app)/weight')}
          style={styles.weightHeroCard}
        >
          <View style={styles.weightHeaderRow}>
            <View style={styles.weightIconWrapper}>
              <Feather name="activity" size={24} color="#D97706" />
            </View>
            <StatusBadge label="SEGUIMIENTO" variant="warning" size="sm" />
          </View>

          <AppText variant="lg" weight="bold" color={colors.navy} style={styles.cardTitle}>
            Control de Peso e IMC
          </AppText>
          <AppText variant="xs" color={colors.textSecondary} style={styles.cardSubtitle}>
            Índice de masa corporal actual calculado:
          </AppText>

          <View style={styles.weightMetricsRow}>
            <View style={styles.metricItem}>
              <AppText variant="2xl" weight="bold" color={colors.navy}>
                {mockWeightData.currentWeight} kg
              </AppText>
              <AppText variant="xs" color={colors.textMuted}>
                Peso actual
              </AppText>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <AppText variant="2xl" weight="bold" color={colors.primary}>
                {mockWeightData.currentIMC}
              </AppText>
              <AppText variant="xs" color={colors.textMuted}>
                {mockWeightData.imcCategory}
              </AppText>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <AppText variant="2xl" weight="bold" color={colors.success}>
                {mockWeightData.targetWeight} kg
              </AppText>
              <AppText variant="xs" color={colors.textMuted}>
                Meta
              </AppText>
            </View>
          </View>

          <View style={styles.cardActionRow}>
            <AppText variant="xs" weight="semiBold" color={colors.primary}>
              Ver evolución y calcular IMC
            </AppText>
            <Feather name="arrow-right" size={14} color={colors.primary} />
          </View>
        </TouchableOpacity>

        {/* 2. Grid of Health Modules */}
        <View style={styles.gridContainer}>
          {/* Jornadas y Eventos de Salud */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(app)/health-campaigns')}
            style={[styles.moduleCard, { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }]}
          >
            <View style={[styles.moduleIconCircle, { backgroundColor: '#E0F2FE' }]}>
              <Feather name="calendar" size={24} color="#0284C7" />
            </View>
            <AppText variant="base" weight="bold" color={colors.navy} style={styles.moduleTitle}>
              Jornadas de Salud
            </AppText>
            <AppText variant="xs" color={colors.textSecondary} numberOfLines={2}>
              Vacunación, ferias médicas y abate por zona.
            </AppText>
            <View style={styles.moduleFooter}>
              <AppText variant="xs" weight="bold" color="#0284C7">
                Ver eventos →
              </AppText>
            </View>
          </TouchableOpacity>

          {/* Alertas Epidemiológicas */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(app)/epidemiological-alerts')}
            style={[styles.moduleCard, { backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' }]}
          >
            <View style={[styles.moduleIconCircle, { backgroundColor: '#FEE2E2' }]}>
              <Feather name="alert-triangle" size={24} color="#DC2626" />
            </View>
            <AppText variant="base" weight="bold" color={colors.navy} style={styles.moduleTitle}>
              Alertas Sanitarias
            </AppText>
            <AppText variant="xs" color={colors.textSecondary} numberOfLines={2}>
              Avisos y mapa de prevención epidemiológica.
            </AppText>
            <View style={styles.moduleFooter}>
              <AppText variant="xs" weight="bold" color="#DC2626">
                Ver alertas →
              </AppText>
            </View>
          </TouchableOpacity>

          {/* Escáner de Exámenes */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(app)/scanner')}
            style={[styles.moduleCard, { backgroundColor: '#FAF5FF', borderColor: '#E9D5FF' }]}
          >
            <View style={[styles.moduleIconCircle, { backgroundColor: '#F3E8FF' }]}>
              <MaterialCommunityIcons name="line-scan" size={26} color="#9333EA" />
            </View>
            <AppText variant="base" weight="bold" color={colors.navy} style={styles.moduleTitle}>
              Escáner de Exámenes
            </AppText>
            <AppText variant="xs" color={colors.textSecondary} numberOfLines={2}>
              Digitaliza tus recetas y análisis clínicos con cámara.
            </AppText>
            <View style={styles.moduleFooter}>
              <AppText variant="xs" weight="bold" color="#9333EA">
                Escanear ahora →
              </AppText>
            </View>
          </TouchableOpacity>

          {/* Documentos Médicos */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(app)/documents')}
            style={[styles.moduleCard, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}
          >
            <View style={[styles.moduleIconCircle, { backgroundColor: '#DBEAFE' }]}>
              <Feather name="file-text" size={24} color="#2563EB" />
            </View>
            <AppText variant="base" weight="bold" color={colors.navy} style={styles.moduleTitle}>
              Documentos Médicos
            </AppText>
            <AppText variant="xs" color={colors.textSecondary} numberOfLines={2}>
              {mockDocuments.length} archivos disponibles en tu historial.
            </AppText>
            <View style={styles.moduleFooter}>
              <AppText variant="xs" weight="bold" color="#2563EB">
                Ver historial →
              </AppText>
            </View>
          </TouchableOpacity>

          {/* Puntos de Salud en Nicaragua */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(app)/health-centers')}
            style={[styles.moduleCard, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}
          >
            <View style={[styles.moduleIconCircle, { backgroundColor: '#DCFCE7' }]}>
              <Feather name="map-pin" size={24} color="#16A34A" />
            </View>
            <AppText variant="base" weight="bold" color={colors.navy} style={styles.moduleTitle}>
              Puntos de Salud
            </AppText>
            <AppText variant="xs" color={colors.textSecondary} numberOfLines={2}>
              Hospitales y centros en León, Managua y más.
            </AppText>
            <View style={styles.moduleFooter}>
              <AppText variant="xs" weight="bold" color="#16A34A">
                Explorar mapa →
              </AppText>
            </View>
          </TouchableOpacity>

          {/* Primeros Auxilios */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(app)/first-aid')}
            style={[styles.moduleCard, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}
          >
            <View style={[styles.moduleIconCircle, { backgroundColor: '#FEE2E2' }]}>
              <FontAwesome5 name="first-aid" size={22} color="#DC2626" />
            </View>
            <AppText variant="base" weight="bold" color={colors.navy} style={styles.moduleTitle}>
              Primeros Auxilios
            </AppText>
            <AppText variant="xs" color={colors.textSecondary} numberOfLines={2}>
              Guía de emergencia paso a paso y números clave.
            </AppText>
            <View style={styles.moduleFooter}>
              <AppText variant="xs" weight="bold" color="#DC2626">
                Guía rápida →
              </AppText>
            </View>
          </TouchableOpacity>
        </View>

        {/* 3. Bienestar Emocional y Físico Full Banner */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push('/(app)/wellness')}
          style={styles.wellnessBanner}
        >
          <View style={styles.wellnessIconBox}>
            <Feather name="smile" size={26} color={colors.primary} />
          </View>
          <View style={styles.wellnessTextCol}>
            <AppText variant="base" weight="bold" color={colors.navy}>
              Bienestar Integral
            </AppText>
            <AppText variant="xs" color={colors.textSecondary}>
              Registra tu estado de ánimo o molestias físicas con Dohi.
            </AppText>
          </View>
          <Feather name="chevron-right" size={22} color={colors.primary} />
        </TouchableOpacity>

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
    paddingVertical: spacing.base,
    paddingBottom: spacing['2xl'],
  },
  header: {
    marginBottom: spacing.base,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeText: {
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  weightHeroCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  weightHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  weightIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    marginBottom: 2,
  },
  cardSubtitle: {
    marginBottom: spacing.md,
  },
  weightMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.gray50,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.gray200,
  },
  cardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    paddingTop: spacing.sm,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.base,
  },
  moduleCard: {
    width: '47%',
    borderRadius: radius.xl,
    padding: spacing.base,
    borderWidth: 1,
    ...shadows.sm,
    justifyContent: 'space-between',
    minHeight: 175,
  },
  moduleIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  moduleTitle: {
    marginBottom: 4,
  },
  moduleFooter: {
    marginTop: spacing.sm,
  },
  wellnessBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  wellnessIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  wellnessTextCol: {
    flex: 1,
    marginRight: spacing.xs,
  },
  bottomSpacer: {
    height: 20,
  },
});
