const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario.model"); // Importar el modelo de empleado

//Rutas
//POST: Crear/enviar un nuevo dato a la BD
router.post("/", async (req, res) => {
  const { nombre, correo, puntosDisponibles, puntosCanjeados, puntosTotales } =
    req.body;

  if (
    !nombre ||
    !correo ||
    puntosDisponibles === undefined ||
    puntosCanjeados === undefined ||
    puntosTotales === undefined
  ) {
    return res
      .status(400)
      .json({ mensajeError: "Todos los datos son obligatorios" });
  }

  try {
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      puntosDisponibles,
      puntosCanjeados,
      puntosTotales,
    });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }
});

// GET: Solicitar los datos de los usuarios a la BD
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Solicitar un usuario por correo
router.get("/:correo", async (req, res) => {
  try {
    const correo = decodeURIComponent(req.params.correo);
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ mensajeError: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**  
http://localhost:3000/usuarios
{
  "nombre": "Roberto González",
  "correo": "roberto@test.net",
  "puntosDisponibles": 5,
  "puntosCanjeados": 10,
      "puntosTotales": 15,
  }
*/

module.exports = router; //Exportar el router para utilizarlo en el backend
