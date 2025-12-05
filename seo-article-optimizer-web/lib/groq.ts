import Groq from "groq-sdk";

export interface SeoResult {
    keyPhrase: string;
    title: string;
    description: string;
    slug: string;
    htmlContent: string;
    tags: string;
    categories: string;
    socialMediaPost: string;
    seoChecklist: Array<{
        item: string;
        status: string;
        details: string;
    }>;
}

// Initialize Groq client
const getGroqClient = () => {
    const apiKey = process.env.GROQ_API_KEY;
    console.log("[Groq] API Key configured:", !!apiKey, "Length:", apiKey?.length || 0);

    if (!apiKey) {
        console.error("[Groq] GROQ_API_KEY is missing!");
        throw new Error("GROQ_API_KEY is not configured");
    }

    return new Groq({
        apiKey: apiKey,
    });
};

import { DEFAULT_SEO_PROMPT } from "./prompt";

export const optimizeArticleForSeo = async (
    articleText: string,
    customPrompt?: string
): Promise<SeoResult> => {
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
                    content: prompt,
                },
            ],
            temperature: 0.5,
            max_tokens: 8000,
            response_format: { type: "json_object" },
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
                throw new Error(
                    "La chiave API Groq fornita non è valida. Assicurati che sia configurata correttamente."
                );
            }
            if (error.message.includes("rate limit")) {
                throw new Error(
                    "Hai raggiunto il limite di richieste. Riprova tra qualche minuto."
                );
            }
        }
        throw new Error(
            "Si è verificato un errore imprevisto durante la comunicazione con l'IA. Riprova più tardi."
        );
    }
};
