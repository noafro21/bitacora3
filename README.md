# Paso Justo — Sistema de canje de puntos

Aplicación web que permite a los usuarios consultar su saldo de puntos y ver los productos disponibles para canjear en comercios afiliados.

## Estructura del proyecto

```
bitacora3/
├── backend/          # API REST con Node.js + Express + MongoDB
│   ├── models/       # Esquemas Mongoose
│   ├── routes/       # Rutas de la API
│   ├── index.js      # Punto de entrada del servidor
│   └── seed.js       # Script para poblar la base de datos
└── frontend/         # Interfaz de usuario estática
    ├── css/
    ├── js/
    └── productos.html
```

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- Una instancia de MongoDB (local o [MongoDB Atlas](https://www.mongodb.com/atlas))

## Configuración

### 1. Variables de entorno

Crea el archivo `backend/.env` con la cadena de conexión a MongoDB:

```env
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<basededatos>?retryWrites=true&w=majority
```

> **Nota:** Si usas MongoDB local, el valor sería `mongodb://localhost:27017/pasojusto`.

### 2. Instalar dependencias

```bash
cd backend
npm install
```

### 3. Poblar la base de datos (datos de ejemplo)

Si acabas de conectar una base de datos nueva (por ejemplo MongoDB Atlas) y no hay datos, ejecuta el script de seed para cargar usuarios y productos de ejemplo:

```bash
cd backend
npm run seed
```

El script inserta:
- 2 usuarios de prueba (incluyendo `rose@test.ac.cr` que usa el frontend por defecto)
- 5 productos de ejemplo en distintos comercios

### 4. Iniciar el servidor

```bash
cd backend
npm start
```

El servidor quedará disponible en `http://localhost:3000`.

### 5. Abrir el frontend

Abre `frontend/productos.html` directamente en tu navegador, o sírvelo con cualquier servidor HTTP estático (por ejemplo Live Server de VS Code).

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/usuarios` | Lista todos los usuarios |
| `GET` | `/usuarios/:correo` | Obtiene un usuario por correo |
| `POST` | `/usuarios` | Crea un nuevo usuario |
| `GET` | `/productos` | Lista todos los productos |
| `POST` | `/productos` | Crea un nuevo producto |

### Ejemplo: crear un producto

```http
POST http://localhost:3000/productos
Content-Type: application/json

{
  "nombre": "Olla de carne",
  "puntosNecesarios": 15,
  "comercio": "Chanchepe"
}
```

## Solución de problemas frecuentes

### No veo productos en la página

1. Verifica que el servidor backend esté corriendo (`npm start`).
2. Comprueba que `MONGODB_URI` en `backend/.env` sea correcto.
3. Si la base de datos está vacía (p. ej. recién conectaste MongoDB Atlas), ejecuta `npm run seed`.

### Cambié a MongoDB Atlas y desaparecieron mis datos

Al conectar una instancia nueva de MongoDB Atlas la base de datos comienza vacía. Para restaurar los datos de ejemplo ejecuta:

```bash
cd backend
npm run seed
```

Si tenías datos propios, deberás volver a insertarlos manualmente usando los endpoints `POST /usuarios` y `POST /productos`.
