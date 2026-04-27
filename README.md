# Paso Justo - Sistema de Canje de Puntos

Aplicación web para gestionar puntos de fidelización y canje de productos en comercios afiliados.

## Estructura del proyecto

```
bitacora3/
├── backend/
│   ├── index.js                  # Servidor principal (Express + MongoDB)
│   ├── package.json              # Dependencias del backend
│   ├── models/
│   │   ├── usuario.model.js      # Esquema de usuarios (Mongoose)
│   │   └── producto.model.js     # Esquema de productos (Mongoose)
│   └── routes/
│       ├── usuario.route.js      # Rutas API para usuarios
│       └── producto.route.js     # Rutas API para productos
└── frontend/
    ├── index.html                # Página principal / navegación
    ├── productos.html            # Página de canje de productos
    ├── usuarios.html             # Página de gestión de usuarios
    ├── css/
    │   └── productos.css         # Estilos compartidos
    └── js/
        ├── productos.js          # Lógica de la página de productos
        └── usuarios.js           # Lógica de la página de usuarios
```

## Requisitos

- Node.js 18+
- MongoDB Atlas (o instancia local de MongoDB)

## Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/noafro21/bitacora3.git
   cd bitacora3
   ```

2. Instala las dependencias del backend:
   ```bash
   cd backend
   npm install
   ```

3. Crea el archivo `.env` dentro de la carpeta `backend/` basándote en `.env.example`:
   ```bash
   cp ../.env.example .env
   ```
   Edita el archivo `.env` y coloca tu URI de MongoDB.

4. Inicia el servidor:
   ```bash
   node index.js
   ```
   El servidor estará disponible en `http://localhost:3000`.

## API Endpoints

### Usuarios (`/usuarios`)

| Método | Ruta              | Descripción                          |
|--------|-------------------|--------------------------------------|
| GET    | `/usuarios`       | Obtener todos los usuarios           |
| GET    | `/usuarios/:correo` | Obtener usuario por correo         |
| POST   | `/usuarios`       | Crear un nuevo usuario               |

**Ejemplo POST `/usuarios`:**
```json
{
  "nombre": "Rose González",
  "correo": "rose@test.ac.cr",
  "puntosDisponibles": 10,
  "puntosCanjeados": 5,
  "puntosTotales": 15
}
```

### Productos (`/productos`)

| Método | Ruta         | Descripción                      |
|--------|--------------|----------------------------------|
| GET    | `/productos` | Obtener todos los productos      |
| POST   | `/productos` | Crear un nuevo producto          |

**Ejemplo POST `/productos`:**
```json
{
  "nombre": "Olla de carne",
  "puntosNecesarios": 15,
  "comercio": "Chanchepe"
}
```

## Frontend

Abre directamente los archivos HTML en tu navegador o sirve la carpeta `frontend/` con cualquier servidor estático.

- `index.html` — Página de inicio con navegación
- `productos.html` — Ver y canjear productos según tus puntos
- `usuarios.html` — Gestionar usuarios y sus puntos
