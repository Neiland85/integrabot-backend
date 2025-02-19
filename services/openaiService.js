const OpenAI = require('openai');
const config = require('../config/env');

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

async function generateChatResponse(messages) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 200,
      temperature: 0.7,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('❌ Error en OpenAI:', error);
    throw new Error('Hubo un problema con la respuesta del chatbot.');
  }
}

module.exports = { generateChatResponse };

