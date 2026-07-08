import * as fs from 'fs/promises';
import * as path from 'path';

const rutaData = path.join(process.cwd(), 'src', 'data');

export async function guardarEnArchivo(nombreArchivo: string, datos: any[]): Promise<boolean> {
    try {
        await fs.mkdir(rutaData, { recursive: true });
        const rutaCompleta = path.join(rutaData, nombreArchivo);
        
        await fs.writeFile(rutaCompleta, JSON.stringify(datos, null, 2), 'utf-8');
        return true;
    } catch (error: any) {
        console.error('Error al guardar archivo:', error.message);
        return false;
    }
}

export async function leerDesdeArchivo(nombreArchivo: string): Promise<any[]> {
    const rutaCompleta = path.join(rutaData, nombreArchivo);
    try {
        const contenido = await fs.readFile(rutaCompleta, 'utf-8');
        return contenido.trim() ? JSON.parse(contenido) : [];
    } catch (error: any) {
        if (error.code === 'ENOENT') return []; 
        
        console.error('Error al leer archivo:', error.message);
        return [];
    }
}