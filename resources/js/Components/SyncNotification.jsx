import React, { useEffect, useState } from 'react';

const SyncNotification = ({ status, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (status !== 'idle') {
      setIsVisible(true);
      
      // Auto-hide success and error notifications after 3 seconds
      if (status === 'success' || status === 'error') {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [status]);

  if (!isVisible || status === 'idle') return null;

  const getStatusStyles = () => {
    switch (status) {
      case 'syncing':
        return 'bg-blue-500';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusMessage = () => {
    if (message) return message;
    
    switch (status) {
      case 'syncing':
        return 'Synchronisation en cours...';
      case 'success':
        return 'Synchronisation réussie';
      case 'error':
        return 'Erreur de synchronisation';
      default:
        return '';
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 p-2 text-center text-white transition-opacity duration-300 ${getStatusStyles()}`}>
      {getStatusMessage()}
    </div>
  );
};

export default SyncNotification; 