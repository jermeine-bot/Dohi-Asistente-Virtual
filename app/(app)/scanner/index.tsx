import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppButton } from '../../../src/components/common/AppButton';

const { width } = Dimensions.get('window');
const SCAN_FRAME_SIZE = width * 0.78;

type ScannerState = 'idle' | 'scanning' | 'processing' | 'success' | 'error';

export default function ExamScannerScreen() {
  const [scannerState, setScannerState] = useState<ScannerState>('idle');
  const [flashEnabled, setFlashEnabled] = useState(false);

  const handleCapture = () => {
    setScannerState('scanning');
    setTimeout(() => {
      setScannerState('processing');
      setTimeout(() => {
        setScannerState('success');
      }, 1500);
    }, 1200);
  };

  const handleReset = () => {
    setScannerState('idle');
  };

  return (
    <View style={styles.container}>
      {/* Mock Camera View Background */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        }}
        style={styles.cameraBackground}
      />
      <View style={styles.darkDimmer} />

      {/* Top Controls Overlay */}
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.circleBtn}
        >
          <Feather name="x" size={22} color={colors.white} />
        </TouchableOpacity>

        <AppText variant="base" weight="bold" color={colors.white}>
          Escáner de Exámenes
        </AppText>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setFlashEnabled(!flashEnabled)}
          style={[styles.circleBtn, flashEnabled && styles.circleBtnActive]}
        >
          <Ionicons
            name={flashEnabled ? 'flash' : 'flash-off'}
            size={20}
            color={flashEnabled ? '#F59E0B' : colors.white}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Central Viewfinder / Scanning Frame */}
      <View style={styles.centerContainer}>
        {scannerState === 'success' ? (
          <View style={styles.resultCard}>
            <View style={styles.resultIconCircle}>
              <Feather name="check" size={36} color={colors.success} />
            </View>
            <AppText variant="lg" weight="bold" color={colors.navy} align="center" style={styles.resultTitle}>
              ¡Documento Escaneado!
            </AppText>
            <AppText variant="xs" color={colors.textSecondary} align="center" style={styles.resultSubtitle}>
              Se detectó: "Resultado de Biometría Hemática Completa - Dra. Sofía Martínez"
            </AppText>

            <View style={styles.resultDetailsBox}>
              <View style={styles.resultDetailRow}>
                <AppText variant="xs" color={colors.textMuted}>Tipo:</AppText>
                <AppText variant="xs" weight="bold" color={colors.navy}>Examen de Sangre</AppText>
              </View>
              <View style={styles.resultDetailRow}>
                <AppText variant="xs" color={colors.textMuted}>Páginas:</AppText>
                <AppText variant="xs" weight="bold" color={colors.navy}>1 página detectada</AppText>
              </View>
              <View style={styles.resultDetailRow}>
                <AppText variant="xs" color={colors.textMuted}>Calidad:</AppText>
                <AppText variant="xs" weight="bold" color={colors.success}>Óptima (300 DPI)</AppText>
              </View>
            </View>

            <AppButton
              title="Guardar en Documentos"
              variant="primary"
              size="md"
              onPress={() => {
                router.replace('/(app)/documents');
              }}
              style={styles.actionBtn}
            />

            <AppButton
              title="Escanear otro documento"
              variant="ghost"
              size="sm"
              onPress={handleReset}
            />
          </View>
        ) : (
          <View style={styles.viewfinderContainer}>
            {/* Corner Borders of Viewfinder */}
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />

            {/* Scanning Laser Line */}
            {scannerState === 'scanning' && <View style={styles.laserLine} />}

            {/* Processing Spinner */}
            {scannerState === 'processing' && (
              <View style={styles.processingOverlay}>
                <ActivityIndicator size="large" color={colors.primary} />
                <AppText variant="sm" weight="bold" color={colors.white} style={styles.processingText}>
                  Digitalizando documento...
                </AppText>
              </View>
            )}

            {/* Instructional Mock Sample inside Frame */}
            {scannerState === 'idle' && (
              <View style={styles.idleHintBox}>
                <MaterialIcons name="document-scanner" size={40} color="rgba(255, 255, 255, 0.7)" />
                <AppText variant="xs" color="rgba(255, 255, 255, 0.85)" align="center" style={styles.hintText}>
                  Alinea tu receta o resultado dentro del marco
                </AppText>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Bottom Shutter & Gallery Controls */}
      {scannerState !== 'success' && (
        <SafeAreaView style={styles.bottomBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleCapture}
            style={styles.galleryButton}
          >
            <Feather name="image" size={24} color={colors.white} />
            <AppText variant="xs" color={colors.white} style={styles.btnLabel}>
              Galería
            </AppText>
          </TouchableOpacity>

          {/* Shutter Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCapture}
            disabled={scannerState !== 'idle'}
            style={styles.shutterOuter}
          >
            <View style={styles.shutterInner} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setScannerState('error')}
            style={styles.galleryButton}
          >
            <Feather name="help-circle" size={24} color={colors.white} />
            <AppText variant="xs" color={colors.white} style={styles.btnLabel}>
              Ayuda
            </AppText>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    position: 'relative',
  },
  cameraBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  darkDimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    zIndex: 10,
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtnActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.base,
  },
  viewfinderContainer: {
    width: SCAN_FRAME_SIZE,
    height: SCAN_FRAME_SIZE * 1.25,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: radius.lg,
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: colors.primary,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: radius.md,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: radius.md,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: radius.md,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: radius.md,
  },
  laserLine: {
    position: 'absolute',
    width: '90%',
    height: 3,
    backgroundColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },
  processingOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    padding: spacing.xl,
    borderRadius: radius.xl,
  },
  processingText: {
    marginTop: spacing.md,
  },
  idleHintBox: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  hintText: {
    marginTop: spacing.sm,
    maxWidth: 200,
  },
  resultCard: {
    backgroundColor: colors.white,
    borderRadius: radius['2xl'],
    padding: spacing.xl,
    width: '90%',
    alignItems: 'center',
    ...shadows.lg,
  },
  resultIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  resultTitle: {
    marginBottom: 4,
  },
  resultSubtitle: {
    marginBottom: spacing.base,
  },
  resultDetailsBox: {
    backgroundColor: colors.gray50,
    borderRadius: radius.lg,
    padding: spacing.md,
    width: '100%',
    marginBottom: spacing.base,
    gap: 6,
  },
  resultDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    width: '100%',
    marginBottom: spacing.xs,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    zIndex: 10,
  },
  galleryButton: {
    alignItems: 'center',
  },
  btnLabel: {
    marginTop: 4,
  },
  shutterOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
});
