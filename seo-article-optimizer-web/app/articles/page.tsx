"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Loader } from '@/components/Loader';
import { EyeIcon, SparklesIcon } from '@/components/IconComponents';

interface ArticleSummary {
    id: string;
    createdAt: string;
    keyPhrase: string;
    title: string;
    description: string;
    slug: string;
    tags: string;
}

export default function ArticlesPage() {
    const [articles, setArticles] = useState<ArticleSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchArticles = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '10',
                search: search
            });
            const response = await fetch(`/api/articles?${params}`);
            const data = await response.json();
            setArticles(data.articles);
            setTotalPages(data.pagination.totalPages);
        } catch (error) {
            console.error("Failed to fetch articles", error);
        } finally {
            setIsLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchArticles();
        }, 300); // Debounce search
        return () => clearTimeout(timeoutId);
    }, [fetchArticles]);

    return (
        <div className="bg-slate-900 min-h-screen text-slate-200 font-sans p-4 md:p-8">
            <div className="container mx-auto max-w-5xl">
                <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-3">
                        <SparklesIcon className="w-8 h-8 text-indigo-400" />
                        <h1 className="text-3xl font-bold text-white">Storico Articoli</h1>
                    </div>
                    <Link
                        href="/"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                        Nuovo Articolo
                    </Link>
                </header>

                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Cerca per frase chiave, titolo o tag..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {isLoading ? (
                    <div className="py-12"><Loader /></div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 bg-slate-800/30 rounded-lg border border-slate-800">
                        <p className="text-xl">Nessun articolo trovato.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {articles.map((article) => (
                            <div key={article.id} className="bg-slate-800 p-5 rounded-lg border border-slate-700 hover:border-indigo-500/50 transition-colors">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white mb-2">{article.title}</h2>
                                        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{article.description}</p>
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            <span className="bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded border border-indigo-800">
                                                {article.keyPhrase}
                                            </span>
                                            <span className="text-slate-500 px-2 py-1" suppressHydrationWarning>
                                                {new Date(article.createdAt).toLocaleDateString('it-IT')}
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/articles/${article.id}`}
                                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-white transition-colors"
                                        title="Visualizza Dettagli"
                                    >
                                        <EyeIcon className="w-6 h-6" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-slate-800 rounded disabled:opacity-50 hover:bg-slate-700"
                        >
                            Precedente
                        </button>
                        <span className="px-4 py-2 text-slate-400">
                            Pagina {page} di {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-slate-800 rounded disabled:opacity-50 hover:bg-slate-700"
                        >
                            Successiva
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
