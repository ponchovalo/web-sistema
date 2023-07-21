import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { PaginacionRefaccionRes, PaginacionReq, RefaccionImpresora } from '../../interfaces/impresora.interface';
import { TableLazyLoadEvent } from 'primeng/table';


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

  constructor(private impresionService: ImpresionService){}




  ngOnInit(): void {
    this.listarRefacciones();
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

  openDialogEditar(){

  }

  getSeverity(){
    return "success"
  }

  openDialogConfirmacion(){

  }



}
