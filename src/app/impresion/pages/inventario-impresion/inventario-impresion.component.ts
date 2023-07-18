import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { Impresora, ImpresoraDetalle, ImpresoraPing, PaginacionImpresoraReq, PaginacionImpresoraRes } from '../../interfaces/impresora.interface';
import { timer } from 'rxjs'
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-inventario-impresion',
  templateUrl: './inventario-impresion.component.html',
  styleUrls: ['./inventario-impresion.component.css']
})
export class InventarioImpresionComponent implements OnInit {

  TIME_INTERVAL: number = 10000;

  cargando: boolean = true;

  detalles: boolean = false;

  impresoraSelected: ImpresoraDetalle = {
    impresora: {
      impresoraId: '',
      nombre: '',
      modelo: '',
      serie: '',
      ip: '',
      mac: '',
      edificio: '',
      ubicacion: ''
    },
    cont102: 0,
    cont109: 0,
    cont124: 0,
    blackLevel: 0,
    cyanLevel: 0,
    magentaLevel: 0,
    yellowLevel: 0
  }

  dataGrafico: any;
  options: any;

  termino: string = '';

  constructor(private impresionService: ImpresionService){}

  paginacionRes: PaginacionImpresoraRes = {
    pageSize: 0,
    page: 0,
    pageQuantity: 0,
    totalRows: 0,
    data: []
  }

  paginacionReq: PaginacionImpresoraReq = {
    pageSize: 10,
    page: 1,
    sort: 'serie',
    sortDirection: 'asc',
    filter: '',
    skip: 0
  }

  ngOnInit(): void {
    this.getPeriodical();
  }

  listarImpresoras(){
    this.impresionService.getImpresoraPaginacion(this.paginacionReq).subscribe(data => {
      this.paginacionRes = data;
      console.log('periodico')
    })
  }
  getPeriodical(){
    timer(0, this.TIME_INTERVAL).subscribe(res => this.listarImpresoras())
  }
  loadData(event: TableLazyLoadEvent){
    this.cargando = true;

    this.paginacionReq.pageSize = event.rows!;
    this.paginacionReq.skip = event.first!;


    if(event.sortField == undefined){
      this.paginacionReq.sort = 'serie';
      this.impresionService.getImpresoraPaginacion(this.paginacionReq).subscribe(data =>{
        this.cargando = false;
        this.paginacionRes = data;
      })
    }else{
      if(event.sortOrder == 1){
        this.paginacionReq.sortDirection = 'desc'
        this.paginacionReq.sort = event.sortField.toString();
        this.impresionService.getImpresoraPaginacion(this.paginacionReq).subscribe(data =>{
          this.cargando = false;
          this.paginacionRes = data;
        })
      }else{
        this.paginacionReq.sortDirection = 'asc'
        this.paginacionReq.sort = event.sortField.toString();
        this.impresionService.getImpresoraPaginacion(this.paginacionReq).subscribe(data =>{
          this.cargando = false;
          this.paginacionRes = data;
        })
      }
    }
  }
  getSeverity(estado: boolean):string{
    if(estado){
      return 'success'
    }else{
      return 'danger'
    }
  }

  buscar(){
    this.paginacionReq.filter = this.termino;
    this.listarImpresoras();
    console.log(this.termino)
  }


  //Funciones Dialogo Detalles
  openDialogDetalle(impresora: Impresora){
    this.impresionService.getImpresoraDetalle(impresora.impresoraId).subscribe(res => {
      console.log(res);
      this.impresoraSelected = res;

      if(res.impresora.modelo == 'C356IF'){
        this.dataGrafico = {
          labels: ['Black Level', 'Cyan Level', 'Magenta Level', 'Yellow Level'],
          datasets: [
            {
              label: 'Toner Level',
              data: [80, 50, 20, 60, 100],
              backgroundColor: ['rgba(0, 0, 0, 0.2)', 'rgba(0, 255, 255, 0.2)', 'rgba(255, 0, 255, 0.2)', 'rgba(255, 255, 0, 0.2)'],
              borderColor: ['rgb(0, 0, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 255)', 'rgb(255, 255, 0)'],
              borderWidth: 1,
              fill: false
            }
          ]
        }
      }else{
        this.dataGrafico = {
          labels: ['','Black Level',''],
          datasets: [
            {
              label: 'Toner Level',
              data: [0,80,0,100],
              backgroundColor: ['rgba(0, 0, 0, 0.2)'],
              borderColor: ['rgb(0, 0, 0)'],
              borderWidth: 1,
              fill: false
            }
          ]
        }
      }

      this.options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
                color: '#6c757d'
            },
            grid: {
                color: '#dfe7ef',
                drawBorder: false
            }
          },
          y:{
            ticks: {
              color: '#6c757d'
            },
            grid: {
                color: '#dfe7ef',
                drawBorder: false
            }
          }
        }
      }

      this.detalles = true;
    })
  }


  openDialogAgregar(){

  }






}
