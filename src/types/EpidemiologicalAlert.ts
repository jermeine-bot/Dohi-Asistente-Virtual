export type AlertPriority = 'HIGH' | 'ATTENTION' | 'PREVENTIVE' | 'INFO';

export interface EpidemiologicalAlert {
  id: string;
  title: string;
  summary: string;
  description: string;
  priority: AlertPriority;
  priorityLabel: string;
  department: string;
  municipality?: string; // Opcional si aplica a todo el departamento
  affectedZones: string[]; // Ej: ["Tipitapa", "Mateare", "Distrito III"]
  symptoms: string[];
  preventionSteps: string[];
  updatedAt: string; // Ej: "02 de Septiembre, 2026"
  source: string; // Ej: "MINSA Nicaragua / OPS"
  contactNumber?: string;
  isNotificationActive?: boolean;
}
