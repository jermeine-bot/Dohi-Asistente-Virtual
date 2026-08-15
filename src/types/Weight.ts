export type IMCCategory = 'Bajo Peso' | 'Peso Normal' | 'Sobrepeso' | 'Obesidad';

export interface WeightRecord {
  id: string;
  date: string;
  weightKg: number;
  heightCm: number;
  imc: number;
  category: IMCCategory;
  notes?: string;
}

export interface WeightStats {
  currentWeight: number;
  initialWeight: number;
  targetWeight: number;
  currentIMC: number;
  imcCategory: IMCCategory;
  heightCm: number;
  history: WeightRecord[];
}
