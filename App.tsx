import React, { useState, useCallback, useEffect } from 'react';
import { ArticleInput } from './components/ArticleInput';
import { SeoOutput } from './components/SeoOutput';
import { PromptEditor } from './components/PromptEditor';
import { optimizeArticleForSeo } from './services/geminiService';
import { DEFAULT_SEO_PROMPT } from './services/prompt';
import { SeoResult, SavedSeoResult } from './types';
import { SparklesIcon, CogIcon } from './components/IconComponents';
import { LoadModal } from './components/LoadModal';

const App: React.FC = () => {
    const [articleText, setArticleText] = useState<string>('');
    const [seoResult, setSeoResult] = useState<SeoResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [savedArticles, setSavedArticles] = useState<SavedSeoResult[]>([]);
    const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
    const [isPromptEditorOpen, setIsPromptEditorOpen] = useState(false);
    const [customPrompt, setCustomPrompt] = useState<string>(DEFAULT_SEO_PROMPT);

    const STORAGE_KEY = 'seo-optimizer-saved-articles';
    const PROMPT_STORAGE_KEY = 'seo-optimizer-custom-prompt';

    useEffect(() => {
        try {
            const storedArticles = localStorage.getItem(STORAGE_KEY);
            if (storedArticles) {
                setSavedArticles(JSON.parse(storedArticles));
            }

            // Carica il prompt personalizzato
            const storedPrompt = localStorage.getItem(PROMPT_STORAGE_KEY);
            if (storedPrompt) {
                setCustomPrompt(storedPrompt);
            }
        } catch (error) {
            console.error("Failed to load from localStorage", error);
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const handleSavePrompt = useCallback((newPrompt: string) => {
        setCustomPrompt(newPrompt);
        if (newPrompt === DEFAULT_SEO_PROMPT) {
            localStorage.removeItem(PROMPT_STORAGE_KEY);
        } else {
            localStorage.setItem(PROMPT_STORAGE_KEY, newPrompt);
        }
    }, []);

    const handleOptimize = useCallback(async () => {
        if (!articleText.trim()) {
            setError('Per favore, inserisci il testo dell\'articolo da ottimizzare.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSeoResult(null);

        try {
            // Passa il prompt personalizzato se diverso dal default
            const promptToUse = customPrompt !== DEFAULT_SEO_PROMPT ? customPrompt : undefined;
            const result = await optimizeArticleForSeo(articleText, promptToUse);
            setSeoResult(result);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Si è verificato un errore inaspettato.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [articleText, customPrompt]);

    const handleSaveArticle = useCallback((finalHtml?: string) => {
        if (!seoResult) return;

        const newSavedArticle: SavedSeoResult = {
            ...seoResult,
            htmlContent: finalHtml || seoResult.htmlContent, // Use modified HTML if provided
            id: Date.now().toString(),
            originalArticleText: articleText,
        };

        const updatedArticles = [...savedArticles, newSavedArticle];
        setSavedArticles(updatedArticles);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
    }, [seoResult, articleText, savedArticles]);

    const handleLoadArticle = useCallback((article: SavedSeoResult) => {
        setArticleText(article.originalArticleText);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, originalArticleText, ...resultData } = article;
        setSeoResult(resultData);
        setIsLoadModalOpen(false);
        setError(null);
    }, []);

    const handleDeleteArticle = useCallback((articleId: string) => {
        const updatedArticles = savedArticles.filter(a => a.id !== articleId);
        setSavedArticles(updatedArticles);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
    }, [savedArticles]);

    const isPromptModified = customPrompt !== DEFAULT_SEO_PROMPT;

    return (
        <div className="bg-slate-900 min-h-screen text-slate-200 font-sans">
            <div className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-8 md:mb-12">
                    <div className="flex items-center justify-center gap-3">
                        <SparklesIcon className="w-10 h-10 text-indigo-400" />
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
                            SEO Article Optimizer
                        </h1>
                        <button
                            onClick={() => setIsPromptEditorOpen(true)}
                            className={`ml-2 p-2 rounded-lg transition-all duration-200 hover:bg-slate-800 group relative ${isPromptModified ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
                                }`}
                            title="Impostazioni Prompt AI"
                        >
                            <CogIcon className="w-6 h-6" />
                            {isPromptModified && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full" />
                            )}
                        </button>
                    </div>
                    <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                        Incolla il tuo articolo qui sotto. La nostra IA lo ottimizzerà secondo la checklist SEO di Cosmonet.info e lo strutturerà in HTML pulito.
                        {isPromptModified && (
                            <span className="block mt-2 text-amber-400 text-sm">
                                ⚙️ Prompt AI personalizzato attivo
                            </span>
                        )}
                    </p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ArticleInput
                        value={articleText}
                        onChange={setArticleText}
                        onOptimize={handleOptimize}
                        isLoading={isLoading}
                        onLoadClick={() => setIsLoadModalOpen(true)}
                        savedCount={savedArticles.length}
                    />
                    <SeoOutput
                        result={seoResult}
                        isLoading={isLoading}
                        error={error}
                        onSave={handleSaveArticle}
                    />
                </main>
                <footer className="text-center mt-12 text-slate-500 space-y-2">
                    <p>Powered by Groq AI</p>
                    <p className="text-sm">
                        Creato da <a href="https://cosmonet.info" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">Daniele Spalletti</a> | <a href="https://cosmonet.info" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">CosmoNet.info</a>
                    </p>
                </footer>
            </div>
            <LoadModal
                isOpen={isLoadModalOpen}
                onClose={() => setIsLoadModalOpen(false)}
                articles={savedArticles}
                onLoad={handleLoadArticle}
                onDelete={handleDeleteArticle}
            />
            <PromptEditor
                isOpen={isPromptEditorOpen}
                onClose={() => setIsPromptEditorOpen(false)}
                defaultPrompt={DEFAULT_SEO_PROMPT}
                currentPrompt={customPrompt}
                onSave={handleSavePrompt}
            />
        </div>
    );
};

export default App;