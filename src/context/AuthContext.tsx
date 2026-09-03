import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { Session } from '@supabase/supabase-js';

import { authService } from '@/server/src/services/authService';
import { User } from '../types/User';

export interface UserProfile extends User {
  phone?: string;
  gender?: 'Masculino' | 'Femenino' | 'Otro';
  age?: number | string;
  location?: string;
  bloodType?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: Partial<UserProfile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Inicializar autenticación y comprobar
   * si existe una sesión almacenada.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentSession = await authService.getSession();

        if (currentSession) {
          setSession(currentSession);
          setIsAuthenticated(true);

          const currentUser = currentSession.user;

          setUser({
            id: currentUser.id,
            name:
              currentUser.user_metadata?.name ||
              currentUser.email?.split('@')[0] ||
              'Paciente Dohi',
            email: currentUser.email || '',
            avatarUrl: currentUser.user_metadata?.avatarUrl,
          });
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

    /* Escuchar cambios en la sesión de Supabase */
    const {
      data: { subscription },
    } = authService.onAuthStateChange((newSession) => {
      setSession(newSession);

      if (newSession) {
        const currentUser = newSession.user;

        setUser({
          id: currentUser.id,
          name:
            currentUser.user_metadata?.name ||
            currentUser.email?.split('@')[0] ||
            'Paciente Dohi',
          email: currentUser.email || '',
          avatarUrl: currentUser.user_metadata?.avatarUrl,
        });

        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const result = await authService.login(
        email,
        password
      );

      setSession(result.session);

      const currentUser = result.user;

      setUser({
        id: currentUser.id,
        name:
          currentUser.user_metadata?.name ||
          currentUser.email?.split('@')[0] ||
          'Paciente Dohi',
        email: currentUser.email || '',
        avatarUrl: currentUser.user_metadata?.avatarUrl,
      });

      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error('Error en login:', error);

      setSession(null);
      setUser(null);
      setIsAuthenticated(false);

      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();

      setSession(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      throw error;
    }
  };

  /*
   * Registro.
   */
  const register = async (
    userData: Partial<UserProfile>
  ): Promise<boolean> => {
    console.log('Datos recibidos para registro:', userData);

    // Pendiente de implementar con Supabase.
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth debe usarse dentro de un AuthProvider'
    );
  }

  return context;
};