export type HealthCampaignCategory =
  | 'VACUNACION'
  | 'MEDICINA_GENERAL'
  | 'ODONTOLOGIA'
  | 'DENGUE_ABATE'
  | 'PEDIATRIA'
  | 'OFTALMOLOGIA'
  | 'SALUD_MATERNA';

export interface HealthCampaign {
  id: string;
  title: string;
  category: HealthCampaignCategory;
  categoryLabel: string;
  description: string;
  department: string;
  municipality: string;
  neighborhood: string; // Barrio / Comarca
  address: string;
  latitude: number;
  longitude: number;
  startDate: string; // Ej: "2026-09-10"
  endDate: string;   // Ej: "2026-09-12"
  timeSchedule: string; // Ej: "08:00 AM - 03:00 PM"
  services: string[];
  requirements: string[];
  organizer: string; // Ej: "MINSA - SILAIS Managua"
  contactPhone?: string;
  status: 'PROGRAMADA' | 'EN_CURSO' | 'FINALIZADA';
  reminderSet?: boolean;
}
