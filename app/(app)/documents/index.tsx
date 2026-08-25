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
import { MedicalDocumentCard } from '../../../src/components/medical/MedicalDocumentCard';
import { EmptyState } from '../../../src/components/common/EmptyState';
import { mockDocuments } from '../../../src/data/mockDocuments';
import { DocumentType, MedicalDocument } from '../../../src/types/MedicalDocument';

const categoryTabs: ('Todos' | DocumentType)[] = [
  'Todos',
  'Exámenes',
  'Recetas',
  'Resultados',
  'Historial',
  'Radiografías',
];

export default function DocumentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | DocumentType>('Todos');

  const filteredDocs = mockDocuments.filter((doc) => {
    const matchesCategory = selectedCategory === 'Todos' || doc.type === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.facility.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenDoc = (doc: MedicalDocument) => {
    Alert.alert(
      doc.title,
      `Médico: ${doc.doctorName}\nInstitución: ${doc.facility}\nFecha: ${doc.date}\nFormato: ${doc.fileFormat} (${doc.fileSize})\n\nResumen Clínico: ${doc.summary || 'Sin notas adicionales.'}`,
      [
        { text: 'Descargar Copia', onPress: () => Alert.alert('Descarga Completa', `Archivo ${doc.title}.${doc.fileFormat.toLowerCase()} guardado en tu dispositivo.`) },
        { text: 'Cerrar', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        title="Documentos Médicos"
        showLogo={true}
        onBack={() => router.back()}
        rightElement={
          <TouchableOpacity
            onPress={() => router.push('/(app)/scanner')}
            activeOpacity={0.7}
            style={styles.scanHeaderBtn}
          >
            <Feather name="camera" size={18} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar examen, receta o especialista..."
        />
      </View>

      {/* Categories Horizontal Tabs */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categoryTabs.map((tab) => {
            const isSelected = selectedCategory === tab;
            return (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(tab)}
                style={[
                  styles.categoryPill,
                  isSelected && styles.categoryPillSelected,
                ]}
              >
                <AppText
                  variant="xs"
                  weight={isSelected ? 'bold' : 'medium'}
                  color={isSelected ? colors.white : colors.navy}
                >
                  {tab}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Documents List */}
      <FlatList
        data={filteredDocs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MedicalDocumentCard
            document={item}
            onPress={() => handleOpenDoc(item)}
            onDownload={() => Alert.alert('Descarga', `Descargando ${item.title}...`)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="file-text"
            title="No se encontraron documentos"
            description="Intenta buscar con otro término o digitaliza un nuevo examen médico con la cámara."
            actionTitle="Escanear Documento"
            onAction={() => router.push('/(app)/scanner')}
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
  scanHeaderBtn: {
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
  categoriesContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    paddingVertical: spacing.sm,
  },
  categoriesScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs + 2,
  },
  categoryPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.gray100,
  },
  categoryPillSelected: {
    backgroundColor: colors.primary,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    paddingBottom: spacing['2xl'],
  },
});
