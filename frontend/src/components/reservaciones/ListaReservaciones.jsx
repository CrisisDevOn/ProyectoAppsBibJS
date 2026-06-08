// ListaReservaciones.jsx - CRUD: Read + Delete + cambio de status
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getReservaciones, deleteReservacion, updateReservacion } from '../../services/apiService'

export const ListaReservaciones = () => {
    const [reservaciones, setReservaciones] = useState([])
    const [mensaje, setMensaje] = useState('')

    const cargar = async () => {
        try {
            const data = await getReservaciones()
            setReservaciones(data)
        } catch (error) {
            setMensaje('Error al cargar reservaciones. Verifica que el servidor esté corriendo.')
        }
    }

    useEffect(() => { cargar() }, [])

    const handleDelete = async (id, nombre) => {
        if (!confirm(`¿Eliminar la reservación de "${nombre}"?`)) return
        try {
            await deleteReservacion(id)
            setMensaje(`Reservación de "${nombre}" eliminada.`)
            cargar()
        } catch (error) {
            setMensaje('Error al eliminar la reservación.')
        }
    }

    const handleStatus = async (res, nuevoStatus) => {
        try {
            await updateReservacion(res.id, { ...res, status: nuevoStatus })
            setMensaje(`Estado cambiado a "${nuevoStatus}".`)
            cargar()
        } catch (error) {
            setMensaje('Error al cambiar el estado.')
        }
    }

    const etiquetaStatus = (status) => {
        if (status === 'confirmada') return <span className="w3-tag w3-green">{status}</span>
        if (status === 'cancelada')  return <span className="w3-tag w3-red">{status}</span>
        return <span className="w3-tag w3-orange">{status}</span>
    }

    return (
        <div className="w3-container w3-padding-32">
            <div className="w3-row">
                <div className="w3-col s8">
                    <h2><i className="fa fa-calendar w3-text-brown"></i> Reservaciones</h2>
                </div>
                <div className="w3-col s4 w3-right-align">
                    <NavLink to="/reservaciones/nueva" className="w3-button w3-brown w3-margin-top">
                        <i className="fa fa-plus"></i> Nueva Reservación
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
                        <th>Cliente</th>
                        <th>Teléfono</th>
                        <th>Ocasión</th>
                        <th>Personas</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservaciones.map(res => (
                        <tr key={res.id}>
                            <td>{res.id}</td>
                            <td>{res.nombre_cliente}</td>
                            <td>{res.telefono}</td>
                            <td>{res.nombre_ocasion}</td>
                            <td>{res.num_personas}</td>
                            <td>{res.fecha}</td>
                            <td>{res.hora}</td>
                            <td>{etiquetaStatus(res.status)}</td>
                            <td>
                                <NavLink to={`/reservaciones/editar/${res.id}`}
                                    className="w3-button w3-tiny w3-blue w3-margin-right">
                                    <i className="fa fa-edit"></i>
                                </NavLink>
                                {res.status === 'pendiente' && (
                                    <button className="w3-button w3-tiny w3-green w3-margin-right"
                                        onClick={() => handleStatus(res, 'confirmada')}
                                        title="Confirmar">
                                        <i className="fa fa-check"></i>
                                    </button>
                                )}
                                {res.status !== 'cancelada' && (
                                    <button className="w3-button w3-tiny w3-orange w3-margin-right"
                                        onClick={() => handleStatus(res, 'cancelada')}
                                        title="Cancelar">
                                        <i className="fa fa-ban"></i>
                                    </button>
                                )}
                                <button className="w3-button w3-tiny w3-red"
                                    onClick={() => handleDelete(res.id, res.nombre_cliente)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    {reservaciones.length === 0 && (
                        <tr><td colSpan="9" className="w3-center">No hay reservaciones registradas.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
