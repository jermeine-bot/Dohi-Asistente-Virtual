import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppButton } from '../../../src/components/common/AppButton';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { StatusBadge } from '../../../src/components/common/StatusBadge';
import { mockAppointments } from '../../../src/data/mockAppointments';

export default function AppointmentAssistantScreen() {
  const upcomingAppointment = mockAppointments[1] || mockAppointments[0]; // Lic. Claudia Narváez (Virtual) or Dra. Sofía

  const handleJoin = () => {
    router.push('/(app)/virtual-consultation');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="Asistente de Cita" onBack={() => router.back()} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Próxima Cita Highlight Card (Rule 29) */}
        <View style={styles.appointmentCard}>
          <View style={styles.cardHeaderRow}>
            <StatusBadge label="PRÓXIMA EN 25 MIN" variant="success" size="sm" />
            <AppText variant="xs" color={colors.textMuted}>
              Código: #DOHI-8842
            </AppText>
          </View>

          <View style={styles.doctorInfoRow}>
            <Image
              source={{ uri: upcomingAppointment.doctorAvatar }}
              style={styles.doctorAvatar}
            />
            <View style={styles.doctorTextCol}>
              <AppText variant="lg" weight="bold" color={colors.navy}>
                {upcomingAppointment.doctorName}
              </AppText>
              <AppText variant="sm" color={colors.primary} weight="medium">
                {upcomingAppointment.specialty}
              </AppText>
              <AppText variant="xs" color={colors.textSecondary}>
                Telemedicina Segura Dohi
              </AppText>
            </View>
          </View>

          <View style={styles.detailsBox}>
            <View style={styles.detailItem}>
              <Feather name="calendar" size={16} color={colors.primary} />
              <AppText variant="sm" weight="semiBold" color={colors.navy} style={styles.detailText}>
                {upcomingAppointment.date}
              </AppText>
            </View>

            <View style={styles.detailItem}>
              <Feather name="clock" size={16} color={colors.primary} />
              <AppText variant="sm" weight="semiBold" color={colors.navy} style={styles.detailText}>
                {upcomingAppointment.time}
              </AppText>
            </View>

            <View style={styles.detailItem}>
              <Feather name="video" size={16} color="#10B981" />
              <AppText variant="sm" weight="semiBold" color="#10B981" style={styles.detailText}>
                Videoconsulta Virtual
              </AppText>
            </View>
          </View>

          {/* Join Call Button */}
          <AppButton
            title="Asistir a mi cita (Unirse)"
            variant="primary"
            size="lg"
            onPress={handleJoin}
            leftIcon={<Feather name="video" size={18} color={colors.white} />}
            style={styles.joinBtn}
          />
        </View>

        {/* Preparation Checklist */}
        <View style={styles.checklistCard}>
          <AppText variant="base" weight="bold" color={colors.navy} style={styles.checklistTitle}>
            Recomendaciones para tu Consulta:
          </AppText>

          <View style={styles.checklistItem}>
            <View style={styles.checkCircle}>
              <Feather name="check" size={12} color={colors.success} />
            </View>
            <AppText variant="xs" color={colors.navy} style={styles.checkText}>
              Verifica tu conexión a internet y nivel de batería.
            </AppText>
          </View>

          <View style={styles.checklistItem}>
            <View style={styles.checkCircle}>
              <Feather name="check" size={12} color={colors.success} />
            </View>
            <AppText variant="xs" color={colors.navy} style={styles.checkText}>
              Ubícate en un lugar iluminado y con poco ruido ambiental.
            </AppText>
          </View>

          <View style={styles.checklistItem}>
            <View style={styles.checkCircle}>
              <Feather name="check" size={12} color={colors.success} />
            </View>
            <AppText variant="xs" color={colors.navy} style={styles.checkText}>
              Ten a mano tus medicamentos actuales o resultados recientes.
            </AppText>
          </View>
        </View>
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
  appointmentCard: {
    backgroundColor: colors.white,
    borderRadius: radius['2xl'],
    padding: spacing.lg,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  doctorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: spacing.md,
    backgroundColor: colors.lightBlue,
  },
  doctorTextCol: {
    flex: 1,
  },
  detailsBox: {
    backgroundColor: colors.gray50,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: spacing.sm,
  },
  joinBtn: {
    borderRadius: radius.xl,
  },
  checklistCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.sm,
  },
  checklistTitle: {
    marginBottom: spacing.md,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  checkText: {
    flex: 1,
    lineHeight: 18,
  },
});
