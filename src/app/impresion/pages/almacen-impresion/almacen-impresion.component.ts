import { Component, OnInit, ViewChild } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { EntradaRefaccion, FiltroRefa, PaginacionRefaccionRes, PaginacionReq, RefaccionImpresora } from '../../interfaces/impresora.interface';
import { TableLazyLoadEvent } from 'primeng/table';
import { Message, MessageService } from 'primeng/api';
import { Observable, catchError, of } from 'rxjs';

interface Select {
  nombre: string
}


@Component({
  selector: 'app-almacen-impresion',
  templateUrl: './almacen-impresion.component.html',
  styleUrls: ['./almacen-impresion.component.css']
})
export class AlmacenImpresionComponent implements OnInit{

  cargando:boolean = false;

  termino: string = "";

  paginacionReq: PaginacionReq = {
    pageSize: 10,
    page: 1,
    sort: 'noParte',
    sortDirection: 'asc',
    filter: '',
    skip: 0
  }

  paginacionRes: PaginacionRefaccionRes = {
    pageSize: 0,
    page: 0,
    pageQuantity: 0,
    totalRows: 0,
    data: []
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

  filtro: FiltroRefa = {
    modelo: '',
    tipo: ''
  }

  refaccionesFiltro: RefaccionImpresora[] = []

  entradaRefaccion: EntradaRefaccion = {
    idRefaccion: 0,
    cantidad: 0
  }

  entradas: EntradaRefaccion[] = [];

  selectEntrdaRefa: RefaccionImpresora = {
    noParte: '',
    nombre: '',
    descripcion: '',
    modeloImpresora: '',
    tipo: '',
    vidaUtil: 0,
    cantidad: 0
  }

  //PROPIEDADES DE DIALOGOS:
  entradaDialog: boolean = false;
  editarDialog: boolean = false;
  confirmarDialog: boolean = false;
  //TITULO DIALOGOS
  tituloDialog: string = "";
  etiqueta: string = "";
  mensajeElim:  Message[] = []

  error: boolean = false;

  modelos: Select[] = [];
  tipos: Select[] =[{'nombre':'CONSUMIBLE'},{'nombre':'REFACCION'},{'nombre':''} ];

  constructor(private impresionService: ImpresionService, private messageService: MessageService){}

  ngOnInit(): void {
    this.obtenerModelos();
    this.listarRefacciones();
  }

  obtenerModelos(){
    this.impresionService.getModelos().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let model: Select = {
          nombre: element
        };
        this.modelos.push(model);
      }
      this.modelos.push({'nombre': ''});
    })
  }

  handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      //ERROR EDITAR REFACCION
      if(operation == "editarRefaccion"){
        if(error.status == 404){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errores.mensaje });
          this.error = true;
        }
      }
      //ERROR NUEVA REFACCION
      if(operation == "nuevaRefaccion"){
        if(error.status == 400){
          var mensajeErroresArray: string[] = [];

          for(const [key, value] of Object.entries(error.error.errors)){
            const detalle: any = value;
            mensajeErroresArray.push(detalle)
          }

          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.title });
          this.messageService.add({ severity: 'error', summary: 'Error', detail: mensajeErroresArray.toString() });
          this.error = true;
        }else if(error.status == 404){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errores.mensaje });
          this.error = true;
        }
      }
      return of(result as T);
    };
  }

  listarRefacciones(){
    this.impresionService.getPaginacionAlmacen(this.paginacionReq).subscribe(data => {
      this.paginacionRes = data;
    })
  }

  loadData(event: TableLazyLoadEvent){
    this.cargando = true;

    this.paginacionReq.pageSize = event.rows!;
    this.paginacionReq.skip = event.first!;

    if(event.sortField == undefined){
      this.paginacionReq.sort = 'noParte';
      this.impresionService.getPaginacionAlmacen(this.paginacionReq).subscribe(data =>{
        this.cargando = false;
        this.paginacionRes = data;
      })
    }else{
      if(event.sortOrder == 1){
        this.paginacionReq.sortDirection = 'desc'
        this.paginacionReq.sort = event.sortField.toString();
        this.impresionService.getPaginacionAlmacen(this.paginacionReq).subscribe(data =>{
          this.cargando = false;
          this.paginacionRes = data;
        })
      }else{
        this.paginacionReq.sortDirection = 'asc'
        this.paginacionReq.sort = event.sortField.toString();
        this.impresionService.getPaginacionAlmacen(this.paginacionReq).subscribe(data =>{
          this.cargando = false;
          this.paginacionRes = data;
        })
      }
    }


  }

  buscar(){
    this.paginacionReq.filter = this.termino;
    this.listarRefacciones();
  }

  openDialogEditar(refaccion: RefaccionImpresora | null){
    if(refaccion == null){
      this.tituloDialog = "Datos de Nueva Refacción";
      this.refaccionSelected = {
        noParte: '',
        nombre: '',
        descripcion: '',
        modeloImpresora: '',
        tipo: '',
        vidaUtil: 0,
        cantidad: 0
      }
    }else{
      this.tituloDialog = `Editar Refacción ${refaccion.nombre}`;
      this.refaccionSelected = refaccion;
    }
    this.editarDialog = true;
  }

  guardarRefaccion(){
    if(!this.refaccionSelected.refaccionId){
      this.impresionService.setRefaccion(this.refaccionSelected).pipe(
        catchError(this.handleError<string>('nuevaRefaccion'))
      ).subscribe(data => {
        if(this.error){
          this.error = false;
        }else{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.refaccionSelected.nombre} Creada Correctamente` });
          this.listarRefacciones();
          this.cerrarDialogEditar();
        }
      })
    }else{
      this.impresionService.editRefaccion(this.refaccionSelected).pipe(
        catchError(this.handleError<string>('editarRefaccion'))
      ).subscribe(data => {
        if(this.error){
          this.error = false;
        }else{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.refaccionSelected.nombre} Editada Correctamente` });
          this.listarRefacciones();
          this.cerrarDialogEditar();
        }
      })
    }
  }

  openDialogEntrada(){
    this.tituloDialog = "Entrada de Refacciones"
    this.entradaDialog = true;
  }


  getSeverity(cantidad:number): string{
    if(cantidad <= 0){
      this.etiqueta = "NO HAY EN EXISTENCIA"
      return "danger"
    }else if(cantidad > 0 && cantidad <= 2){
      this.etiqueta = "POCA EXISTENCIA"
      return "warning"
    }else{
      this.etiqueta = "EN STOCK"
      return "success"
    }
  }

  cerrarDialogEditar(){
    this.editarDialog = false;
  }

    //CONFIRMACION DE ELIMINACION
  openDialogConfirmacion(refaccion: RefaccionImpresora){
    this.refaccionSelected = refaccion;
    this.tituloDialog = `Eliminar ${this.refaccionSelected.nombre}`
    this.mensajeElim =
    [{severity: 'warn', summary: 'Precaución', detail: `Esta seguro de eliminar la impresora ${this.refaccionSelected.nombre}`}]
    this.confirmarDialog = true;
  }
  //ELIMINACION DE IMPRESORA
  eliminarRefaccion(){
    this.impresionService.deleteRefaccion(Number(this.refaccionSelected.refaccionId)).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.refaccionSelected.nombre} Eliminada` });
      this.confirmarDialog = false;
      this.listarRefacciones();
    })

  }

  filtrarRefacciones(){
    this.impresionService.getRefaFiltro(this.filtro).subscribe(data => {
      if(data != null){
        this.refaccionesFiltro = data;
        this.selectEntrdaRefa = this.refaccionesFiltro[0];
        this.selectEntrdaRefa.cantidad = 0;
      }
      
    })
  }

  initEntradas(){
    this.selectEntrdaRefa = {
      refaccionId: '',
      noParte: '',
      nombre: '',
      descripcion: '',
      modeloImpresora: '',
      tipo: '',
      vidaUtil: 0,
      cantidad: 0
    }
    this.entradaRefaccion = {
      nombre: '',
      noParte: '',
      idRefaccion: 0,
      cantidad: 0
    }
    this.filtro = {
      tipo: '',
      modelo: ''
    }

    this.refaccionesFiltro = [this.selectEntrdaRefa];
    
  }
  cancelarEntrada(){
    this.initEntradas();
    this.entradas = [];
    this.entradaDialog = false;
  }

  agregarEntrada(){
    this.entradaRefaccion.nombre = this.selectEntrdaRefa.nombre;
    this.entradaRefaccion.noParte = this.selectEntrdaRefa.noParte;
    this.entradaRefaccion.idRefaccion = Number(this.selectEntrdaRefa.refaccionId);
    this.entradaRefaccion.cantidad = this.selectEntrdaRefa.cantidad;

    if(this.entradaRefaccion.cantidad == 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `La cantidad no puede ir ser "0"` });
    }else{
      this.entradas.push(this.entradaRefaccion);

      this.initEntradas()

      console.log(this.entradas);
    }

    
  }

}
