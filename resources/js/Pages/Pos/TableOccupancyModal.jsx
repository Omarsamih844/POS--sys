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

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

                <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    {isOccupied ? 'Modify Table Occupancy' : 'Set Table Occupancy'}
                                </h3>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500">
                                        {isOccupied 
                                            ? `Table #${tableId} is already occupied. You can modify the number of people or cancel the order.` 
                                            : `Please enter the number of people for Table #${tableId}.`}
                                    </p>
                                    <div className="mt-6 flex flex-col items-center justify-center">
                                        {/* Direct input field */}
                                        <div className="mb-4 w-full max-w-xs">
                                            <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1 text-center">
                                                Number of People (1-20)
                                            </label>
                                            <input
                                                type="text"
                                                id="numberOfPeople"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                                onBlur={handleInputBlur}
                                                onKeyDown={handleKeyDown}
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-center sm:text-lg border-gray-300 rounded-md py-3 font-bold"
                                                placeholder="Enter number"
                                                autoFocus
                                            />
                                        </div>

                                        {/* Plus/minus controls */}
                                        <div className="flex items-center justify-center mt-2">
                                            <button
                                                type="button"
                                                onClick={handleDecrement}
                                                className="rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300"
                                            >
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                </svg>
                                            </button>
                                            <span className="mx-6 w-16 text-center text-2xl font-bold">
                                                {numberOfPeople}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={handleIncrement}
                                                className="rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300"
                                            >
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleSave}
                        >
                            {isOccupied ? 'Update' : 'Confirm'}
                        </button>
                        <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        {isOccupied && (
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-red-300 bg-red-50 px-4 py-2 text-base font-medium text-red-700 shadow-sm hover:bg-red-100 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={() => {
                                    onSave(tableId, numberOfPeople, true);
                                    onClose();
                                }}
                            >
                                Cancel Order
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 