// App.jsx - Rutas principales (Actividad bjs-09-rutas-react)
import { Route, Routes, Navigate } from 'react-router-dom'

// Componentes
import { NavBar } from './components/NavBar'
import { Home } from './components/Home'

// Categorias
import { ListaCategorias } from './components/categorias/ListaCategorias'
import { FormCategoria }   from './components/categorias/FormCategoria'
import { EditCategoria }   from './components/categorias/EditCategoria'

// Productos
import { ListaProductos } from './components/productos/ListaProductos'
import { FormProducto }   from './components/productos/FormProducto'
import { EditProducto }   from './components/productos/EditProducto'

// Reservaciones
import { ListaReservaciones } from './components/reservaciones/ListaReservaciones'
import { FormReservacion }    from './components/reservaciones/FormReservacion'
import { EditReservacion }    from './components/reservaciones/EditReservacion'

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* Categorias */}
                <Route path="/categorias"                element={<ListaCategorias />} />
                <Route path="/categorias/nueva"          element={<FormCategoria />} />
                <Route path="/categorias/editar/:id"     element={<EditCategoria />} />

                {/* Productos */}
                <Route path="/productos"                 element={<ListaProductos />} />
                <Route path="/productos/nuevo"           element={<FormProducto />} />
                <Route path="/productos/editar/:id"      element={<EditProducto />} />

                {/* Reservaciones */}
                <Route path="/reservaciones"             element={<ListaReservaciones />} />
                <Route path="/reservaciones/nueva"       element={<FormReservacion />} />
                <Route path="/reservaciones/editar/:id"  element={<EditReservacion />} />

                {/* Ruta no encontrada — redirige a home */}
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default App
