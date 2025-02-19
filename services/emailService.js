const nodemailer = require('nodemailer');
const config = require('../config/env');

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass
  }
});

async function enviarEmail(destinatario, asunto, mensaje) {
  try {
    const info = await transporter.sendMail({
      from: `"Integrabot" <${config.smtp.user}>`,
      to: destinatario,
      subject: asunto,
      text: mensaje
    });
    console.log("✅ Email enviado:", info.messageId);
  } catch (error) {
    console.error("❌ Error al enviar email:", error);
  }
}

module.exports = { enviarEmail };

