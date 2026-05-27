import express from 'express';
import { 
  getVehiculos, 
  getVehiculoById, 
  crearVehiculo, 
  actualizarVehiculo,
  darDeBajaVehiculo, // <-- Nueva
  registrarVenta,
  eliminarVehiculo
} from '../controllers/vehiculoController.js';
import { verificarToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getVehiculos);
router.get('/:id', getVehiculoById);

router.post('/', verificarToken, crearVehiculo);
router.put('/:id', verificarToken, actualizarVehiculo);
router.delete('/:id', verificarToken, eliminarVehiculo);
router.patch('/:id/venta', verificarToken, registrarVenta);
router.patch('/:id/baja', verificarToken, darDeBajaVehiculo);

export default router;