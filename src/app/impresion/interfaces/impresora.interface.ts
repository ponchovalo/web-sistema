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

export interface RepoMensualImp {
    impresora: Impresora,
    cont102: number,
    cont109: number,
    cont124: number,
    fecha?: Date,
}

export interface RefaccionImpresora {
    refaccionId?: string,
    noParte: string,
    nombre: string,
    descripcion: string,
    modeloImpresora: string,
    tipo: string,
    vidaUtil: number,
    cantidad: number,
}

export interface RegCambioRefaImp {
    regCambioRefaId?: number,
    cantidad: number,
    fecha?: Date,
    idRefaccion?: number,
    idImpresora: number,
    cont102: number,
    cont109: number,
    cont124: number
}

export interface RegCambioRefaImpFull {
    regCambioRefaId?: number,
    cantidad: number,
    fecha?: Date,
    refaccion: RefaccionImpresora,
    impresora: Impresora,
    cont102: number,
    cont109: number,
    cont124: number
}

export interface PaginacionControTonerRes{
    pageSize: number,
    page: number,
    pageQuantity: number,
    totalRows: number,
    data: RegCambioRefaImpFull[]
  }

export interface FiltroRefa {
    modelo: string;
    tipo: string
}
export interface FiltroImpresora {
    Edificio: string;
    Ubicacion: string
}

export interface PaginacionReq{
  pageSize: number,
  page: number,
  sort: string,
  sortDirection: string,
  filter: string,
  skip: number
}

export interface PaginacionImpresoraRes{
  pageSize: number,
  page: number,
  pageQuantity: number,
  totalRows: number,
  data: ImpresoraPing[]
}

export interface PaginacionRefaccionRes{
  pageSize: number,
  page: number,
  pageQuantity: number,
  totalRows: number,
  data: RefaccionImpresora[]
}
export interface EntradaRefaccion{
    idRefaccion: number;
    noParte?: string;
    nombre?: string;
    cantidad: number;
}
export interface Entrada{
    entradas: EntradaRefaccion[]
}
