import React from 'react';
import { jsPDF } from 'jspdf';
import qrcode from 'qrcode-generator';

const Receipt = () => {
    const generateReceipt = (order) => {
        try {
            console.log("Starting receipt generation with order:", order);
            
            // Basic thermal-style receipt (small width)
            const width = 220; // 7.8cm in points
            const height = 600;
            
            console.log("Creating PDF document with dimensions:", width, "x", height);
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: [width, height]
            });
            
            // Use monospace courier font only
            console.log("Setting font");
            doc.setFont('helvetica', 'normal');
            
            let y = 25;
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 10;
            const lineHeight = 12;
            
            console.log("Actual page width:", pageWidth);
            
            // Add logo placeholder (text based for now)
            doc.setFontSize(14);
            doc.setTextColor(100, 50, 100); // Purple color for the logo
            doc.text('Your logo', pageWidth / 2, y, { align: 'center' });
            
            y += lineHeight * 2;
            
            // Reset text color
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(10);

            
            
            
            // Table info
            const tableInfo = order.table_id ? `Table ${order.table_id}, invités: ${order.guests || 4}` : "Table 2, invités: 4";
            doc.text(tableInfo, pageWidth / 2, y, { align: 'center' });
            y += lineHeight * 1.5;
            
            // Order Number - big and bold
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            const orderNumber = (order.id || '').toString().replace(/[^\d]/g, '').padStart(3, '0');
            doc.text(orderNumber, pageWidth / 2, y, { align: 'center' });
            y += lineHeight * 2.5;
            
            // Reset font
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            
            // Items
            console.log("Processing items:", order.items);
            let subtotal = 0;
            
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach((item, index) => {
                    try {
                        // Quantity at left
                        const quantity = item.quantity || 1;
                        doc.setFont('helvetica', 'bold');
                        doc.text(quantity.toString(), margin, y);
                        
                        // Product name next to quantity
                        const name = item.name || `Item ${index+1}`;
                        doc.text(name, margin + 15, y);
                        
                        // Unit price and total for this item at right
                        const unitPrice = item.unit_price || 0;
                        const itemTotal = unitPrice * quantity;
                        subtotal += itemTotal;
                        
                        // Format with DH suffix
                        const priceText = `${itemTotal.toFixed(2)} DH`;
                        doc.text(priceText, pageWidth - margin, y, { align: 'right' });
                        
                        y += lineHeight;
                        
                        // Add unit price line with indentation
                        doc.setFont('helvetica', 'normal');
                        doc.setFontSize(8);
                        doc.text(`${unitPrice.toFixed(2)} DH / Unité(s)`, margin + 15, y);
                        y += lineHeight;
                    } catch (itemError) {
                        console.error("Error processing item:", item, itemError);
                    }
                });
            } else {
                console.warn("No items array found in order or items is not an array");
                // Fallback demo items
                doc.setFont('helvetica', 'bold');
                doc.text("6", margin, y);
                doc.text("Lunch Maki 18pc", margin + 15, y);
                const maki = 222.12;
                subtotal += maki;
                doc.text(`${maki.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
                y += lineHeight;
                
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                doc.text("37.02 DH / Unité(s)", margin + 15, y);
                y += lineHeight;
                
                doc.setFont('helvetica', 'bold');
                doc.text("1", margin, y);
                doc.text("Schweppes", margin + 15, y);
                const schweppes = 2.64;
                subtotal += schweppes;
                doc.text(`${schweppes.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
                y += lineHeight;
                
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                doc.text("2.64 DH / Unité(s)", margin + 15, y);
                y += lineHeight;
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
            const tax = order.tax || subtotal * 0.2 || 37.46;
            const total = order.total || subtotal + tax || 224.76;
            
            // Format subtotal
            doc.text("Montant hors taxes", margin, y);
            doc.text(`${subtotal.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
            y += lineHeight;
            
            // Add TVA
            doc.text("TVA 20%", margin, y);
            doc.text(`${tax.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
            y += lineHeight * 0.5;
            
            // Draw a separator line
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, y, pageWidth - margin, y, 'S');
            y += lineHeight;
            
            // Total
            doc.setFont('helvetica', 'bold');
            doc.text("TOTAL", margin, y);
            doc.text(`${total.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
            y += lineHeight;
            
            // Payment Method - assume cash
            doc.setFont('helvetica', 'normal');
            doc.text("Espèces", margin, y);
            
            // Get payment amount (assume it's more than total)
            const paidAmount = order.payment?.amount || 250.00;
            doc.text(`${paidAmount.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
            y += lineHeight;
            
            // Change
            doc.text("MONNAIE", margin, y);
            const change = paidAmount - total;
            doc.text(`${change.toFixed(2)} DH`, pageWidth - margin, y, { align: 'right' });
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
            console.log("Opening PDF in a new tab");
            const pdfOutput = doc.output('datauristring');
            
            // Open in a new tab
            const newWindow = window.open();
            if (newWindow) {
                newWindow.document.write(`
                    <html>
                        <head>
                            <title>Reçu N°${orderNumber}</title>
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