import { Producto } from '../models/producto';
import { Cliente } from '../models/cliente';
import { hacerPregunta, rl } from '../utils/readline';
import { validarProducto, validarCliente } from '../utils/validators';
import { guardarEnArchivo, leerDesdeArchivo } from '../services/persistence.service';

const archivoProductos = 'productos.json';
const archivoClientes = 'clientes.json';

export async function mostrarMenuPrincipal() {
    console.log('\n--- MENÚ DEL SISTEMA ---');
    console.log('1. Registrar un Producto');
    console.log('2. Ver Productos Guardados');
    console.log('3. Registrar un Cliente');
    console.log('4. Ver Clientes Guardados');
    console.log('5. Salir');
    
    const opcion = await hacerPregunta('Selecciona una opción (1-5): ');

    if (opcion === '1') {
        console.log('\n--- NUEVO PRODUCTO ---');
        try {
            const idInput = await hacerPregunta('Ingresa el ID del producto: ');
            const nombreInput = await hacerPregunta('Ingresa el Nombre: ');
            const precioInput = await hacerPregunta('Ingresa el Precio: ');
            const stockInput = await hacerPregunta('Ingresa el Stock inicial: ');

            const nuevoProd: Producto = {
                id: parseInt(idInput),
                nombre: nombreInput,
                precio: parseFloat(precioInput),
                stock: parseInt(stockInput)
            };

            validarProducto(nuevoProd);

            const listaActual = await leerDesdeArchivo(archivoProductos);
            listaActual.push(nuevoProd); 

            await guardarEnArchivo(archivoProductos, listaActual);
            console.log('¡Producto registrado y guardado con éxito!');

        } catch (error: any) {
            console.log('No se pudo guardar: ' + error.message);
        }
        
        await mostrarMenuPrincipal();

    } else if (opcion === '2') {
        console.log('\n--- LISTA DE PRODUCTOS ---');
        const productos = await leerDesdeArchivo(archivoProductos);
        
        if (productos.length === 0) {
            console.log('No hay productos registrados en el archivo.');
        } else {
            console.log(JSON.stringify(productos, null, 2));
        }
        
        await mostrarMenuPrincipal();

    } else if (opcion === '3') {
        console.log('\n--- NUEVO CLIENTE ---');
        try {
            const idInput = await hacerPregunta('Ingresa el ID del cliente: ');
            const nombreInput = await hacerPregunta('Ingresa el Nombre completo: ');
            const emailInput = await hacerPregunta('Ingresa el Correo Electrónico: ');
            const activoInput = await hacerPregunta('¿El cliente está activo? (si/no): ');

            const nuevoCliente: Cliente = {
                id: parseInt(idInput),
                nombre: nombreInput,
                email: emailInput,
                activo: activoInput.toLowerCase() === 'si' 
            };

            validarCliente(nuevoCliente);

            const listaActualClientes = await leerDesdeArchivo(archivoClientes);
            listaActualClientes.push(nuevoCliente);

            await guardarEnArchivo(archivoClientes, listaActualClientes);
            console.log('¡Cliente registrado y guardado con éxito!');

        } catch (error: any) {
            console.log('No se pudo guardar: ' + error.message);
        }

        await mostrarMenuPrincipal();

    } else if (opcion === '4') {
        console.log('\n--- LISTA DE CLIENTES ---');
        const clientes = await leerDesdeArchivo(archivoClientes);

        if (clientes.length === 0) {
            console.log('No hay clientes registrados en el archivo.');
        } else {
            console.log(JSON.stringify(clientes, null, 2));
        }

        await mostrarMenuPrincipal();

    } else if (opcion === '5') {
        console.log('Cerrando el programa. ¡Adiós!');
        rl.close(); 
    } else {
        console.log('Opción incorrecta, intenta de nuevo.');
        await mostrarMenuPrincipal();
    }
}