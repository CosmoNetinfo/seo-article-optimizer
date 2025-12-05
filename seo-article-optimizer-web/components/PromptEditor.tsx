"use client";

import React, { useState, useEffect } from 'react';
import { XMarkIcon, CogIcon } from './IconComponents';

interface PromptEditorProps {
    isOpen: boolean;
    onClose: () => void;
    defaultPrompt: string;
    currentPrompt: string;
    onSave: (prompt: string) => void;
    isSaving?: boolean;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
    isOpen,
    onClose,
    defaultPrompt,
    currentPrompt,
    onSave,
    isSaving = false,
}) => {
    const [editedPrompt, setEditedPrompt] = useState(currentPrompt);

    useEffect(() => {
        setEditedPrompt(currentPrompt);
    }, [currentPrompt, isOpen]);

    if (!isOpen) return null;

    const handleSave = async () => {
        await onSave(editedPrompt);
        onClose();
    };

    const handleReset = () => {
        setEditedPrompt(defaultPrompt);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && !isSaving) {
            onClose();
        }
    };

    const isModified = editedPrompt !== defaultPrompt;
    const hasChanges = editedPrompt !== currentPrompt;
    const characterCount = editedPrompt.length;

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <CogIcon className="w-6 h-6 text-indigo-400" />
                        <h2 className="text-xl font-semibold text-slate-100">
                            Impostazioni Prompt AI
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={isSaving}
                        className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-700 disabled:opacity-50"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 overflow-hidden flex flex-col gap-4">
                    <p className="text-slate-400 text-sm">
                        Modifica il prompt utilizzato dall'intelligenza artificiale per ottimizzare i tuoi articoli.
                        Il testo <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-400">{'{articleText}'}</code> verrà
                        sostituito con il contenuto dell'articolo.
                        <span className="block mt-1 text-cyan-400">
                            💾 Il prompt viene salvato nel database e sincronizzato su tutti i dispositivi.
                        </span>
                    </p>

                    <div className="flex-1 min-h-0">
                        <textarea
                            value={editedPrompt}
                            onChange={(e) => setEditedPrompt(e.target.value)}
                            disabled={isSaving}
                            className="w-full h-full min-h-[300px] p-4 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-slate-300 resize-none font-mono text-sm disabled:opacity-50"
                            placeholder="Inserisci il prompt per l'AI..."
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">
                            {characterCount.toLocaleString()} caratteri
                            {isModified && (
                                <span className="ml-2 text-amber-400">• Personalizzato</span>
                            )}
                            {hasChanges && (
                                <span className="ml-2 text-cyan-400">• Non salvato</span>
                            )}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-4 border-t border-slate-700 gap-3">
                    <button
                        onClick={handleReset}
                        disabled={!isModified || isSaving}
                        className="px-4 py-2 text-slate-400 hover:text-slate-200 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
                    >
                        Ripristina Default
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={isSaving}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors disabled:opacity-50"
                        >
                            Annulla
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving || !hasChanges}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 text-white font-medium rounded-lg transition-colors shadow-lg shadow-indigo-600/20 disabled:shadow-none min-w-[140px]"
                        >
                            {isSaving ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Salvataggio...
                                </span>
                            ) : (
                                'Salva Modifiche'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
