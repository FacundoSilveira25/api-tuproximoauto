import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import vehiculoRoutes from './routes/vehiculoRoutes.js'; // <-- Importamos las rutas

// Importamos el controlador de login y el validador de IPs
import { loginAdmin } from './controllers/authController.js';
import { ipWhitelist, verificarToken } from './middleware/authMiddleware.js';

dotenv.config();

connectDB();

const app = express();

// ¡ESTA ES LA LÍNEA CLAVE PARA RENDER!
// Le dice a Express que extraiga la IP real del cliente, no la del balanceador de carga.
app.set('trust proxy', true);

app.use(cors({
  origin: [
    'https://tuproximoauto-ebd2-academia-del-ka-s-projects.vercel.app',
    'https://tuproximoauto-ddas4kq8m-academia-del-ka-s-projects.vercel.app',
    'https://tuproximoauto-one.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));


app.use(express.json());

// Montamos las rutas de los vehículos en la URL base /api/vehiculos
app.use('/api/vehiculos', vehiculoRoutes);

app.get('/', (req, res) => {
  res.send('¡API Automotora conectada y lista!');
});


// ... tus otras configuraciones de express

// 1. Ruta de Login (¡OJO! Solo se puede acceder si pasás el filtro de IP)
app.post('/api/auth/acceso-privado', ipWhitelist, loginAdmin);

// 2. Protegemos las rutas de vehículos sensibles
// Ejemplo: router.post('/', ipWhitelist, verificarToken, crearVehiculo);
// SOLO UN LISTEN AL FINAL
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});