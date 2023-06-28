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

  titleColumns: string[] = ["NOMBRE", "MODELO", "SERIE", "IP", "MAC", "EDIFICIO", "UBICACION", "ACCIONES"]

  displayedColumns = ['nombre', 'modelo', 'serie', 'ip', 'mac', 'edificio', 'ubicacion', 'accion'];
  dataSource: Impresora[] = [];

  constructor(private impresionService: ImpresionService, private dialog: MatDialog){}

  ngOnInit(): void {

    //this.dataSource =
    this.listarImpresoras();

  }

  listarImpresoras(){
    this.impresionService.getImpresoras().subscribe(
      impresoras => { this.dataSource = impresoras}
    );
  }

  openDialog(){
    const dialogImp = this.dialog.open(EdicionImpresoraComponent,{
      width: '550px'
    });
  }

}
