import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Get single article by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const article = await prisma.article.findUnique({
            where: { id },
        });

        if (!article) {
            return NextResponse.json(
                { error: "Articolo non trovato" },
                { status: 404 }
            );
        }

        return NextResponse.json(article);
    } catch (error: any) {
        console.error("Error fetching article:", error);
        return NextResponse.json(
            { error: "Errore durante il recupero dell'articolo" },
            { status: 500 }
        );
    }
}

// DELETE: Delete article by ID
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.article.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting article:", error);
        return NextResponse.json(
            { error: "Errore durante l'eliminazione dell'articolo" },
            { status: 500 }
        );
    }
}

// PUT: Update article by ID
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();

        const article = await prisma.article.update({
            where: { id },
            data: {
                keyPhrase: data.keyPhrase,
                title: data.title,
                description: data.description,
                slug: data.slug,
                htmlContent: data.htmlContent,
                tags: data.tags,
                categories: data.categories,
                socialMediaPost: data.socialMediaPost,
            },
        });

        return NextResponse.json(article);
    } catch (error: any) {
        console.error("Error updating article:", error);
        return NextResponse.json(
            { error: "Errore durante l'aggiornamento dell'articolo" },
            { status: 500 }
        );
    }
}
