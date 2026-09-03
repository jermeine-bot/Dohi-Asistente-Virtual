import { supabase } from '../config/supabase';
import type { Session, User } from '@supabase/supabase-js';

export interface LoginResult {
  user: User;
  session: Session;
}

export const authService = {
  async login(
    email: string,
    password: string
  ): Promise<LoginResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user || !data.session) {
      throw new Error('No se pudo obtener la sesión del usuario.');
    }

    return {
      user: data.user,
      session: data.session,
    };
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();

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