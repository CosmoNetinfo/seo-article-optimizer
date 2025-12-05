"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { ArticleInput } from '@/components/ArticleInput';
import { SeoOutput } from '@/components/SeoOutput';
import { PromptEditor } from '@/components/PromptEditor';
import { SeoResult } from '@/lib/types';
import { SparklesIcon, CogIcon } from '@/components/IconComponents';
import { useRouter } from 'next/navigation';
import { DEFAULT_SEO_PROMPT } from '@/lib/prompt';

export default function Home() {
  const [articleText, setArticleText] = useState<string>('');
  const [seoResult, setSeoResult] = useState<SeoResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPromptEditorOpen, setIsPromptEditorOpen] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>(DEFAULT_SEO_PROMPT);
  const [isSavingPrompt, setIsSavingPrompt] = useState<boolean>(false);
  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(true);
  const router = useRouter();

  // Carica il prompt personalizzato dal database al mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          if (data.customPrompt) {
            setCustomPrompt(data.customPrompt);
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoadingSettings(false);
      }
    };

    loadSettings();
  }, []);

  const handleSavePrompt = useCallback(async (newPrompt: string) => {
    setIsSavingPrompt(true);
    try {
      // Salva nel database
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customPrompt: newPrompt === DEFAULT_SEO_PROMPT ? null : newPrompt
        }),
      });

      if (!response.ok) {
        throw new Error('Errore durante il salvataggio');
      }

      setCustomPrompt(newPrompt);
    } catch (error) {
      console.error('Error saving prompt:', error);
      setError('Errore durante il salvataggio del prompt. Riprova.');
    } finally {
      setIsSavingPrompt(false);
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
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleText,
          customPrompt: customPrompt !== DEFAULT_SEO_PROMPT ? customPrompt : undefined
        }),
      });

      // Try to parse JSON response
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error('Errore del server: risposta non valida. Ricarica la pagina e riprova.');
      }

      if (!response.ok) {
        throw new Error(data.error || `Errore del server (${response.status})`);
      }

      setSeoResult(data);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Si è verificato un errore inaspettato.';
      setError(errorMessage);
      console.error('Optimization error:', e);
    } finally {
      setIsLoading(false);
    }
  }, [articleText, customPrompt]);

  const handleSaveArticle = useCallback(async (finalHtml?: string) => {
    if (!seoResult) return;

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...seoResult,
          htmlContent: finalHtml || seoResult.htmlContent,
          originalText: articleText,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Errore durante il salvataggio');
      }

      // Optional: Show success message or redirect
      // For now, SeoOutput handles the "Saved!" state locally
    } catch (e) {
      console.error("Failed to save article", e);
      setError("Errore durante il salvataggio dell'articolo nel database.");
    }
  }, [seoResult, articleText]);

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
              disabled={isLoadingSettings}
              className={`ml-2 p-2 rounded-lg transition-all duration-200 hover:bg-slate-800 group relative ${isPromptModified ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
                } ${isLoadingSettings ? 'opacity-50 cursor-wait' : ''}`}
              title="Impostazioni Prompt AI"
            >
              <CogIcon className={`w-6 h-6 ${isLoadingSettings ? 'animate-spin' : ''}`} />
              {isPromptModified && !isLoadingSettings && (
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
            onLoadClick={() => router.push('/articles')}
            savedCount={1} // Placeholder to enable button, or fetch real count
          />
          <SeoOutput
            result={seoResult}
            isLoading={isLoading}
            error={error}
            onSave={handleSaveArticle}
          />
        </main>
        <footer className="text-center mt-12 text-slate-500 space-y-2">
          <p>Powered by Groq AI & Neon Database</p>
          <p className="text-sm">
            Creato da <a href="https://cosmonet.info" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">Daniele Spalletti</a> | <a href="https://cosmonet.info" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">CosmoNet.info</a>
          </p>
        </footer>
      </div>

      {/* Prompt Editor Modal */}
      <PromptEditor
        isOpen={isPromptEditorOpen}
        onClose={() => setIsPromptEditorOpen(false)}
        defaultPrompt={DEFAULT_SEO_PROMPT}
        currentPrompt={customPrompt}
        onSave={handleSavePrompt}
        isSaving={isSavingPrompt}
      />
    </div>
  );
}
