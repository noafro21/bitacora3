// URLs de la API
const API_URL = "http://localhost:3000";
const USUARIOS_URL = `${API_URL}/usuarios`;

// Elementos DOM
const usuariosContainer = document.getElementById("usuarios-container");
const mensajeEstado = document.getElementById("mensajeEstado");
const formNuevoUsuario = document.getElementById("formNuevoUsuario");
const btnGuardarUsuario = document.getElementById("btnGuardarUsuario");

// Cargar y renderizar la lista de usuarios
async function cargarUsuarios() {
  try {
    const response = await fetch(USUARIOS_URL);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const usuarios = await response.json();
    renderizarUsuarios(usuarios);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    usuariosContainer.innerHTML = `
      <div class="alert alert-danger">
        <i class="fas fa-exclamation-triangle me-2"></i>
        <strong>Error:</strong> No se pudieron cargar los usuarios. Verifica que el servidor esté en ejecución.
      </div>`;
  }
}

// Renderizar la tabla de usuarios
function renderizarUsuarios(usuarios) {
  if (usuarios.length === 0) {
    usuariosContainer.innerHTML = `
      <div class="no-usuarios">
        <i class="fas fa-users fa-3x text-muted mb-3"></i>
        <h4>No hay usuarios registrados</h4>
        <p>Agrega el primer usuario con el botón <strong>Nuevo usuario</strong>.</p>
      </div>`;
    return;
  }

  const filas = usuarios
    .map(
      (u) => `
    <tr>
      <td data-label="Nombre">${u.nombre || "—"}</td>
      <td data-label="Correo">${u.correo || "—"}</td>
      <td data-label="Disponibles">
        <span class="badge bg-success badge-puntos">${u.puntosDisponibles ?? 0}</span>
      </td>
      <td data-label="Canjeados">
        <span class="badge bg-secondary badge-puntos">${u.puntosCanjeados ?? 0}</span>
      </td>
      <td data-label="Totales">
        <span class="badge bg-primary badge-puntos">${(u.puntosDisponibles ?? 0) + (u.puntosCanjeados ?? 0)}</span>
      </td>
    </tr>`,
    )
    .join("");

  usuariosContainer.innerHTML = `
    <div class="table-responsive">
      <table class="table tabla-usuarios mb-0">
        <thead>
          <tr>
            <th><i class="fas fa-user me-1"></i>Nombre</th>
            <th><i class="fas fa-envelope me-1"></i>Correo</th>
            <th><i class="fas fa-coins me-1"></i>Disponibles</th>
            <th><i class="fas fa-exchange-alt me-1"></i>Canjeados</th>
            <th><i class="fas fa-chart-bar me-1"></i>Totales</th>
          </tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>
    </div>`;
}

// Mostrar mensaje de éxito/error
function mostrarMensaje(texto, tipo) {
  mensajeEstado.className = `alert alert-${tipo} mb-4`;
  mensajeEstado.innerHTML = `<i class="fas fa-${tipo === "success" ? "check-circle" : "exclamation-triangle"} me-2"></i>${texto}`;
  mensajeEstado.classList.remove("d-none");

  setTimeout(() => mensajeEstado.classList.add("d-none"), 4000);
}

// Guardar nuevo usuario
btnGuardarUsuario.addEventListener("click", async () => {
  formNuevoUsuario.classList.add("was-validated");

  if (!formNuevoUsuario.checkValidity()) return;

  const nuevoUsuario = {
    nombre: document.getElementById("nombre").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    puntosDisponibles: parseInt(document.getElementById("puntosDisponibles").value) || 0,
    puntosCanjeados: parseInt(document.getElementById("puntosCanjeados").value) || 0,
    puntosTotales: parseInt(document.getElementById("puntosTotales").value) || 0,
  };

  try {
    const response = await fetch(USUARIOS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensajeError || `Error HTTP: ${response.status}`);
    }

    // Cerrar modal y limpiar formulario
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalNuevoUsuario"));
    modal.hide();
    formNuevoUsuario.reset();
    formNuevoUsuario.classList.remove("was-validated");

    mostrarMensaje("Usuario creado correctamente.", "success");
    cargarUsuarios();
  } catch (error) {
    mostrarMensaje(`No se pudo crear el usuario: ${error.message}`, "danger");
  }
});

// Inicializar
cargarUsuarios();
