import React from 'react';

const OfflineIndicator = ({ isOffline }) => {
  if (!isOffline) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 bg-yellow-500 text-white text-center">
      <div className="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a5 5 0 010-7.072m-3.182 3.182a1 1 0 10-1.414-1.414 1 1 0 001.414 1.414z" />
        </svg>
        Mode hors ligne - Les données seront synchronisées lorsque vous serez à nouveau en ligne
      </div>
    </div>
  );
};

export default OfflineIndicator; 