export type DocumentType = 'Exámenes' | 'Recetas' | 'Resultados' | 'Historial' | 'Radiografías';

export interface MedicalDocument {
  id: string;
  title: string;
  type: DocumentType;
  date: string;
  doctorName: string;
  facility: string;
  fileSize: string;
  fileFormat: 'PDF' | 'JPG' | 'DICOM';
  downloadUrl?: string;
  status: 'Disponible' | 'Procesando' | 'Requiere Firma';
  summary?: string;
}
