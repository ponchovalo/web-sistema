import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { Impresora, ImpresoraDetalle, ImpresoraPing, PaginacionReq, PaginacionImpresoraRes, FiltroRefa, RegCambioRefaImp, RefaccionImpresora } from '../../interfaces/impresora.interface';
import { Observable, catchError, of, timer } from 'rxjs'
import { TableLazyLoadEvent } from 'primeng/table';
import { Message, MessageService } from 'primeng/api';

//Propiedad tipo
interface Tipo{
  tipo: string
}

@Component({
  selector: 'app-inventario-impresion',
  templateUrl: './inventario-impresion.component.html',
  styleUrls: ['./inventario-impresion.component.css']
})
export class InventarioImpresionComponent implements OnInit {
  //Mensaje de la validacion de modelos e IP en el Dialog para ver detalles
  mensajeModelo: Message[] = []
  mensajeElim: Message[] = []
  //Intervalo de la funcion periodica
  TIME_INTERVAL: number = 10000;
  //propiedad para la mascara de carga
  cargando: boolean = true;
  //propiedad para el dialogo de detalles de impresora
  detallesDialog: boolean = false;
  //propiedad para el dialogo de edicion de impresora
  editarDialog: boolean = false;
  //propiedad para el dialogo de confirmacion de eliminacion
  confirmarDialog: boolean = false;
  //propiedad para el dialogo de agregar cambio de refaccion
  regCambioDialog: boolean = false;
  //propiedad que maneja el estado de errores en las funciones
  errorEditar: boolean = false;
  //propiedad con el titulo del dialogo de editar o nueva impresora
  tituloEditar: string = '';
  //instancia vacia de objeto impresora con detalles
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
  //instancia vacia de objeto impresora para edicion y nueva
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
  //incializacion de instancia de respuesta de paginacion
  paginacionRes: PaginacionImpresoraRes = {
    pageSize: 0,
    page: 0,
    pageQuantity: 0,
    totalRows: 0,
    data: []
  }
  //incializacion de instancia de peticion de paginacion
  paginacionReq: PaginacionReq = {
    pageSize: 10,
    page: 1,
    sort: 'serie',
    sortDirection: 'asc',
    filter: '',
    skip: 0
  }


  //FILTRO PARA REFACCIONES
  filtrorefa: FiltroRefa = {
    modelo: '',
    tipo: ''
  }
  //propiedad tipo
  tipo: Tipo = {
    tipo: ''
  }
  //TIPOS DE REFACCIONES
  tipos: Tipo[] = [{tipo: "CONSUMIBLE"}, {tipo: "REFACCION"}];
  //REGISTRO CAMBIO DE REFACCION O CONSUMOBLE
  regCambio: RegCambioRefaImp = {
    cantidad: 0,
    idRefaccion: 0,
    idImpresora: 0,
    cont102: 0,
    cont109: 0,
    cont124: 0
  }

  //PROPIEDAD REFACCION
  refaccion: RefaccionImpresora = {
    noParte: '',
    nombre: '',
    descripcion: '',
    modeloImpresora: '',
    tipo: '',
    vidaUtil: 0,
    cantidad: 0
  }
  //LISTADO DE REFACCIONES
  refacciones: RefaccionImpresora[] = [];

  scroll: string = "100px";


  constructor(private impresionService: ImpresionService, private messageService: MessageService){}

  ngOnInit(): void {
    this.getPeriodical();
  }
  //Manejador de Erores en las funciones
  handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      //ERROR EDITAR IMPRESORA
      if(operation == "editarImpresora"){
        if(error.status == 404){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errores.mensaje });
          this.errorEditar = true;
        }
      }
      //ERROR NUEVA IMPRESORA
      if(operation == "nuevaImpresora"){
        if(error.status == 400){
          var mensajeErroresArray: string[] = [];

          for(const [key, value] of Object.entries(error.error.errors)){
            const detalle: any = value;
            mensajeErroresArray.push(detalle)
          }

          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.title });
          this.messageService.add({ severity: 'error', summary: 'Error', detail: mensajeErroresArray.toString() });
          this.errorEditar = true;
        }else if(error.status == 404){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errores.mensaje });
          this.errorEditar = true;
        }
      }
      if(operation == "nuevoRegistro"){
        if(error.status == 404){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errores.mensaje });
          this.errorEditar = true;
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
    //FUNCION QUE OBTIENE LOS DATOS
    this.impresionService.getImpresoraDetalle(impresora.impresoraId).subscribe(res => {
      console.log(res);
      this.impresoraSelected = res;
      //VALIDACION DE MODELOS QUE NO TIENEN OID
      if(res.mensaje == 'ErrorModelo'){
        this.mensajeModelo =
        [{severity: 'error', summary: 'Error', detail: 'Los OIDs para este modelo de impresora no estan especificados, compruebe el modelo de impresora'}]
      //VALIDACION EN IMPRESORAS QUE NO RESPONDEN LA SOLICITUD DE OID
      }else if(res.mensaje == 'TimeOut'){
        this.mensajeModelo =
        [{severity: 'warn', summary: 'Timed Out', detail: 'No se recibieron datos en el servidor intente nuevamente'}]
      //VALIDACION CON IMPRESORAS QUE NO ESTAN EN RED
      }else if(res.mensaje == 'NotOnline'){
        this.mensajeModelo =
        [{severity: 'info', summary: 'Not Online', detail: 'Esta Impresora no esta en red'}]
      }

      //GRAFICO PARA LAS IMPRESORAS A COLOR
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
        //GRAFICO PARA IMPRESORA BLANCO Y NEGRO
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
      //OPCIONES PARA DIBUJAR GRAFICA
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
      //DIBUJA EL CUADRO DE DIALOGO
      this.detallesDialog = true;
    })
  }

  //DATOS EN EL DIALOGO PARA NUEVO Y EDICION DE IMPRESORA
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
    this.editarDialog = true;
  }
  //VALIDAR CAMPOS



  //FUNCIONES PARA GUARDAR LAS IMPRESORAS
  guardarCambios(){
    if(this.impresoraEditar.impresoraId == ''){
      this.impresionService.setNuevaImpresora(this.impresoraEditar).pipe(
        //CAPTURADOR DEL ERROR
        catchError(this.handleError<string>('nuevaImpresora'))
      ).subscribe(data =>{
        if(this.errorEditar){
          this.errorEditar = false;
        }else{
          //RESPUESTAS SIN ERRORES
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.impresoraEditar.nombre} Creada Correctamente` });
          this.editarDialog = false;
          this.listarImpresoras();
        }
      })
    }else{
      this.impresionService.setEdicionImpresora(this.impresoraEditar).pipe(
        //CAPTURADOR DEL ERROR
        catchError(this.handleError<string>('editarImpresora'))
      ).subscribe(data => {
        if(this.errorEditar){
          this.errorEditar = false;
        }else{
          //RESPUESTAS SIN ERRORES
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.impresoraEditar.nombre} Editada Correctamente` });
          this.editarDialog = false;
          this.listarImpresoras();
        }

      })
    }
  }

  //CONFIRMACION DE ELIMINACION
  openDialogConfirmacion(impresora: Impresora){
    this.impresoraEditar = impresora;
    this.tituloEditar = `Eliminar ${this.impresoraEditar.nombre}`
    this.mensajeElim =
    [{severity: 'warn', summary: 'Precaución', detail: `Esta seguro de eliminar la impresora ${this.impresoraEditar.nombre}`}]
    this.confirmarDialog = true;
  }
  //ELIMINACION DE IMPRESORA
  eliminarImp(){
    this.impresionService.deleteImpresora(this.impresoraEditar.impresoraId).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.impresoraEditar.nombre} Eliminada` });
      this.confirmarDialog = false;
      this.listarImpresoras();
    })

  }

  //AGREGAR CAMBIO DE REFACCION
  openRegCambioDialog(){
    this.filtrorefa.modelo = this.impresoraSelected.impresora.modelo;
    this.filtrorefa.tipo = "CONSUMIBLE";

    this.impresionService.getRefaFiltro(this.filtrorefa).subscribe(data => {

      this.refacciones = data;

      this.regCambio.cantidad = 1,
      this.regCambio.idImpresora = Number(this.impresoraSelected.impresora.impresoraId);
      this.regCambio.cont102 = this.impresoraSelected.cont102;
      this.regCambio.cont109 = this.impresoraSelected.cont109;
      this.regCambio.cont124 = this.impresoraSelected.cont124;
      this.regCambio.idRefaccion = Number(data[0].refaccionId);

    })

    this.regCambioDialog = true;

  }
  //FUNCION FILTRAR REFACCIONES
  filtroRefacciones(){
    this.filtrorefa.tipo = this.tipo.tipo;
    this.impresionService.getRefaFiltro(this.filtrorefa).subscribe(data => {
      if(data.length == 0){
        this.refacciones = []
      }else{
        this.regCambio.idRefaccion = Number(data[0].refaccionId);
        this.refacciones = data;
      }
    })
  }

  cambioRefaccion(){
    this.regCambio.idRefaccion = Number(this.refaccion.refaccionId);
  }

  guardarRegistro(){
    if(this.regCambio.cont102 > 0 && this.regCambio.cont109 > 0){
      if(this.impresoraSelected.impresora.modelo == "C356IF" && this.regCambio.cont124 <= 0){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Los contadores no pueden estar en cero` });
      }else{
        this.impresionService.setRegistroConsumible(this.regCambio).pipe(
          //MANEJADOR DE ERROR
          catchError(this.handleError<string>('nuevoRegistro'))
        ).subscribe(data => {
          if(this.errorEditar){
            this.errorEditar = false;
          }else{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `Se agregó un nuevo registro para ${this.impresoraSelected.impresora.nombre}` });
            this.regCambioDialog = false;
          }
        })
        console.log(this.regCambio);
      }
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Los contadores no pueden estar en cero` });
    }


  }

}
