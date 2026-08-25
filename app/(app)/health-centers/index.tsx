import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { SearchInput } from '../../../src/components/common/SearchInput';
import { HealthCenterCard } from '../../../src/components/medical/HealthCenterCard';
import { EmptyState } from '../../../src/components/common/EmptyState';
import { mockHealthCenters } from '../../../src/data/mockHealthCenters';
import { HealthCenter } from '../../../src/types/HealthCenter';

const departments = ['Todos', 'León', 'Managua', 'Estelí'];

export default function HealthCentersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('Todos');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filteredCenters = mockHealthCenters.filter((center) => {
    const matchesDept = selectedDept === 'Todos' || center.department === selectedDept;
    const matchesSearch =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleCenterPress = (center: HealthCenter) => {
    Alert.alert(
      center.name,
      `Tipo: ${center.type}\nUbicación: ${center.address}\nHorario: ${center.openHours}\nTeléfono: ${center.phone}\nEmergencias: ${center.emergencyPhone}\n\nServicios: ${center.services.join(', ')}`,
      [
        { text: 'Llamar al Centro', onPress: () => Alert.alert('Llamada', `Marcando a ${center.phone}...`) },
        { text: 'Cerrar', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        title="Puntos de Salud"
        subtitle="Centros y Hospitales en Nicaragua"
        showLogo={true}
        onBack={() => router.back()}
        rightElement={
          <TouchableOpacity
            onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
            activeOpacity={0.7}
            style={styles.toggleViewBtn}
          >
            <Feather name={viewMode === 'list' ? 'map' : 'list'} size={18} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar por nombre, barrio o ciudad..."
        />
      </View>

      {/* Department Filter Pills */}
      <View style={styles.deptContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.deptScroll}
        >
          {departments.map((dept) => {
            const isSelected = selectedDept === dept;
            return (
              <TouchableOpacity
                key={dept}
                activeOpacity={0.8}
                onPress={() => setSelectedDept(dept)}
                style={[
                  styles.deptPill,
                  isSelected && styles.deptPillSelected,
                ]}
              >
                <AppText
                  variant="xs"
                  weight={isSelected ? 'bold' : 'medium'}
                  color={isSelected ? colors.white : colors.navy}
                >
                  {dept}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* View Mode: Map Mock or List */}
      {viewMode === 'map' ? (
        <View style={styles.mockMapContainer}>
          {/* Map Graphic Mock */}
          <View style={styles.mapCanvas}>
            <View style={styles.mapGridLines} />
            <View style={styles.mapCenterPin}>
              <View style={styles.pinPulse} />
              <View style={styles.pinBubble}>
                <Feather name="map-pin" size={16} color={colors.white} />
              </View>
              <View style={styles.pinCallout}>
                <AppText variant="xs" weight="bold" color={colors.navy}>Centro de Salud León</AppText>
                <AppText variant="xs" color={colors.primary}>1.2 km • Abierto</AppText>
              </View>
            </View>

            <View style={[styles.mapCenterPin, { top: '35%', left: '70%' }]}>
              <View style={[styles.pinBubble, { backgroundColor: '#10B981' }]}>
                <Feather name="plus" size={16} color={colors.white} />
              </View>
              <View style={styles.pinCallout}>
                <AppText variant="xs" weight="bold" color={colors.navy}>HEODRA León</AppText>
                <AppText variant="xs" color={colors.success}>24 Horas</AppText>
              </View>
            </View>
          </View>

          {/* Floating list summary */}
          <View style={styles.mapBottomCard}>
            <AppText variant="xs" color={colors.textMuted}>VISTA DE MAPA</AppText>
            <AppText variant="sm" weight="bold" color={colors.navy}>
              {filteredCenters.length} centros de salud encontrados en la zona
            </AppText>
            <TouchableOpacity
              onPress={() => setViewMode('list')}
              style={styles.switchToListBtn}
            >
              <AppText variant="xs" weight="bold" color={colors.primary}>
                Ver lista completa
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          data={filteredCenters}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <HealthCenterCard
              center={item}
              onPress={() => handleCenterPress(item)}
              onCallEmergency={() => Alert.alert('Llamada Telefónica', `Llamando al centro: ${item.phone}`)}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="map-pin"
              title="No hay centros en esta búsqueda"
              description="Prueba cambiando el departamento seleccionado o limpiando los filtros."
              actionTitle="Ver todos los centros"
              onAction={() => {
                setSelectedDept('Todos');
                setSearchQuery('');
              }}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  toggleViewBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    backgroundColor: colors.white,
  },
  deptContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    paddingVertical: spacing.sm,
  },
  deptScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs + 2,
  },
  deptPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.gray100,
  },
  deptPillSelected: {
    backgroundColor: colors.primary,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    paddingBottom: spacing['2xl'],
  },
  mockMapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapCanvas: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
  },
  mapGridLines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  mapCenterPin: {
    position: 'absolute',
    top: '48%',
    left: '38%',
    alignItems: 'center',
  },
  pinPulse: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    opacity: 0.25,
  },
  pinBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    ...shadows.sm,
  },
  pinCallout: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.md,
    marginTop: 4,
    ...shadows.sm,
    alignItems: 'center',
  },
  mapBottomCard: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    ...shadows.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchToListBtn: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
  },
});
