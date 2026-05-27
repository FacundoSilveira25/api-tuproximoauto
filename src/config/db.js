import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Intentamos conectar usando la variable de entorno
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`📦 MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    // Si falla la conexión, detenemos el servidor
    process.exit(1);
  }
};