import React from 'react';

export default function ActionButton({ 
    children, 
    onClick, 
    className = '',
    variant = 'default', // default, remise, gratuit
    icon = null
}) {
    // Determine styling based on variant
    const getButtonStyle = () => {
        switch(variant) {
            case 'remise':
                return 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50';
            case 'gratuit':
                return 'bg-white border border-green-300 text-green-600 hover:bg-green-50';
            default:
                return 'bg-white border border-blue-300 text-gray-800 hover:bg-gray-50';
        }
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                rounded-md px-4 py-2 text-sm font-medium
                inline-flex items-center justify-center
                shadow-sm transition-colors
                ${getButtonStyle()}
                ${className}
            `}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
} 