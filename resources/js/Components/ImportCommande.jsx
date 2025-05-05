import React from 'react';

export default function ImportCommande({ id, onEdit, onPrint, onImport, onCancel, className = '' }) {
    return (
        <div className={`bg-blue-600 text-white p-3 rounded-md shadow-md ${className}`}>
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs text-blue-200">Commande à importer</span>
                    <span className="text-lg font-bold">{id}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={onEdit}
                        className="bg-blue-500 p-2 rounded-md hover:bg-blue-700 transition-colors"
                        title="Éditer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button 
                        onClick={onPrint}
                        className="bg-blue-500 p-2 rounded-md hover:bg-blue-700 transition-colors"
                        title="Imprimer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                    </button>
                    <button 
                        onClick={onImport}
                        className="bg-blue-500 p-2 rounded-md hover:bg-blue-700 transition-colors"
                        title="Importer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                    </button>
                    <button 
                        onClick={onCancel}
                        className="bg-red-500 p-2 rounded-md hover:bg-red-700 transition-colors"
                        title="Annuler"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
} 