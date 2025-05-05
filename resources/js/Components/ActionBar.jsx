import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import ActionButton from './ActionButton';

export default function ActionBar({
    onTicketToggle,
    onRemiseClick,
    onGratuitClick,
    initialTicketState = false,
    className = '',
}) {
    const [ticketEnabled, setTicketEnabled] = useState(initialTicketState);

    const handleTicketToggle = () => {
        const newState = !ticketEnabled;
        setTicketEnabled(newState);
        if (onTicketToggle) {
            onTicketToggle(newState);
        }
    };

    return (
        <div className={`flex items-center gap-2 p-2 bg-blue-600 text-white rounded-lg shadow-md ${className}`}>
            <div className="flex-1 flex items-center bg-blue-500 rounded-md p-2">
                <ToggleSwitch
                    isOn={ticketEnabled}
                    onToggle={handleTicketToggle}
                    label="Ticket"
                />
            </div>
            <ActionButton 
                variant="remise"
                onClick={onRemiseClick}
                className="flex-1"
            >
                Remise
            </ActionButton>
            <ActionButton 
                variant="gratuit"
                onClick={onGratuitClick}
                className="flex-1"
                icon={<span className="text-lg">+</span>}
            >
                Gratuit
            </ActionButton>
        </div>
    );
} 