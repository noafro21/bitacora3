const express = require("express");
const router = express.Router();
const Producto = require("../models/producto.model"); // Importar el modelo de producto

//Rutas
//POST: Crear/enviar un nuevo producto a la BD
router.post("/", async (req, res) => {
  const { nombre, puntosNecesarios, comercio } = req.body;

  if (!nombre || !puntosNecesarios || !comercio) {
    return res
      .status(400)
      .json({ mensajeError: "Todos los datos son obligatorios" });
  }

  try {
    const nuevoProducto = new Producto({
      nombre,
      puntosNecesarios,
      comercio,
    });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }
});

// GET: Solicitar los datos de los productos  a la BD
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**  
http://localhost:3000/productos
{
  "nombre": "Olla de carne",
  "puntosNecesarios": 15,
  "comercio": "Chanchepe"
}
*/
module.exports = router; //Exportar el router para utilizarlo en el backend
