import { Doctor, Specialty } from './Doctor';

export type AppointmentStatus = 'CONFIRMADA' | 'PENDIENTE' | 'CANCELADA' | 'COMPLETADA';
export type AppointmentType = 'VIRTUAL' | 'PRESENCIAL';

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorAvatar: string;
  specialty: Specialty;
  date: string;       // e.g., "16 de Agosto, 2026"
  time: string;       // e.g., "10:30 AM"
  location: string;   // e.g., "Centro de Salud León - Consultorio 4"
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string;
  meetLink?: string;
}
