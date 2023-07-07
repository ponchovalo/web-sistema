import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { Impresora, ImpresoraDetalle } from '../../interfaces/impresora.interface';
import { ImpresionService } from '../../services/impresion.service';
import { RegistrarCambioComponent } from '../registrar-cambio/registrar-cambio.component';

@Component({
  selector: 'app-detalle-impresora',
  templateUrl: './detalle-impresora.component.html',
  styleUrls: ['./detalle-impresora.component.css']
})
export class DetalleImpresoraComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<DetalleImpresoraComponent>, private impresoraService: ImpresionService, private dialog: MatDialog) {}

  print?: Impresora;
  printDetalles?: ImpresoraDetalle;
  nivelNegro: string = "100%";
  color: boolean = false;
  nivelCyan: string = "100%";
  nivelMagenta: string = "100%";
  nivelAmarillo: string = "100%";

  ngOnInit(): void {
    this.print = this.dialogRef._containerInstance._config.data.impresora;

    this.getDetalleImpresora(this.print?.impresoraId!);

    //this.nivel = this.getNivel(this.dialogRef._containerInstance._config.data);
  }

  getDetalleImpresora(id: string){
      this.impresoraService.getImpresoraDetalle(id).subscribe(impresora => {
        this.printDetalles = impresora;
        console.log(this.printDetalles.blackLevel)

        this.nivelNegro = this.getNivel(this.printDetalles.blackLevel);
        this.nivelCyan = this.getNivel(this.printDetalles.cyanLevel);
        this.nivelMagenta = this.getNivel(this.printDetalles.magentaLevel);
        this.nivelAmarillo = this.getNivel(this.printDetalles.yellowLevel);
        if(this.printDetalles.impresora.modelo == "C356IF"){
          this.color = true;
        }

    })
  }

  getImpresoraDialog(): Impresora{
    return this.dialogRef._containerInstance._config.data.impresora;
  }

  getNivel(nivel: number): string{
    let lev : string = nivel.toString();
    return `${lev}%`
  }
  cerrarDialog(){
    this.dialogRef.close(true)
  }

  dialogRegistrar(detalles?: ImpresoraDetalle){
    this.dialog.open(RegistrarCambioComponent, {
      width: '700px',
      data:{detalles: detalles}
    });
  }

}
