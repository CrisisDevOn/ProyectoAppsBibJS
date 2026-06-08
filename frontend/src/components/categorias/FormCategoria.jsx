// FormCategoria.jsx - CRUD: Create
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCategoria } from '../../services/apiService'

export const FormCategoria = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        nombre: '', descripcion: '', imagen_url: '', activa: 1
    })
    const [error, setError] = useState('')

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
            await createCategoria({ ...form, activa: parseInt(form.activa) })
            navigate('/categorias')
        } catch (err) {
            setError('Error al guardar la categoría.')
        }
    }

    return (
        <div className="w3-container w3-padding-32">
            <h2><i className="fa fa-plus w3-text-brown"></i> Nueva Categoría</h2>

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
                        placeholder="Ej: Pasteles"
                        value={form.nombre}
                        onChange={handleChange}
                        required />
                </div>

                <div className="w3-section">
                    <label><b>Descripción</b></label>
                    <input id="descripcion" name="descripcion" type="text"
                        className="w3-input w3-border"
                        placeholder="Descripción breve de la categoría"
                        value={form.descripcion}
                        onChange={handleChange} />
                </div>

                <div className="w3-section">
                    <label><b>URL de imagen</b></label>
                    <input id="imagen_url" name="imagen_url" type="text"
                        className="w3-input w3-border"
                        placeholder="https://..."
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
                    <button id="btn-guardar" type="submit" className="w3-button w3-brown w3-margin-right">
                        <i className="fa fa-save"></i> Guardar
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
