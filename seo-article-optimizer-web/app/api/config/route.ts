import { NextResponse } from "next/server";

export async function GET() {
    const config = {
        groqApiKey: !!process.env.GROQ_API_KEY,
        databaseUrl: !!process.env.DATABASE_URL,
        geminiApiKey: !!process.env.GOOGLE_GEMINI_API_KEY,
        nodeEnv: process.env.NODE_ENV || "development",
    };

    return NextResponse.json(config);
}
