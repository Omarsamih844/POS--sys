import React, { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Header({ 
    orderId,
    onCancelOrder,
    onApplyDiscount,
    onMakeItemFree,
    className = '' 
}) {
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [showDiscountModal, setShowDiscountModal] = useState(false);
    const [showFreeItemModal, setShowFreeItemModal] = useState(false);
    const [ticketEnabled, setTicketEnabled] = useState(false);
    const [discountType, setDiscountType] = useState('percentage'); // 'percentage' or 'fixed'
    const [discountValue, setDiscountValue] = useState('');
    const [discountTarget, setDiscountTarget] = useState('order'); // 'order' or 'item'
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleTicketToggle = () => {
        setTicketEnabled(!ticketEnabled);
        setShowTicketModal(false);
    };

    const handleApplyDiscount = () => {
        if (!discountValue || parseFloat(discountValue) <= 0) return;
        
        onApplyDiscount({
            type: discountType,
            value: parseFloat(discountValue),
            target: discountTarget,
            itemId: discountTarget === 'item' ? selectedItemId : null
        });
        
        setShowDiscountModal(false);
        setDiscountValue('');
    };

    const handleMakeItemFree = (target) => {
        onMakeItemFree(target);
        setShowFreeItemModal(false);
    };

    return (
        <div className={`bg-blue-600 text-white p-3 w-full ${className}`}>
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-xl font-bold">Apixel Caisse</h1>
                    <div className="flex space-x-2">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center"
                            onClick={() => {}}
                        >
                            <span className="mr-1">+</span>
                            Nouvelle Commande
                        </button>
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center"
                            onClick={() => {}}
                        >
                            Commandes Actives
                        </button>
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center"
                            onClick={() => {}}
                        >
                            Historique
                        </button>
                    </div>
                </div>
                
                {orderId && (
                    <div className="bg-blue-500 p-3 rounded-md mb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm text-blue-200">Commande sur place</span>
                                <div className="text-lg font-bold">{orderId}</div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setShowTicketModal(true)}
                                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                                >
                                    Ticket {ticketEnabled ? 'On' : 'Off'}
                                </button>
                                <button
                                    onClick={() => setShowDiscountModal(true)}
                                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                                >
                                    Remise
                                </button>
                                <button
                                    onClick={() => setShowFreeItemModal(true)}
                                    className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 flex items-center"
                                >
                                    <span className="mr-1">+</span> Gratuit
                                </button>
                                <button
                                    onClick={onCancelOrder}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Ticket Modal */}
            <Modal show={showTicketModal} onClose={() => setShowTicketModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Préférence Ticket</h2>
                    <p className="mb-4">Voulez-vous activer l'impression du ticket?</p>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => setShowTicketModal(false)}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleTicketToggle}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {ticketEnabled ? 'Désactiver' : 'Activer'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Discount Modal */}
            <Modal show={showDiscountModal} onClose={() => setShowDiscountModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Appliquer une Remise</h2>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Appliquer à:
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="discountTarget"
                                    checked={discountTarget === 'order'}
                                    onChange={() => setDiscountTarget('order')}
                                    className="mr-2"
                                />
                                <span>Commande entière</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="discountTarget"
                                    checked={discountTarget === 'item'}
                                    onChange={() => setDiscountTarget('item')}
                                    className="mr-2"
                                />
                                <span>Article spécifique</span>
                            </label>
                        </div>
                    </div>

                    {discountTarget === 'item' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sélectionner l'article:
                            </label>
                            <select
                                value={selectedItemId || ''}
                                onChange={(e) => setSelectedItemId(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Sélectionner un article...</option>
                                {/* This would be populated with actual cart items */}
                                <option value="1">Grilled Salmon</option>
                            </select>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type de remise:
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="discountType"
                                    checked={discountType === 'percentage'}
                                    onChange={() => setDiscountType('percentage')}
                                    className="mr-2"
                                />
                                <span>Pourcentage (%)</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="discountType"
                                    checked={discountType === 'fixed'}
                                    onChange={() => setDiscountType('fixed')}
                                    className="mr-2"
                                />
                                <span>Montant fixe (MAD)</span>
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {discountType === 'percentage' ? 'Pourcentage de remise' : 'Montant de la remise (MAD)'}:
                        </label>
                        <input
                            type="number"
                            min="0"
                            max={discountType === 'percentage' ? "100" : ""}
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            placeholder={discountType === 'percentage' ? "Ex: 10" : "Ex: 50"}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => setShowDiscountModal(false)}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleApplyDiscount}
                            disabled={!discountValue || parseFloat(discountValue) <= 0}
                            className={`px-4 py-2 rounded ${
                                discountValue && parseFloat(discountValue) > 0
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Appliquer
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Free Item Modal */}
            <Modal show={showFreeItemModal} onClose={() => setShowFreeItemModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Article Gratuit</h2>
                    <p className="mb-4">Que souhaitez-vous rendre gratuit?</p>
                    
                    <div className="flex flex-col space-y-3 mb-4">
                        <button
                            onClick={() => handleMakeItemFree('order')}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Commande entière
                        </button>
                        <button
                            onClick={() => handleMakeItemFree('item')}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Article spécifique
                        </button>
                    </div>
                    
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowFreeItemModal(false)}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
} 