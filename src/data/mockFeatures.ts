import { FeatureItem, QuickAccessItem } from '../types/Feature';

export const mockFeatures: FeatureItem[] = [
  {
    id: 'feat-1',
    title: 'Primeros auxilios',
    subtitle: 'Guía rápida de procedimientos de emergencia.',
    iconName: 'cross',
    route: '/(app)/first-aid',
    backgroundColor: '#EFF6FF',
    iconColor: '#167FD1',
  },
  {
    id: 'feat-2',
    title: 'Asiste a tu cita',
    subtitle: 'Únete a tu cita virtual a través de nuestra plataforma segura de telemedicina.',
    iconName: 'video',
    route: '/(app)/appointment-assistant',
    backgroundColor: '#F0FDF4',
    iconColor: '#16A34A',
  },
  {
    id: 'feat-3',
    title: 'Escáner de Exámenes',
    subtitle: 'Digitaliza y organiza tus resultados de laboratorio y recetas al instante.',
    iconName: 'scan',
    route: '/(app)/scanner',
    backgroundColor: '#FDF4FF',
    iconColor: '#9333EA',
  },
  {
    id: 'feat-4',
    title: 'Control de Peso e IMC',
    subtitle: 'Calcula tu índice de masa corporal y lleva tu historial de evolución.',
    iconName: 'activity',
    route: '/(app)/weight',
    backgroundColor: '#FFFBEB',
    iconColor: '#D97706',
  },
];

export const mockQuickAccess: QuickAccessItem[] = [
  {
    id: 'qa-1',
    title: 'Mis citas',
    iconName: 'calendar',
    route: '/(app)/(tabs)/appointments',
    color: '#167FD1',
    bgColor: '#EAF3FC',
  },
  {
    id: 'qa-2',
    title: 'Puntos de salud',
    iconName: 'map-pin',
    route: '/(app)/health-centers',
    color: '#059669',
    bgColor: '#D1FAE5',
  },
  {
    id: 'qa-3',
    title: 'Mis documentos',
    iconName: 'file-text',
    route: '/(app)/documents',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
  },
  {
    id: 'qa-4',
    title: 'Jornadas',
    iconName: 'calendar',
    route: '/(app)/health-campaigns',
    color: '#0284C7',
    bgColor: '#E0F2FE',
  },
];
