import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { Impresora } from '../../interfaces/impresora.interface';

@Component({
  selector: 'app-inventario-impresion',
  templateUrl: './inventario-impresion.component.html',
  styles: [
  ]
})
export class InventarioImpresionComponent implements OnInit {

  displayedColumns = ['nombre', 'modelo', 'serie', 'ip', 'mac', 'edificio', 'ubicacion'];
  dataSource: Impresora[] = [];

  constructor(private impresionService: ImpresionService){}

  ngOnInit(): void {

    this.dataSource = this.impresionService.obtenerImpresoras();
    
  }

}
