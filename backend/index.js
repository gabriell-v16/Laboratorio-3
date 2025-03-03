const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar rutas
app.use("/api/usuarios", require("./routes/usuarios")); // Rutas de usuarios
app.use("/api/contactos", require("./routes/contactos")); // Rutas de contactos

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.log("❌ Error conectando a MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));