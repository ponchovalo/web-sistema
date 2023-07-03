import { Injectable } from '@angular/core';
import { Impresora, ImpresoraDetalle, ImpresoraPing } from '../interfaces/impresora.interface';
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


  getImpresoras(): Observable<Impresora[]>{
    return this.http.get<Impresora[]>(`${this.urlBase}/impresoras`);
  }  
  
  getImpresoraPing(): Observable<ImpresoraPing[]>{
    return this.http.get<ImpresoraPing[]>(`${this.urlBase}/impresoras/Ping`)
  }

  getImpresoraDetalle(id: string): Observable<ImpresoraDetalle>{
    return this.http.get<ImpresoraDetalle>(`${this.urlBase}/impresoras/Detalle/${id}`)
  }

}
