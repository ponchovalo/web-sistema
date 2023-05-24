import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { Impresora } from '../../interfaces/impresora.interface';
import { MatDialog } from '@angular/material/dialog';
import { EdicionImpresoraComponent } from '../../components/edicion-impresora/edicion-impresora.component';

@Component({
  selector: 'app-inventario-impresion',
  templateUrl: './inventario-impresion.component.html',
  styleUrls: ['./inventario-impresion.component.css']
})
export class InventarioImpresionComponent implements OnInit {

  displayedColumns = ['nombre', 'modelo', 'serie', 'ip', 'mac', 'edificio', 'ubicacion'];
  dataSource: Impresora[] = [];

  constructor(private impresionService: ImpresionService, private dialog: MatDialog){}

  ngOnInit(): void {

    this.dataSource = this.impresionService.obtenerImpresoras();

  }

  openDialog(){
    const dialogImp = this.dialog.open(EdicionImpresoraComponent,{
      width: '550px'
    });
  }

}
