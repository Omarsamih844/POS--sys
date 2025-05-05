import React, { useState } from 'react';
import ActionBar from '@/Components/ActionBar';
import ImportCommande from '@/Components/ImportCommande';

export default function FunctionalityDemo() {
    const [ticketEnabled, setTicketEnabled] = useState(false);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [gratuitApplied, setGratuitApplied] = useState(false);
    const [commandeId] = useState('TEMP-1746452073954');

    // Action handlers
    const handleTicketToggle = (isEnabled) => {
        setTicketEnabled(isEnabled);
        console.log(`Ticket is now ${isEnabled ? 'enabled' : 'disabled'}`);
    };

    const handleRemiseClick = () => {
        setDiscountApplied(!discountApplied);
        console.log('Remise button clicked');
    };

    const handleGratuitClick = () => {
        setGratuitApplied(!gratuitApplied);
        console.log('Gratuit button clicked');
    };

    const handleEdit = () => {
        console.log('Edit commande clicked');
    };

    const handlePrint = () => {
        console.log('Print commande clicked');
    };

    const handleImport = () => {
        console.log('Import commande clicked');
    };

    const handleCancel = () => {
        console.log('Cancel commande clicked');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Functionality Demo</h1>
                
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">ActionBar Component</h2>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <ActionBar 
                            onTicketToggle={handleTicketToggle}
                            onRemiseClick={handleRemiseClick}
                            onGratuitClick={handleGratuitClick}
                            initialTicketState={ticketEnabled}
                        />
                        
                        {/* Status display */}
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                            <p><strong>Status:</strong></p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>Ticket: {ticketEnabled ? 'Enabled (On)' : 'Disabled (Off)'}</li>
                                <li>Remise: {discountApplied ? 'Applied' : 'Not applied'}</li>
                                <li>Gratuit: {gratuitApplied ? 'Applied' : 'Not applied'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">ImportCommande Component</h2>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <ImportCommande 
                            id={commandeId}
                            onEdit={handleEdit}
                            onPrint={handlePrint}
                            onImport={handleImport}
                            onCancel={handleCancel}
                        />
                        
                        {/* Action log */}
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                            <p><strong>Actions:</strong></p>
                            <p className="text-sm text-gray-600 mt-2">Click the buttons above to see logged actions here in a real application.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 