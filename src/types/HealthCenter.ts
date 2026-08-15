export type HealthCenterType = 'Hospital' | 'Centro de Salud' | 'Policlínica' | 'Clínica Especializada';

export interface HealthCenter {
  id: string;
  name: string;
  type: HealthCenterType;
  department: 'Managua' | 'León' | 'Granada' | 'Estelí' | 'Matagalpa' | 'Chinandega';
  city: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  openHours: string;
  rating: number;
  isOpen24h: boolean;
  distanceKm: string;
  services: string[];
  imageUrl: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
