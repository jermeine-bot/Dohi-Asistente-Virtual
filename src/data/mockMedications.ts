import { Medication, DailyMedicationSchedule } from '../types/Medication';

export const mockTodayMedications: Medication[] = [
  {
    id: 'med-1',
    name: 'Paracetamol',
    dosage: '500mg',
    moment: 'Desayuno',
    time: '08:00 AM',
    status: 'TOMADO',
    instructions: 'Tomar con abundante agua después de los alimentos.',
    pillsRemaining: 14,
    durationDays: 7,
    colorHex: '#3D82F5',
  },
  {
    id: 'med-2',
    name: 'Ibuprofeno',
    dosage: '600mg',
    moment: 'Media mañana (Desayuno)',
    time: '10:00 AM',
    status: 'PENDIENTE',
    instructions: '1 tableta para reducir inflamación.',
    pillsRemaining: 8,
    durationDays: 5,
    colorHex: '#167FD1',
  },
  {
    id: 'med-3',
    name: 'Omega 3',
    dosage: '1000mg',
    moment: 'Almuerzo',
    time: '02:00 PM',
    status: 'PENDIENTE',
    instructions: 'Cápsula blanda con el almuerzo.',
    pillsRemaining: 30,
    durationDays: 30,
    colorHex: '#10B981',
  },
  {
    id: 'med-4',
    name: 'Vitamina C + Zinc',
    dosage: '500mg',
    moment: 'Cena',
    time: '08:00 PM',
    status: 'PENDIENTE',
    instructions: 'Disolver en un vaso con agua.',
    pillsRemaining: 20,
    durationDays: 20,
    colorHex: '#F59E0B',
  },
];

export const mockWeekSchedules: DailyMedicationSchedule[] = [
  {
    date: '2026-08-11',
    dayName: 'Lun',
    dayNumber: 11,
    medications: [
      { id: 'm1', name: 'Paracetamol', dosage: '500mg', moment: 'Desayuno', time: '08:00 AM', status: 'TOMADO' },
      { id: 'm2', name: 'Ibuprofeno', dosage: '600mg', moment: 'Almuerzo', time: '10:00 AM', status: 'TOMADO' },
      { id: 'm3', name: 'Omega 3', dosage: '1000mg', moment: 'Cena', time: '02:00 PM', status: 'TOMADO' },
    ],
  },
  {
    date: '2026-08-12',
    dayName: 'Mar',
    dayNumber: 12,
    medications: [
      { id: 'm1', name: 'Paracetamol', dosage: '500mg', moment: 'Desayuno', time: '08:00 AM', status: 'TOMADO' },
      { id: 'm2', name: 'Ibuprofeno', dosage: '600mg', moment: 'Almuerzo', time: '10:00 AM', status: 'TOMADO' },
      { id: 'm3', name: 'Omega 3', dosage: '1000mg', moment: 'Cena', time: '02:00 PM', status: 'NO TOMADO' },
    ],
  },
  {
    date: '2026-08-13',
    dayName: 'Mié',
    dayNumber: 13,
    isToday: true,
    medications: mockTodayMedications,
  },
  {
    date: '2026-08-14',
    dayName: 'Jue',
    dayNumber: 14,
    medications: [
      { id: 'm1', name: 'Paracetamol', dosage: '500mg', moment: 'Desayuno', time: '08:00 AM', status: 'PENDIENTE' },
      { id: 'm2', name: 'Ibuprofeno', dosage: '600mg', moment: 'Almuerzo', time: '10:00 AM', status: 'PENDIENTE' },
      { id: 'm3', name: 'Omega 3', dosage: '1000mg', moment: 'Cena', time: '02:00 PM', status: 'PENDIENTE' },
    ],
  },
  {
    date: '2026-08-15',
    dayName: 'Vie',
    dayNumber: 15,
    medications: [
      { id: 'm1', name: 'Paracetamol', dosage: '500mg', moment: 'Desayuno', time: '08:00 AM', status: 'PENDIENTE' },
      { id: 'm2', name: 'Ibuprofeno', dosage: '600mg', moment: 'Almuerzo', time: '10:00 AM', status: 'PENDIENTE' },
      { id: 'm3', name: 'Omega 3', dosage: '1000mg', moment: 'Cena', time: '02:00 PM', status: 'PENDIENTE' },
    ],
  },
  {
    date: '2026-08-16',
    dayName: 'Sáb',
    dayNumber: 16,
    medications: [
      { id: 'm1', name: 'Paracetamol', dosage: '500mg', moment: 'Desayuno', time: '08:00 AM', status: 'PENDIENTE' },
      { id: 'm3', name: 'Omega 3', dosage: '1000mg', moment: 'Cena', time: '02:00 PM', status: 'PENDIENTE' },
    ],
  },
  {
    date: '2026-08-17',
    dayName: 'Dom',
    dayNumber: 17,
    medications: [
      { id: 'm3', name: 'Omega 3', dosage: '1000mg', moment: 'Cena', time: '02:00 PM', status: 'PENDIENTE' },
    ],
  },
];
