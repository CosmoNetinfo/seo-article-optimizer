"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SeoOutput } from '@/components/SeoOutput';
import { Loader } from '@/components/Loader';
import { TrashIcon, ArchiveBoxIcon } from '@/components/IconComponents';
import { SeoResult } from '@/lib/types';

export default function ArticleDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [article, setArticle] = useState<SeoResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchArticle = useCallback(async () => {
        try {
            const response = await fetch(`/api/articles/${params.id}`);
            if (!response.ok) throw new Error('Articolo non trovato');
            const data = await response.json();
            setArticle(data);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Errore nel caricamento');
        } finally {
            setIsLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        if (params.id) {
            fetchArticle();
        }
    }, [params.id, fetchArticle]);

    const handleDelete = async () => {
        if (!confirm('Sei sicuro di voler eliminare questo articolo?')) return;

        try {
            const response = await fetch(`/api/articles/${params.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                router.push('/articles');
            } else {
                alert('Errore durante l\'eliminazione');
            }
        } catch (error) {
            console.error(error);
            alert('Errore durante l\'eliminazione');
        }
    };

    const handleUpdate = async (finalHtml?: string) => {
        if (!article) return;
        try {
            await fetch(`/api/articles/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...article,
                    htmlContent: finalHtml || article.htmlContent
                })
            });
            // Feedback handled by SeoOutput "Saved!" state
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    if (isLoading) return <div className="bg-slate-900 min-h-screen flex items-center justify-center"><Loader /></div>;
    if (error) return <div className="bg-slate-900 min-h-screen flex items-center justify-center text-red-400">{error}</div>;

    return (
        <div className="bg-slate-900 min-h-screen text-slate-200 font-sans p-4 md:p-8">
            <div className="container mx-auto max-w-5xl">
                <header className="flex justify-between items-center mb-8">
                    <Link
                        href="/articles"
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArchiveBoxIcon className="w-5 h-5" />
                        Torna allo Storico
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded-lg border border-red-900/50 transition-colors"
                    >
                        <TrashIcon className="w-5 h-5" />
                        Elimina Articolo
                    </button>
                </header>

                <main>
                    <SeoOutput
                        result={article}
                        isLoading={false}
                        error={null}
                        onSave={handleUpdate}
                    />
                </main>
            </div>
        </div>
    );
}
