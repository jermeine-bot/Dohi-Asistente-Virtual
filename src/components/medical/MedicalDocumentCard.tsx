import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from '../common/AppText';
import { StatusBadge } from '../common/StatusBadge';
import { MedicalDocument } from '../../types/MedicalDocument';

export interface MedicalDocumentCardProps {
  document: MedicalDocument;
  onPress?: () => void;
  onDownload?: () => void;
}

export const MedicalDocumentCard: React.FC<MedicalDocumentCardProps> = ({
  document,
  onPress,
  onDownload,
}) => {
  const isPdf = document.fileFormat === 'PDF';

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={isPdf ? 'file-pdf-box' : 'file-image'}
          size={32}
          color={isPdf ? '#EF4444' : '#3B82F6'}
        />
      </View>

      <View style={styles.infoCol}>
        <View style={styles.typeBadgeRow}>
          <StatusBadge
            label={document.type}
            variant="neutral"
            size="sm"
          />
          <AppText variant="xs" color={colors.textMuted} style={styles.dateText}>
            {document.date}
          </AppText>
        </View>

        <AppText variant="base" weight="bold" color={colors.navy} numberOfLines={1} style={styles.title}>
          {document.title}
        </AppText>

        <AppText variant="xs" color={colors.textSecondary} numberOfLines={1}>
          {document.doctorName} • {document.facility}
        </AppText>

        {document.summary && (
          <AppText variant="xs" color={colors.textMuted} numberOfLines={2} style={styles.summary}>
            {document.summary}
          </AppText>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onDownload}
        style={styles.downloadButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Feather name="download" size={18} color={colors.primary} />
        <AppText variant="xs" color={colors.textMuted} style={styles.sizeText}>
          {document.fileSize}
        </AppText>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  infoCol: {
    flex: 1,
    marginRight: spacing.sm,
  },
  typeBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 11,
  },
  title: {
    marginBottom: 2,
  },
  summary: {
    marginTop: 4,
    fontStyle: 'italic',
  },
  downloadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  sizeText: {
    marginTop: 2,
    fontSize: 10,
  },
});
