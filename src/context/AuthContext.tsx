import React, { createContext, useContext, useState } from 'react';
import { mockUser } from '../data/mockUser';
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
  isAuthenticated: boolean;
  login: (email?: string, password?: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<UserProfile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(mockUser as UserProfile);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const login = async (email?: string, password?: string): Promise<boolean> => {
    // Simulated login delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    if (email) {
      setUser((prev) => ({
        ...(prev || mockUser),
        email: email,
        name: email.split('@')[0].toUpperCase(),
      }));
    } else {
      setUser(mockUser as UserProfile);
    }
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const register = async (userData: Partial<UserProfile>): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: userData.name || 'Paciente Dohi',
      email: userData.email || 'paciente@dohi.health',
      phone: userData.phone || '+505 8888 8888',
      avatarUrl: userData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      gender: userData.gender || 'Femenino',
      age: userData.age || 26,
      location: userData.location || 'Managua, Nicaragua',
      bloodType: userData.bloodType || 'O+',
      unreadNotifications: 2,
    };

    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
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
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
