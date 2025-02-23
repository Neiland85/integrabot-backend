require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Conexión exitosa a MongoDB Atlas"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: "Servidor funcionando correctamente 🚀" });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});

