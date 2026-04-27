// URLs de la API
const API_URL = "http://localhost:3000";
const USUARIOS_URL = `${API_URL}/usuarios`;
const PRODUCTOS_URL = `${API_URL}/productos`;

// Cargar estadísticas del sistema
async function cargarEstadisticas() {
  try {
    const [resUsuarios, resProductos] = await Promise.all([
      fetch(USUARIOS_URL),
      fetch(PRODUCTOS_URL),
    ]);

    if (resUsuarios.ok) {
      const usuarios = await resUsuarios.json();
      document.getElementById("totalUsuarios").textContent = usuarios.length;

      // Sumar todos los puntos canjeados
      const totalPuntos = usuarios.reduce(
        (sum, u) => sum + (u.puntosCanjeados || 0),
        0,
      );
      document.getElementById("totalPuntos").textContent = totalPuntos;
    }

    if (resProductos.ok) {
      const productos = await resProductos.json();
      document.getElementById("totalProductos").textContent = productos.length;
    }
  } catch (error) {
    console.error("Error al cargar estadísticas:", error);
    // Mostrar guión si no se puede conectar al servidor
    ["totalUsuarios", "totalProductos", "totalPuntos"].forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.textContent === "-") el.textContent = "—";
    });
  }
}

cargarEstadisticas();
