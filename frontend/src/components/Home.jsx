// Home.jsx - Pagina de inicio
import { NavLink } from 'react-router-dom'

export const Home = () => {
    return (
        <div>
            <div className="w3-container w3-brown w3-padding-32 w3-center">
                <h1>🥐 Pan & Brunch</h1>
                <p className="w3-large">Sistema de Gestión de Menú y Reservaciones</p>
                <p>Pastelería y Brunch — Cd. del Carmen, Campeche</p>
            </div>

            <div className="w3-container w3-padding-32">
                <div className="w3-row-padding">

                    <div className="w3-col l4 m6 s12 w3-margin-bottom">
                        <div className="w3-card-4">
                            <div className="w3-container w3-pale-yellow w3-padding-16 w3-center">
                                <i className="fa fa-list w3-xxlarge w3-text-brown"></i>
                                <h3>Categorías</h3>
                            </div>
                            <div className="w3-container w3-padding-16">
                                <p>Gestiona las categorías del menú: pasteles, bebidas, desayunos, postres y más.</p>
                                <NavLink to="/categorias" className="w3-button w3-brown w3-block">
                                    Ver Categorías
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="w3-col l4 m6 s12 w3-margin-bottom">
                        <div className="w3-card-4">
                            <div className="w3-container w3-pale-green w3-padding-16 w3-center">
                                <i className="fa fa-coffee w3-xxlarge w3-text-brown"></i>
                                <h3>Productos</h3>
                            </div>
                            <div className="w3-container w3-padding-16">
                                <p>Administra el catálogo completo de productos, precios y disponibilidad.</p>
                                <NavLink to="/productos" className="w3-button w3-brown w3-block">
                                    Ver Productos
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="w3-col l4 m6 s12 w3-margin-bottom">
                        <div className="w3-card-4">
                            <div className="w3-container w3-pale-red w3-padding-16 w3-center">
                                <i className="fa fa-calendar w3-xxlarge w3-text-brown"></i>
                                <h3>Reservaciones</h3>
                            </div>
                            <div className="w3-container w3-padding-16">
                                <p>Consulta y gestiona las reservaciones de los clientes y su estado.</p>
                                <NavLink to="/reservaciones" className="w3-button w3-brown w3-block">
                                    Ver Reservaciones
                                </NavLink>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <footer className="w3-container w3-brown w3-padding-16 w3-center">
                <p>Pan & Brunch &copy; 2026 — Sistema desarrollado por Emmanuel (210785)</p>
            </footer>
        </div>
    )
}
