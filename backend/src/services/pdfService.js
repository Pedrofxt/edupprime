const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

async function generateCertificatePDF({ nomeAluno, curso, data, codigoValidacao }) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const { width, height } = page.getSize();
  page.drawText('Certificado de Conclusão', { x: 50, y: height - 100, size: 28, font });
  page.drawText(`Concedido a: ${nomeAluno}`, { x: 50, y: height - 150, size: 18, font });
  page.drawText(`Curso: ${curso}`, { x: 50, y: height - 180, size: 16, font });
  page.drawText(`Data: ${new Date(data).toLocaleDateString()}`, { x: 50, y: height - 210, size: 12, font });
  page.drawText(`Código: ${codigoValidacao}`, { x: 50, y: height - 240, size: 10, font, color: rgb(0.2, 0.2, 0.2) });

  const qrDataUrl = await QRCode.toDataURL(`https://example.com/certificado/verificar/${codigoValidacao}`);
  const qrImageBytes = qrDataUrl.split(',')[1];
  const qrImage = await pdfDoc.embedPng(Buffer.from(qrImageBytes, 'base64'));
  page.drawImage(qrImage, { x: width - 180, y: 50, width: 120, height: 120 });

  const pdfBytes = await pdfDoc.save();
  const uploadsDir = path.resolve(__dirname, '../uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  const filename = `certificate-${codigoValidacao}.pdf`;
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, pdfBytes);
  return { filePath, filename };
}

module.exports = { generateCertificatePDF };
