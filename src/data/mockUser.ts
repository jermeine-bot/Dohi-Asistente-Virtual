import { User } from '../types/User';

export const mockUser: User = {
  id: 'user-001',
  name: 'Juan Pérez',
  email: 'juan.perez@email.com',
  phone: '+505 8899-7711',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  bloodType: 'O+',
  birthDate: '14 de Mayo, 1994',
  allergies: ['Penicilina', 'Mariscos', 'Polvo'],
  emergencyContact: {
    name: 'María Gómez',
    relationship: 'Esposa',
    phone: '+505 8765-4321',
  },
  unreadNotifications: 2,
};
