require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const contactoRoutes = require('./routes/contacto');
const chatRoutes = require('./routes/chat');

const app = express();

// 📌 Cargar variables de entorno
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI no está definido en .env");
  process.exit(1); // Salir del proceso si falta la URI de MongoDB
}

console.log("🔗 URI de MongoDB:", MONGO_URI);

// 🔒 Seguridad
app.use(cors({ origin: CORS_ORIGIN }));
app.use(helmet());
app.use(express.json());

// 🚀 Protección contra abusos
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // Máximo 10 peticiones por minuto
  message: "Demasiadas solicitudes, intenta más tarde.",
});
app.use(limiter);

// 🏆 Conectar a MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1); // Salir del proceso si la conexión falla
  });

// 🏆 Rutas disponibles
app.use('/contacto', contactoRoutes);
app.use('/api/chat', chatRoutes);

// ✅ Ruta de prueba para ver si el servidor responde
app.get('/', (req, res) => {
  res.send("🚀 Servidor funcionando correctamente 🚀");
});

// 🔥 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

