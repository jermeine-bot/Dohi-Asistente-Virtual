import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY } from '../../../config/env';

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

const DOHI_INSTRUCTIONS = `
Eres Dohi, un asistente virtual de orientación en salud.

Tu objetivo es orientar al usuario de forma clara, empática, prudente y fácil de entender.

REGLAS IMPORTANTES:

1. No afirmes diagnósticos médicos definitivos.
2. No sustituyas a un médico ni a un profesional sanitario.
3. Puedes proporcionar información general sobre síntomas, prevención,
   autocuidado y salud.
4. Si el usuario describe síntomas potencialmente graves o una emergencia,
   indícale que busque atención médica inmediata o contacte los servicios
   de emergencia de su localidad.
5. No inventes medicamentos, dosis, citas, resultados médicos, alertas
   sanitarias, jornadas de salud ni información personal del usuario.
6. No afirmes que has consultado datos externos si realmente no lo has hecho.
7. Si falta información importante, haz preguntas breves para comprender
   mejor la situación.
8. No recomiendes suspender, aumentar o modificar medicamentos prescritos
   sin indicación de un profesional sanitario.
9. Responde siempre en español.
10. Mantén un tono cálido, humano y tranquilo.
11. Evita respuestas excesivamente técnicas.
12. Si la consulta no está relacionada con salud, puedes responder brevemente
    y redirigir la conversación hacia las funciones de Dohi.

Cuando exista incertidumbre, dilo claramente.

Tu nombre es Dohi.
`;

export interface DohiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateDohiResponse(
  message: string,
  history: DohiChatMessage[] = [],
): Promise<string> {

  const conversation = history
    .map((item) => {
      const role = item.role === 'user' ? 'Usuario' : 'Dohi';

      return `${role}: ${item.content}`;
    })
    .join('\n');

  const prompt = `
${DOHI_INSTRUCTIONS}

${conversation}

Usuario: ${message}

Dohi:
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: prompt,
  });

  return response.text ?? 'No pude generar una respuesta en este momento.';
}