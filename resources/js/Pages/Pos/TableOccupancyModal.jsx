import React, { useState, useEffect } from 'react';

export default function TableOccupancyModal({ isOpen, onClose, onSave, tableId, initialPeople = 1, isOccupied = false }) {
    const [numberOfPeople, setNumberOfPeople] = useState(initialPeople);
    const [inputValue, setInputValue] = useState(initialPeople.toString());

    // Reset number of people when opening modal
    useEffect(() => {
        if (isOpen) {
            setNumberOfPeople(initialPeople);
            setInputValue(initialPeople.toString());
        }
    }, [isOpen, initialPeople]);

    if (!isOpen) return null;

    const handleIncrement = () => {
        const newValue = Math.min(numberOfPeople + 1, 20);
        setNumberOfPeople(newValue);
        setInputValue(newValue.toString());
    };

    const handleDecrement = () => {
        const newValue = Math.max(numberOfPeople - 1, 1);
        setNumberOfPeople(newValue);
        setInputValue(newValue.toString());
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        
        // Only update the actual number if the input is a valid number
        if (/^\d+$/.test(value)) {
            const numValue = parseInt(value);
            if (numValue >= 1 && numValue <= 20) {
                setNumberOfPeople(numValue);
            }
        }
    };

    const handleInputBlur = () => {
        // Make sure the input value is valid when leaving the field
        if (!inputValue || !/^\d+$/.test(inputValue) || parseInt(inputValue) < 1) {
            setInputValue('1');
            setNumberOfPeople(1);
        } else if (parseInt(inputValue) > 20) {
            setInputValue('20');
            setNumberOfPeople(20);
        }
    };

    const handleKeyDown = (e) => {
        // Handle Enter key
        if (e.key === 'Enter') {
            handleInputBlur();
            handleSave();
        }
    };

    const handleSave = () => {
        onSave(tableId, numberOfPeople);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const handleCancelOrder = () => {
        onSave(tableId, numberOfPeople, true);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                {isOccupied ? 'Modifier l\'occupation de la table' : 'Réserver la table'}
                            </h3>
                            <div className="mt-4">
                                <div className="mb-4">
                                    <div className={`p-4 rounded-lg mb-4 ${isOccupied ? 'bg-red-100 border border-red-300' : 'bg-green-100 border border-green-300'}`}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-2xl font-bold">Table #{tableId}</span>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {isOccupied 
                                                        ? 'Cette table est actuellement occupée.' 
                                                        : 'Cette table est disponible.'}
                                                </p>
                                            </div>
                                            <div className={`h-12 w-12 rounded-full ${isOccupied ? 'bg-red-400' : 'bg-green-400'} flex items-center justify-center`}>
                                                <span className="text-white text-xl font-bold">
                                                    {isOccupied ? 'O' : 'D'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nombre de personnes
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <button
                                            type="button"
                                            onClick={handleDecrement}
                                            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm font-medium hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onBlur={handleInputBlur}
                                            onKeyDown={handleKeyDown}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-center border-l-0 border-r-0 border-gray-300 sm:text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleIncrement}
                                            className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 text-sm font-medium hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        {isOccupied ? 'Mettre à jour' : 'Réserver la table'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        Annuler
                    </button>
                    {isOccupied && (
                        <button
                            type="button"
                            onClick={handleCancelOrder}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm"
                        >
                            Libérer la table
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
} 