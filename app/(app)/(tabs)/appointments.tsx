import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppButton } from '../../../src/components/common/AppButton';
import { AppointmentCard } from '../../../src/components/medical/AppointmentCard';
import { EmptyState } from '../../../src/components/common/EmptyState';
import { mockAppointments } from '../../../src/data/mockAppointments';
import { Appointment } from '../../../src/types/Appointment';

type FilterTab = 'PROXIMAS' | 'PASADAS' | 'CANCELADAS';

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<FilterTab>('PROXIMAS');
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(mockAppointments);

  const filteredAppointments = appointmentsList.filter((apt) => {
    if (activeTab === 'PROXIMAS') {
      return apt.status === 'CONFIRMADA' || apt.status === 'PENDIENTE';
    }
    if (activeTab === 'PASADAS') {
      return apt.status === 'COMPLETADA';
    }
    if (activeTab === 'CANCELADAS') {
      return apt.status === 'CANCELADA';
    }
    return true;
  });

  const handleAction = (apt: Appointment) => {
    if (apt.type === 'VIRTUAL') {
      router.push('/(app)/virtual-consultation');
    } else {
      router.push('/(app)/appointment-assistant');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <AppText variant="2xl" weight="bold" color={colors.navy}>
            Mis Citas
          </AppText>
          <AppText variant="sm" color={colors.textSecondary}>
            Gestiona tus consultas presenciales y virtuales
          </AppText>
        </View>

        <AppButton
          title="Agendar +"
          variant="primary"
          size="sm"
          fullWidth={false}
          onPress={() => router.push('/(app)/book-appointment')}
          style={styles.bookButton}
        />
      </View>

      {/* Tabs Filter */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab('PROXIMAS')}
          style={[styles.tab, activeTab === 'PROXIMAS' && styles.tabActive]}
        >
          <AppText
            variant="sm"
            weight={activeTab === 'PROXIMAS' ? 'bold' : 'medium'}
            color={activeTab === 'PROXIMAS' ? colors.primary : colors.textMuted}
          >
            Próximas
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab('PASADAS')}
          style={[styles.tab, activeTab === 'PASADAS' && styles.tabActive]}
        >
          <AppText
            variant="sm"
            weight={activeTab === 'PASADAS' ? 'bold' : 'medium'}
            color={activeTab === 'PASADAS' ? colors.primary : colors.textMuted}
          >
            Completadas
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab('CANCELADAS')}
          style={[styles.tab, activeTab === 'CANCELADAS' && styles.tabActive]}
        >
          <AppText
            variant="sm"
            weight={activeTab === 'CANCELADAS' ? 'bold' : 'medium'}
            color={activeTab === 'CANCELADAS' ? colors.primary : colors.textMuted}
          >
            Canceladas
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Appointments List */}
      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            onPress={() => router.push('/(app)/appointment-assistant')}
            onPressAction={() => handleAction(item)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="calendar"
            title="No tienes citas en esta sección"
            description="Encuentra médicos especialistas en tu sede o agenda una teleconsulta virtual ahora mismo."
            actionTitle="Reservar Cita"
            onAction={() => router.push('/(app)/book-appointment')}
          />
        }
      />
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
  },
  bookButton: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    paddingBottom: spacing['2xl'],
  },
});
