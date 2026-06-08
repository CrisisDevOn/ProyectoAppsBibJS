// Servicio para comunicarse con el json-server (Actividad: fetch con async/await)
// json-server corre en http://localhost:3001

const BASE_URL = 'http://localhost:3001';

// ---- Funcion generica para obtener datos ----
async function getData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener datos');
    return response.json();
}

// ---- CATEGORIAS ----
export function getCategorias() {
    return getData(`${BASE_URL}/categorias`);
}

export function getCategoria(id) {
    return getData(`${BASE_URL}/categorias/${id}`);
}

export async function createCategoria(data) {
    const response = await fetch(`${BASE_URL}/categorias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al crear categoría');
    return response.json();
}

export async function updateCategoria(id, data) {
    const response = await fetch(`${BASE_URL}/categorias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al actualizar categoría');
    return response.json();
}

export async function deleteCategoria(id) {
    const response = await fetch(`${BASE_URL}/categorias/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar categoría');
    return response.json();
}

// ---- PRODUCTOS ----
export function getProductos() {
    return getData(`${BASE_URL}/productos`);
}

export function getProducto(id) {
    return getData(`${BASE_URL}/productos/${id}`);
}

export async function createProducto(data) {
    const response = await fetch(`${BASE_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al crear producto');
    return response.json();
}

export async function updateProducto(id, data) {
    const response = await fetch(`${BASE_URL}/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al actualizar producto');
    return response.json();
}

export async function deleteProducto(id) {
    const response = await fetch(`${BASE_URL}/productos/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar producto');
    return response.json();
}

// ---- RESERVACIONES ----
export function getReservaciones() {
    return getData(`${BASE_URL}/reservaciones`);
}

export function getReservacion(id) {
    return getData(`${BASE_URL}/reservaciones/${id}`);
}

export async function createReservacion(data) {
    const response = await fetch(`${BASE_URL}/reservaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al crear reservación');
    return response.json();
}

export async function updateReservacion(id, data) {
    const response = await fetch(`${BASE_URL}/reservaciones/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al actualizar reservación');
    return response.json();
}

export async function deleteReservacion(id) {
    const response = await fetch(`${BASE_URL}/reservaciones/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar reservación');
    return response.json();
}

// ---- OCASIONES (solo lectura) ----
export function getOcasiones() {
    return getData(`${BASE_URL}/ocasiones`);
}
