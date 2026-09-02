import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { AppText } from '../../../src/components/common/AppText';
import { EpidemiologicalAlertCard } from '../../../src/components/medical/EpidemiologicalAlertCard';
import { mockEpidemiologicalAlerts } from '../../../src/data/mockEpidemiologicalAlerts';
import { AlertPriority } from '../../../src/types/EpidemiologicalAlert';

const PRIORITIES: { label: string; value: AlertPriority | 'TODAS'; color: string }[] = [
  { label: 'Todas', value: 'TODAS', color: colors.navy },
  { label: '🔴 Alta', value: 'HIGH', color: '#DC2626' },
  { label: '🟠 Atención', value: 'ATTENTION', color: '#EA580C' },
  { label: '🟡 Preventiva', value: 'PREVENTIVE', color: '#D97706' },
  { label: '🔵 Informativa', value: 'INFO', color: '#2563EB' },
];

const DEPARTMENTS = ['Todos', 'Managua', 'León', 'Matagalpa', 'Estelí'];

export default function EpidemiologicalAlertsScreen() {
  const [selectedPriority, setSelectedPriority] = useState<AlertPriority | 'TODAS'>('TODAS');
  const [selectedDepartment, setSelectedDepartment] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = mockEpidemiologicalAlerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      selectedPriority === 'TODAS' || alert.priority === selectedPriority;

    const matchesDepartment =
      selectedDepartment === 'Todos' || alert.department === selectedDepartment;

    return matchesSearch && matchesPriority && matchesDepartment;
  });

  const highPriorityCount = mockEpidemiologicalAlerts.filter((a) => a.priority === 'HIGH').length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        title="Alertas Epidemiológicas"
        subtitle="Vigilancia y avisos oficiales de salud pública"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Location Alert Summary Banner */}
        <View style={styles.locationAlertBanner}>
          <View style={styles.alertIconCircle}>
            <Feather name="alert-circle" size={22} color="#DC2626" />
          </View>
          <View style={styles.alertBannerTextCol}>
            <AppText variant="xs" weight="bold" color="#DC2626" style={{ letterSpacing: 0.5 }}>
              UBICACIÓN ACTUAL: MANAGUA / TIPITAPA
            </AppText>
            <AppText variant="sm" weight="bold" color={colors.navy}>
              {highPriorityCount} alerta sanitaria de alta prioridad activa en tu zona
            </AppText>
            <AppText variant="xs" color={colors.textSecondary} style={{ marginTop: 2 }}>
              Se recomienda revisar los síntomas de Dengue y las medidas preventivas.
            </AppText>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color={colors.gray400} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por enfermedad, zona o síntoma..."
            placeholderTextColor={colors.gray400}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={18} color={colors.gray400} />
            </TouchableOpacity>
          )}
        </View>

        {/* Priority Filter Chips */}
        <View style={styles.filterSection}>
          <AppText variant="xs" weight="bold" color={colors.navy} style={{ marginBottom: 6 }}>
            Nivel de Prioridad:
          </AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
            {PRIORITIES.map((p) => (
              <TouchableOpacity
                key={p.value}
                activeOpacity={0.8}
                onPress={() => setSelectedPriority(p.value)}
                style={[
                  styles.priorityChip,
                  selectedPriority === p.value && styles.priorityChipActive,
                ]}
              >
                <AppText
                  variant="xs"
                  weight="semiBold"
                  style={{ color: selectedPriority === p.value ? colors.white : p.color }}
                >
                  {p.label}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Department Filter Chips */}
        <View style={styles.filterSection}>
          <AppText variant="xs" weight="bold" color={colors.navy} style={{ marginBottom: 6 }}>
            Departamento (Nicaragua):
          </AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
            {DEPARTMENTS.map((dept) => (
              <TouchableOpacity
                key={dept}
                activeOpacity={0.8}
                onPress={() => setSelectedDepartment(dept)}
                style={[
                  styles.deptChip,
                  selectedDepartment === dept && styles.deptChipActive,
                ]}
              >
                <AppText
                  variant="xs"
                  weight="medium"
                  style={{ color: selectedDepartment === dept ? colors.white : colors.navy }}
                >
                  {dept === 'Todos' ? '📍 Todos' : dept}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Alerts List */}
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <AppText variant="sm" weight="bold" color={colors.navy}>
              {filteredAlerts.length} {filteredAlerts.length === 1 ? 'alerta registrada' : 'alertas registradas'}
            </AppText>
          </View>

          {filteredAlerts.length === 0 ? (
            <View style={styles.emptyBox}>
              <FontAwesome5 name="shield-alt" size={40} color={colors.gray300} style={{ marginBottom: 12 }} />
              <AppText variant="base" weight="bold" color={colors.navy} align="center">
                Sin alertas para este filtro
              </AppText>
              <AppText variant="xs" color={colors.textSecondary} align="center" style={{ marginTop: 4 }}>
                No hay alertas sanitarias reportadas con los criterios seleccionados.
              </AppText>
            </View>
          ) : (
            filteredAlerts.map((alertItem) => (
              <EpidemiologicalAlertCard
                key={alertItem.id}
                alert={alertItem}
                onPress={() => router.push(`/(app)/epidemiological-alerts/${alertItem.id}`)}
              />
            ))
          )}
        </View>

        <View style={{ height: 24 }} />
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
    paddingTop: spacing.base,
    paddingBottom: spacing['2xl'],
  },
  locationAlertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  alertIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  alertBannerTextCol: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: colors.gray200,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: colors.navy,
  },
  filterSection: {
    marginBottom: spacing.md,
  },
  chipsRow: {
    gap: spacing.xs,
  },
  priorityChip: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  priorityChipActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  deptChip: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 5,
  },
  deptChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  resultsContainer: {
    marginTop: spacing.xs,
  },
  resultsHeader: {
    marginBottom: spacing.sm,
  },
  emptyBox: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing['xl'],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
    marginTop: spacing.md,
  },
});
