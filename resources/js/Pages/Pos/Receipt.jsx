import React from 'react';
import { jsPDF } from 'jspdf';
import qrcode from 'qrcode-generator';

const Receipt = () => {
    const generateReceipt = (order) => {
        try {
            // Wider thermal-style receipt
            const width = 226.8; // 8cm in points
            const height = 250.45; // Increased height to prevent overflow
            
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: [width, height]
            });
            
            // Use monospace courier font only
            doc.setFont('helvetica', 'normal');
            
            let y = 25;
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
            
            // // Add logo placeholder (text based for now)
            // doc.setFontSize(14);
            // doc.setTextColor(100, 50, 100); // Purple color for the logo
            // doc.text('Your logo', pageWidth / 2, y, { align: 'center' });
            
            y += lineHeight * 2;
            
            // Reset text color
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(10);
            
            // Table info
            const tableInfo = order.table_number ? `Table ${order.table_number}` : "";
            if (tableInfo) {
                doc.text(tableInfo, pageWidth / 2, y, { align: 'center' });
                y += lineHeight * 1.5;
            }
            
            // Order Number - big and bold
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(`Commande #: ${order.id}`, pageWidth / 2, y, { align: 'center' });
            y += lineHeight * 1.5;
            
            // Date and time
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.text(`Date: ${order.timestamp || new Date().toLocaleString()}`, pageWidth / 2, y, { align: 'center' });
            y += lineHeight * 1.5;
            
            // Reset font
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            
            // Add some extra space before the table header
            y += lineHeight;
            
            // Table header
            doc.setFont('helvetica', 'bold');
            doc.text("Article", margin, y);
            doc.text("Qté", pageWidth - margin - 70, y, { align: 'center' });
            doc.text("Prix", pageWidth - margin, y, { align: 'right' });
            y += lineHeight;
            
            // Divider
            doc.setDrawColor(0, 0, 0);
            doc.line(margin, y, pageWidth - margin, y);
            y += lineHeight;
            
            // Items
            let subtotal = 0;
            
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach((item, index) => {
                    try {
                        // Product name
                        doc.setFont('helvetica', 'normal');
                        let name = item.name || `Item ${index+1}`;
                        
                        // Quantity
                        const quantity = item.quantity || 1;
                        
                        // Calculate price after discount
                        const unitPrice = item.unit_price || 0;
                        const itemTotal = unitPrice * quantity;
                        let finalItemPrice = itemTotal;
                        
                        if (item.discount) {
                            if (item.discount.type === 'percentage') {
                                finalItemPrice = itemTotal * (1 - item.discount.value / 100);
                                
                                // Format discount display next to name
                                if (item.discount.value >= 100) {
                                    name = `${name} (GRATUIT)`;
                                    finalItemPrice = 0;
                                } else {
                                    name = `${name} (-${item.discount.value}%)`;
                                }
                            } else if (item.discount.type === 'fixed') {
                                finalItemPrice = Math.max(0, itemTotal - item.discount.amount);
                                name = `${name} (-${item.discount.amount.toFixed(2)} DH)`;
                            }
                        }
                        
                        // Add to subtotal
                        subtotal += finalItemPrice;
                        
                        // Print item details
                        doc.text(name, margin, y);
                        doc.text(quantity.toString(), pageWidth - margin - 70, y, { align: 'center' });
                        
                        // Display price
                        if (item.discount) {
                            if (finalItemPrice === 0) {
                                doc.setTextColor(255, 0, 0);
                                doc.text("0.00 DH", pageWidth - margin, y, { align: 'right' });
                                doc.setTextColor(0, 0, 0);
                            } else {
                                doc.text(`${finalItemPrice.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
                            }
                        } else {
                            doc.text(`${itemTotal.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
                        }
                        
                        y += lineHeight;
                    } catch (itemError) {
                        console.error("Error processing item:", itemError);
                    }
                });
            }
            
            // Draw a separator line
            y += lineHeight * 0.5;
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, y, pageWidth - margin, y, 'S');
            y += lineHeight;
            
            // Reset font for totals
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            
            // Calculate totals
            const tax = order.tax || 0;
            let total = order.total || subtotal + tax;
            
            // Format subtotal
            doc.text("Sous-total", margin, y);
            doc.text(`${subtotal.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
            y += lineHeight;
            
            // Add TVA if applicable
            if (tax > 0) {
                doc.text("TVA", margin, y);
                doc.text(`${tax.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
                y += lineHeight;
            }
            
            // Add order-level discount if present
            if (order.promotion) {
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(255, 0, 0); // Red color for discount
                
                const discountName = order.promotion.name || "Remise";
                const discountAmount = order.promotion.amount || order.promotion.discountAmount || 0;
                
                doc.text(discountName, margin, y);
                doc.text(`-${discountAmount.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
                
                // Reset text color
                doc.setTextColor(0, 0, 0);
                y += lineHeight;
            }
            
            // Draw a separator line
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            doc.line(margin, y, pageWidth - margin, y, 'S');
            y += lineHeight;
            
            // Total
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text("TOTAL", margin, y);
            doc.text(`${total.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
            y += lineHeight * 1.5;
            
            // Payment Method
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const paymentMethod = order.payment?.method === 'cash' ? 'Espèces' : 
                                  order.payment?.method === 'card' ? 'Carte bancaire' : 
                                  order.payment?.method || 'Espèces';
            doc.text(paymentMethod, margin, y);
            
            // Get payment amount
            const paidAmount = order.payment?.amount || total;
            doc.text(`${paidAmount.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
            y += lineHeight;
            
            // Change (only if cash payment and amount > total)
            if (order.payment?.method === 'cash' && paidAmount > total) {
                doc.text("MONNAIE", margin, y);
                const change = paidAmount - total;
                doc.text(`${change.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
                y += lineHeight * 2;
            } else {
                y += lineHeight;
            }
            
            // Thank you message
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(8);
            doc.text("Merci de votre visite!", pageWidth / 2, y, { align: 'center' });
            y += lineHeight * 2;
            
            // Generate QR code
            const qr = qrcode(4, 'L');
            qr.addData('https://ekmrcoding.com/pos/ticket');
            qr.make();
            const imgData = qr.createDataURL(4);
            
            // Add QR code
            const qrSize = 100;
            doc.addImage(imgData, 'PNG', (pageWidth - qrSize) / 2, y, qrSize, qrSize);
            y += qrSize + lineHeight;
            
            // Open the PDF in a new tab
            const pdfOutput = doc.output('datauristring');
            
            // Open in a new tab
            const newWindow = window.open();
            if (newWindow) {
                newWindow.document.write(`
                    <html>
                        <head>
                            <title>Reçu N°${order.id}</title>
                        </head>
                        <body style="margin:0;padding:0;">
                            <embed width="100%" height="100%" src="${pdfOutput}" type="application/pdf" />
                        </body>
                    </html>
                `);
            } else {
                // If popup is blocked, try to download instead
                doc.save(`receipt-${order.id || 'unknown'}.pdf`);
                alert("Votre navigateur a bloqué l'ouverture du reçu. Le fichier a été téléchargé à la place.");
            }
            
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