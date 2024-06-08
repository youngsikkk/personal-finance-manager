import { PDFDocument, rgb } from 'pdf-lib';

const generateReport = async (transactions, period) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { height } = page.getSize();

  page.drawText(`Financial Report - ${period}`, {
    x: 50,
    y: height - 50,
    size: 20,
    color: rgb(0, 0, 0),
  });

  let yPosition = height - 100;
  transactions.forEach((transaction) => {
    page.drawText(`${transaction.date} - ${transaction.category} - ${transaction.type} - $${transaction.amount}`, {
      x: 50,
      y: yPosition,
      size: 12,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

export default generateReport;
