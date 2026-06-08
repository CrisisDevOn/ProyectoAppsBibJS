// NavBar.jsx - Barra de navegacion con W3.CSS (Actividad bjs-09-rutas-react)
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div className="w3-bar w3-brown">
            <NavLink to="/" className="w3-bar-item w3-button nav-brand">
                🥐 Pan & Brunch
            </NavLink>
            <NavLink to="/categorias" className="w3-bar-item w3-button">
                <i className="fa fa-list"></i> Categorías
            </NavLink>
            <NavLink to="/productos" className="w3-bar-item w3-button">
                <i className="fa fa-coffee"></i> Productos
            </NavLink>
            <NavLink to="/reservaciones" className="w3-bar-item w3-button">
                <i className="fa fa-calendar"></i> Reservaciones
            </NavLink>
        </div>
    )
}
