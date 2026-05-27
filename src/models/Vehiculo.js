import mongoose from 'mongoose';

const vehiculoSchema = new mongoose.Schema(
  {
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    version: { type: String, default: '' },
    anio: { type: Number, required: true },
    precio: { type: Number, required: true },
    moneda: { type: String, default: 'U$S' },
    kilometros: { type: Number, required: true },
    tipoCarroceria: { type: String, required: true },
    combustible: { type: String, required: true },
    transmision: { type: String, default: 'Manual' },
    traccion: { type: String, default: 'Delantera' },
    color: { type: String, default: '' },
    cilindrada: { type: String, default: '' },
    direccion: { type: String, default: 'Hidráulica' },
    estado: { type: String, default: 'Usado' },
    es0km: { type: Boolean, default: false },
    precioFinal: {type: Number},
    fechaVenta: {type: Date},
    motivoBaja: {type: String},
    fechaBaja: {type: Date},
    
    imagenes: [{ type: String }] // Es un array de strings (URLs de las imágenes)
    
  },
  {
    timestamps: true, // Esto agrega automáticamente 'createdAt' y 'updatedAt' a cada auto
  }
);

// Pre-guardado: lógica automática para saber si es 0km según los kilómetros o el estado
vehiculoSchema.pre('save', function (next) {
  if (this.kilometros === 0 || this.estado === 'Nuevo') {
    this.es0km = true;
  } else {
    this.es0km = false;
  }
  next();
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

export default Vehiculo;