const { generateChatResponse } = require('../services/openaiService');

async function procesarMensaje(req, res) {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Se requiere un array de mensajes" });
    }
    const respuesta = await generateChatResponse(messages);
    res.json({ respuesta });
  } catch (error) {
    console.error("❌ Error en el chatbot:", error);
    res.status(500).json({ error: "Error interno" });
  }
}

module.exports = { procesarMensaje };

