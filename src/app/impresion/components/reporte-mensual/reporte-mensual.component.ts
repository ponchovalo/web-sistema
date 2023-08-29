import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ImpresoraDetalle } from '../../interfaces/impresora.interface';

@Component({
  selector: 'app-reporte-mensual',
  templateUrl: './reporte-mensual.component.html',
  styleUrls: ['./reporte-mensual.component.css']
})
export class ReporteMensualComponent implements OnInit{

  reporteMensual: ImpresoraDetalle[] = [];


  constructor(public config: DynamicDialogConfig){}


  ngOnInit(): void {

    this.reporteMensual = this.config.data.datosReporte;

    console.log(this.reporteMensual)
  }

  guradarReporte(){
    console.log(this.reporteMensual)
  }

}
