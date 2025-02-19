require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config/env');

const contactoRoutes = require('./routes/contacto');
const chatRoutes = require('./routes/chat');

const app = express();

// 🔒 Seguridad
app.use(cors({ origin: config.corsOrigin }));
app.use(helmet());
app.use(express.json());

// 🚀 Protección contra abusos
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // Máximo 10 peticiones por minuto
  message: "Demasiadas solicitudes, intenta más tarde.",
});
app.use(limiter);

// 🏆 Rutas disponibles
app.use('/contacto', contactoRoutes);
app.use('/api/chat', chatRoutes);

// ✅ Ruta de prueba para ver si el servidor responde
app.get('/', (req, res) => {
  res.send("🚀 Servidor funcionando correctamente 🚀");
});

// 🔍 Mostrar todas las rutas registradas en consola
console.log("📌 Rutas registradas:");
app._router.stack.forEach((r) => {
  if (r.route?.path) {
    console.log(`✅ ${r.route.path}`);
  }
});

// 🔥 Iniciar servidor
app.listen(config.port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${config.port}`);
});
