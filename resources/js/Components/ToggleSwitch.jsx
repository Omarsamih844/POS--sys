import React from 'react';

export default function ToggleSwitch({ isOn, onToggle, label }) {
    return (
        <div className="flex items-center">
            {label && (
                <span className="text-sm font-medium text-gray-700 mr-2">{label}</span>
            )}
            <button
                type="button"
                onClick={onToggle}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                    isOn ? 'bg-blue-600' : 'bg-gray-300'
                }`}
            >
                <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                        isOn ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
            <span className="ml-2 text-sm font-medium text-gray-700">
                {isOn ? 'On' : 'Off'}
            </span>
        </div>
    );
} 