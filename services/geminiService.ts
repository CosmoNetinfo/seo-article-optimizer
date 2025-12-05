import Groq from "groq-sdk";
import { SeoResult } from '../types';
import { DEFAULT_SEO_PROMPT } from './prompt';

// Initialize Groq lazily to prevent top-level crashes
let groq: Groq | null = null;

const getGroqClient = () => {
    if (!groq) {
        console.log("DEBUG: Initializing Groq Client. Key available:", !!process.env.GROQ_API_KEY);
        groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
            dangerouslyAllowBrowser: true
        });
    }
    return groq;
};

export const optimizeArticleForSeo = async (articleText: string, customPrompt?: string): Promise<SeoResult> => {
    try {
        const client = getGroqClient();

        // Usa il prompt personalizzato se fornito, altrimenti usa il default
        const promptTemplate = customPrompt || DEFAULT_SEO_PROMPT;
        const prompt = promptTemplate.replace('{articleText}', articleText);

        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.5,
            max_tokens: 8000,
            response_format: { type: "json_object" }
        });

        const jsonText = response.choices[0]?.message?.content?.trim();
        if (!jsonText) {
            throw new Error("Nessuna risposta ricevuta dall'IA");
        }

        const result: SeoResult = JSON.parse(jsonText);
        return result;

    } catch (error) {
        console.error("Error optimizing article with Groq:", error);
        if (error instanceof Error && error.message) {
            if (error.message.includes("API key")) {
                throw new Error("La chiave API Groq fornita non è valida. Assicurati che sia configurata correttamente.");
            }
            if (error.message.includes("rate limit")) {
                throw new Error("Hai raggiunto il limite di richieste. Riprova tra qualche minuto.");
            }
        }
        // Generic fallback error
        throw new Error("Si è verificato un errore imprevisto durante la comunicazione con l'IA. Riprova più tardi.");
    }
};

// Placeholder for image generation - Groq doesn't support image generation
export const generateImage = async (prompt: string): Promise<string> => {
    throw new Error("La generazione di immagini non è al momento supportata con Groq AI. Usa un servizio esterno come DALL-E, Midjourney o Stable Diffusion per generare immagini, poi incolla l'URL.");
};