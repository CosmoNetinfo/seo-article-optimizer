import { NextRequest, NextResponse } from "next/server";
import { optimizeArticleForSeo } from "@/lib/groq";

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json(
                { error: "Richiesta non valida: il corpo della richiesta deve essere JSON valido" },
                { status: 400 }
            );
        }

        const { articleText, saveToDatabase, customPrompt } = body;

        if (!articleText || typeof articleText !== "string") {
            return NextResponse.json(
                { error: "Testo articolo mancante o non valido" },
                { status: 400 }
            );
        }

        if (articleText.trim().length < 50) {
            return NextResponse.json(
                { error: "L'articolo deve contenere almeno 50 caratteri" },
                { status: 400 }
            );
        }

        // Optimize article with Groq
        let result;
        try {
            result = await optimizeArticleForSeo(articleText, customPrompt);
        } catch (error: any) {
            console.error("Error calling Groq API:", error);

            // Check for specific error types
            if (error.message?.includes("API key")) {
                return NextResponse.json(
                    { error: "Configurazione errata: la chiave API Groq non è valida o mancante. Verifica il file .env.local" },
                    { status: 500 }
                );
            }

            if (error.message?.includes("rate limit")) {
                return NextResponse.json(
                    { error: "Limite di richieste raggiunto. Riprova tra qualche minuto." },
                    { status: 429 }
                );
            }

            return NextResponse.json(
                { error: `Errore durante l'ottimizzazione AI: ${error.message}` },
                { status: 500 }
            );
        }

        // Save to database if requested (optional, won't fail if DB is not configured)
        if (saveToDatabase) {
            try {
                // Dynamic import to avoid loading Prisma if DB is not configured
                const { prisma } = await import("@/lib/prisma");

                const savedArticle = await prisma.article.create({
                    data: {
                        keyPhrase: result.keyPhrase,
                        title: result.title,
                        description: result.description,
                        slug: result.slug,
                        originalText: articleText,
                        htmlContent: result.htmlContent,
                        tags: result.tags,
                        categories: result.categories,
                        socialMediaPost: result.socialMediaPost,
                        seoChecklist: result.seoChecklist as any,
                    },
                });

                return NextResponse.json({
                    ...result,
                    id: savedArticle.id,
                    saved: true,
                });
            } catch (dbError: any) {
                console.error("Database error (non-critical):", dbError);
                // Return result anyway, just without saving to DB
                return NextResponse.json({
                    ...result,
                    saved: false,
                    warning: "Articolo ottimizzato ma non salvato nel database. Verifica la configurazione DATABASE_URL."
                });
            }
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Unexpected error in optimize API:", error);

        // Ensure we always return valid JSON
        return NextResponse.json(
            {
                error: error?.message || "Errore imprevisto durante l'ottimizzazione",
                details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
            },
            { status: 500 }
        );
    }
}
