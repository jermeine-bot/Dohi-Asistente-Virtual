import { Message } from '../types/Message';

export const initialMockMessages: Message[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: '¡Hola, Juan! Soy Dohi, tu asistente inteligente de salud. ¿Cómo te sientes el día de hoy o en qué puedo orientarte?',
    timestamp: '10:00 AM',
    suggestions: [
      '¿Qué hago si tengo fiebre?',
      'Recordar mis medicamentos',
      'Agendar una cita médica',
      'Consejos para reducir el estrés',
    ],
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Hola Dohi, necesito tu ayuda.',
    timestamp: '10:01 AM',
  },
  {
    id: 'msg-3',
    sender: 'assistant',
    text: '¡Hola Juan! Estoy aquí para acompañarte. Cuéntame con confianza, ¿tienes algún malestar físico o prefieres hablar sobre cómo te sientes anímicamente?',
    timestamp: '10:01 AM',
    suggestions: [
      'Tengo dolor de cabeza leve',
      'Quiero revisar mi próxima dosis',
      'Recomendaciones de primeros auxilios',
    ],
  },
];

export const dohiQuickResponses: Record<string, string> = {
  fiebre: 'Si tienes fiebre mayor a 38°C, mantente hidratado con abundante agua o suero oral, usa ropa ligera y descansa. Si la fiebre supera 39°C o dura más de 48h, consulta de inmediato a un médico o acude al Centro de Salud más cercano.',
  medicamentos: 'Hoy tienes programado Ibuprofeno 600mg a las 10:00 AM y Omega 3 a las 02:00 PM. Ya tomaste tu dosis de Paracetamol de las 08:00 AM. ¡Vas con un 33% de cumplimiento!',
  cita: 'Puedes agendar una cita con nuestros especialistas en segundos desde la sección de Citas. Tenemos disponibilidad en Medicina General, Pediatría, Cardiología y Psicología.',
  estres: 'Para aliviar el estrés te recomiendo la técnica de respiración 4-7-8: inhala en 4 segundos, retén el aire durante 7 segundos y exhala suavemente durante 8 segundos. Repítelo 4 veces.',
  dolor: 'Para dolores leves es importante que descanses la vista, tomes suficiente agua y verifiques si es hora de tu medicación recetada. Si el dolor persiste o empeora intensamente, busca atención médica.',
  default: 'Entiendo perfectamente. Recuerda que siempre puedes acudir a tu centro de salud más cercano o programar una videoconsulta si los síntomas persisten. ¿Deseas que te oriente en algo más?',
};
