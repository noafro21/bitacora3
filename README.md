# Paso Justo – Plataforma de Puntos de Lealtad

Aplicación web que permite a los usuarios consultar sus puntos de lealtad y canjearlos por productos en comercios afiliados.

## 🗂️ Estructura del proyecto

```
bitacora3/
├── backend/                  # Servidor Node.js / Express
│   ├── models/
│   │   ├── producto.model.js # Modelo de Producto (Mongoose)
│   │   └── usuario.model.js  # Modelo de Usuario (Mongoose)
│   ├── routes/
│   │   ├── producto.route.js # Rutas REST para productos
│   │   └── usuario.route.js  # Rutas REST para usuarios
│   ├── index.js              # Punto de entrada del servidor
│   └── package.json
├── frontend/                 # Interfaz web estática
│   ├── css/
│   │   └── productos.css
│   ├── js/
│   │   └── productos.js
│   └── productos.html
└── .gitignore
```

---

## 🔧 Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) (base de datos en la nube)

---

## 🚀 Cómo recuperar y configurar el proyecto

Si tus archivos locales desaparecieron (por ejemplo, después de sincronizar con la nube), puedes recuperar todo el proyecto desde GitHub:

### 1. Clonar el repositorio

```bash
git clone https://github.com/noafro21/bitacora3.git
cd bitacora3
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` dentro de la carpeta `backend/` con el siguiente contenido (ver `.env.example`):

```env
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre-bd>?retryWrites=true&w=majority
PORT=3000
```

Reemplaza los valores con los datos de tu clúster de MongoDB Atlas.

### 4. Iniciar el servidor backend

```bash
# Desde la carpeta backend/
node index.js
```

El servidor estará disponible en `http://localhost:3000`.

### 5. Abrir el frontend

Abre el archivo `frontend/productos.html` directamente en tu navegador, o sírvelo con cualquier servidor estático.

---

## 📡 Endpoints de la API

### Usuarios (`/usuarios`)

| Método | Ruta              | Descripción                    |
|--------|-------------------|-------------------------------|
| POST   | `/usuarios`       | Crear un nuevo usuario        |
| GET    | `/usuarios`       | Obtener todos los usuarios    |
| GET    | `/usuarios/:correo` | Obtener un usuario por correo |

**Ejemplo – Crear usuario:**

```json
POST /usuarios
{
  "nombre": "Rose González",
  "correo": "rose@test.ac.cr",
  "puntosDisponibles": 10,
  "puntosCanjeados": 5,
  "puntosTotales": 15
}
```

### Productos (`/productos`)

| Método | Ruta         | Descripción                   |
|--------|--------------|------------------------------|
| POST   | `/productos` | Crear un nuevo producto       |
| GET    | `/productos` | Obtener todos los productos   |

**Ejemplo – Crear producto:**

```json
POST /productos
{
  "nombre": "Olla de carne",
  "puntosNecesarios": 15,
  "comercio": "Chanchepe"
}
```

---

## 🎨 Lógica de colores en la vista de productos

| Color   | Significado                                          |
|---------|------------------------------------------------------|
| 🟢 Verde  | El usuario tiene suficientes puntos para canjear    |
| 🟠 Naranja | Le faltan menos del 50 % de los puntos requeridos  |
| 🔴 Rojo   | Le faltan más del 50 % de los puntos requeridos    |

---

## 📝 Notas

- El archivo `.env` **no se sube a GitHub** por seguridad (está en `.gitignore`). Debes crearlo manualmente en `backend/` cada vez que clones el proyecto.
- Consulta `.env.example` para ver las variables requeridas.
