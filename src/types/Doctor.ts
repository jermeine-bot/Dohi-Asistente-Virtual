export type Specialty = 
  | 'Medicina General'
  | 'Pediatría'
  | 'Cardiología'
  | 'Dermatología'
  | 'Ginecología'
  | 'Nutrición'
  | 'Psicología'
  | 'Oftalmología';

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  avatarUrl: string;
  clinic: string;
  consultationFee: string;
  about: string;
  availableDays: string[];
  availableSlots: string[];
}
