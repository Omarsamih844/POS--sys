import React from 'react';
import { jsPDF } from 'jspdf';
import JsBarcode from 'jsbarcode';

const Receipt = () => {
    const generateReceipt = (order) => {
        try {
            console.log("Generating receipt for order:", order);
            
            // Create a new PDF with 7cm width (approximately 198.45 points)
            const width = 198.45; // 7cm in points
            const height = 800; // Increased height to prevent overflow
            
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: [width, height]
            });
            
            let y = 25; // Increased initial y position for better spacing at top
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 15; // Keep same margins
            const lineHeight = 15; // Increased line height to prevent text overlap

            // Header
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('BURGER HOUSE', pageWidth / 2, y, { align: 'center' });
            
            y += lineHeight + 3; // Added extra spacing after header
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.text('123 Main Street, City', pageWidth / 2, y, { align: 'center' });
            y += lineHeight;
            doc.text('Tel: +1234567890', pageWidth / 2, y, { align: 'center' });
            y += lineHeight;
            doc.text('www.burgerhouse.com', pageWidth / 2, y, { align: 'center' });

            // Divider
            y += lineHeight;
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, y, pageWidth - margin, y);

            // Order Information
            y += lineHeight;
            doc.setFontSize(8);
            doc.text(`Commande #: ${order.id}`, margin, y);
            const dateWidth = doc.getTextWidth(`Date: ${order.timestamp}`);
            doc.text(`Date: ${order.timestamp}`, pageWidth - margin - dateWidth, y);
            
            y += lineHeight;
            const orderType = order.type === 'eat_in' ? 'Sur place' : 
                             order.type === 'takeout' ? 'À emporter' : 
                             order.type === 'delivery' ? 'Livraison' : order.type;
            doc.text(`Type: ${orderType}`, margin, y);
            if (order.table_number) {
                const tableWidth = doc.getTextWidth(`Table: ${order.table_number}`);
                doc.text(`Table: ${order.table_number}`, pageWidth - margin - tableWidth, y);
            }
            
            y += lineHeight;
            doc.text(`Caissier: ${order.cashier || 'N/A'}`, margin, y);

            // Items Table Header
            y += lineHeight + 5; // Extra space before table header
            doc.setFont('helvetica', 'bold');
            doc.setFillColor(51, 102, 204);
            doc.setTextColor(255, 255, 255);
            doc.rect(margin, y - 10, pageWidth - (2 * margin), 15, 'F'); // Taller header box
            
            // Calculate column positions - spread them out a bit more
            const colPositions = [
                margin + 2,                                 // Item start
                margin + (pageWidth - 2 * margin) * 0.55,   // Qty start
                margin + (pageWidth - 2 * margin) * 0.70,   // Price start
                margin + (pageWidth - 2 * margin) * 0.85    // Total start
            ];
            
            doc.setFontSize(7);
            doc.text('Article', colPositions[0], y);
            doc.text('Qté', colPositions[1], y);
            doc.text('Prix', colPositions[2], y);
            doc.text('Total', colPositions[3], y);

            // Items Table Body
            y += lineHeight;
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach((item, index) => {
                    if (index > 0) {
                        doc.setDrawColor(200, 200, 200);
                        doc.line(margin, y - 5, pageWidth - margin, y - 5);
                        y += 2; // Add a little extra space after separator line
                    }
                    
                    // Limit item name length to fit
                    const maxNameWidth = colPositions[1] - colPositions[0] - 5;
                    let itemName = item.name;
                    while (doc.getTextWidth(itemName) > maxNameWidth && itemName.length > 3) {
                        itemName = itemName.substring(0, itemName.length - 1);
                    }
                    if (itemName !== item.name) {
                        itemName += '...';
                    }
                    
                    doc.text(itemName, colPositions[0], y);
                    doc.text(item.quantity.toString(), colPositions[1], y);
                    doc.text(`${item.unit_price.toFixed(2)}`, colPositions[2], y);
                    doc.text(`${(item.quantity * item.unit_price).toFixed(2)}`, colPositions[3], y);
                    
                    y += lineHeight + 2; // Added extra line spacing for each item
                });
            } else {
                doc.text("Aucun article", colPositions[0], y);
                y += lineHeight;
            }

            // Draw horizontal line
            y += 5; // Extra space before divider
            doc.setDrawColor(150, 150, 150);
            doc.line(margin, y, pageWidth - margin, y);
            y += lineHeight;

            // Totals section
            doc.setFontSize(8);
            const totalLabelWidth = 60;
            const totalValueX = pageWidth - margin;
            
            // First align all totals labels to the right for better readability
            const alignTotalsLabels = true;
            
            if (alignTotalsLabels) {
                // Sous-total
                doc.text('Sous-total:', totalValueX - totalLabelWidth, y, { align: 'right' });
                doc.text(`${order.subtotal.toFixed(2)} MAD`, totalValueX, y, { align: 'right' });
                
                y += lineHeight;
                // TVA
                doc.text('TVA (20%):', totalValueX - totalLabelWidth, y, { align: 'right' });
                doc.text(`${order.tax.toFixed(2)} MAD`, totalValueX, y, { align: 'right' });
                
                if (order.type === 'delivery') {
                    y += lineHeight;
                    // Frais de livraison
                    doc.text('Frais de livraison (10%):', totalValueX - totalLabelWidth, y, { align: 'right' });
                    const deliveryFee = order.subtotal * 0.1;
                    doc.text(`${deliveryFee.toFixed(2)} MAD`, totalValueX, y, { align: 'right' });
                }
                
                // Add promotion if exists
                if (order.promotion && order.promotion.discountAmount) {
                    y += lineHeight;
                    doc.setTextColor(0, 150, 0); // Green color for discount
                    doc.text(`Promotion:`, totalValueX - totalLabelWidth, y, { align: 'right' });
                    doc.text(`-${order.promotion.discountAmount.toFixed(2)} MAD`, totalValueX, y, { align: 'right' });
                    doc.setTextColor(0, 0, 0); // Reset color
                }
                
                y += lineHeight + 3; // Extra space before total
                // TOTAL
                doc.setFont('helvetica', 'bold');
                doc.text('TOTAL:', totalValueX - totalLabelWidth, y, { align: 'right' });
                doc.text(`${order.total.toFixed(2)} MAD`, totalValueX, y, { align: 'right' });
            } else {
                // Original alignment code in case you want to revert
                doc.text('Sous-total:', totalValueX - totalLabelWidth, y);
                doc.text(`${order.subtotal.toFixed(2)} MAD`, totalValueX, y, { align: 'right' });
                
                y += lineHeight;
                doc.text('TVA (20%):', totalValueX - totalLabelWidth, y);
                doc.text(`${order.tax.toFixed(2)} MAD`, totalValueX, y, { align: 'right' });
                
                if (order.type === 'delivery') {
                    y += lineHeight;
                    doc.text('Frais de livraison (10%):', totalValueX - totalLabelWidth, y);
                    const deliveryFee = order.subtotal * 0.1;
                    doc.text(`${deliveryFee.toFixed(2)} MAD`, totalValueX, y, { align: 'right' });
                }
                
                // Add promotion if exists
                if (order.promotion && order.promotion.discountAmount) {
                    y += lineHeight;
                    doc.setTextColor(0, 150, 0); // Green color for discount
                    doc.text(`Promotion: ${order.promotion.name || 'Réduction'}`, totalValueX - totalLabelWidth, y);
                    doc.text(`-${order.promotion.discountAmount.toFixed(2)} MAD`, totalValueX, y, { align: 'right' });
                    doc.setTextColor(0, 0, 0); // Reset color
                }
                
                y += lineHeight;
                doc.setFont('helvetica', 'bold');
                doc.text('TOTAL:', totalValueX - totalLabelWidth, y);
                doc.text(`${order.total.toFixed(2)} MAD`, totalValueX, y, { align: 'right' });
            }

            // Draw horizontal line separator
            y += lineHeight + 5;
            doc.setDrawColor(150, 150, 150);
            doc.line(margin, y, pageWidth - margin, y);
            y += lineHeight + 5;

            // Payment Information - Enhanced section
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.text('INFORMATIONS DE PAIEMENT', pageWidth / 2, y, { align: 'center' });
            y += lineHeight + 2;
            
            // Type of command in French
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            const orderTypeInFrench = order.type === 'eat_in' ? 'Sur place' : 
                                     order.type === 'takeout' ? 'À emporter' : 
                                     order.type === 'delivery' ? 'Livraison' : order.type;
            doc.text(`Type de commande:`, margin, y);
            doc.setFont('helvetica', 'bold');
            doc.text(orderTypeInFrench, margin + 85, y);
            y += lineHeight;
            
            // Payment method
            doc.setFont('helvetica', 'normal');
            const paymentMethod = order.payment.method === 'cash' ? 'Espèces' : 
                                order.payment.method === 'card' ? 'Carte bancaire' : 
                                order.payment.method === 'mobile' ? 'Paiement mobile' : 
                                order.payment.method;
            doc.text(`Mode de paiement:`, margin, y);
            doc.setFont('helvetica', 'bold');
            doc.text(paymentMethod, margin + 85, y);
            y += lineHeight;

            // Payment amount
            doc.setFont('helvetica', 'normal');
            doc.text(`Montant reçu:`, margin, y);
            doc.setFont('helvetica', 'bold');
            doc.text(`${order.payment.amount.toFixed(2)} MAD`, margin + 85, y);
            y += lineHeight;
            
            // Order total
            doc.setFont('helvetica', 'normal');
            doc.text(`Montant total:`, margin, y);
            doc.setFont('helvetica', 'bold');
            doc.text(`${order.total.toFixed(2)} MAD`, margin + 85, y);
            y += lineHeight;
            
            // Calculate change
            const change = Math.max(0, order.payment.amount - order.total);
            if (change > 0) {
                doc.setFont('helvetica', 'normal');
                doc.text(`Monnaie rendue:`, margin, y);
                doc.setFont('helvetica', 'bold');
                doc.text(`${change.toFixed(2)} MAD`, margin + 85, y);
                y += lineHeight;
            }

            // Barcode
            y += lineHeight + 10; // More space before barcode
            const canvas = document.createElement('canvas');
            JsBarcode(canvas, order.id, {
                format: 'CODE128',
                width: 1.5,
                height: 30,
                displayValue: true,
                fontSize: 8,
                font: 'Arial',
                textMargin: 2,
                background: '#FFFFFF',
                lineColor: '#000000',
                margin: 0
            });

            const barcodeWidth = pageWidth - (margin * 2);
            const barcodeX = margin;
            doc.addImage(canvas.toDataURL(), 'PNG', barcodeX, y, barcodeWidth, 25);

            // Thank you message
            y += 50; // More space after barcode
            doc.setFontSize(8);
            doc.text('Merci de votre visite !', pageWidth / 2, y, { align: 'center' });
            y += lineHeight;
            doc.setFontSize(7);
            doc.text('À bientôt', pageWidth / 2, y, { align: 'center' });

            // Footer
            y = doc.internal.pageSize.getHeight() - 15;
            doc.setFontSize(6);
            doc.setTextColor(128, 128, 128);
            doc.text('www.burgerhouse.com', pageWidth / 2, y, { align: 'center' });

            // Save the PDF
            doc.save(`receipt-${order.id}.pdf`);
            console.log('Receipt generated successfully');
        } catch (error) {
            console.error('Error generating receipt:', error);
            alert('Erreur lors de la génération du reçu: ' + error.message);
        }
    };

    return { generateReceipt };
};

export default Receipt; 