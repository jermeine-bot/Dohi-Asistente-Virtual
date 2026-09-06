import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { authService } from '../../server/src/services/authService';

import type {
  RegisterData,
  BloodType,
} from '../../server/src/services/authService';

import type { Session } from '@supabase/supabase-js';
import { User } from '../types/User';

export interface UserProfile extends User {
  phone?: string;
  gender?: 'Masculino' | 'Femenino' | 'Otro';
  age?: number | string;
  location?: string;
  bloodType?: BloodType;
  avatarUrl?: string;
}

interface LoginResult {
  success: boolean;
  requiresMFA: boolean;
  requiresMFASetup: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mfaRequired: boolean;
  mfaSetupRequired: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<LoginResult>;

  enrollMFA: () => Promise<{
    id: string;
    qrCode: string;
    secret: string;
    uri: string;
  }>;

  getMFAFactorId: () => Promise<string>;

  verifyMFA: (
    factorId: string,
    code: string
  ) => Promise<void>;

  verifyMFAEnrollment: (
    factorId: string,
    code: string
  ) => Promise<void>;

  logout: () => Promise<void>;

  register: (userData: RegisterData) => Promise<{
    success: boolean;
    requiresConfirmation: boolean;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [mfaRequired, setMFARequired] = useState(false);
  const [mfaSetupRequired, setMFASetupRequired] = useState(false);

  const loadUserProfile = async (
    currentSession: Session
  ): Promise<UserProfile> => {
    const currentUser = currentSession.user;

    const profile = await authService.getProfile(
      currentUser.id
    );

    return {
      id: currentUser.id,
      name:
        profile?.name ||
        currentUser.user_metadata?.name ||
        currentUser.email?.split('@')[0] ||
        'Paciente Dohi',

      email: currentUser.email || '',

      phone: profile?.phone,
      gender: profile?.gender,
      age: profile?.age,
      location: profile?.location,
      bloodType: profile?.blood_type as BloodType | undefined,

      avatarUrl:
        profile?.avatar_url ||
        currentUser.user_metadata?.avatarUrl,
    };
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentSession =
          await authService.getSession();

        if (currentSession) {
          setSession(currentSession);

          const userProfile =
            await loadUserProfile(currentSession);

          setUser(userProfile);

          const mfaStatus =
            await authService.getMFAStatus();

          if (mfaStatus.requiresMFA) {
            setMFARequired(true);
            setMFASetupRequired(false);
            setIsAuthenticated(false);

          } else if (
            mfaStatus.requiresMFASetup
          ) {
            setMFARequired(false);
            setMFASetupRequired(true);
            setIsAuthenticated(false);

          } else {
            setMFARequired(false);
            setMFASetupRequired(false);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error(
          'Error inicializando autenticación:',
          error
        );

        setSession(null);
        setUser(null);
        setIsAuthenticated(false);

      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = authService.onAuthStateChange(
      (newSession) => {
        setTimeout(async () => {
          try {
            if (!newSession) {
              setSession(null);
              setUser(null);
              setMFARequired(false);
              setMFASetupRequired(false);
              setIsAuthenticated(false);
              return;
            }

            setSession(newSession);

            const userProfile =
              await loadUserProfile(newSession);

            setUser(userProfile);

            const mfaStatus =
              await authService.getMFAStatus();

            if (mfaStatus.requiresMFA) {
              setMFARequired(true);
              setMFASetupRequired(false);
              setIsAuthenticated(false);

            } else if (
              mfaStatus.requiresMFASetup
            ) {
              setMFARequired(false);
              setMFASetupRequired(true);
              setIsAuthenticated(false);

            } else {
              setMFARequired(false);
              setMFASetupRequired(false);
              setIsAuthenticated(true);
            }

          } catch (error) {
            console.error(
              'Error procesando estado MFA:',
              error
            );

            setIsAuthenticated(false);
          }
        }, 0);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

 
  const verifyMFAEnrollment = async (
    factorId: string,
    code: string
  ): Promise<void> => {
    try {
      await authService.verifyMFAEnrollment(
        factorId,
        code
      );

      const currentSession =
        await authService.getSession();

      if (!currentSession) {
        throw new Error(
          'No se pudo recuperar la sesión.'
        );
      }

      setSession(currentSession);

      const userProfile =
        await loadUserProfile(currentSession);

      setUser(userProfile);

      setMFARequired(false);
      setMFASetupRequired(false);
      setIsAuthenticated(true);

    } catch (error) {
      console.error(
        'Error verificando configuración MFA:',
        error
      );

      throw error;
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResult> => {
    try {
      const result = await authService.login(
        email,
        password
      );

      setSession(result.session);

      const userProfile =
        await loadUserProfile(result.session);

      setUser(userProfile);

      const mfaStatus =
        await authService.getMFAStatus();

      console.log('========== MFA ==========');
      console.log(
        'Current level:',
        mfaStatus.currentLevel
      );
      console.log(
        'Next level:',
        mfaStatus.nextLevel
      );
      console.log(
        'Requires MFA:',
        mfaStatus.requiresMFA
      );
      console.log('=========================');

      if (mfaStatus.requiresMFA) {
        setIsAuthenticated(false);

        return {
          success: true,
          requiresMFA: true,
          requiresMFASetup: false,
        };
      }

      if (mfaStatus.requiresMFASetup) {
        setIsAuthenticated(false);

        return {
          success: true,
          requiresMFA: false,
          requiresMFASetup: true,
        };
      }

      setIsAuthenticated(true);

      return {
        success: true,
        requiresMFA: false,
        requiresMFASetup: false,
      };

    } catch (error) {
      console.error(
        'Error en login:',
        error
      );

      setSession(null);
      setUser(null);
      setIsAuthenticated(false);
      setMFARequired(false);
      setMFASetupRequired(false);

      throw error;
    }
  };

  const enrollMFA = async () => {
    try {
      const enrollment =
        await authService.enrollMFA();

      return enrollment;

    } catch (error) {
      console.error(
        'Error iniciando configuración MFA:',
        error
      );

      throw error;
    }
  };

  const getMFAFactorId =
    async (): Promise<string> => {
      try {
        const factors =
          await authService.getMFAFactors();

        const verifiedFactor =
          factors.totp.find(
            (factor) =>
              factor.status === 'verified'
          );

        if (!verifiedFactor) {
          throw new Error(
            'No se encontró un factor MFA verificado.'
          );
        }

        return verifiedFactor.id;

      } catch (error) {
        console.error(
          'Error obteniendo factor MFA:',
          error
        );

        throw error;
      }
    };

  const verifyMFA = async (
    factorId: string,
    code: string
  ): Promise<void> => {
    try {
      await authService.verifyMFA(
        factorId,
        code
      );

      const currentSession =
        await authService.getSession();

      if (!currentSession) {
        throw new Error(
          'No se pudo recuperar la sesión.'
        );
      }

      setSession(currentSession);

      const userProfile =
        await loadUserProfile(currentSession);

      setUser(userProfile);

      setMFARequired(false);
      setMFASetupRequired(false);
      setIsAuthenticated(true);

    } catch (error) {
      console.error(
        'Error verificando MFA:',
        error
      );

      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();

      setSession(null);
      setUser(null);
      setIsAuthenticated(false);
      setMFARequired(false);
      setMFASetupRequired(false);

    } catch (error) {
      console.error(
        'Error cerrando sesión:',
        error
      );

      throw error;
    }
  };

  const register = async (
    userData: RegisterData
  ): Promise<{
    success: boolean;
    requiresConfirmation: boolean;
  }> => {
    try {
      const result =
        await authService.register(userData);

      const currentUser = result.user;

      setUser({
        id: currentUser.id,
        name:
          currentUser.user_metadata?.name ||
          currentUser.email?.split('@')[0] ||
          'Paciente Dohi',
        email: currentUser.email || '',
        avatarUrl:
          currentUser.user_metadata?.avatarUrl,
      });

      setSession(result.session);

      const hasSession = !!result.session;

      setIsAuthenticated(false);

      setMFARequired(false);
      setMFASetupRequired(hasSession);

      console.log(
        '========== REGISTRO =========='
      );
      console.log(
        'Usuario creado:',
        currentUser.id
      );
      console.log(
        'Email:',
        currentUser.email
      );
      console.log(
        'Session:',
        result.session
      );
      console.log(
        'Tiene sesión:',
        hasSession
      );
      console.log(
        'MFA requerido:',
        hasSession
      );
      console.log(
        '=============================='
      );

      return {
        success: true,
        requiresConfirmation: !hasSession,
      };

    } catch (error) {
      console.error(
        '========== ERROR REGISTRO =========='
      );
      console.error(error);
      console.error(
        '===================================='
      );

      setSession(null);
      setUser(null);
      setIsAuthenticated(false);
      setMFARequired(false);
      setMFASetupRequired(false);

      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated,
        isLoading,
        mfaRequired,
        mfaSetupRequired,
        login,
        enrollMFA,
        getMFAFactorId,
        verifyMFAEnrollment,
        verifyMFA,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =
  (): AuthContextType => {
    const context =
      useContext(AuthContext);

    if (!context) {
      throw new Error(
        'useAuth debe usarse dentro de un AuthProvider'
      );
    }

    return context;
  };

