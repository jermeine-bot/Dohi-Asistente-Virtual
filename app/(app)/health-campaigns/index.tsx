import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { AppText } from '../../../src/components/common/AppText';
import { HealthCampaignCard } from '../../../src/components/medical/HealthCampaignCard';
import {
  mockHealthCampaigns,
  MUNICIPALITIES_BY_DEPARTMENT,
} from '../../../src/data/mockHealthCampaigns';
import { HealthCampaignCategory, HealthCampaign } from '../../../src/types/HealthCampaign';

const CATEGORIES: { label: string; value: HealthCampaignCategory | 'TODAS' }[] = [
  { label: 'Todas', value: 'TODAS' },
  { label: 'Vacunación', value: 'VACUNACION' },
  { label: 'Dengue / Abate', value: 'DENGUE_ABATE' },
  { label: 'Medicina General', value: 'MEDICINA_GENERAL' },
  { label: 'Odontología', value: 'ODONTOLOGIA' },
  { label: 'Oftalmología', value: 'OFTALMOLOGIA' },
  { label: 'Salud Materna', value: 'SALUD_MATERNA' },
];

const DEPARTMENTS = ['Todos', 'Managua', 'León', 'Matagalpa', 'Estelí', 'Masaya'];

export default function HealthCampaignsScreen() {
  const [campaigns, setCampaigns] = useState<HealthCampaign[]>(mockHealthCampaigns);
  const [viewMode, setViewMode] = useState<'LIST' | 'MAP'>('LIST');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HealthCampaignCategory | 'TODAS'>('TODAS');
  const [selectedDepartment, setSelectedDepartment] = useState('Todos');
  const [selectedMunicipality, setSelectedMunicipality] = useState('Todos');

  // Municipalities options for selected department
  const availableMunicipalities =
    selectedDepartment !== 'Todos' && MUNICIPALITIES_BY_DEPARTMENT[selectedDepartment]
      ? ['Todos', ...MUNICIPALITIES_BY_DEPARTMENT[selectedDepartment]]
      : ['Todos'];

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesSearch =
      camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'TODAS' || camp.category === selectedCategory;

    const matchesDepartment =
      selectedDepartment === 'Todos' || camp.department === selectedDepartment;

    const matchesMunicipality =
      selectedMunicipality === 'Todos' || camp.municipality === selectedMunicipality;

    return matchesSearch && matchesCategory && matchesDepartment && matchesMunicipality;
  });

  const toggleReminder = (id: string) => {
    setCampaigns((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.reminderSet;
          Alert.alert(
            nextState ? '🔔 Recordatorio Activado' : '🔕 Recordatorio Desactivado',
            nextState
              ? `Te notificaremos antes del inicio de "${item.title}".`
              : `Has desactivado la alerta para "${item.title}".`
          );
          return { ...item, reminderSet: nextState };
        }
        return item;
      })
    );
  };

  const handleShare = async (campaign: HealthCampaign) => {
    try {
      await Share.share({
        message: `📢 *Jornada de Salud en Nicaragua: ${campaign.title}*\n\n📍 Ubicación: ${campaign.neighborhood}, ${campaign.municipality}, ${campaign.department}\n📅 Fecha: ${campaign.startDate} al ${campaign.endDate}\n⏰ Horario: ${campaign.timeSchedule}\n\nInfo en Dohi App Salud.`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        title="Jornadas de Salud"
        subtitle="Vacunación, ferias médicas y ferias antiepidémicas"
        showBack
        rightElement={
          <View style={styles.viewToggleGroup}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setViewMode('LIST')}
              style={[styles.toggleBtn, viewMode === 'LIST' && styles.toggleBtnActive]}
            >
              <Feather
                name="list"
                size={16}
                color={viewMode === 'LIST' ? colors.white : colors.navy}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setViewMode('MAP')}
              style={[styles.toggleBtn, viewMode === 'MAP' && styles.toggleBtnActive]}
            >
              <Feather
                name="map-pin"
                size={16}
                color={viewMode === 'MAP' ? colors.white : colors.navy}
              />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color={colors.gray400} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por jornada, barrio o síntoma..."
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

        {/* Territory Filters: Department -> Municipality */}
        <View style={styles.filterSection}>
          <AppText variant="xs" weight="bold" color={colors.navy} style={{ marginBottom: 6 }}>
            Filtro Geográfico (Nicaragua):
          </AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
            {DEPARTMENTS.map((dept) => (
              <TouchableOpacity
                key={dept}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedDepartment(dept);
                  setSelectedMunicipality('Todos');
                }}
                style={[
                  styles.filterChip,
                  selectedDepartment === dept && styles.filterChipActive,
                ]}
              >
                <AppText
                  variant="xs"
                  weight="semiBold"
                  style={{ color: selectedDepartment === dept ? colors.white : colors.navy }}
                >
                  {dept === 'Todos' ? '📍 Todos Dptos' : dept}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {selectedDepartment !== 'Todos' && availableMunicipalities.length > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.chipsRow, { marginTop: 6 }]}>
              {availableMunicipalities.map((muni) => (
                <TouchableOpacity
                  key={muni}
                  activeOpacity={0.8}
                  onPress={() => setSelectedMunicipality(muni)}
                  style={[
                    styles.subFilterChip,
                    selectedMunicipality === muni && styles.subFilterChipActive,
                  ]}
                >
                  <AppText
                    variant="xs"
                    weight="medium"
                    style={{ color: selectedMunicipality === muni ? colors.primary : colors.gray600 }}
                  >
                    {muni === 'Todos' ? `Todos en ${selectedDepartment}` : muni}
                  </AppText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Category Filters */}
        <View style={styles.filterSection}>
          <AppText variant="xs" weight="bold" color={colors.navy} style={{ marginBottom: 6 }}>
            Tipo de Jornada:
          </AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(cat.value)}
                style={[
                  styles.catChip,
                  selectedCategory === cat.value && styles.catChipActive,
                ]}
              >
                <AppText
                  variant="xs"
                  weight="semiBold"
                  style={{ color: selectedCategory === cat.value ? colors.white : colors.navy }}
                >
                  {cat.label}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* View Mode: LIST vs MAP */}
        {viewMode === 'LIST' ? (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <AppText variant="sm" weight="bold" color={colors.navy}>
                {filteredCampaigns.length} {filteredCampaigns.length === 1 ? 'jornada encontrada' : 'jornadas encontradas'}
              </AppText>
            </View>

            {filteredCampaigns.length === 0 ? (
              <View style={styles.emptyBox}>
                <FontAwesome5 name="hospital-user" size={40} color={colors.gray300} style={{ marginBottom: 12 }} />
                <AppText variant="base" weight="bold" color={colors.navy} align="center">
                  No se encontraron jornadas
                </AppText>
                <AppText variant="xs" color={colors.textSecondary} align="center" style={{ marginTop: 4 }}>
                  Intenta cambiar el municipio o la categoría de búsqueda.
                </AppText>
              </View>
            ) : (
              filteredCampaigns.map((campaign) => (
                <HealthCampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onPress={() => router.push(`/(app)/health-campaigns/${campaign.id}`)}
                  onPressReminder={() => toggleReminder(campaign.id)}
                  onPressShare={() => handleShare(campaign)}
                />
              ))
            )}
          </View>
        ) : (
          <View style={styles.mapContainer}>
            <View style={styles.mapHeaderBanner}>
              <Feather name="map" size={18} color={colors.primary} style={{ marginRight: 6 }} />
              <AppText variant="xs" weight="bold" color={colors.navy}>
                Mapa de Jornadas Territoriales (Nicaragua)
              </AppText>
            </View>

            {/* Visual Simulated Interactive Map Container */}
            <View style={styles.simulatedMapBox}>
              <View style={styles.mapGridLines} />
              
              {/* Simulated Map Markers */}
              {filteredCampaigns.map((camp, idx) => (
                <TouchableOpacity
                  key={camp.id}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/(app)/health-campaigns/${camp.id}`)}
                  style={[
                    styles.mapPinMarker,
                    {
                      top: 40 + (idx * 65) % 180,
                      left: 30 + (idx * 85) % 240,
                    },
                  ]}
                >
                  <View style={styles.pinBubble}>
                    <Feather name="shield" size={12} color={colors.white} />
                  </View>
                  <View style={styles.pinCallout}>
                    <AppText variant="xs" weight="bold" color={colors.navy} numberOfLines={1}>
                      {camp.neighborhood.split(' ')[0]}
                    </AppText>
                  </View>
                </TouchableOpacity>
              ))}

              <View style={styles.mapFooterNotice}>
                <AppText variant="xs" color={colors.textMuted} align="center">
                  Toca un pin para ver detalles de la jornada en el barrio.
                </AppText>
              </View>
            </View>
          </View>
        )}

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
  viewToggleGroup: {
    flexDirection: 'row',
    backgroundColor: colors.gray100,
    borderRadius: radius.lg,
    padding: 3,
  },
  toggleBtn: {
    width: 34,
    height: 30,
    borderRadius: radius.md - 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtnActive: {
    backgroundColor: colors.primary,
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
  filterChip: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  subFilterChip: {
    backgroundColor: colors.gray100,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
  },
  subFilterChipActive: {
    backgroundColor: colors.lightBlue,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  catChip: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 6,
  },
  catChipActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
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
  mapContainer: {
    marginTop: spacing.xs,
  },
  mapHeaderBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: radius.lg,
    padding: spacing.sm + 2,
    marginBottom: spacing.md,
  },
  simulatedMapBox: {
    height: 320,
    backgroundColor: '#E0F2FE',
    borderRadius: radius.xl,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  mapGridLines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.15,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  mapPinMarker: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  pinCallout: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.xs,
    marginTop: 2,
    ...shadows.sm,
    maxWidth: 100,
  },
  mapFooterNotice: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: radius.lg,
    padding: spacing.xs + 2,
  },
});
