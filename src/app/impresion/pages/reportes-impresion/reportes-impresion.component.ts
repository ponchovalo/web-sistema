import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { ImpresoraDetalle } from '../../interfaces/impresora.interface';

@Component({
  selector: 'app-reportes-impresion',
  templateUrl: './reportes-impresion.component.html',
  styleUrls: ['./reportes-impresion.component.css']
})
export class ReportesImpresionComponent implements OnInit{

  reporteMensual: ImpresoraDetalle[] = [];

  constructor(private impresioService: ImpresionService){};

  ngOnInit(): void {
    
  }

  getReporteMensual(){
    this.impresioService.getReporteMenusal().subscribe(data => {
      this.reporteMensual = data;
    })
  }

}
