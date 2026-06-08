// ListaProductos.jsx - CRUD: Read + Delete
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getProductos, deleteProducto } from '../../services/apiService'

export const ListaProductos = () => {
    const [productos, setProductos] = useState([])
    const [mensaje, setMensaje] = useState('')

    const cargarProductos = async () => {
        try {
            const data = await getProductos()
            setProductos(data)
        } catch (error) {
            setMensaje('Error al cargar productos. Verifica que el servidor esté corriendo.')
        }
    }

    useEffect(() => {
        cargarProductos()
    }, [])

    const handleDelete = async (id, nombre) => {
        if (!confirm(`¿Eliminar el producto "${nombre}"?`)) return
        try {
            await deleteProducto(id)
            setMensaje(`Producto "${nombre}" eliminado.`)
            cargarProductos()
        } catch (error) {
            setMensaje('Error al eliminar el producto.')
        }
    }

    return (
        <div className="w3-container w3-padding-32">
            <div className="w3-row">
                <div className="w3-col s8">
                    <h2><i className="fa fa-coffee w3-text-brown"></i> Productos del Menú</h2>
                </div>
                <div className="w3-col s4 w3-right-align">
                    <NavLink to="/productos/nuevo" className="w3-button w3-brown w3-margin-top">
                        <i className="fa fa-plus"></i> Nuevo Producto
                    </NavLink>
                </div>
            </div>

            {mensaje && (
                <div className="w3-panel w3-pale-yellow w3-border">
                    <p>{mensaje}</p>
                </div>
            )}

            <div className="w3-row-padding">
                {productos.map(prod => (
                    <div key={prod.id} className="w3-col l4 m6 s12 w3-margin-bottom">
                        <div className="w3-card-4">
                            {prod.imagen_url && (
                                <img src={prod.imagen_url} alt={prod.nombre} className="img-card" />
                            )}
                            <div className="w3-container w3-padding">
                                <h4 className="w3-text-brown">{prod.nombre}</h4>
                                <p className="w3-small">{prod.descripcion || '—'}</p>
                                <p><b>Precio:</b> ${prod.precio} MXN</p>
                                <p>
                                    <b>Disponible:</b>{' '}
                                    {prod.disponible === 1
                                        ? <span className="w3-tag w3-green">Sí</span>
                                        : <span className="w3-tag w3-red">No</span>
                                    }
                                </p>
                            </div>
                            <div className="w3-container w3-padding w3-light-grey">
                                <NavLink to={`/productos/editar/${prod.id}`}
                                    className="w3-button w3-small w3-blue w3-margin-right">
                                    <i className="fa fa-edit"></i> Editar
                                </NavLink>
                                <button
                                    className="w3-button w3-small w3-red"
                                    onClick={() => handleDelete(prod.id, prod.nombre)}>
                                    <i className="fa fa-trash"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {productos.length === 0 && (
                    <div className="w3-panel w3-pale-blue">
                        <p>No hay productos registrados.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
