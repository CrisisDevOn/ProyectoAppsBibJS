# Pan & Brunch — Frontend React

## Descripción del Proyecto

Interfaz de gestión de menú y reservaciones para la pastelería **Pan & Brunch**. El frontend está construido con React + Vite y consume un backend simulado con **json-server**.

---

## Integrantes del Equipo

| Nombre | Matrícula | Carrera | Materia | Rol |
|--------|-----------|---------|---------|-----|
| Emmanuel | 210785 | Ingeniería en Sistemas Computacionales | Apps con Bibliotecas JS | Desarrollador único |

---

## Tecnologías Usadas

- **React** con Vite (`npm create vite@latest . -- --template react`)
- **React Router DOM** — navegación entre páginas (BrowserRouter, Routes, NavLink)
- **W3.CSS** — estilos (cargado desde CDN en `index.html`)
- **json-server** — simula el backend con API REST automática
- **fetch()** con async/await — consumo del API

---

## Instalación y Ejecución

### 1. Requisitos previos

- Node.js v20 o superior
- npm
- json-server instalado globalmente:

```bash
npm install -g json-server
```

### 2. Iniciar el backend simulado (json-server)

En una terminal, dentro de la carpeta `frontend/backend/`:

```bash
json-server db/datos.json --port 3001
```

El servidor estará en: `http://localhost:3001`

### 3. Iniciar el frontend React

En otra terminal, dentro de la carpeta `frontend/frontend/`:

```bash
npm install
npm run dev
```

La app estará en: `http://localhost:5173`

---

## Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/categorias` | Lista de categorías + opciones CRUD |
| `/categorias/nueva` | Formulario para crear categoría |
| `/categorias/editar/:id` | Formulario para editar categoría |
| `/productos` | Lista de productos en tarjetas + opciones CRUD |
| `/productos/nuevo` | Formulario para crear producto |
| `/productos/editar/:id` | Formulario para editar producto |
| `/reservaciones` | Lista de reservaciones + cambio de estado |
| `/reservaciones/nueva` | Formulario para crear reservación |
| `/reservaciones/editar/:id` | Formulario para editar reservación |

---

## Entidades Gestionadas

### Categoria, Producto, Reservacion

Las tres entidades tienen CRUD completo (Create, Read, Update, Delete) desde la interfaz React.

---

## Estructura del Proyecto

```
frontend/
├── backend/                 Backend simulado
│   ├── package.json
│   └── db/
│       └── datos.json       Datos fake para json-server
│
└── frontend/                App React
    ├── index.html           Incluye W3.CSS y Font Awesome via CDN
    ├── package.json
    └── src/
        ├── main.jsx         BrowserRouter
        ├── App.jsx          Routes
        ├── index.css        Estilos globales minimos
        ├── services/
        │   └── apiService.js   fetch al json-server
        └── components/
            ├── NavBar.jsx
            ├── Home.jsx
            ├── categorias/
            ├── productos/
            └── reservaciones/
```

---

*Materia: Apps con Bibliotecas JS — Matricula: 210785*
