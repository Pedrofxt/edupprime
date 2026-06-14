const { generateCertificate, verifyCertificate } = require('../services/certificateService');
const { generateCertificatePDF } = require('../services/pdfService');

async function generateCertificateController(req, res, next) {
  try {
    const certificate = await generateCertificate(req.user.id, req.body.courseId, req.body.nomeAluno, req.body.curso);
    const pdf = await generateCertificatePDF({ nomeAluno: certificate.nomeAluno, curso: certificate.curso, data: certificate.data, codigoValidacao: certificate.codigoValidacao });
    return res.status(201).json({ certificate, pdf });
  } catch (error) {
    return next(error);
  }
}

async function verifyCertificateController(req, res, next) {
  try {
    const certificate = await verifyCertificate(req.params.codigo);
    if (!certificate) return res.status(404).json({ error: 'Certificado não encontrado.' });
    return res.json(certificate);
  } catch (error) {
    return next(error);
  }
}

module.exports = { generateCertificate: generateCertificateController, verifyCertificate: verifyCertificateController };