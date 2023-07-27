import { Component, OnInit } from '@angular/core';
import { FiltroImpresora, FiltroRefa, Impresora, PaginacionReq, RefaccionImpresora } from '../../interfaces/impresora.interface';
import { ImpresionService } from '../../services/impresion.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ControlTonerDialogComponent } from '../../components/control-toner-dialog/control-toner-dialog.component';

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

  impresoraSelected: Impresora = {
    impresoraId: '',
    nombre: '',
    modelo: '',
    serie: '',
    ip: '',
    mac: '',
    edificio: '',
    ubicacion: ''
  }

  refaccionSelected: RefaccionImpresora = {
    noParte: '',
    nombre: '',
    descripcion: '',
    modeloImpresora: '',
    tipo: '',
    vidaUtil: 0,
    cantidad: 0
  }

  paginacionReq: PagReq = {
    pageSize: 0,
    page: 0,
    sort: '',
    sortDirection: '',
    filter: '',
    filterId: 0,
    skip: 0,
    fechaInicial: new Date,
    fechaFinal: new Date
  }

  ref: DynamicDialogRef | undefined;

  constructor (private impresionService: ImpresionService, public dialogService: DialogService){}

  ngOnInit(): void {
    this.obtenerFechas();
  }


  listarElementos(event: any) {
    this.initElementSelected();
    if(event == 'IMPRESORA'){
      this.impresionService.getImpresoras().subscribe(data => {
        this.elementos = data;
        this.impresoraSelected = this.elementos[0];
      })

    }else if(event == 'REFACCION'){
      this.impresionService.getAlmacen().subscribe(data => {
        this.elementos = data;
        this.refaccionSelected = this.elementos[0];
      })
    }
  }
  
  initElementSelected(){
    this.impresoraSelected = {
      impresoraId: '',
      nombre: '',
      modelo: '',
      serie: '',
      ip: '',
      mac: '',
      edificio: '',
      ubicacion: ''
    }
    this.refaccionSelected = {
      refaccionId:'',
      noParte: '',
      nombre: '',
      descripcion: '',
      modeloImpresora: '',
      tipo: '',
      vidaUtil: 0,
      cantidad: 0
    }
    this.elementos = [];
  }
  borrarFiltro(){
    this.filtroPor = "";
    this.impresoraSelected = {
      impresoraId: '',
      nombre: '',
      modelo: '',
      serie: '',
      ip: '',
      mac: '',
      edificio: '',
      ubicacion: ''
    }
    this.refaccionSelected = {
      refaccionId:'',
      noParte: '',
      nombre: '',
      descripcion: '',
      modeloImpresora: '',
      tipo: '',
      vidaUtil: 0,
      cantidad: 0
    }
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
      this.paginacionReq = {
        pageSize: 10,
        page: 0,
        sort: 'fecha',
        sortDirection: 'asc',
        filter: '',
        filterId: 0,
        skip: 0,
        fechaInicial: this.fechaInicial,
        fechaFinal: this.fechaFinal
      }
      this.ref = this.dialogService.open(ControlTonerDialogComponent, {
        header: "Dialogo de Listado de Refacciones",
        width: "70%",
        maximizable: true,
        data: {
          paginacionReq: this.paginacionReq
        }
      })
      this.impresionService.getPagRegConsumible(this.paginacionReq).subscribe(data => {
      })
    }else{
      if(this.filtroPor == 'IMPRESORA'){
        this.paginacionReq = {
          pageSize: 10,
          page: 0,
          sort: 'fecha',
          sortDirection: 'asc',
          filter: 'IMPRESORA',
          filterId: Number(this.impresoraSelected.impresoraId),
          skip: 0,
          fechaInicial: this.fechaInicial,
          fechaFinal: this.fechaFinal
        }

        this.impresionService.getPagRegConsumible(this.paginacionReq).subscribe(data => {
        })

      }else if(this.filtroPor == 'REFACCION'){
        this.paginacionReq = {
          pageSize: 10,
          page: 0,
          sort: 'fecha',
          sortDirection: 'asc',
          filter: 'REFACCION',
          filterId: Number(this.refaccionSelected.refaccionId),
          skip: 0,
          fechaInicial: this.fechaInicial,
          fechaFinal: this.fechaFinal
        }
        this.impresionService.getPagRegConsumible(this.paginacionReq).subscribe(data => {

        })

      }else{
        console.log('no se elijio')
      }
    }
  }

 

 

}
