// EditCategoria.jsx - CRUD: Update
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoria, updateCategoria } from '../../services/apiService'

export const EditCategoria = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        nombre: '', descripcion: '', imagen_url: '', activa: 1
    })
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await getCategoria(id)
                setForm({
                    nombre:      data.nombre || '',
                    descripcion: data.descripcion || '',
                    imagen_url:  data.imagen_url || '',
                    activa:      data.activa
                })
            } catch (err) {
                setError('No se pudo cargar la categoría.')
            } finally {
                setCargando(false)
            }
        }
        cargar()
    }, [id])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm({ ...form, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!form.nombre.trim()) {
            setError('El nombre es requerido.')
            return
        }
        try {
            await updateCategoria(id, { ...form, activa: parseInt(form.activa), id: parseInt(id) })
            navigate('/categorias')
        } catch (err) {
            setError('Error al actualizar la categoría.')
        }
    }

    if (cargando) return <div className="w3-container w3-padding-32"><p>Cargando...</p></div>

    return (
        <div className="w3-container w3-padding-32">
            <h2><i className="fa fa-edit w3-text-brown"></i> Editar Categoría #{id}</h2>

            {error && (
                <div className="w3-panel w3-red">
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="w3-card-4 w3-container w3-padding-32" style={{maxWidth: '600px'}}>

                <div className="w3-section">
                    <label><b>Nombre *</b></label>
                    <input id="nombre" name="nombre" type="text"
                        className="w3-input w3-border"
                        value={form.nombre}
                        onChange={handleChange}
                        required />
                </div>

                <div className="w3-section">
                    <label><b>Descripción</b></label>
                    <input id="descripcion" name="descripcion" type="text"
                        className="w3-input w3-border"
                        value={form.descripcion}
                        onChange={handleChange} />
                </div>

                <div className="w3-section">
                    <label><b>URL de imagen</b></label>
                    <input id="imagen_url" name="imagen_url" type="text"
                        className="w3-input w3-border"
                        value={form.imagen_url}
                        onChange={handleChange} />
                </div>

                <div className="w3-section">
                    <label>
                        <input id="activa" name="activa" type="checkbox"
                            className="w3-check"
                            checked={form.activa === 1}
                            onChange={handleChange} />
                        {' '}<b>Categoría activa</b>
                    </label>
                </div>

                <div className="w3-section">
                    <button id="btn-actualizar" type="submit" className="w3-button w3-brown w3-margin-right">
                        <i className="fa fa-save"></i> Actualizar
                    </button>
                    <button id="btn-cancelar" type="button"
                        className="w3-button w3-light-grey"
                        onClick={() => navigate('/categorias')}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}
