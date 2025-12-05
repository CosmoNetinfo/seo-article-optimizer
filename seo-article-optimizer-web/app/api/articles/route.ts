import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: Create a new article
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const article = await prisma.article.create({
            data: {
                keyPhrase: data.keyPhrase,
                title: data.title,
                description: data.description,
                slug: data.slug,
                originalText: data.originalText || "",
                htmlContent: data.htmlContent,
                tags: data.tags,
                categories: data.categories,
                socialMediaPost: data.socialMediaPost,
                seoChecklist: data.seoChecklist,
            },
        });

        return NextResponse.json(article);
    } catch (error: any) {
        console.error("Error creating article:", error);
        return NextResponse.json(
            { error: "Errore durante il salvataggio dell'articolo" },
            { status: 500 }
        );
    }
}

// GET: List all articles with pagination
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";

        const skip = (page - 1) * limit;

        const where = search
            ? {
                OR: [
                    { keyPhrase: { contains: search, mode: "insensitive" as const } },
                    { title: { contains: search, mode: "insensitive" as const } },
                    { tags: { contains: search, mode: "insensitive" as const } },
                ],
            }
            : {};

        const [articles, total] = await Promise.all([
            prisma.article.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
                select: {
                    id: true,
                    createdAt: true,
                    keyPhrase: true,
                    title: true,
                    description: true,
                    slug: true,
                    tags: true,
                    categories: true,
                },
            }),
            prisma.article.count({ where }),
        ]);

        return NextResponse.json({
            articles,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error("Error fetching articles:", error);
        return NextResponse.json(
            { error: "Errore durante il recupero degli articoli" },
            { status: 500 }
        );
    }
}
