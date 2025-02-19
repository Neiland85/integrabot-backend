const { enviarEmail } = require('../services/emailService');

async function enviarContacto(req, res) {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  await enviarEmail("integrabot.nmunoz@gmail.com", `Nuevo contacto: ${nombre}`, `
    Nombre: ${nombre}
    Email: ${email}
    Mensaje: ${mensaje}
  `);

  res.json({ message: "Formulario recibido con éxito" });
}

module.exports = { enviarContacto };

