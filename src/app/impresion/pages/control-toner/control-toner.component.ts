import { Component, OnInit } from '@angular/core';
import { FiltroImpresora, Impresora, PaginacionReq } from '../../interfaces/impresora.interface';
import { ImpresionService } from '../../services/impresion.service';


interface Edificio {
  edificio: string
}
interface Ubicacion {
  ubicacion: string
}

@Component({
  selector: 'app-control-toner',
  templateUrl: './control-toner.component.html',
  styleUrls: ['./control-toner.component.css']
})
export class ControlTonerComponent implements OnInit {

  paginacionReq: PaginacionReq = {
    pageSize: 10,
    page: 1,
    sort: 'fecha',
    sortDirection: 'asc',
    filter: '',
    skip: 0
  }
  filtro: FiltroImpresora = {
    Edificio: '',
    Ubicacion: ''
  }
  edificios: Edificio[] = [];
  ubicaciones: Ubicacion[] = [];
  impresoras: Impresora[] = [];
  
  impresoraSelect: Impresora = {
    impresoraId: '',
    nombre: '',
    modelo: '',
    serie: '',
    ip: '',
    mac: '',
    edificio: '',
    ubicacion: ''
  }

  

  constructor (private impresionService: ImpresionService){}

  ngOnInit(): void {
    this.listarEdificios()
    this.listarRegistros()
  }

  listarRegistros(){
    this.impresionService.getPagRegConsumible(this.paginacionReq).subscribe(data => {
      console.log(data)
    })
  }

  listarEdificios(){
    this.impresionService.getEdificios().subscribe(data => {
      for(let item of data){
        let edificio: Edificio = {
          edificio: item
        }
        this.edificios.push(edificio);
      }
    });
  }
  listarUbicaciones(event: any){
    if(this.ubicaciones.length >= 0){
      this.ubicaciones = [];
    }
    let edificio: Edificio = {
      edificio: event
    }
    this.impresionService.getUbicaciones(edificio).subscribe(data => {
      for(let item of data){
        let ubicacion: Ubicacion = {
          ubicacion: item
        }
        this.ubicaciones.push(ubicacion);
      }
    })
  }
  listarImpresoras(){
    this.impresionService.getImpresorasFiltro(this.filtro).subscribe(data => {
      this.impresoras = data;
    })
    console.log(this.impresoras)
  }

 

}
