// FormProducto.jsx - CRUD: Create
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProducto, getCategorias } from '../../services/apiService'

export const FormProducto = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        id_categoria: '', nombre: '', descripcion: '',
        precio: '', imagen_url: '', disponible: 1
    })
    const [categorias, setCategorias] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        getCategorias().then(setCategorias).catch(() => setError('Error al cargar categorías.'))
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm({ ...form, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!form.nombre.trim() || !form.id_categoria || !form.precio) {
            setError('Nombre, categoría y precio son requeridos.')
            return
        }
        try {
            await createProducto({
                ...form,
                id_categoria: parseInt(form.id_categoria),
                precio: parseFloat(form.precio),
                disponible: parseInt(form.disponible)
            })
            navigate('/productos')
        } catch (err) {
            setError('Error al guardar el producto.')
        }
    }

    return (
        <div className="w3-container w3-padding-32">
            <h2><i className="fa fa-plus w3-text-brown"></i> Nuevo Producto</h2>

            {error && <div className="w3-panel w3-red"><p>{error}</p></div>}

            <form onSubmit={handleSubmit} className="w3-card-4 w3-container w3-padding-32" style={{maxWidth: '600px'}}>

                <div className="w3-section">
                    <label><b>Categoría *</b></label>
                    <select id="id_categoria" name="id_categoria" className="w3-select w3-border"
                        value={form.id_categoria} onChange={handleChange} required>
                        <option value="">-- Seleccionar --</option>
                        {categorias.map(c => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="w3-section">
                    <label><b>Nombre *</b></label>
                    <input id="nombre" name="nombre" type="text"
                        className="w3-input w3-border"
                        placeholder="Ej: Café Americano"
                        value={form.nombre} onChange={handleChange} required />
                </div>

                <div className="w3-section">
                    <label><b>Descripción</b></label>
                    <input id="descripcion" name="descripcion" type="text"
                        className="w3-input w3-border"
                        placeholder="Descripción del producto"
                        value={form.descripcion} onChange={handleChange} />
                </div>

                <div className="w3-section">
                    <label><b>Precio (MXN) *</b></label>
                    <input id="precio" name="precio" type="number" step="0.01" min="0"
                        className="w3-input w3-border"
                        placeholder="0.00"
                        value={form.precio} onChange={handleChange} required />
                </div>

                <div className="w3-section">
                    <label><b>URL de imagen</b></label>
                    <input id="imagen_url" name="imagen_url" type="text"
                        className="w3-input w3-border"
                        placeholder="https://..."
                        value={form.imagen_url} onChange={handleChange} />
                </div>

                <div className="w3-section">
                    <label>
                        <input id="disponible" name="disponible" type="checkbox"
                            className="w3-check"
                            checked={form.disponible === 1}
                            onChange={handleChange} />
                        {' '}<b>Disponible</b>
                    </label>
                </div>

                <div className="w3-section">
                    <button id="btn-guardar" type="submit" className="w3-button w3-brown w3-margin-right">
                        <i className="fa fa-save"></i> Guardar
                    </button>
                    <button id="btn-cancelar" type="button" className="w3-button w3-light-grey"
                        onClick={() => navigate('/productos')}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}
