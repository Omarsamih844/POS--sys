import React, { useState } from 'react';

const DiscountModal = ({ isOpen, onClose, onApply, selectedItem = null, subtotal }) => {
    const [discountType, setDiscountType] = useState('percentage'); // 'percentage' or 'fixed'
    const [discountValue, setDiscountValue] = useState('');
    // Determine target based on whether an item is selected
    const [applyTo, setApplyTo] = useState(selectedItem ? 'item' : 'order');

    // Reset form when modal opens
    React.useEffect(() => {
        if (isOpen) {
            setDiscountType('percentage');
            setDiscountValue('');
            setApplyTo(selectedItem ? 'item' : 'order');
        }
    }, [isOpen, selectedItem]);

    const handleApplyDiscount = () => {
        if (!discountValue || parseFloat(discountValue) <= 0) return;

        const value = parseFloat(discountValue);
        let discountAmount = 0;
        
        if (discountType === 'percentage') {
            // Calculate based on item price or total
            const baseAmount = applyTo === 'item' ? 
                selectedItem.price * selectedItem.quantity : 
                subtotal;
            discountAmount = (baseAmount * value) / 100;
        } else {
            // Fixed amount
            discountAmount = value;
        }

        onApply({
            type: discountType,
            value: value,
            amount: discountAmount,
            target: applyTo,
            itemId: applyTo === 'item' ? selectedItem.product_id : null,
            name: `Remise ${discountType === 'percentage' ? value + '%' : value + ' MAD'} ${applyTo === 'item' ? 'sur article' : 'sur commande'}`
        });
        
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {selectedItem ? "Appliquer une remise sur l'article" : "Appliquer une remise sur la commande"}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Article information or Order information */}
                    {selectedItem ? (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                            <p className="font-medium text-gray-800">Article: {selectedItem.name}</p>
                            <p className="text-sm text-gray-600">Prix unitaire: {selectedItem.price.toFixed(2)} MAD</p>
                            <p className="text-sm text-gray-600">Quantité: {selectedItem.quantity}</p>
                            <p className="text-sm font-medium text-gray-700">Total: {(selectedItem.price * selectedItem.quantity).toFixed(2)} MAD</p>
                        </div>
                    ) : (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                            <p className="font-medium text-gray-800">Remise sur toute la commande</p>
                            <p className="text-sm font-medium text-gray-700">Total de la commande: {subtotal.toFixed(2)} MAD</p>
                        </div>
                    )}

                    {/* Discount Type Selection */}
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

                    {/* Discount Value Input */}
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
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    {/* Preview */}
                    {discountValue && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                            <span className="text-sm font-medium text-blue-800">
                                {discountType === 'percentage' 
                                    ? `Remise de ${discountValue}% ${applyTo === 'item' ? `sur l'article "${selectedItem?.name}"` : 'sur toute la commande'}`
                                    : `Remise de ${discountValue} MAD ${applyTo === 'item' ? `sur l'article "${selectedItem?.name}"` : 'sur toute la commande'}`
                                }
                            </span>
                            {discountValue && parseFloat(discountValue) > 0 && (
                                <div className="mt-2 text-sm text-gray-700">
                                    <p>Montant de la remise: {
                                        discountType === 'percentage' 
                                            ? ((applyTo === 'item' ? selectedItem.price * selectedItem.quantity : subtotal) * parseFloat(discountValue) / 100).toFixed(2)
                                            : Math.min(parseFloat(discountValue), applyTo === 'item' ? selectedItem.price * selectedItem.quantity : subtotal).toFixed(2)
                                    } MAD</p>
                                    <p>Nouveau prix: {
                                        discountType === 'percentage' 
                                            ? ((applyTo === 'item' ? selectedItem.price * selectedItem.quantity : subtotal) * (1 - parseFloat(discountValue) / 100)).toFixed(2)
                                            : Math.max(0, (applyTo === 'item' ? selectedItem.price * selectedItem.quantity : subtotal) - parseFloat(discountValue)).toFixed(2)
                                    } MAD</p>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        onClick={handleApplyDiscount}
                        disabled={!discountValue || parseFloat(discountValue) <= 0}
                        className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                            discountValue && parseFloat(discountValue) > 0
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        Appliquer la remise
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiscountModal; 