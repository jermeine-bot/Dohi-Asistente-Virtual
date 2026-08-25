export type MedicationStatus = 'TOMADO' | 'PENDIENTE' | 'NO TOMADO';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  moment: string; // e.g., 'Desayuno', 'Almuerzo', 'Cena', 'Noche'
  time: string;   // e.g., '08:00 AM', '10:00 AM'
  status: MedicationStatus;
  instructions?: string;
  pillsRemaining?: number;
  durationDays?: number;
  colorHex?: string;
}

export interface DailyMedicationSchedule {
  date: string; // YYYY-MM-DD
  dayName: string; // 'Lun', 'Mar', 'Mié', etc.
  dayNumber: number; // 14, 15, 16
  isToday?: boolean;
  medications: Medication[];
}
