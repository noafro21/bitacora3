const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  puntosNecesarios: {
    type: Number,
    required: true,
  },
  comercio: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Producto", productoSchema);
