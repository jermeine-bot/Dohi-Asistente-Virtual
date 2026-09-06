import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error(
    'GEMINI_API_KEY no está configurada en el archivo .env',
  );
}

export { GEMINI_API_KEY };