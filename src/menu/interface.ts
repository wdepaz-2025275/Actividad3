import { Producto } from '../models/producto';
import { Cliente } from '../models/cliente';
import { hacerPregunta, rl } from '../utils/readline';
import { validarProducto, validarCliente } from '../utils/validators';

const listaProductos: Producto[] = [];
const listaClientes: Cliente[] = [];

export async function mostrarMenuPrincipal() {
    let salir = false;

    while (!salir) {
        console.log('\n|------------------------------------|');
        console.log('|            MENÚ PRINCIPAL            |');
        console.log('|--------------------------------------|');
        console.log('| 1. Registrar Producto                |');
        console.log('| 2. Ver Productos                     |');
        console.log('| 3. Registrar Cliente                 |');
        console.log('| 4. Ver Clientes                      |');
        console.log('| 5. Salir                             |');
        console.log('|--------------------------------------|');
        
        const opcion = await hacerPregunta('Selecciona una opción: ');

        switch (opcion.trim()) {
            case '1':
                console.log('\n Registrar Producto');
                try {
                    const id = await hacerPregunta('ID: ');
                    const nombre = await hacerPregunta('Nombre: ');
                    const precio = await hacerPregunta('Precio: ');
                    const stock = await hacerPregunta('Stock: ');

                    const nuevoProd: Producto = {
                        id: parseInt(id),
                        nombre,
                        precio: parseFloat(precio),
                        stock: parseInt(stock)
                    };

                    validarProducto(nuevoProd);
                    
                    if (listaProductos.some(p => p.id === nuevoProd.id)) {
                        console.log(`¡Error! El ID ${nuevoProd.id} ya existe.`);
                        break;
                    }

                    listaProductos.push(nuevoProd); 
                    console.log('Producto registrado.');
                } catch (err: any) {
                    console.error('Error:', err.message);
                }
                break;

            case '2':
                console.log('\n Productos Registrados');
                console.log(listaProductos.length ? listaProductos : 'No hay datos.');
                break;

            case '3':
                console.log('\n Registrar Cliente');
                try {
                    const id = await hacerPregunta('ID: ');
                    const nombre = await hacerPregunta('Nombre y Apellido: ');
                    const email = await hacerPregunta('Email: ');
                    const activo = await hacerPregunta('¿Activo? (si/no): ');

                    const nuevoCliente: Cliente = {
                        id: parseInt(id),
                        nombre,
                        email,
                        activo: activo.toLowerCase().startsWith('s') 
                    };

                    validarCliente(nuevoCliente);
                    
                    if (listaClientes.some(c => c.id === nuevoCliente.id)) {
                        console.log(`¡Error! El ID ${nuevoCliente.id} ya existe.`);
                        break;
                    }

                    listaClientes.push(nuevoCliente);
                    console.log('Cliente registrado.');
                } catch (err: any) {
                    console.error('Error:', err.message);
                }
                break;

            case '4':
                console.log('\n Clientes Registrados');
                console.log(listaClientes.length ? listaClientes : 'No hay datos.');
                break;

            case '5':
                console.log('Cerrando programa.');
                rl.close();
                salir = true;
                break;

            default:
                console.log('Opción no válida.');
                break;
        }
    }
}