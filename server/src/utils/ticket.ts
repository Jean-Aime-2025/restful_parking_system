import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

// Helper: Generate PDF and return it as a Buffer
const generateTicketPDF = async (names: string, startTime: Date, endTime: Date, slotName: string) => {
    return new Promise<Buffer>((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        const hours = Math.ceil((+endTime - +startTime) / (1000 * 60 * 60));
        const price = hours * 1000;

        doc.fontSize(20).text('Parking Ticket', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Name: ${names}`);
        doc.text(`Slot: ${slotName}`);
        doc.text(`Start Time: ${startTime.toLocaleString()}`);
        doc.text(`End Time: ${endTime.toLocaleString()}`);
        doc.text(`Total Duration: ${hours} hour(s)`);
        doc.text(`Amount to Pay: ₹${price}`);
        doc.end();
    });
};

export default generateTicketPDF;