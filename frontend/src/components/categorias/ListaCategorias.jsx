// ListaCategorias.jsx - CRUD: Read + Delete
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getCategorias, deleteCategoria } from '../../services/apiService'

export const ListaCategorias = () => {
    const [categorias, setCategorias] = useState([])
    const [mensaje, setMensaje] = useState('')

    const cargarCategorias = async () => {
        try {
            const data = await getCategorias()
            setCategorias(data)
        } catch (error) {
            setMensaje('Error al cargar categorías. Verifica que el servidor esté corriendo.')
        }
    }

    useEffect(() => {
        cargarCategorias()
    }, [])

    const handleDelete = async (id, nombre) => {
        if (!confirm(`¿Eliminar la categoría "${nombre}"?`)) return
        try {
            await deleteCategoria(id)
            setMensaje(`Categoría "${nombre}" eliminada.`)
            cargarCategorias()
        } catch (error) {
            setMensaje('Error al eliminar la categoría.')
        }
    }

    return (
        <div className="w3-container w3-padding-32">
            <div className="w3-row">
                <div className="w3-col s8">
                    <h2><i className="fa fa-list w3-text-brown"></i> Categorías del Menú</h2>
                </div>
                <div className="w3-col s4 w3-right-align">
                    <NavLink to="/categorias/nueva" className="w3-button w3-brown w3-margin-top">
                        <i className="fa fa-plus"></i> Nueva Categoría
                    </NavLink>
                </div>
            </div>

            {mensaje && (
                <div className="w3-panel w3-pale-yellow w3-border">
                    <p>{mensaje}</p>
                </div>
            )}

            <table className="w3-table-all w3-striped w3-hoverable w3-card-4">
                <thead>
                    <tr className="w3-brown">
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Activa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(cat => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.nombre}</td>
                            <td>{cat.descripcion || '—'}</td>
                            <td>
                                {cat.activa === 1
                                    ? <span className="w3-tag w3-green">Sí</span>
                                    : <span className="w3-tag w3-red">No</span>
                                }
                            </td>
                            <td>
                                <NavLink to={`/categorias/editar/${cat.id}`}
                                    className="w3-button w3-small w3-blue w3-margin-right">
                                    <i className="fa fa-edit"></i> Editar
                                </NavLink>
                                <button
                                    className="w3-button w3-small w3-red"
                                    onClick={() => handleDelete(cat.id, cat.nombre)}>
                                    <i className="fa fa-trash"></i> Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {categorias.length === 0 && (
                        <tr><td colSpan="5" className="w3-center">No hay categorías registradas.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
