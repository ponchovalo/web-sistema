import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { ImpresoraDetalle } from '../../interfaces/impresora.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReporteMensualComponent } from '../../components/reporte-mensual/reporte-mensual.component';

@Component({
  selector: 'app-reportes-impresion',
  templateUrl: './reportes-impresion.component.html',
  styleUrls: ['./reportes-impresion.component.css']
})
export class ReportesImpresionComponent implements OnInit{

  reporteMensual: ImpresoraDetalle[] = [];

  ref: DynamicDialogRef | undefined;

  constructor(private impresioService: ImpresionService, public dialogService: DialogService){};

  ngOnInit(): void {
    
  }

  getReporteMensual(){
    this.impresioService.getReporteMenusal().subscribe(data => {
      this.reporteMensual = data;
    })
  }

  openDialogMensual(){
    this.getReporteMensual();
    this.ref = this.dialogService.open(ReporteMensualComponent, {
      header: "Generar Nuevo Reporte Mensual",
      width: "90%",
      height: "70%",
      maximizable: true,
      data: {
        datosReporte: this.reporteMensual
      }
    })

  }

}
