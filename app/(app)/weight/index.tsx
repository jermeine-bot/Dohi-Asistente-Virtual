import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { colors, radius, spacing, shadows } from '../../../src/theme';
import { AppText } from '../../../src/components/common/AppText';
import { AppButton } from '../../../src/components/common/AppButton';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { WeightChart } from '../../../src/components/charts/WeightChart';
import { IMCCategory, WeightRecord } from '../../../src/types/Weight';
import {
  getWeightHistory,
  saveWeightRecord,
} from '../../../src/service/weightService';

export default function WeightScreen() {
  const [weightInput, setWeightInput] = useState('');
  const [heightInput, setHeightInput] = useState('');

  const [calculatedIMC, setCalculatedIMC] = useState<number | null>(null);
  const [imcCategory, setImcCategory] = useState<IMCCategory | null>(null);

  const [history, setHistory] = useState<WeightRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadWeightHistory = async () => {
    try {
      setLoading(true);

      const records = await getWeightHistory();

      setHistory(records);

      if (records.length > 0) {
        const latestRecord = records[records.length - 1];

        setWeightInput(String(latestRecord.weightKg));
        setHeightInput(String(latestRecord.heightCm));
        setCalculatedIMC(latestRecord.imc);
        setImcCategory(latestRecord.category);
      }
    } catch (error) {
      console.error('Error cargando historial de peso:', error);

      Alert.alert(
        'Error',
        'No fue posible cargar tu historial de peso.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeightHistory();
  }, []);

  const calculateIMC = () => {
    const w = parseFloat(weightInput.replace(',', '.'));
    const h = parseFloat(heightInput.replace(',', '.'));

    if (
      isNaN(w) ||
      isNaN(h) ||
      w <= 0 ||
      h <= 0
    ) {
      Alert.alert(
        'Datos Inválidos',
        'Por favor ingresa valores válidos de peso y altura.'
      );
      return;
    }

    const hMeters = h / 100;

    const imc = parseFloat(
      (w / (hMeters * hMeters)).toFixed(1)
    );

    setCalculatedIMC(imc);

    let category: IMCCategory = 'Peso Normal';

    if (imc < 18.5) {
      category = 'Bajo Peso';
    } else if (imc < 25.0) {
      category = 'Peso Normal';
    } else if (imc < 30.0) {
      category = 'Sobrepeso';
    } else {
      category = 'Obesidad';
    }

    setImcCategory(category);
  };

  const handleSaveWeight = async () => {
    const w = parseFloat(weightInput.replace(',', '.'));
    const h = parseFloat(heightInput.replace(',', '.'));

    if (
      isNaN(w) ||
      isNaN(h) ||
      w <= 0 ||
      h <= 0
    ) {
      Alert.alert(
        'Datos Inválidos',
        'Por favor ingresa valores válidos de peso y altura.'
      );
      return;
    }
    if (calculatedIMC === null || imcCategory === null) {
      Alert.alert(
        'Calcula tu IMC',
        'Primero debes calcular tu IMC antes de guardar el registro.'
      );
      return;
    }

    try {
      setSaving(true);

      const newRecord = await saveWeightRecord({
        weightKg: w,
        heightCm: h,
        imc: calculatedIMC,
        category: imcCategory,
      });

      setHistory(prev => [...prev, newRecord]);

      Alert.alert(
        '¡Registro Guardado!',
        `Se ha registrado ${w} kg (IMC: ${calculatedIMC}) en tu historial.`
      );
    } catch (error) {
      console.error('Error guardando registro de peso:', error);

      Alert.alert(
        'Error',
        'No fue posible guardar tu registro. Intenta nuevamente.'
      );
    } finally {
      setSaving(false);
    }
  };

  const getCategoryColor = () => {
    switch (imcCategory) {
      case 'Peso Normal':
        return colors.success;

      case 'Sobrepeso':
        return colors.warning;

      case 'Obesidad':
        return colors.error;

      case 'Bajo Peso':
        return colors.info;

      default:
        return colors.info;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        title="Control de Peso e IMC"
        showLogo={true}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Indicador de carga inicial */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={colors.primary}
            />

            <AppText
              variant="sm"
              color={colors.textSecondary}
              style={styles.loadingText}
            >
              Cargando tu historial...
            </AppText>
          </View>
        ) : (
          <>
            {/* Evolution Chart */}
            <View style={styles.section}>
              <WeightChart
                history={history}
                targetWeight={undefined}
              />
            </View>

            <View style={styles.calculatorCard}>
              <AppText
                variant="lg"
                weight="bold"
                color={colors.navy}
                style={styles.calculatorTitle}
              >
                Calculadora de IMC
              </AppText>

              <AppText
                variant="xs"
                color={colors.textSecondary}
                style={styles.calculatorSubtitle}
              >
                Ingresa tu peso y estatura para actualizar tu
                diagnóstico de salud corporal.
              </AppText>

              <View style={styles.inputsRow}>
                {/* Peso */}
                <View style={styles.inputCol}>
                  <AppText
                    variant="xs"
                    weight="semiBold"
                    color={colors.textPrimary}
                    style={styles.inputLabel}
                  >
                    Peso (kg)
                  </AppText>

                  <View style={styles.inputBox}>
                    <TextInput
                      value={weightInput}
                      onChangeText={setWeightInput}
                      keyboardType="decimal-pad"
                      placeholder="Ej. 68.5"
                      placeholderTextColor={colors.textMuted}
                      style={styles.textInput}
                    />

                    <AppText
                      variant="sm"
                      color={colors.textMuted}
                    >
                      kg
                    </AppText>
                  </View>
                </View>

                {/* Altura */}
                <View style={styles.inputCol}>
                  <AppText
                    variant="xs"
                    weight="semiBold"
                    color={colors.textPrimary}
                    style={styles.inputLabel}
                  >
                    Altura (cm)
                  </AppText>

                  <View style={styles.inputBox}>
                    <TextInput
                      value={heightInput}
                      onChangeText={setHeightInput}
                      keyboardType="decimal-pad"
                      placeholder="Ej. 173"
                      placeholderTextColor={colors.textMuted}
                      style={styles.textInput}
                    />

                    <AppText
                      variant="sm"
                      color={colors.textMuted}
                    >
                      cm
                    </AppText>
                  </View>
                </View>
              </View>

              <AppButton
                title="Calcular IMC"
                variant="primary"
                size="md"
                onPress={calculateIMC}
                style={styles.calcButton}
              />

              {calculatedIMC !== null && imcCategory !== null && (
                <View
                  style={[
                    styles.resultBanner,
                    {
                      borderColor: getCategoryColor(),
                    },
                  ]}
                >
                  <View style={styles.resultLeft}>
                    <AppText
                      variant="xs"
                      color={colors.textMuted}
                    >
                      RESULTADO IMC
                    </AppText>

                    <AppText
                      variant="3xl"
                      weight="bold"
                      color={colors.navy}
                    >
                      {calculatedIMC}{' '}
                      <AppText
                        variant="sm"
                        color={colors.textMuted}
                      >
                        kg/m²
                      </AppText>
                    </AppText>
                  </View>

                  <View
                    style={[
                      styles.categoryBadge,
                      {
                        backgroundColor:
                          getCategoryColor() + '20',
                      },
                    ]}
                  >
                    <AppText
                      variant="sm"
                      weight="bold"
                      color={getCategoryColor()}
                    >
                      {imcCategory}
                    </AppText>
                  </View>
                </View>
              )}

              <AppButton
                title={
                  saving
                    ? 'Guardando...'
                    : 'Guardar en mi Historial'
                }
                variant="secondary"
                size="md"
                onPress={handleSaveWeight}
                disabled={saving}
                leftIcon={
                  saving ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.primary}
                    />
                  ) : (
                    <Feather
                      name="plus-circle"
                      size={16}
                      color={colors.primary}
                    />
                  )
                }
                style={styles.saveButton}
              />
            </View>

            <View style={styles.scaleCard}>
              <AppText
                variant="sm"
                weight="bold"
                color={colors.navy}
                style={styles.scaleTitle}
              >
                Rangos de Referencia OMS:
              </AppText>

              <View style={styles.scaleItem}>
                <AppText
                  variant="xs"
                  color={colors.textSecondary}
                >
                  Bajo peso:
                </AppText>

                <AppText
                  variant="xs"
                  weight="medium"
                  color={colors.navy}
                >
                  Menos de 18.5
                </AppText>
              </View>

              <View style={styles.scaleItem}>
                <AppText
                  variant="xs"
                  color={colors.textSecondary}
                >
                  Peso normal:
                </AppText>

                <AppText
                  variant="xs"
                  weight="bold"
                  color={colors.success}
                >
                  18.5 – 24.9
                </AppText>
              </View>

              <View style={styles.scaleItem}>
                <AppText
                  variant="xs"
                  color={colors.textSecondary}
                >
                  Sobrepeso:
                </AppText>

                <AppText
                  variant="xs"
                  weight="medium"
                  color={colors.warning}
                >
                  25.0 – 29.9
                </AppText>
              </View>

              <View style={styles.scaleItem}>
                <AppText
                  variant="xs"
                  color={colors.textSecondary}
                >
                  Obesidad:
                </AppText>

                <AppText
                  variant="xs"
                  weight="medium"
                  color={colors.error}
                >
                  30.0 o más
                </AppText>
              </View>
            </View>
          </>
        )}
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

  loadingContainer: {
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: spacing.md,
  },

  section: {
    marginBottom: spacing.base,
  },

  calculatorCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.card,
  },

  calculatorTitle: {
    marginBottom: 2,
  },

  calculatorSubtitle: {
    marginBottom: spacing.base,
  },

  inputsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.base,
  },

  inputCol: {
    flex: 1,
  },

  inputLabel: {
    marginBottom: 4,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray50,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    height: 48,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.navy,
    fontWeight: '600',
  },

  calcButton: {
    marginBottom: spacing.base,
  },

  resultBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray50,
    borderRadius: radius.xl,
    padding: spacing.base,
    borderWidth: 1.5,
    marginBottom: spacing.base,
  },

  resultLeft: {
    justifyContent: 'center',
  },

  categoryBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
  },

  saveButton: {
    marginTop: spacing.xs,
  },

  scaleCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.sm,
    gap: spacing.xs,
  },

  scaleTitle: {
    marginBottom: spacing.xs,
  },

  scaleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
});