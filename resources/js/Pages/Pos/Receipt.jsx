import React from 'react';
import { jsPDF } from 'jspdf';

const Receipt = () => {
    const generateReceipt = (order) => {
        try {
            console.log("Starting receipt generation with order:", order);
            
            // Basic thermal-style receipt (small width)
            const width = 198.45; // 7cm in points
            const height = 250.45; // Increased height to prevent overflow
            
            console.log("Creating PDF document with dimensions:", width, "x", height);
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: [width, height]
            });
            
            // Use monospace courier font only
            console.log("Setting font to courier");
            doc.setFont('courier', 'normal');
            doc.setFontSize(8);
            
            let y = 15;
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 15; // Keep same margins
            const lineHeight = 15; // Increased line height to prevent text overlap

            // Different header for kitchen tickets
            if (order.isKitchenTicket) {
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(order.header || 'TICKET DE CUISINE', pageWidth / 2, y, { align: 'center' });
                
                y += lineHeight + 5;
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text(`Commande #: ${order.id}`, margin, y);
                
                y += lineHeight;
                const orderType = order.type === 'eat_in' ? 'Sur place' : 
                                order.type === 'takeaway' ? 'À emporter' : 
                                order.type === 'delivery' ? 'Livraison' : order.type;
                doc.text(`Type: ${orderType}`, margin, y);
                
                if (order.table_number) {
                    const tableWidth = doc.getTextWidth(`Table: ${order.table_number}`);
                    doc.text(`Table: ${order.table_number}`, pageWidth - margin - tableWidth, y);
                }
                
                y += lineHeight;
                doc.text(`Date: ${order.timestamp}`, margin, y);
                
                if (order.notes) {
                    y += lineHeight;
                    doc.setFont('helvetica', 'bold');
                    doc.text('Notes:', margin, y);
                    y += lineHeight;
                    doc.setFont('helvetica', 'normal');
                    // Split notes into multiple lines if needed
                    const notesLines = doc.splitTextToSize(order.notes, pageWidth - 2 * margin);
                    notesLines.forEach(line => {
                        doc.text(line, margin, y);
                        y += lineHeight;
                    });
                }

                // Divider
                y += lineHeight;
                doc.setDrawColor(0, 0, 0);
                doc.line(margin, y, pageWidth - margin, y);
                y += lineHeight;

                // Items Table Header
                doc.setFont('helvetica', 'bold');
                doc.setFillColor(0, 0, 0);
                doc.setTextColor(255, 255, 255);
                doc.rect(margin, y - 10, pageWidth - (2 * margin), 15, 'F');
                
                const colPositions = [
                    margin + 2,                                 // Item start
                    margin + (pageWidth - 2 * margin) * 0.55,   // Qty start
                    margin + (pageWidth - 2 * margin) * 0.70    // Notes start
                ];
                
                doc.setFontSize(8);
                doc.text('Article', colPositions[0], y);
                doc.text('Qté', colPositions[1], y);
                doc.text('Notes', colPositions[2], y);

                // Items Table Body
                y += lineHeight;
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                
                if (order.items && Array.isArray(order.items)) {
                    order.items.forEach((item, index) => {
                        if (index > 0) {
                            doc.setDrawColor(200, 200, 200);
                            doc.line(margin, y - 5, pageWidth - margin, y - 5);
                            y += 2;
                        }
                        
                        // Item name and quantity
                        doc.text(`${item.quantity}x ${item.name}`, colPositions[0], y);
                        
                        // Customizations
                        if (item.customizations) {
                            const customizations = Object.entries(item.customizations.options || {})
                                .map(([category, selection]) => {
                                    if (Array.isArray(selection)) {
                                        return selection.map(opt => `${opt.name || opt}`).join(', ');
                                    }
                                    return `${selection.name || selection}`;
                                })
                                .join(' | ');
                            
                            if (customizations) {
                                y += lineHeight;
                                doc.setFontSize(7);
                                doc.text(customizations, colPositions[0], y);
                            }
                            
                            if (item.customizations.instructions) {
                                y += lineHeight;
                                doc.setFontStyle('italic');
                                doc.text(item.customizations.instructions, colPositions[0], y);
                                doc.setFontStyle('normal');
                            }
                        }
                        
                        y += lineHeight + 2;
                    });
                }

                // Footer
                y = doc.internal.pageSize.getHeight() - 15;
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.text(order.footer || 'Merci de préparer cette commande', pageWidth / 2, y, { align: 'center' });

                // Save the PDF
                doc.save(`kitchen-ticket-${order.id}.pdf`);
                return;
            }

            // Original customer receipt code below
            // Header
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('BURGER HOUSE', pageWidth / 2, y, { align: 'center' });
            
            console.log("Actual page width:", pageWidth);
            
            // Center the store name
            doc.text('Restaurant', pageWidth / 2, y, { align: 'center' });
            y += lineHeight;
            doc.text('X XXX XXXXXX XXXXXX', pageWidth / 2, y, { align: 'center' });
            y += lineHeight;
            doc.text('CASABLANCA', pageWidth / 2, y, { align: 'center' });
            
            // Draw a line
            y += 5;
            doc.line(margin, y, pageWidth - margin, y);
            y += 8;
            
            // Date and ticket
            const now = new Date();
            const date = now.toLocaleDateString('fr-FR').replace(/\//g, '/');
            const time = now.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});
            doc.text(`${date} ${time}`, margin, y);
            
            console.log("Processing order ID:", order.id);
            // Safely handle the order ID
            let ticketNum = '';
            try {
                ticketNum = `N°${(order.id || '').toString().replace(/[^\d]/g, '').padStart(4, '0')}`;
            } catch (idError) {
                console.error("Error formatting ticket number:", idError);
                ticketNum = 'N°0000'; // Fallback
            }
            
            doc.text(ticketNum, pageWidth - margin - doc.getTextWidth(ticketNum), y);
            // Draw a line
            y += 5;
            doc.line(margin, y, pageWidth - margin, y);
            y += 8;
            
            // Column headers
            doc.text('ARTICLE', margin, y);
            doc.text('PRIX', pageWidth - margin - doc.getTextWidth('PRIX'), y);
            y += 5;
            doc.line(margin, y, pageWidth - margin, y);
            y += 8;
            
            // Items
            console.log("Processing items:", order.items);
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach((item, index) => {
                    try {
                        // Basic product name
                        const name = item.name ? item.name.toUpperCase().substring(0, 20) : `ITEM ${index+1}`;
                        doc.text(name, margin, y);
                        
                        // Price - handle potential missing unit_price
                        const unitPrice = item.unit_price || 0;
                        const quantity = item.quantity || 1;
                        const price = `${(unitPrice * quantity).toFixed(2)}`;
                        
                        doc.text(price, pageWidth - margin - doc.getTextWidth(price), y);
                        y += lineHeight;
                    } catch (itemError) {
                        console.error("Error processing item:", item, itemError);
                    }
                });
            } else {
                console.warn("No items array found in order or items is not an array");
            }
            
            // Draw a line
            y += 2;
            doc.line(margin, y, pageWidth - margin, y);
            y += 8;
            
            // Totals - handle potential missing values
            doc.text('TOTAL', margin, y);
            const total = order.total || 0;
            const totalText = `${total.toFixed(2)}`;
            doc.text(totalText, pageWidth - margin - doc.getTextWidth(totalText), y);
            
            y += lineHeight;
            doc.text('TIMBRE', margin, y);
            const stampText = '0.15';
            doc.text(stampText, pageWidth - margin - doc.getTextWidth(stampText), y);
            
            y += lineHeight;
            doc.text('TOTAL TTC', margin, y);
            const ttcText = `${(total + 0.15).toFixed(2)}`;
            doc.text(ttcText, pageWidth - margin - doc.getTextWidth(ttcText), y);
            
            y += lineHeight;
            doc.text('TVA', margin, y);
            const tax = order.tax || 0;
            const vatText = `${tax.toFixed(2)}`;
            doc.text(vatText, pageWidth - margin - doc.getTextWidth(vatText), y);
            
            // Draw a line
            y += 5;
            doc.line(margin, y, pageWidth - margin, y);
            y += 8;
            
            // Payment method
            try {
                const paymentMethod = order.payment && order.payment.method ? order.payment.method : 'cash';
                const methodText = paymentMethod === 'card' ? 'CARTE BANCAIRE' : 'ESPECES';
                doc.text(methodText, margin, y);
                
                if (paymentMethod === 'cash') {
                    // Add payment amount and change for cash payments
                    let paymentAmount = 0;
                    try {
                        paymentAmount = order.payment && order.payment.details && order.payment.details.amount ? order.payment.details.amount : 0;
                    } catch (paymentError) {
                        console.error("Error processing payment amount:", paymentError);
                    }
                    
                    const paidText = `${paymentAmount.toFixed(2)}`;
                    doc.text(paidText, pageWidth - margin - doc.getTextWidth(paidText), y);
                    
                    y += lineHeight;
                    doc.text('RENDU', margin, y);
                    const changeText = `${Math.max(0, paymentAmount - (total + 0.15)).toFixed(2)}`;
                    doc.text(changeText, pageWidth - margin - doc.getTextWidth(changeText), y);
                } else {
                    // For card payment, just show the total amount
                    doc.text(ttcText, pageWidth - margin - doc.getTextWidth(ttcText), y);
                }
            } catch (methodError) {
                console.error("Error processing payment method:", methodError);
                // Fallback to just showing cash
                doc.text('ESPECES', margin, y);
                doc.text(ttcText, pageWidth - margin - doc.getTextWidth(ttcText), y);
            }
            
            // Draw a line
            y += 5;
            doc.line(margin, y, pageWidth - margin, y);
            y += 8;
            
            // Footer
            let articleCount = 0;
            try {
                if (order.items && Array.isArray(order.items)) {
                    articleCount = order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
                }
            } catch (countError) {
                console.error("Error calculating article count:", countError);
            }
            
            doc.text(`ARTICLES: ${articleCount}`, margin, y);
            y += lineHeight;
            
            doc.text('MERCI DE VOTRE VISITE', pageWidth / 2, y, { align: 'center' });
            y += lineHeight;
            
            doc.text('ID FISC:1108770', margin, y);
            y += lineHeight * 2;
            
            // Ajout du numéro de série de commande en bas du ticket
            const orderNumber = (order.id || '').toString().replace(/[^\d]/g, '').padStart(4, '0');
            doc.setFontSize(10);
            doc.text(`N° COMMANDE: ${orderNumber}`, pageWidth / 2, y, { align: 'center' });
            doc.setFontSize(8);
            
            // Instead of saving, open the PDF in a new tab
            console.log("Opening PDF in a new tab");
            const pdfOutput = doc.output('datauristring');
            
            // Open in a new tab
            const newWindow = window.open();
            if (newWindow) {
                newWindow.document.write(`
                    <html>
                        <head>
                            <title>Reçu N°${(order.id || '').toString().replace(/[^\d]/g, '').padStart(4, '0')}</title>
                        </head>
                        <body style="margin:0;padding:0;">
                            <embed width="100%" height="100%" src="${pdfOutput}" type="application/pdf" />
                        </body>
                    </html>
                `);
            } else {
                // If popup is blocked, try to download instead
                console.log("Popup blocked, downloading PDF");
                doc.save(`receipt-${order.id || 'unknown'}.pdf`);
                alert("Votre navigateur a bloqué l'ouverture du reçu. Le fichier a été téléchargé à la place.");
            }
            
            console.log("Receipt generation completed successfully");
            return true;
        } catch (error) {
            console.error('Error generating receipt:', error);
            console.error('Error stack:', error.stack);
            alert('Erreur lors de la génération du reçu: ' + error.message);
            return false;
        }
    };

    return { generateReceipt };
};

export default Receipt; 