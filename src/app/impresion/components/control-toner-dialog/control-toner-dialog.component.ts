import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogInjector, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ImpresionService } from '../../services/impresion.service';
import { PaginacionControTonerRes } from '../../interfaces/impresora.interface';
import { TableLazyLoadEvent } from 'primeng/table';

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
  selector: 'app-control-toner-dialog',
  templateUrl: './control-toner-dialog.component.html',
  styleUrls: ['./control-toner-dialog.component.css']
})
export class ControlTonerDialogComponent implements OnInit {

  ref: DynamicDialogInjector | undefined;
  paginacion!: PagReq;
  
  paginacionRes: PaginacionControTonerRes = {
    pageSize: 0,
    page: 0,
    pageQuantity: 0,
    totalRows: 0,
    data: []
  }

  cargando:boolean = false;
  termino: string = "";

  constructor(private impresionService: ImpresionService, public dialogService: DialogService, public config: DynamicDialogConfig){}

  

  ngOnInit(): void {
    this.paginacion = this.config.data.paginacionReq;
    this.listarRegistros();
  }

  listarRegistros(){
    this.impresionService.getPagRegConsumible(this.paginacion).subscribe(data => {
      this.paginacionRes = data;
      console.log(this.paginacionRes)
    })
  }

  loadData(event: TableLazyLoadEvent){
    console.log(event)
    this.paginacion.pageSize = Number(event.rows);
    this.paginacion.skip = Number(event.first);
    this.listarRegistros();
  }

  buscar(){
    console.log(this.termino)
  }






}
