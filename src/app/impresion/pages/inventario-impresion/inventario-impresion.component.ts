import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { Impresora, ImpresoraPing } from '../../interfaces/impresora.interface';
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
  dataSource: ImpresoraPing[] = [];

  TIME_INTERVAL: number = 10000;

  busca: string = "";

  constructor(private impresionService: ImpresionService, private dialog: MatDialog){}

  ngOnInit(): void {

    //this.listarImpresorasPing();
    this.getPeriodical();

  }

  busqueda(){
    let data = this.dataSource.filter( dato => 
      (dato.impresora.nombre.toLowerCase().indexOf(this.busca.toLowerCase()) >= 0) ||
      (dato.impresora.modelo.toLowerCase().indexOf(this.busca.toLowerCase()) >= 0)
      
    );
    this.dataSource = data
    
    console.log(data)
  }


  listarImpresorasPing(){
    this.impresionService.getImpresoraPing().subscribe(
      impresoras => { 
        this.dataSource = impresoras
      }
    );
  }

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
    timer(0, this.TIME_INTERVAL).subscribe(res => this.listarImpresorasPing())
  }
 
}
