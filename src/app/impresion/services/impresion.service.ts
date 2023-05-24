import { Injectable } from '@angular/core';
import { Impresora } from '../interfaces/impresora.interface';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  urlBase = environment.baseUrl;
  impresoras?: Impresora[] = [];

  listaImpresoras: Impresora[] = [
    {
      id: "6455131a8faace3dc6bee914",
      nombre: 'PPA',
      modelo: 'MF525DW',
      serie: '2BH03553',
      ip: '10.222.18.226',
      mac: '00bb.c17a.5ca5',
      edificio: 'SERVICIOS AL INTERIOR',
      ubicacion: 'PPA'
    },
    {
      id: "6455131a8faace3dc6bee915",
      nombre: 'TIENDA C',
      modelo: 'MF525DW',
      serie: '2BH03818',
      ip: '10.222.17.233',
      mac: '00bb.c17a.5a62',
      edificio: 'DORMITORIO C',
      ubicacion: 'TIENDA C'
    },
    {
      id: "6455131a8faace3dc6bee915",
      nombre: 'TIENDA C',
      modelo: 'MF525DW',
      serie: '2BH03818',
      ip: '10.222.17.233',
      mac: '00bb.c17a.5a62',
      edificio: 'DORMITORIO C',
      ubicacion: 'TIENDA C'
    }
  ]
  constructor(private http: HttpClient) { }

  obtenerImpresoras(){
    this.http.get(this.urlBase + 'api/impresora').subscribe(response => { 
      console.log(response)
    });
    //return this.listaImpresoras.slice();
  }

  getImpresoras(): Observable<Impresora[]>{
    return this.http.get<Impresora[]>(`${this.urlBase}api/impresora`);
  }   

}
