import { Request, Response } from 'express';
import {
  generateDohiResponse,
  DohiChatMessage,
} from '../modules/DOHI-AI/services/dohi.services';

export async function chatWithDohi(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({
        success: false,
        message: 'El campo "message" es obligatorio.',
      });
      return;
    }

    const cleanMessage = message.trim();

    if (!cleanMessage) {
      res.status(400).json({
        success: false,
        message: 'El mensaje no puede estar vacío.',
      });
      return;
    }

    const chatHistory: DohiChatMessage[] = Array.isArray(history)
      ? history.filter(
          (item): item is DohiChatMessage =>
            item &&
            (item.role === 'user' || item.role === 'assistant') &&
            typeof item.content === 'string',
        )
      : [];

    const answer = await generateDohiResponse(
      cleanMessage,
      chatHistory,
    );

    res.json({
      success: true,
      message: answer,
    });
  } catch (error) {
    console.error('Error en Dohi:', error);

    res.status(500).json({
      success: false,
      message: 'No fue posible obtener una respuesta de Dohi.',
    });
  }
}