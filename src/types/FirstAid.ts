export interface FirstAidStep {
  stepNumber: number;
  title: string;
  description: string;
  importantNote?: string;
}

export interface FirstAidTopic {
  id: string;
  title: string;
  category: 'Emergencias' | 'Lesiones' | 'Condiciones Comunes' | 'Soporte Vital';
  iconName: string;
  shortDesc: string;
  severity: 'Crítico' | 'Moderado' | 'Leve';
  steps: FirstAidStep[];
  dos: string[];
  donts: string[];
  emergencyContact: string;
}
