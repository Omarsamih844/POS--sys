import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, onComplete, total }) => {
    const [selectedMethod, setSelectedMethod] = useState('cash');
    const [paymentDetails, setPaymentDetails] = useState({
        cash: { amount: total },
        card: {}
    });
    
    // Flag to track if we're starting a new input
    const [startNewInput, setStartNewInput] = useState(true);

    const paymentMethods = [
        {
            id: 'cash',
            name: 'Espèces',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            id: 'card',
            name: 'Carte bancaire',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            )
        }
    ];

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        
        try {
            // Validation des données
            if (!selectedMethod) {
                throw new Error('Veuillez sélectionner un mode de paiement');
            }

            if (selectedMethod === 'cash' && paymentDetails.cash.amount < total) {
                throw new Error('Le montant doit être supérieur ou égal au total');
            }

            const payment = {
                method: selectedMethod,
                details: paymentDetails[selectedMethod],
                total: total
            };

            onComplete(payment);
            onClose();
        } catch (error) {
            alert(error.message);
        }
    };
    
    // Handle numeric keypad input
    const handleNumericInput = (value) => {
        let currentAmount = paymentDetails.cash.amount || 0;
        
        if (value === 'CE') {
            // Clear entry
            currentAmount = 0;
            setStartNewInput(true);
        } else if (value === '⌫') {
            // Backspace - shorten the number
            if (currentAmount.toString().length <= 1) {
                currentAmount = 0;
                setStartNewInput(true);
            } else {
                currentAmount = parseFloat(currentAmount.toString().slice(0, -1));
            }
        } else if (value === '00') {
            if (startNewInput || currentAmount === 0) {
                // If starting a new input, set to 0
                currentAmount = 0;
            } else {
                // Otherwise append 00
                currentAmount = parseFloat(currentAmount.toString() + '00');
            }
            setStartNewInput(false);
        } else {
            // Number input
            if (startNewInput || currentAmount === 0) {
                // Replace with new digit if starting new input
                currentAmount = parseFloat(value);
            } else {
                // Append to existing number
                currentAmount = parseFloat(currentAmount.toString() + value);
            }
            setStartNewInput(false);
        }
        
        setPaymentDetails({
            ...paymentDetails,
            cash: { amount: currentAmount }
        });
    };
    
    // Quick amount buttons
    const handleQuickAmount = (amount) => {
        setPaymentDetails({
            ...paymentDetails,
            cash: { amount: amount }
        });
        setStartNewInput(true);
    };

    const renderPaymentForm = () => {
        switch (selectedMethod) {
            case 'cash':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Montant reçu
                            </label>
                            <input
                                type="number"
                                value={paymentDetails.cash.amount}
                                onChange={(e) => {
                                    const amount = parseFloat(e.target.value) || 0;
                                    setPaymentDetails({
                                        ...paymentDetails,
                                        cash: { amount }
                                    });
                                    setStartNewInput(true);
                                }}
                                onFocus={() => setStartNewInput(true)}
                                className="w-full p-2 border rounded-lg text-xl text-center font-bold"
                                min="0"
                                step="any"
                                required
                            />
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                            Monnaie à rendre : <span className="font-medium">{(paymentDetails.cash.amount - total).toFixed(2)} MAD</span>
                        </div>
                        
                        {/* Quick Amount Buttons */}
                        <div className="grid grid-cols-3 gap-2 mb-2">
                            {[20, 50, 100, 200, 500, 1000].map(amount => (
                                <button
                                    key={amount}
                                    type="button"
                                    onClick={() => handleQuickAmount(amount)}
                                    className="py-2 px-3 border rounded-lg hover:bg-gray-100"
                                >
                                    {amount.toFixed(2)} MAD
                                </button>
                            ))}
                        </div>
                        
                        {/* Numeric Keypad */}
                        <div className="border rounded-lg overflow-hidden">
                            <div className="grid grid-cols-4 gap-0">
                                <div className="col-span-3">
                                    <div className="grid grid-cols-3 gap-0">
                                        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, 'CE', '⌫'].map((num) => (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => handleNumericInput(num.toString())}
                                                className={`p-3 text-xl font-medium hover:bg-gray-100 border-r border-b transition-colors ${
                                                    (num === 'CE') ? 'text-blue-600' : ''
                                                }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <button
                                        type="button"
                                        onClick={() => handleNumericInput('00')}
                                        className="p-3 text-lg font-medium hover:bg-gray-100 border-b transition-colors"
                                    >
                                        00
                                    </button>
                                    <button
                                        type="submit"
                                        className="p-3 text-lg font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors flex-1"
                                    >
                                        Payer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'card':
                return (
                    <div className="space-y-4 py-4">
                        <div className="text-center mb-6">
                            <div className="mb-4">
                                <svg className="mx-auto w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-800">Paiement par carte bancaire</h3>
                            <p className="text-gray-600 mt-2">
                                Montant à payer: <span className="font-bold">{total.toFixed(2)} MAD</span>
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-lg text-white font-medium bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Valider le paiement
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Paiement</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-6">
                    <h3 className="font-medium text-gray-700 mb-2">Montant total: <span className="font-bold text-xl">{total.toFixed(2)} MAD</span></h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {paymentMethods.map((method) => (
                            <button
                                key={method.id}
                                type="button"
                                onClick={() => {
                                    setSelectedMethod(method.id);
                                    if (method.id === 'cash') {
                                        setPaymentDetails({
                                            ...paymentDetails,
                                            cash: { amount: total }
                                        });
                                        setStartNewInput(true);
                                    }
                                }}
                                className={`p-4 rounded-lg border-2 transition-colors ${
                                    selectedMethod === method.id
                                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                                        : 'border-gray-200 hover:border-purple-300'
                                }`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    {method.icon}
                                    <span className="text-sm font-medium">{method.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                        {renderPaymentForm()}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal; 