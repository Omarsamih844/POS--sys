import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ items = [], total = 0, onRemoveItem }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl p-4 h-full flex flex-col border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-bold">Panier</span>
            <p className="text-sm text-blue-100">Commande en cours</p>
          </div>
        </div>
        <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
          <span className="mr-2 text-blue-100">Articles:</span>
          <span className="text-xl font-bold">{items.length}</span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center h-full text-gray-400"
            >
              <div className="w-32 h-32 mb-6 bg-gray-50 rounded-full flex items-center justify-center shadow-inner">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <motion.p 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-xl font-medium bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"
              >
                Le panier est vide
              </motion.p>
              <p className="text-sm mt-2 text-gray-400">Ajoutez des produits depuis la grille</p>
            </motion.div>
          ) : (
            <div className="space-y-3 px-2">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-4 border border-gray-100 group"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500">{item.price} MAD × {item.quantity}</span>
                        {item.notes && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs">
                            Note
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-blue-600">{(item.price * item.quantity).toFixed(2)} MAD</span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-red-50 rounded-full"
                      >
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="mt-4 bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Sous-total</span>
            <span className="font-medium">{total.toFixed(2)} MAD</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>TVA (20%)</span>
            <span className="font-medium">{(total * 0.2).toFixed(2)} MAD</span>
          </div>
          <div className="h-px bg-gray-100"></div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Total</span>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">{(total * 1.2).toFixed(2)}</span>
              <span className="ml-1 text-sm text-gray-400">MAD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 