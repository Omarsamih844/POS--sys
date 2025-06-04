import React from 'react';

const ServiceTypeModal = ({ isOpen, onClose, onSelect, currentType }) => {
    if (!isOpen) return null;

    const handleSelectType = (type, showTables = false) => {
        if (type === 'eat_in') {
            // For eat_in, show tables selection first
            onSelect(type, true); // The second parameter indicates showing tables temporarily
        } else {
            // For takeout or delivery, proceed with selection
            onSelect(type);
        }
    };

    const serviceTypes = [
        {
            id: 'eat_in',
            name: 'Sur place',
            icon: (
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            id: 'takeout',
            name: 'Emporter',
            icon: (
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        {
            id: 'delivery',
            name: 'Livraison',
            icon: (
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Type de service</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {serviceTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => handleSelectType(type.id)}
                            className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center transition-colors ${
                                currentType === type.id
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:border-blue-300'
                            }`}
                        >
                            {type.icon}
                            <span className="font-medium">{type.name}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Sélectionnez le type de service pour cette commande
                </div>
            </div>
        </div>
    );
};

export default ServiceTypeModal; 