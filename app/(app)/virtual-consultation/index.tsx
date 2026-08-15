import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { StatusBadge } from '../../../src/components/common/StatusBadge';
import { mockDoctors } from '../../../src/data/mockDoctors';
import { mockUser } from '../../../src/data/mockUser';

const { width, height } = Dimensions.get('window');

export default function VirtualConsultationScreen() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState('08:42');

  const doctor = mockDoctors[0]; // Dra. Sofia Martinez

  const handleEndCall = () => {
    Alert.alert(
      'Finalizar Consulta',
      '¿Deseas concluir la videoconsulta con la Dra. Sofía Martínez?',
      [
        { text: 'Continuar Consulta', style: 'cancel' },
        {
          text: 'Finalizar',
          style: 'destructive',
          onPress: () => router.replace('/(app)/(tabs)/appointments'),
        },
      ]
    );
  };

  const handleOpenChat = () => {
    Alert.alert(
      'Chat de Consulta',
      'Mensaje de Dra. Sofía: "Hola Juan, te he enviado la receta digital a tu bandeja de documentos médicos en DOHI."',
      [{ text: 'Entendido' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Doctor Video Mock Stream */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
        }}
        style={styles.doctorStreamImage}
      />
      <View style={styles.darkOverlay} />

      {/* Top Header Overlay */}
      <SafeAreaView style={styles.topHeader}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleEndCall}
            activeOpacity={0.7}
            style={styles.headerIconButton}
          >
            <Feather name="chevron-down" size={24} color={colors.white} />
          </TouchableOpacity>

          <View style={styles.doctorHeaderInfo}>
            <AppText variant="base" weight="bold" color={colors.white} align="center">
              {doctor.name}
            </AppText>
            <AppText variant="xs" color="rgba(255, 255, 255, 0.8)" align="center">
              {doctor.specialty} • {callDuration}
            </AppText>
          </View>

          <View style={styles.liveBadgeWrapper}>
            <View style={styles.liveDot} />
            <AppText variant="xs" weight="bold" color={colors.white}>
              EN VIVO
            </AppText>
          </View>
        </View>
      </SafeAreaView>

      {/* Patient Picture-in-Picture (PiP) */}
      <View style={styles.patientPipContainer}>
        {isVideoOff ? (
          <View style={styles.patientPipVideoOff}>
            <Feather name="video-off" size={24} color={colors.white} />
            <AppText variant="xs" color={colors.white} style={styles.pipText}>
              Cámara desactivada
            </AppText>
          </View>
        ) : (
          <Image
            source={{ uri: mockUser.avatarUrl }}
            style={styles.patientPipImage}
          />
        )}
        <View style={styles.patientPipBadge}>
          <AppText variant="xs" weight="semiBold" color={colors.white}>
            Tú {isMuted && '🔇'}
          </AppText>
        </View>
      </View>

      {/* Bottom Floating Control Bar */}
      <SafeAreaView style={styles.bottomControlsContainer}>
        <View style={styles.controlsBar}>
          {/* Mute Mic */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsMuted(!isMuted)}
            style={[styles.controlButton, isMuted && styles.controlButtonActive]}
          >
            <Feather
              name={isMuted ? 'mic-off' : 'mic'}
              size={22}
              color={isMuted ? colors.error : colors.white}
            />
          </TouchableOpacity>

          {/* Toggle Video */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsVideoOff(!isVideoOff)}
            style={[styles.controlButton, isVideoOff && styles.controlButtonActive]}
          >
            <Feather
              name={isVideoOff ? 'video-off' : 'video'}
              size={22}
              color={isVideoOff ? colors.error : colors.white}
            />
          </TouchableOpacity>

          {/* Toggle Speaker */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsSpeakerOn(!isSpeakerOn)}
            style={[styles.controlButton, !isSpeakerOn && styles.controlButtonActive]}
          >
            <Ionicons
              name={isSpeakerOn ? 'volume-high' : 'volume-mute'}
              size={22}
              color={colors.white}
            />
          </TouchableOpacity>

          {/* Open In-call Chat */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleOpenChat}
            style={styles.controlButton}
          >
            <Feather name="message-square" size={22} color={colors.white} />
          </TouchableOpacity>

          {/* End Call Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleEndCall}
            style={styles.endCallButton}
          >
            <MaterialIcons name="call-end" size={28} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    position: 'relative',
  },
  doctorStreamImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  topHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorHeaderInfo: {
    alignItems: 'center',
  },
  liveBadgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
    marginRight: 5,
  },
  patientPipContainer: {
    position: 'absolute',
    top: 110,
    right: spacing.lg,
    width: 110,
    height: 150,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...shadows.lg,
    zIndex: 10,
  },
  patientPipImage: {
    width: '100%',
    height: '100%',
  },
  patientPipVideoOff: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  pipText: {
    marginTop: 4,
    fontSize: 9,
    textAlign: 'center',
  },
  patientPipBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  bottomControlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  controlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    ...shadows.lg,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonActive: {
    backgroundColor: colors.white,
  },
  endCallButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
});
