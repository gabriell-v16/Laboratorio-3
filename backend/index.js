import express from 'express';
import mongoose, { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routerContactos from './routes/Routecontactos.js';
import routerUsuarios from './routes/Routeusuarios.js'
import connection from './Services/database.js';
import routerVerify from './routes/Routeverify.js'

const app = express();

const startServer = async()=>{
  await connection();
  dotenv.config();
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log("MONGO_URI:", process.env.MONGO_URI);
  
  
  // Middlewares
  app.use(cors());
  app.use(express.json());
  
  // Conectar rutas
  app.use('/api', routerContactos);
  app.use('/api', routerUsuarios);
  app.use('/api', routerVerify);
  
  // Conectar a MongoDB
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));

} 


startServer();