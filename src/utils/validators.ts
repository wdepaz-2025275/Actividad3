import { Producto } from '../models/producto';
import { Cliente } from '../models/cliente';

export function validarProducto(p: Producto) {
    if (!p.id || !p.nombre || p.precio === undefined || p.stock === undefined) {
        throw new Error('Faltan campos obligatorios en el producto.');
    }
    if (p.precio < 0) {
        throw new Error('El precio no puede ser un número negativo.');
    }
    if (p.stock < 0) {
        throw new Error('El stock no puede ser menor a cero.');
    }
}

export function validarCliente(c: Cliente) {
    if (!c.id || !c.nombre || !c.email) {
        throw new Error('Faltan campos obligatorios en el cliente.');
    }
    if (!c.email.includes('@')) {
        throw new Error('El correo electrónico debe llevar un @.');
    }
}