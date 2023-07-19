import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { Impresora, ImpresoraDetalle, ImpresoraPing, PaginacionImpresoraReq, PaginacionImpresoraRes } from '../../interfaces/impresora.interface';
import { Observable, catchError, of, timer } from 'rxjs'
import { TableLazyLoadEvent } from 'primeng/table';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-inventario-impresion',
  templateUrl: './inventario-impresion.component.html',
  styleUrls: ['./inventario-impresion.component.css']
})
export class InventarioImpresionComponent implements OnInit {

  mensajeModelo: Message[] = []

  TIME_INTERVAL: number = 10000;

  cargando: boolean = true;

  detalles: boolean = false;

  editar: boolean = false;

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
    yellowLevel: 0,
    mensaje: 'Success'
  }
  dataGrafico: any;
  options: any;
  termino: string = '';

  impresoraEditar: Impresora = {
    impresoraId: '',
    nombre: '',
    modelo: '',
    serie: '',
    ip: '',
    mac: '',
    edificio: '',
    ubicacion: ''
  }

  tituloEditar: string = '';

  constructor(private impresionService: ImpresionService, private messageService: MessageService){}

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
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(error.error.errors){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.title });
        for(const [key, value] of Object.entries(error.error.errors)){
          const detalle: any = value;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: detalle });
        }
      }

      return of(result as T);
    };
  }

  listarImpresoras(){
    this.impresionService.getImpresoraPaginacion(this.paginacionReq).subscribe(data => {
      this.paginacionRes = data;
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
  getSeverity(impresora: ImpresoraPing):string{
    if(impresora.statusImpresoraPing){
      return 'success'
    }else if(impresora.mensajeImpresoraPing == "TimedOut"){
      return 'danger'
    }else{
      return 'warning'
    }
  }

  buscar(){
    this.paginacionReq.filter = this.termino;
    this.listarImpresoras();
  }


  //Funciones Dialogo Detalles
  openDialogDetalle(impresora: Impresora){
    this.impresionService.getImpresoraDetalle(impresora.impresoraId).subscribe(res => {
      this.impresoraSelected = res;
      if(res.mensaje == 'ErrorModelo'){
        this.mensajeModelo =
        [{severity: 'error', summary: 'Error', detail: 'Los OIDs para este modelo de impresora no estan especificados, compruebe el modelo de impresora'}]
      }else if(res.mensaje == 'TimeOut'){
        this.mensajeModelo =
        [{severity: 'warn', summary: 'Timed Out', detail: 'No se recibieron datos en el servidor intente nuevamente'}]
      }else if(res.mensaje == 'NotOnline'){
        this.mensajeModelo =
        [{severity: 'info', summary: 'Not Online', detail: 'Esta Impresora no esta en red'}]
      }

      if(res.impresora.modelo == 'C356IF'){
        this.dataGrafico = {
          labels: ['Black Level', 'Cyan Level', 'Magenta Level', 'Yellow Level'],
          datasets: [
            {
              label: 'Toner Level',
              data: [res.blackLevel, res.cyanLevel, res.magentaLevel, res.yellowLevel, 100],
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
              data: [0,res.blackLevel,0,100],
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

  //Funciones Editar y Agregar Impresora
  openDialogEditar(impresora: Impresora | null){
    this.impresoraEditar = {
      impresoraId: '',
      nombre:'',
      modelo:'',
      serie:'',
      ip:'',
      mac:'',
      edificio:'',
      ubicacion:''
    }
    if(impresora != null){
      this.impresoraEditar = impresora;
      this.tituloEditar = `Editar Impresora ${this.impresoraEditar.nombre}`
    }else{
      this.impresoraEditar = {
        impresoraId: '',
        nombre:'',
        modelo:'',
        serie:'',
        ip:'',
        mac:'',
        edificio:'',
        ubicacion:''
      };
      this.tituloEditar = `Impresora Nueva`;
    }
    this.editar = true;
  }

  guardarCambios(){
    if(this.impresoraEditar.impresoraId == ''){
      this.impresionService.setNuevaImpresora(this.impresoraEditar).pipe(
        catchError(this.handleError<string>('Nueva Impresora'))
      ).subscribe(data =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.impresoraEditar.nombre} Creada Correctamente` });
        this.listarImpresoras();
      })
    }else{
      this.impresionService.setEdicionImpresora(this.impresoraEditar).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.impresoraEditar.nombre} Editada Correctamente` })
        this.listarImpresoras();
      })
    }
  }
}
