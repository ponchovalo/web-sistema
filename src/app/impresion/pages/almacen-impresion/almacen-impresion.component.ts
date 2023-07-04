import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { RefaccionImpresora } from '../../interfaces/impresora.interface';

@Component({
  selector: 'app-almacen-impresion',
  templateUrl: './almacen-impresion.component.html',
  styleUrls: ['./almacen-impresion.component.css']
})
export class AlmacenImpresionComponent implements OnInit{

  constructor(private impresionService: ImpresionService){}

  encabezado: string[] = ["NOMBRE", "NO PARTE", "MODELO IMPRESORA", "TIPO", "CANTIDAD"];
  listaRefacciones?: RefaccionImpresora[];

  ngOnInit(): void {
    this.getListadoRefacciones();

  }

  getListadoRefacciones(){
    this.impresionService.getAlmacen().subscribe(data => {
      this.listaRefacciones = data;
      console.log(data);
    })
  }

}
