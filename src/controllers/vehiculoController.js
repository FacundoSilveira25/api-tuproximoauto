import Vehiculo from '../models/Vehiculo.js';

// 1. Obtener todos
export const getVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find({}).sort({ createdAt: -1 });
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

// 2. Obtener uno solo (ESTA ES LA QUE TE FALTA)
export const getVehiculoById = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (vehiculo) {
      res.json(vehiculo);
    } else {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

// 3. Crear (POST)
export const crearVehiculo = async (req, res) => {
  console.log("Datos recibidos en el servidor:", req.body); // <-- ESTO ES CLAVE
  try {
    const nuevoVehiculo = new Vehiculo(req.body);
    const vehiculoGuardado = await nuevoVehiculo.save();
    res.status(201).json(vehiculoGuardado);
  } catch (error) {
    console.log("Error al guardar:", error); // <-- Y ESTO TAMBIÉN
    res.status(400).json({ message: 'Error al crear el vehículo', error: error.message });
  }
};

// 4. Actualizar (PUT)
export const actualizarVehiculo = async (req, res) => {
  try {
    const actualizado = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar', error: error.message });
  }
};

export const registrarVenta = async (req, res) => {
  try {
    const { precioFinal } = req.body; // Recibimos el precio acordado con el cliente

    const vehiculoVendido = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      { 
        estado: 'Vendido',
        precioFinal: Number(precioFinal), // Guardamos el precio real
        fechaVenta: new Date()            // Guardamos el momento exacto de la operación
      },
      { new: true }
    );

    if (vehiculoVendido) {
      res.status(200).json(vehiculoVendido);
    } else {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar la venta', error: error.message });
  }
};

export const darDeBajaVehiculo = async (req, res) => {
  try {
    const { motivo } = req.body; 

    const vehiculoDeBaja = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      { 
        estado: 'Baja',
        motivoBaja: motivo,   
        fechaBaja: new Date() 
      },
      { new: true } 
    );
    
    if (vehiculoDeBaja) {
      res.status(200).json(vehiculoDeBaja);
    } else {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al dar de baja', error: error.message });
  }
};

// 6. ELIMINAR DEFINITIVAMENTE (Borrado Físico: Lo destruye de la base de datos)
export const eliminarVehiculo = async (req, res) => {
  try {
    const vehiculoEliminado = await Vehiculo.findByIdAndDelete(req.params.id);
    
    if (vehiculoEliminado) {
      res.status(200).json({ message: 'Vehículo eliminado con éxito', id: req.params.id });
    } else {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};