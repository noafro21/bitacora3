// Escapar caracteres HTML para prevenir XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text == null ? "" : String(text)));
  return div.innerHTML;
}

// URLs de la API
const API_URL = "http://localhost:3000";
const USUARIOS_URL = `${API_URL}/usuarios`;

// Elementos DOM
const usuariosContainer = document.getElementById("usuarios-container");
const formNuevoUsuario = document.getElementById("formNuevoUsuario");
const mensajeFormulario = document.getElementById("mensajeFormulario");
const btnBuscar = document.getElementById("btnBuscar");
const inputBuscarCorreo = document.getElementById("inputBuscarCorreo");
const resultadoBusqueda = document.getElementById("resultadoBusqueda");
const btnRefrescar = document.getElementById("btnRefrescar");

// Cargar todos los usuarios
async function cargarUsuarios() {
  usuariosContainer.innerHTML = `
    <div class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando usuarios...</span>
      </div>
      <p class="mt-3">Cargando usuarios...</p>
    </div>`;

  try {
    const response = await fetch(USUARIOS_URL);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const usuarios = await response.json();
    renderizarUsuarios(usuarios);
  } catch (error) {
    console.error("Error cargando usuarios:", error);
    usuariosContainer.innerHTML = `
      <div class="alert alert-danger">
        <i class="fas fa-exclamation-triangle me-2"></i>
        <strong>Error:</strong> No se pudieron cargar los usuarios. Verifica que el servidor esté en ejecución.
      </div>`;
  }
}

// Renderizar lista de usuarios
function renderizarUsuarios(usuarios) {
  if (usuarios.length === 0) {
    usuariosContainer.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-users-slash fa-3x text-muted mb-3"></i>
        <h4>No hay usuarios registrados</h4>
        <p>Agrega el primer usuario usando el formulario de arriba.</p>
      </div>`;
    return;
  }

  const tabla = `
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead class="table-primary">
          <tr>
            <th><i class="fas fa-user me-2"></i>Nombre</th>
            <th><i class="fas fa-envelope me-2"></i>Correo</th>
            <th class="text-center"><i class="fas fa-coins me-2"></i>Disponibles</th>
            <th class="text-center"><i class="fas fa-exchange-alt me-2"></i>Canjeados</th>
            <th class="text-center"><i class="fas fa-chart-bar me-2"></i>Totales</th>
          </tr>
        </thead>
        <tbody>
          ${usuarios
            .map(
              (u) => `
            <tr>
              <td>${escapeHtml(u.nombre) || "-"}</td>
              <td>${escapeHtml(u.correo) || "-"}</td>
              <td class="text-center">
                <span class="badge bg-success">${u.puntosDisponibles ?? 0}</span>
              </td>
              <td class="text-center">
                <span class="badge bg-secondary">${u.puntosCanjeados ?? 0}</span>
              </td>
              <td class="text-center">
                <span class="badge bg-primary">${u.puntosTotales ?? 0}</span>
              </td>
            </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>
    <p class="text-muted small">Total: ${usuarios.length} usuario(s)</p>`;

  usuariosContainer.innerHTML = tabla;
}

// Buscar usuario por correo
async function buscarUsuario() {
  const correo = inputBuscarCorreo.value.trim();
  if (!correo) {
    resultadoBusqueda.innerHTML = `<div class="alert alert-warning">Por favor ingresa un correo para buscar.</div>`;
    return;
  }

  resultadoBusqueda.innerHTML = `<div class="spinner-border spinner-border-sm text-primary me-2"></div> Buscando...`;

  try {
    const response = await fetch(`${USUARIOS_URL}/${encodeURIComponent(correo)}`);

    if (response.status === 404) {
      resultadoBusqueda.innerHTML = `
        <div class="alert alert-warning">
          <i class="fas fa-search me-2"></i>No se encontró ningún usuario con el correo <strong>${escapeHtml(correo)}</strong>.
        </div>`;
      return;
    }

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const usuario = await response.json();
    resultadoBusqueda.innerHTML = `
      <div class="card border-primary">
        <div class="card-header bg-primary text-white">
          <i class="fas fa-user me-2"></i>Usuario encontrado
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <p><strong>Nombre:</strong> ${escapeHtml(usuario.nombre)}</p>
              <p><strong>Correo:</strong> ${escapeHtml(usuario.correo)}</p>
            </div>
            <div class="col-md-6">
              <p><strong>Puntos disponibles:</strong> <span class="badge bg-success">${usuario.puntosDisponibles ?? 0}</span></p>
              <p><strong>Puntos canjeados:</strong> <span class="badge bg-secondary">${usuario.puntosCanjeados ?? 0}</span></p>
              <p><strong>Puntos totales:</strong> <span class="badge bg-primary">${usuario.puntosTotales ?? 0}</span></p>
            </div>
          </div>
        </div>
      </div>`;
  } catch (error) {
    console.error("Error buscando usuario:", error);
    resultadoBusqueda.innerHTML = `
      <div class="alert alert-danger">
        <i class="fas fa-exclamation-triangle me-2"></i>
        Error al buscar el usuario. Verifica que el servidor esté en ejecución.
      </div>`;
  }
}

// Crear nuevo usuario
async function crearUsuario(event) {
  event.preventDefault();

  const datos = {
    nombre: document.getElementById("inputNombre").value.trim(),
    correo: document.getElementById("inputCorreo").value.trim(),
    puntosDisponibles: parseInt(document.getElementById("inputPuntosDisponibles").value) || 0,
    puntosCanjeados: parseInt(document.getElementById("inputPuntosCanjeados").value) || 0,
    puntosTotales: parseInt(document.getElementById("inputPuntosTotales").value) || 0,
  };

  mensajeFormulario.innerHTML = `<div class="spinner-border spinner-border-sm text-primary me-2"></div> Guardando...`;

  try {
    const response = await fetch(USUARIOS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensajeError || `Error HTTP: ${response.status}`);
    }

    mensajeFormulario.innerHTML = `
      <div class="alert alert-success">
        <i class="fas fa-check-circle me-2"></i>
        Usuario <strong>${escapeHtml(datos.nombre)}</strong> creado exitosamente.
      </div>`;

    formNuevoUsuario.reset();
    cargarUsuarios();
  } catch (error) {
    console.error("Error creando usuario:", error);
    mensajeFormulario.innerHTML = `
      <div class="alert alert-danger">
        <i class="fas fa-exclamation-triangle me-2"></i>
        <strong>Error:</strong> ${escapeHtml(error.message)}
      </div>`;
  }
}

// Eventos
formNuevoUsuario.addEventListener("submit", crearUsuario);
btnBuscar.addEventListener("click", buscarUsuario);
inputBuscarCorreo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") buscarUsuario();
});
btnRefrescar.addEventListener("click", cargarUsuarios);

// Cargar al inicio
cargarUsuarios();
