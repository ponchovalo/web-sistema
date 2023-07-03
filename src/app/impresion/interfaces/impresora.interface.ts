export interface Impresora {
    impresoraId: string;
    nombre: string;
    modelo: string;
    serie: string;
    ip: string;
    mac: string;
    edificio: string;
    ubicacion: string;
}

export interface ImpresoraPing {
    impresora: Impresora;
    fecha: Date;
    mensajeImpresoraPing: string;
    statusImpresoraPing: boolean;
}

export interface ImpresoraDetalle {
    impresora: Impresora,
    cont102: number,
    cont109: number,
    cont124: number,
    blackLevel: number,
    cyanLevel: number,
    magentaLevel: number,
    yellowLevel: number,
    fecha?: Date,
    mensaje?: string
}