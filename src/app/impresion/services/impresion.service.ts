import { Injectable } from '@angular/core';
import { FiltroImpresora, FiltroRefa, Impresora, ImpresoraDetalle, ImpresoraPing, PaginacionImpresoraReq, PaginacionImpresoraRes,  RefaccionImpresora, RegCambioRefaImp } from '../interfaces/impresora.interface';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  urlBase = environment.baseUrl;
  impresoras?: Impresora[] = [];

  constructor(private http: HttpClient) { }

  //Endpoints Impresoras
  //Listado de Impresoras
  getImpresoras(): Observable<Impresora[]>{
    return this.http.get<Impresora[]>(`${this.urlBase}/impresoras`);
  }
  //Listado de Impresoras con ping
  getImpresoraPing(): Observable<ImpresoraPing[]>{
    return this.http.get<ImpresoraPing[]>(`${this.urlBase}/impresoras/Ping`)
  }
  //Detalle de una Impresora
  getImpresoraDetalle(id: string): Observable<ImpresoraDetalle>{
    return this.http.get<ImpresoraDetalle>(`${this.urlBase}/impresoras/Detalle/${id}`)
  }
  //Listado Impresoras Paginacion
  getImpresoraPaginacion(paginacion: PaginacionImpresoraReq): Observable<PaginacionImpresoraRes>{
    return this.http.post<PaginacionImpresoraRes>(`${this.urlBase}/impresoras/paginacion/`, paginacion)
  }



  //Endpoints para Almacen de Refacciones
  //Listado de Almacen
  getAlmacen(): Observable<RefaccionImpresora[]>{
    return this.http.get<RefaccionImpresora[]>(`${this.urlBase}/almacen`)
  }
  //Agregar Refacciones Nuevas
  setRefaccion(refaccion: RefaccionImpresora): Observable<string>{
    return this.http.post<string>(`${this.urlBase}/almacen/refaccion`, refaccion)
  }
  //Editar Refaccion
  editRefaccion(refaccion: RefaccionImpresora): Observable<string>{
    return this.http.put<string>(`${this.urlBase}/almacen/refaccion/${refaccion.refaccionId}`, refaccion)
  }
  //Borrar Refaccion
  deleteRefaccion(id: number):Observable<string>{
    return this.http.delete<string>(`${this.urlBase}/almacen/refaccion/${id}`)
  }




  getRefaFiltro(filtro: FiltroRefa): Observable<RefaccionImpresora[]>{
    return this.http.post<RefaccionImpresora[]>(`${this.urlBase}/almacen/filtro`, filtro);
  }
  getEdificios(): Observable<string[]>{
    return this.http.get<string[]>(`${this.urlBase}/impresoras/edificios`);
  }
  getModelos(): Observable<string[]>{
    return this.http.get<string[]>(`${this.urlBase}/impresoras/modelos`)
  }

  getUbicaciones(consulta: object): Observable<string[]>{
    return this.http.post<string[]>(`${this.urlBase}/impresoras/Ubicaciones`, consulta);
  }

  getImpresorasFiltro(filtroImpresora: FiltroImpresora): Observable<Impresora[]>{
    return this.http.post<Impresora[]>(`${this.urlBase}/impresoras/Filtro`, filtroImpresora);
  }

  setRegistroConsumible(registro: RegCambioRefaImp):  Observable<string>{
    return this.http.post<string>(`${this.urlBase}/ControlToner/Registro`, registro);
  }


}
