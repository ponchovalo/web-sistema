import { Injectable } from '@angular/core';
import { Impresora } from '../interfaces/impresora.interface';

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

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
    }
  ]
  constructor() { }

  obtenerImpresoras(){
    return this.listaImpresoras.slice();
  }

}
