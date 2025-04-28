import React from 'react';
import { motion } from 'framer-motion';

const NumericKeypad = ({ onNumberClick, onClear, onEnter, onBackspace }) => {
  const buttonBaseClass = "relative overflow-hidden flex items-center justify-center text-xl font-semibold rounded-2xl transition-all duration-200 active:scale-95 h-16";
  
  const ButtonWrapper = ({ children, onClick, className }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner p-4">
      <div className="grid grid-cols-4 gap-3">
        {/* Numbers */}
        <ButtonWrapper
          onClick={() => onNumberClick(1)}
          className={`${buttonBaseClass} bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50"></div>
          <span className="relative z-10">1</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={() => onNumberClick(2)}
          className={`${buttonBaseClass} bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50"></div>
          <span className="relative z-10">2</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={() => onNumberClick(3)}
          className={`${buttonBaseClass} bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50"></div>
          <span className="relative z-10">3</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={() => onNumberClick('+')}
          className={`${buttonBaseClass} bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
          <span className="relative z-10 text-2xl">+</span>
        </ButtonWrapper>

        <ButtonWrapper
          onClick={() => onNumberClick(4)}
          className={`${buttonBaseClass} bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50"></div>
          <span className="relative z-10">4</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={() => onNumberClick(5)}
          className={`${buttonBaseClass} bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50"></div>
          <span className="relative z-10">5</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={() => onNumberClick(6)}
          className={`${buttonBaseClass} bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50"></div>
          <span className="relative z-10">6</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={() => onNumberClick('-')}
          className={`${buttonBaseClass} bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
          <span className="relative z-10 text-2xl">-</span>
        </ButtonWrapper>

        <ButtonWrapper
          onClick={() => onNumberClick(7)}
          className={`${buttonBaseClass} bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50"></div>
          <span className="relative z-10">7</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={() => onNumberClick(8)}
          className={`${buttonBaseClass} bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50"></div>
          <span className="relative z-10">8</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={() => onNumberClick(9)}
          className={`${buttonBaseClass} bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50"></div>
          <span className="relative z-10">9</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={onClear}
          className={`${buttonBaseClass} bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
          <span className="relative z-10">C</span>
        </ButtonWrapper>

        <ButtonWrapper
          onClick={() => onNumberClick(0)}
          className={`${buttonBaseClass} bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50"></div>
          <span className="relative z-10">0</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={() => onNumberClick('CE')}
          className={`${buttonBaseClass} bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
          <span className="relative z-10">CE</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={onBackspace}
          className={`${buttonBaseClass} bg-gradient-to-br from-red-100 to-red-200 text-red-800 shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
          <span className="relative z-10">⌫</span>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={onEnter}
          className={`${buttonBaseClass} bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
          <span className="relative z-10 text-2xl">⏎</span>
        </ButtonWrapper>
      </div>
    </div>
  );
};

export default NumericKeypad; 