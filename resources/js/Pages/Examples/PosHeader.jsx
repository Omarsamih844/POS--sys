import React, { useState } from 'react';
import Header from '@/Components/Pos/Header';

export default function PosHeader() {
    const [orderId] = useState('TEMP-1746451745640');
    const [discounts, setDiscounts] = useState([]);
    const [freeItems, setFreeItems] = useState([]);
    const [actions, setActions] = useState([]);

    const handleCancelOrder = () => {
        addAction('Commande annulée');
    };

    const handleApplyDiscount = (discount) => {
        setDiscounts([...discounts, discount]);
        addAction(`Remise appliquée: ${discount.type === 'percentage' ? 
            `${discount.value}% sur ${discount.target === 'order' ? 'la commande' : "l'article"}` : 
            `${discount.value} MAD sur ${discount.target === 'order' ? 'la commande' : "l'article"}`}`);
    };

    const handleMakeItemFree = (target) => {
        setFreeItems([...freeItems, {target, timestamp: new Date()}]);
        addAction(`${target === 'order' ? 'Commande' : 'Article'} marqué comme gratuit`);
    };

    const addAction = (action) => {
        setActions([
            {
                action,
                timestamp: new Date().toLocaleTimeString()
            },
            ...actions
        ]);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header 
                orderId={orderId}
                onCancelOrder={handleCancelOrder}
                onApplyDiscount={handleApplyDiscount}
                onMakeItemFree={handleMakeItemFree}
            />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Cart example */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold mb-4">Panier</h2>
                            <div className="border rounded p-4">
                                <div className="flex justify-between items-center p-2 border-b">
                                    <div>
                                        <span className="font-semibold">Grilled Salmon</span>
                                        <div className="text-sm text-gray-600">75.00 MAD x 1</div>
                                    </div>
                                    <div className="text-lg font-semibold">75.00 MAD</div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Sous-total</span>
                                        <span>75.00 MAD</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>TVA (20%)</span>
                                        <span>15.00 MAD</span>
                                    </div>
                                    
                                    {discounts.map((discount, index) => (
                                        <div key={index} className="flex justify-between text-sm text-green-600 mb-1">
                                            <span>Remise {discount.type === 'percentage' ? `${discount.value}%` : `${discount.value} MAD`}</span>
                                            <span>-{discount.type === 'percentage' ? (75 * discount.value / 100).toFixed(2) : discount.value} MAD</span>
                                        </div>
                                    ))}
                                    
                                    {freeItems.length > 0 && (
                                        <div className="flex justify-between text-sm text-green-600 mb-1">
                                            <span>Article Gratuit</span>
                                            <span>-75.00 MAD</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t">
                                        <span>Total</span>
                                        <span>90.00 MAD</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action log */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Journal d'Actions</h2>
                            <div className="border rounded divide-y">
                                {actions.length > 0 ? (
                                    actions.map((action, index) => (
                                        <div key={index} className="p-3 flex justify-between">
                                            <span>{action.action}</span>
                                            <span className="text-gray-500 text-sm">{action.timestamp}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-gray-500 text-center">
                                        Aucune action effectuée. Utilisez les boutons dans la barre d'en-tête pour interagir.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 