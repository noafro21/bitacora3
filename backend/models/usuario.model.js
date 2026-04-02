const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    lowercase: true,
  },
  puntosDisponibles: {
    type: Number,
    default: 0,
    min: [0, "Los puntos no pueden ser negativos"],
  },
  puntosCanjeados: {
    type: Number,
    default: 0,
  },
  puntosTotales: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
