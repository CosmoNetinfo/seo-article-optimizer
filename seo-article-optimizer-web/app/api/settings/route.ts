import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SETTINGS_ID = "global";

// GET - Recupera le impostazioni
export async function GET() {
    try {
        const settings = await prisma.settings.findUnique({
            where: { id: SETTINGS_ID }
        });

        return NextResponse.json({
            customPrompt: settings?.customPrompt || null
        });
    } catch (error: any) {
        console.error("Error fetching settings:", error);
        return NextResponse.json(
            { error: "Errore durante il recupero delle impostazioni" },
            { status: 500 }
        );
    }
}

// PUT - Aggiorna le impostazioni
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { customPrompt } = body;

        const settings = await prisma.settings.upsert({
            where: { id: SETTINGS_ID },
            update: {
                customPrompt: customPrompt || null
            },
            create: {
                id: SETTINGS_ID,
                customPrompt: customPrompt || null
            }
        });

        return NextResponse.json({
            customPrompt: settings.customPrompt,
            saved: true
        });
    } catch (error: any) {
        console.error("Error saving settings:", error);
        return NextResponse.json(
            { error: "Errore durante il salvataggio delle impostazioni" },
            { status: 500 }
        );
    }
}
