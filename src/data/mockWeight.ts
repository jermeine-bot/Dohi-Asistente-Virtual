import { WeightStats } from '../types/Weight';

export const mockWeightData: WeightStats = {
  currentWeight: 68.5,
  initialWeight: 74.0,
  targetWeight: 66.0,
  currentIMC: 22.8,
  imcCategory: 'Peso Normal',
  heightCm: 173,
  history: [
    { id: 'w1', date: '10 May', weightKg: 74.0, heightCm: 173, imc: 24.7, category: 'Peso Normal' },
    { id: 'w2', date: '25 May', weightKg: 72.8, heightCm: 173, imc: 24.3, category: 'Peso Normal' },
    { id: 'w3', date: '10 Jun', weightKg: 71.5, heightCm: 173, imc: 23.9, category: 'Peso Normal' },
    { id: 'w4', date: '28 Jun', weightKg: 70.2, heightCm: 173, imc: 23.4, category: 'Peso Normal' },
    { id: 'w5', date: '15 Jul', weightKg: 69.4, heightCm: 173, imc: 23.2, category: 'Peso Normal' },
    { id: 'w6', date: '01 Ago', weightKg: 68.9, heightCm: 173, imc: 23.0, category: 'Peso Normal' },
    { id: 'w7', date: '13 Ago', weightKg: 68.5, heightCm: 173, imc: 22.8, category: 'Peso Normal' },
  ],
};
