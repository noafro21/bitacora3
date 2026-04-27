/**
 * seed.js — puebla la base de datos con datos de ejemplo.
 *
 * Uso:
 *   node seed.js
 *
 * Requiere un archivo .env con la variable MONGODB_URI apuntando
 * a la instancia de MongoDB (local o Atlas).
 */

const mongoose = require("mongoose");
require("dotenv").config();

const Usuario = require("./models/usuario.model");
const Producto = require("./models/producto.model");

const usuarios = [
  {
    nombre: "Rose González",
    correo: "rose@test.ac.cr",
    puntosDisponibles: 10,
    puntosCanjeados: 5,
    puntosTotales: 15,
  },
  {
    nombre: "Carlos Mora",
    correo: "carlos@test.ac.cr",
    puntosDisponibles: 25,
    puntosCanjeados: 0,
    puntosTotales: 25,
  },
];

const productos = [
  {
    nombre: "Olla de carne",
    puntosNecesarios: 15,
    comercio: "Chanchepe",
  },
  {
    nombre: "Café tostado 250 g",
    puntosNecesarios: 8,
    comercio: "Café Britt",
  },
  {
    nombre: "Bolsa de compras reutilizable",
    puntosNecesarios: 5,
    comercio: "Supermercado La Colonia",
  },
  {
    nombre: "Vale de descuento 10%",
    puntosNecesarios: 20,
    comercio: "Ferretería El Clavo",
  },
  {
    nombre: "Batido natural",
    puntosNecesarios: 3,
    comercio: "Soda La Casita",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");

    // Limpiar colecciones existentes
    await Usuario.deleteMany({});
    await Producto.deleteMany({});
    console.log("Colecciones limpiadas");

    // Insertar datos de ejemplo
    await Usuario.insertMany(usuarios);
    console.log(`${usuarios.length} usuarios insertados`);

    await Producto.insertMany(productos);
    console.log(`${productos.length} productos insertados`);

    console.log("Base de datos poblada correctamente");
  } catch (error) {
    console.error("Error al poblar la base de datos:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
