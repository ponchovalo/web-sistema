import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { RefaccionImpresora } from '../../interfaces/impresora.interface';
import { MatDialog } from '@angular/material/dialog';
import { EdicionRefaccionComponent } from '../../components/edicion-refaccion/edicion-refaccion.component';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-almacen-impresion',
  templateUrl: './almacen-impresion.component.html',
  styleUrls: ['./almacen-impresion.component.css']
})
export class AlmacenImpresionComponent implements OnInit{

  constructor(private impresionService: ImpresionService, private dialog: MatDialog ){}

  encabezado: string[] = ["NOMBRE", "NO PARTE", "MODELO IMPRESORA", "TIPO", "CANTIDAD", "ACCIONES"];
  listaRefacciones?: RefaccionImpresora[];

  ngOnInit(): void {
    this.getListadoRefacciones();

  }

  getListadoRefacciones(){
    this.impresionService.getAlmacen().subscribe(data => {
      this.listaRefacciones = data;
    })
  }

  agregarNueva(){
    var dialogRef = this.dialog.open(EdicionRefaccionComponent, {
      width: "700px"
    })
    dialogRef.afterClosed().subscribe(()=>{
      this.getListadoRefacciones();
    })
  }

  editarRefaccion(refa: RefaccionImpresora): void{
    var dialogRef = this.dialog.open(EdicionRefaccionComponent, {
      width: "700px",
      data: {refaccion: refa}
    })
    dialogRef.afterClosed().subscribe(()=>{
      this.getListadoRefacciones();
    })
  }

  eliminarRefaccion(refa: RefaccionImpresora):void{
    let id: number = parseInt(refa.refaccionId!);
    this.impresionService.deleteRefaccion(id).subscribe(() => {
      this.getListadoRefacciones();
    });
    
  }
  

}
