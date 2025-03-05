import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routerContactos from './routes/contactos.js';
import routerUsuarios from './routes/usuarios.js'

const app = express();

// Configurar variables de entorno
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("MONGO_URI:", process.env.MONGO_URI);


// Middlewares
app.use(cors());
app.use(express.json());

// Conectar rutas
app.use('/api/contactos', routerContactos);
app.use('/api/usuarios', routerUsuarios);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.log("❌ Error conectando a MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));