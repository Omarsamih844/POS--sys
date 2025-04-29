import React from 'react';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
    if (!isOpen || !order) return null;

    // Helper function to format date
    const formatDate = (dateString) => {
        try {
            // If the dateString is already in a formatted string (which is likely the case)
            // we'll use it directly, otherwise try to parse it as a Date object
            if (typeof dateString === 'string' && dateString.includes('/')) {
                return dateString; // It's already in the right format like "04/05/2023, 15:30"
            }
            
            // Try to parse as Date object if needed
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                // If date is invalid, return the original string
                return dateString || 'Date non disponible';
            }
            
            return date.toLocaleString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch (e) {
            console.error('Error formatting date:', e);
            return dateString || 'Date non disponible';
        }
    };

    // Helper function to get order type text
    const getOrderTypeText = (type) => {
        switch (type) {
            case 'eat_in': return 'Sur Place';
            case 'takeout': return 'À Emporter';
            case 'delivery': return 'Livraison';
            default: return type;
        }
    };

    // Helper function to get payment method text
    const getPaymentMethodText = (method) => {
        switch (method) {
            case 'cash': return 'Espèces';
            case 'card': return 'Carte bancaire';
            default: return method;
        }
    };

    // Helper function to get status text
    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'En attente';
            case 'paid': return 'Payée';
            case 'cancelled': return 'Annulée';
            default: return status;
        }
    };

    // Helper function to get status badge class
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'paid': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Helper function to safely render customizations
    const renderCustomizations = (customizations) => {
        if (!customizations) return null;
        
        return (
            <div className="text-sm text-gray-600 ml-4">
                {/* Check if customizations.options exists and is an array */}
                {customizations.options && Array.isArray(customizations.options) && (
                    customizations.options.map((option, idx) => (
                        <div key={idx}>• {option}</div>
                    ))
                )}
                
                {/* Handle string options (older format) or direct customization text */}
                {typeof customizations === 'string' && (
                    <div>• {customizations}</div>
                )}
                
                {/* Handle array of strings (older format) */}
                {Array.isArray(customizations) && (
                    customizations.map((option, idx) => (
                        <div key={idx}>• {option}</div>
                    ))
                )}
                
                {/* Check for notes */}
                {customizations.notes && (
                    <div className="italic">Note: {customizations.notes}</div>
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Détails de la commande</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-6">
                    {/* Order Header Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Numéro de commande</h3>
                            <p className="text-lg font-bold">{order.id}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Date</h3>
                            <p className="font-medium">{formatDate(order.timestamp)}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Type</h3>
                            <p className="font-medium">{getOrderTypeText(order.type)}
                                {order.table_number && ` - Table ${order.table_number}`}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Statut</h3>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                                {getStatusText(order.status)}
                            </span>
                        </div>
                        {order.cashier && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Caissier</h3>
                                <p className="font-medium">{order.cashier}</p>
                            </div>
                        )}
                        {order.notes && (
                            <div className="col-span-1 md:col-span-2">
                                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                                <p className="italic text-gray-600">{order.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold mb-3 border-b pb-2">Articles</h3>
                        <div className="space-y-3">
                            {order.items && order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="font-medium">
                                            {item.quantity}x {item.name}
                                        </div>
                                        {item.customizations && renderCustomizations(item.customizations)}
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">{((item.unit_price || 0) * (item.quantity || 1)).toFixed(2)} MAD</div>
                                        <div className="text-xs text-gray-500">{(item.unit_price || 0).toFixed(2)} MAD × {item.quantity || 1}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold mb-3 border-b pb-2">Paiement</h3>
                        {order.payment ? (
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Méthode</span>
                                    <span className="font-medium">{getPaymentMethodText(order.payment.method)}</span>
                                </div>
                                {order.payment.method === 'cash' && order.payment.details && (
                                    <>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Montant reçu</span>
                                            <span className="font-medium">{order.payment.details.amount?.toFixed(2)} MAD</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Monnaie rendue</span>
                                            <span className="font-medium">{Math.max(0, (order.payment.details.amount || 0) - order.total).toFixed(2)} MAD</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">Pas d'informations de paiement disponibles</p>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div>
                        <h3 className="text-base font-semibold mb-3 border-b pb-2">Résumé</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Sous-total</span>
                                <span className="font-medium">{order.subtotal?.toFixed(2)} MAD</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">TVA</span>
                                <span className="font-medium">{order.tax?.toFixed(2)} MAD</span>
                            </div>
                            {order.promotion && (
                                <div className="flex justify-between text-green-600">
                                    <span>Remise</span>
                                    <span className="font-medium">-{order.promotion.discountAmount.toFixed(2)} MAD</span>
                                </div>
                            )}
                            <div className="flex justify-between border-t pt-2 text-lg font-bold">
                                <span>Total</span>
                                <span>{order.total?.toFixed(2)} MAD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal; 