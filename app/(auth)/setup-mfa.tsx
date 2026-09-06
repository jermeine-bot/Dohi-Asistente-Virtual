import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { router } from 'expo-router';

import { AppText } from '../../src/components/common/AppText';
import { AppLogo } from '../../src/components/common/AppLogo';
import { AppInput } from '../../src/components/common/AppInput';
import { AppButton } from '../../src/components/common/AppButton';
import { useAuth } from '../../src/context/AuthContext';

export default function SetupMFA() {
  const {
    enrollMFA,
    verifyMFAEnrollment,
  } = useAuth();

  const [factorId, setFactorId] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');

  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const setup = async () => {
      try {
        const enrollment = await enrollMFA();

        setFactorId(enrollment.id);
        setQrCode(enrollment.qrCode);
        setSecret(enrollment.secret);
      } catch (error) {
        console.error('Error configurando MFA:', error);

        Alert.alert(
          'Error',
          'No se pudo iniciar la configuración de seguridad.'
        );

        router.replace('/(auth)/login');
      } finally {
        setLoading(false);
      }
    };

    setup();
  }, []);

  const handleVerify = async () => {
    if (!code.trim()) {
      Alert.alert(
        'Código requerido',
        'Introduce el código de 6 dígitos de tu aplicación autenticadora.'
      );
      return;
    }

    if (code.trim().length !== 6) {
      Alert.alert(
        'Código inválido',
        'El código debe contener 6 dígitos.'
      );
      return;
    }

    if (!factorId) {
    Alert.alert(
        'Error',
        'No se encontró el factor de autenticación. Reinicia la configuración.'
    );
    return;
    }

    try {
      setVerifying(true);

      await verifyMFAEnrollment(
        factorId,
        code.trim()
      );

      Alert.alert(
        '¡Configuración completada!',
        'La autenticación en dos pasos ha sido activada correctamente.',
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
      console.error('Error verificando MFA:', error);

      Alert.alert(
        'Código incorrecto',
        'El código introducido no es válido. Verifica tu aplicación autenticadora e inténtalo nuevamente.'
      );
    } finally {
      setVerifying(false);
    }
  };

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
            Preparando configuración de seguridad...
          </AppText>
        </View>
      </SafeAreaView>
    );
  }

  return (
  <SafeAreaView style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >

      <AppLogo />

      <View style={styles.header}>
        <AppText style={styles.title}>
          Protege tu cuenta
        </AppText>

        <AppText style={styles.description}>
          Configura la autenticación en dos pasos para mantener
          segura tu cuenta DOHI.
        </AppText>
      </View>

      <View style={styles.instructions}>
        <AppText style={styles.stepTitle}>
          1. Escanea el código QR
        </AppText>

        <AppText style={styles.stepDescription}>
          Abre Google Authenticator, Microsoft Authenticator u
          otra aplicación compatible y escanea este código.
        </AppText>
      </View>

      <View style={styles.qrContainer}>
        {qrCode ? (
          <SvgXml
            xml={qrCode}
            width={220}
            height={220}
          />
        ) : null}
      </View>

      <View style={styles.manualContainer}>
        <AppText style={styles.manualTitle}>
          ¿No puedes escanearlo?
        </AppText>

        <AppText style={styles.manualText}>
          Introduce manualmente esta clave en tu aplicación
          autenticadora:
        </AppText>

        <Text
            selectable
            style={styles.secret}
            >
            {secret}
        </Text>
      </View>

      <View style={styles.instructions}>
        <AppText style={styles.stepTitle}>
          2. Introduce el código
        </AppText>

        <AppText style={styles.stepDescription}>
          Escribe aquí el código de 6 dígitos que aparece en tu
          aplicación.
        </AppText>
      </View>

      <AppInput
        label="Código de seguridad"
        placeholder="000000"
        value={code}
        onChangeText={(text) =>
          setCode(
            text.replace(/[^0-9]/g, '').slice(0, 6)
          )
        }
        keyboardType="number-pad"
        autoCapitalize="none"
      />

      <AppButton
        title="Activar autenticación"
        onPress={handleVerify}
        loading={verifying}
        style={styles.button}
      />

    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
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
    marginTop: 25,
    marginBottom: 20,
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

  instructions: {
    marginTop: 15,
    marginBottom: 10,
  },

  stepTitle: {
    fontSize: 17,
    fontWeight: '700',
  },

  stepDescription: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 20,
  },

  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },

  manualContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  manualTitle: {
    fontSize: 14,
    fontWeight: '700',
  },

  manualText: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },

  secret: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
  },

  button: {
    marginTop: 20,
  },
});