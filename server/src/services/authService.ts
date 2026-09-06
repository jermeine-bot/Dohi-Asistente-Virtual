import { supabase } from '../config/supabase';
import type { Session, User } from '@supabase/supabase-js';

export type BloodType =
  | 'O+'
  | 'O-'
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+';

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  gender: 'Masculino' | 'Femenino' | 'Otro';
  age: number;
  avatarUrl?: string;
  location: string;
  bloodType: BloodType;
  password: string;
}

export interface LoginResult {
  user: User;
  session: Session;
}

export interface RegisterResult {
  user: User;
  session: Session | null;
}
  export interface MFAStatus {
    currentLevel: 'aal1' | 'aal2' | null;
    nextLevel: 'aal1' | 'aal2' | null;
    requiresMFA: boolean;
    requiresMFASetup: boolean;
  }
  export interface MFAEnrollment {
    id: string;
    qrCode: string;
    secret: string;
    uri: string;
  }

  function normalizeAAL(
  level: string | null
  ): 'aal1' | 'aal2' | null {
    if (level === 'aal1' || level === 'aal2') {
      return level;
    }

    return null;
  }

  export const authService = {
  async login(
    email: string,
    password: string
  ): Promise<LoginResult> {

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user || !data.session) {
      throw new Error(
        'No se pudo obtener la sesión del usuario.'
      );
    }

    return {
      user: data.user,
      session: data.session,
    };
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        name,
        phone,
        gender,
        age,
        avatar_url,
        location,
        blood_type,
        created_at,
        updated_at
      `)
      .eq('id', userId)
      .single();

    if (error) {
      console.error(
        'Error obteniendo perfil:',
        error
      );

      throw new Error(
        `No se pudo obtener el perfil: ${error.message}`
      );
    }

    return data;
  },
  
  async getMFAStatus(): Promise<MFAStatus> {
  const { data, error } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (error) {
    throw new Error(error.message);
  }

  const currentLevel = normalizeAAL(data.currentLevel);
  const nextLevel = normalizeAAL(data.nextLevel);

  const requiresMFASetup =
    currentLevel === 'aal1' &&
    nextLevel === 'aal1';

  const requiresMFA =
    currentLevel === 'aal1' &&
    nextLevel === 'aal2';

  return {
    currentLevel,
    nextLevel,
    requiresMFA,
    requiresMFASetup,
  };
  },

  async enrollMFA(): Promise<MFAEnrollment> {
    const { data, error } =
      await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'DOHI Authenticator',
      });

    if (error) {
      throw new Error(error.message);
    }

    if (
      !data ||
      !data.id ||
      !data.totp
    ) {
      throw new Error(
        'No se pudo iniciar la configuración de MFA.'
      );
    }

    return {
      id: data.id,
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
      uri: data.totp.uri,
    };
  },

  async verifyMFAEnrollment(
    factorId: string,
    code: string
  ): Promise<void> {

    const { data: challenge, error: challengeError } =
      await supabase.auth.mfa.challenge({
        factorId,
      });

    if (challengeError) {
      throw new Error(challengeError.message);
    }

    if (!challenge) {
      throw new Error(
        'No se pudo crear el desafío MFA.'
      );
    }

    const { error: verifyError } =
      await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code: code.trim(),
      });

    if (verifyError) {
      throw new Error(
        'El código de autenticación no es válido.'
      );
    }
  },

  async verifyMFA(
    factorId: string,
    code: string
  ): Promise<void> {

    const { data: challenge, error: challengeError } =
      await supabase.auth.mfa.challenge({
        factorId,
      });

    if (challengeError) {
      throw new Error(challengeError.message);
    }

    if (!challenge) {
      throw new Error(
        'No se pudo crear el desafío MFA.'
      );
    }

    const { error: verifyError } =
      await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code: code.trim(),
      });

    if (verifyError) {
      throw new Error(
        'El código MFA es incorrecto o ha expirado.'
      );
    }
  },

  async getMFAFactors() {

    const { data, error } =
      await supabase.auth.mfa.listFactors();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async register(
    userData: RegisterData
  ): Promise<RegisterResult> {

    const {
      name,
      email,
      phone,
      gender,
      age,
      avatarUrl,
      location,
      bloodType,
      password,
    } = userData;

    const { data, error } =
      await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,

        options: {
          data: {
            name,
            phone,
            gender,
            age,
            avatarUrl,
            location,
            bloodType,
          },
        },
      });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error(
        'No se pudo crear el usuario.'
      );
    }

    return {
      user: data.user,
      session: data.session,
    };
  },

  async logout(): Promise<void> {

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  },

  async getSession(): Promise<Session | null> {

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw new Error(error.message);
    }

    return session;
  },

  async getCurrentUser(): Promise<User | null> {

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error(
        'Error obteniendo usuario actual:',
        error
      );

      return null;
    }

    return user;
  },

  onAuthStateChange(
    callback: (session: Session | null) => void
  ) {

    return supabase.auth.onAuthStateChange(
      (_event, session) => {
        callback(session);
      }
    );
  },
};