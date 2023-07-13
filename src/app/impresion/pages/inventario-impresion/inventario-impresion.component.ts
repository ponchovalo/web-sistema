import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { Impresora, ImpresoraPing, PaginacionImpresoraReq, PaginacionImpresoraRes } from '../../interfaces/impresora.interface';
import { MatDialog } from '@angular/material/dialog';
import { EdicionImpresoraComponent } from '../../components/edicion-impresora/edicion-impresora.component';
import { DetalleImpresoraComponent } from '../../components/detalle-impresora/detalle-impresora.component';
import { timer } from 'rxjs'

@Component({
  selector: 'app-inventario-impresion',
  templateUrl: './inventario-impresion.component.html',
  styleUrls: ['./inventario-impresion.component.css']
})
export class InventarioImpresionComponent implements OnInit {

  titleColumns: string[] = ["NOMBRE", "MODELO", "SERIE", "IP", "EDIFICIO", "UBICACION", "PING", "LAST PING", "ACCIONES"];
  dataSource: Impresora[] = [];

  TIME_INTERVAL: number = 10000;

  busca: string = "";

  constructor(private impresionService: ImpresionService, private dialog: MatDialog){}

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
    filter: ''
  }

  ngOnInit(): void {

    //this.listarImpresorasPing();
    this.getPeriodical();
    //this.listarImpresoras();

  }

  listarImpresoras(){
    this.impresionService.getImpresoraPaginacion(this.paginacionReq).subscribe(data => {
      this.paginacionRes = data;
    })
  }
  busqueda(){
  }

  pagina(event:any){
    this.paginacionReq.pageSize = event.pageSize;
    this.paginacionReq.page = event.pageIndex + 1;
    this.listarImpresoras();
    console.log(event);
  }


  //listarImpresorasPing(){
  //  this.impresionService.getImpresoraPing().subscribe(
  //    impresoras => {
  //      this.dataSource = impresoras
  //    }
  //  );
  //}

  openDialogAgregar(){
    this.dialog.open(EdicionImpresoraComponent,{
      width: '550px'
    });
  }

  openDialogDetalle(impresora: Impresora){
    this.dialog.open(DetalleImpresoraComponent, {
      width: '700px',
      data: {impresora: impresora}
    })
  }

  getPeriodical(){
    timer(0, this.TIME_INTERVAL).subscribe(res => this.listarImpresoras())
  }



}
