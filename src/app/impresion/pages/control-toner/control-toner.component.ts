import { Component, OnInit } from '@angular/core';
import { FiltroImpresora, FiltroRefa, Impresora, PaginacionReq, RefaccionImpresora } from '../../interfaces/impresora.interface';
import { ImpresionService } from '../../services/impresion.service';

interface PagReq {
  pageSize: number;
  page: number;
  sort: string;
  sortDirection: string;
  filter: string;
  filterId: number;
  skip: number;
  fechaInicial: Date;
  fechaFinal: Date;
}


@Component({
  selector: 'app-control-toner',
  templateUrl: './control-toner.component.html',
  styleUrls: ['./control-toner.component.css']
})
export class ControlTonerComponent implements OnInit {

  reporteTotal: boolean = true;

  tipoFecha: string = 'mes';

  fechaInicial!: Date;
  fechaFinal!: Date;

  fechaActual!: Date;

  filtroPor = ''

  opciones = [{'nombre':'IMPRESORA'},{'nombre':'REFACCION'},{'nombre':''}]
  
  elementos: Impresora[] | RefaccionImpresora[] = [];

  elementSelected: Impresora | RefaccionImpresora | null = null;

  imp: Impresora = {
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
    this.obtenerFechas();
  }

  listarElementos(event: any) {
    this.elementSelected = null;
    if(event == 'IMPRESORA'){
      this.impresionService.getImpresoras().subscribe(data => {
        this.elementos = data;
        this.elementSelected = this.elementos[0];
      })

    }else if(event == 'REFACCION'){
      this.impresionService.getAlmacen().subscribe(data => {
        this.elementos = data;
        this.elementSelected = this.elementos[0];
      })
    }
  }

  borrarFiltro(){
    this.elementSelected = null;
    this.elementos = [];
  }

  obtenerFechas(){
    const tiempo = Date.now();
    this.fechaActual = new Date(tiempo);

    const diaSemana = this.fechaActual.getDay()
    const day = this.fechaActual.getDate();
    const month = this.fechaActual.getMonth();
    const year = this.fechaActual.getFullYear();

    if(this.tipoFecha == 'mes'){
    
      if(month == 1 || 3 || 5 || 7 || 8 || 10 || 12){
        this.fechaInicial = new Date(year, month, 1);
        this.fechaFinal = new Date(year, month, 31)
      }else{
        this.fechaInicial = new Date(year, month, 1);
        this.fechaFinal = new Date(year, month, 30)
      }

    }else if(this.tipoFecha == 'semana'){

      this.fechaInicial = new Date(year, month, day - diaSemana);
      this.fechaFinal = new Date(year, month, day + (6-diaSemana));

    }else if(this.tipoFecha == 'hoy'){

      this.fechaInicial = new Date(year, month, day);
      this.fechaFinal = new Date(year, month, day);

    }else{
      this.fechaInicial = new Date();
      this.fechaFinal = new Date();
    }

  }

  generarReporte(){
    if(this.reporteTotal){
      console.log('Total')
    }else{
      if(this.filtroPor == 'IMPRESORA'){

      }else if(this.filtroPor == 'REFACCION'){

      }else{
        console.log('no se elijio')
      }
    }
  }

 

 

}
