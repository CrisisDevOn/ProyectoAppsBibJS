// FormReservacion.jsx - CRUD: Create
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createReservacion, getOcasiones } from '../../services/apiService'

export const FormReservacion = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        nombre_cliente: '', telefono: '', id_ocasion: '',
        nombre_ocasion: '', num_personas: 1,
        fecha: '', hora: '', alergias: '', status: 'pendiente'
    })
    const [ocasiones, setOcasiones] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        getOcasiones().then(setOcasiones).catch(() => setError('Error al cargar ocasiones.'))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'id_ocasion') {
            const oc = ocasiones.find(o => o.id === parseInt(value))
            setForm({ ...form, id_ocasion: value, nombre_ocasion: oc ? oc.nombre : '' })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!form.nombre_cliente.trim() || !form.telefono.trim() ||
            !form.id_ocasion || !form.fecha || !form.hora) {
            setError('Todos los campos marcados con * son requeridos.')
            return
        }
        try {
            await createReservacion({
                ...form,
                id_ocasion: parseInt(form.id_ocasion),
                num_personas: parseInt(form.num_personas)
            })
            navigate('/reservaciones')
        } catch (err) {
            setError('Error al guardar la reservación.')
        }
    }

    return (
        <div className="w3-container w3-padding-32">
            <h2><i className="fa fa-plus w3-text-brown"></i> Nueva Reservación</h2>

            {error && <div className="w3-panel w3-red"><p>{error}</p></div>}

            <form onSubmit={handleSubmit} className="w3-card-4 w3-container w3-padding-32" style={{maxWidth: '650px'}}>

                <div className="w3-row-padding">
                    <div className="w3-col s12 m6">
                        <div className="w3-section">
                            <label><b>Nombre del cliente *</b></label>
                            <input id="nombre_cliente" name="nombre_cliente" type="text"
                                className="w3-input w3-border"
                                placeholder="Nombre completo"
                                value={form.nombre_cliente} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="w3-col s12 m6">
                        <div className="w3-section">
                            <label><b>Teléfono *</b></label>
                            <input id="telefono" name="telefono" type="text"
                                className="w3-input w3-border"
                                placeholder="10 dígitos"
                                value={form.telefono} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                <div className="w3-row-padding">
                    <div className="w3-col s12 m6">
                        <div className="w3-section">
                            <label><b>Ocasión *</b></label>
                            <select id="id_ocasion" name="id_ocasion" className="w3-select w3-border"
                                value={form.id_ocasion} onChange={handleChange} required>
                                <option value="">-- Seleccionar --</option>
                                {ocasiones.map(o => (
                                    <option key={o.id} value={o.id}>{o.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w3-col s12 m6">
                        <div className="w3-section">
                            <label><b>Número de personas *</b></label>
                            <input id="num_personas" name="num_personas" type="number" min="1"
                                className="w3-input w3-border"
                                value={form.num_personas} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                <div className="w3-row-padding">
                    <div className="w3-col s12 m6">
                        <div className="w3-section">
                            <label><b>Fecha *</b></label>
                            <input id="fecha" name="fecha" type="date"
                                className="w3-input w3-border"
                                value={form.fecha} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="w3-col s12 m6">
                        <div className="w3-section">
                            <label><b>Hora *</b></label>
                            <input id="hora" name="hora" type="time"
                                className="w3-input w3-border"
                                value={form.hora} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                <div className="w3-section">
                    <label><b>Alergias / notas (opcional)</b></label>
                    <input id="alergias" name="alergias" type="text"
                        className="w3-input w3-border"
                        placeholder="Ej: Nueces, gluten..."
                        value={form.alergias} onChange={handleChange} />
                </div>

                <div className="w3-section">
                    <label><b>Estado</b></label>
                    <select id="status" name="status" className="w3-select w3-border"
                        value={form.status} onChange={handleChange}>
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmada">Confirmada</option>
                        <option value="cancelada">Cancelada</option>
                    </select>
                </div>

                <div className="w3-section">
                    <button id="btn-guardar" type="submit" className="w3-button w3-brown w3-margin-right">
                        <i className="fa fa-save"></i> Guardar
                    </button>
                    <button id="btn-cancelar" type="button" className="w3-button w3-light-grey"
                        onClick={() => navigate('/reservaciones')}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}
