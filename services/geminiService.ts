import { GoogleGenAI } from "@google/genai";
import type { AstrologicalData, BirthData } from '../types';

// FIX: Initialize the GoogleGenAI client directly with the environment variable
// as per the coding guidelines. The API key is assumed to be pre-configured.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateAstrologicalReading(astrologicalData: AstrologicalData, birthData: BirthData): Promise<string> {
  const model = 'gemini-2.5-flash';

  const prompt = `
    System: Eres un escritor experto en astrología, conocido por tus interpretaciones empáticas, perspicaces y prácticas. Tu tarea es generar una lectura de carta natal personalizada. Recibirás un JSON con datos de nacimiento, posiciones planetarias, casas, aspectos y un conjunto de "bullets" de un motor de reglas astrológicas. Usa esta información para tejer una narrativa coherente y útil de 300 a 450 palabras.

    **Instrucciones:**
    1.  **Tono:** Empático, alentador y práctico. Evita el fatalismo. Enfócate en el potencial y los consejos accionables.
    2.  **Estructura:** Comienza con una breve introducción para ${birthData.name}. Luego, integra las interpretaciones de los "bullets" en un texto fluido. No listes los bullets; explícalos de forma narrativa. Concluye con un resumen positivo y un consejo práctico.
    3.  **No Inventar:** No inventes posiciones planetarias, aspectos o predicciones que no estén en el JSON proporcionado. Tu análisis debe basarse estrictamente en los datos.
    4.  **Lenguaje Cauteloso:** Si se mencionan temas sensibles como desafíos profesionales (ej. cuadratura Sol-Saturno), enmárcalos como oportunidades de crecimiento. Evita dar consejos médicos, financieros o legales directos. En su lugar, sugiere autoconciencia y, si es necesario, la consulta con profesionales.
    5.  **Formato:** Responde en Markdown. Usa encabezados y negritas para mejorar la legibilidad.

    **Datos de la Persona:**
    - Nombre: ${birthData.name}
    - Fecha de Nacimiento: ${birthData.date}
    - Hora de Nacimiento: ${birthData.time}
    - Lugar: ${birthData.location}

    **Datos Astrológicos (JSON):**
    \`\`\`json
    ${JSON.stringify(astrologicalData, null, 2)}
    \`\`\`

    Ahora, por favor, genera la lectura personalizada para ${birthData.name}.
    `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("El modelo de IA no pudo generar una respuesta. Esto podría deberse a un problema de configuración.");
  }
}