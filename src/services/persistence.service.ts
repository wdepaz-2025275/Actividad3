import * as fs from 'fs/promises';
import * as path from 'path';

const rutaData = path.join(process.cwd(), 'src', 'data');

export async function guardarEnArchivo(nombreArchivo: string, datos: any[]) {
    try {
        await fs.mkdir(rutaData, { recursive: true });
        
        const rutaCompleta = path.join(rutaData, nombreArchivo);
        const textoJSON = JSON.stringify(datos, null, 2); 
        
        await fs.writeFile(rutaCompleta, textoJSON, 'utf-8');
        return true;
    } catch (error: any) {
        console.log('Error al intentar guardar el archivo: ' + error.message);
        return false;
    }
}

export async function leerDesdeArchivo(nombreArchivo: string): Promise<any[]> {
    const rutaCompleta = path.join(rutaData, nombreArchivo);
    try {
        const contenido = await fs.readFile(rutaCompleta, 'utf-8');
 
        if (contenido.trim() === '') {
            return [];
        }
        
        return JSON.parse(contenido); 
    } catch (error: any) {
        
        if (error.code === 'ENOENT') {
            console.log(`Aviso: El archivo ${nombreArchivo} no existe aún. Se creará uno nuevo al guardar.`);
            return [];
        }
        
        console.log('Error al leer el archivo: ' + error.message);
        return [];
    }
}