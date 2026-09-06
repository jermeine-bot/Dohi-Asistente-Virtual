import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { AppText } from '../../src/components/common/AppText';
import { AppLogo } from '../../src/components/common/AppLogo';
import { AppInput } from '../../src/components/common/AppInput';
import { AppButton } from '../../src/components/common/AppButton';
import { useAuth } from '../../src/context/AuthContext';

export default function MFA() {
  const {
    getMFAFactorId,
    verifyMFA,
  } = useAuth();

  const [factorId, setFactorId] = useState('');
  const [code, setCode] = useState('');

  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  /**
   * Obtener el factor MFA que ya fue configurado
   * y verificado anteriormente.
   */
  useEffect(() => {
    const loadFactor = async () => {
      try {
        const id = await getMFAFactorId();

        setFactorId(id);
      } catch (error) {
        console.error(
          'Error obteniendo factor MFA:',
          error
        );

        Alert.alert(
          'Error',
          'No se encontró un método de autenticación configurado. Inicia nuevamente el proceso.'
        );

        router.replace('/(auth)/login');
      } finally {
        setLoading(false);
      }
    };

    loadFactor();
  }, []);

  /**
   * Verificar código MFA
   */
  const handleVerify = async () => {
    const cleanCode = code.trim();

    if (!cleanCode) {
      Alert.alert(
        'Código requerido',
        'Introduce el código de 6 dígitos de tu aplicación autenticadora.'
      );
      return;
    }

    if (cleanCode.length !== 6) {
      Alert.alert(
        'Código inválido',
        'El código debe contener 6 dígitos.'
      );
      return;
    }

    if (!factorId) {
      Alert.alert(
        'Error',
        'No se encontró el método de autenticación. Reinicia el inicio de sesión.'
      );
      return;
    }

    try {
      setVerifying(true);

      await verifyMFA(
        factorId,
        cleanCode
      );

      Alert.alert(
        '¡Autenticación completada!',
        'Tu identidad ha sido verificada correctamente.',
        [
          {
            text: 'Continuar',
            onPress: () => {
              router.replace('/(app)/(tabs)');
            },
          },
        ]
      );
    } catch (error) {
      console.error(
        'Error verificando MFA:',
        error
      );

      Alert.alert(
        'Código incorrecto',
        'El código introducido no es válido o ha expirado. Verifica tu aplicación autenticadora e inténtalo nuevamente.'
      );
    } finally {
      setVerifying(false);
    }
  };

  /**
   * Pantalla de carga mientras obtenemos
   * el factor MFA.
   */
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <AppLogo />

          <ActivityIndicator
            size="large"
            style={styles.loader}
          />

          <AppText style={styles.loadingText}>
            Preparando autenticación...
          </AppText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <View style={styles.content}>

          <AppLogo />

          <View style={styles.header}>
            <AppText style={styles.title}>
              Verificación de seguridad
            </AppText>

            <AppText style={styles.description}>
              Abre tu aplicación autenticadora e introduce el código de 6 dígitos para continuar.
            </AppText>
          </View>

          <View style={styles.iconContainer}>
            <AppText style={styles.icon}>
              🔐
            </AppText>
          </View>

          <View style={styles.instructions}>
            <AppText style={styles.stepTitle}>
              Autenticación en dos pasos
            </AppText>

            <AppText style={styles.stepDescription}>
              Utiliza Google Authenticator, Microsoft Authenticator u otra aplicación compatible para obtener tu código.
            </AppText>
          </View>

          <AppInput
            label="Código de seguridad"
            placeholder="000000"
            value={code}
            onChangeText={(text) =>
              setCode(
                text
                  .replace(/[^0-9]/g, '')
                  .slice(0, 6)
              )
            }
            keyboardType="number-pad"
            autoCapitalize="none"
            maxLength={6}
          />

          <AppButton
            title="Verificar código"
            onPress={handleVerify}
            loading={verifying}
            style={styles.button}
          />

          <AppText style={styles.helpText}>
            El código cambia automáticamente cada pocos segundos.
          </AppText>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  keyboardContainer: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'center',
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  loader: {
    marginTop: 30,
  },

  loadingText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 15,
  },

  header: {
    marginTop: 30,
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  icon: {
    fontSize: 48,
  },

  instructions: {
    marginBottom: 20,
  },

  stepTitle: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },

  stepDescription: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  button: {
    marginTop: 20,
  },

  helpText: {
    marginTop: 18,
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
});