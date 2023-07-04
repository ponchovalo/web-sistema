import { Dialog } from '@angular/cdk/dialog';
import { identifierName } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { Impresora, ImpresoraDetalle } from '../../interfaces/impresora.interface';
import { ImpresionService } from '../../services/impresion.service';

@Component({
  selector: 'app-detalle-impresora',
  templateUrl: './detalle-impresora.component.html',
  styleUrls: ['./detalle-impresora.component.css']
})
export class DetalleImpresoraComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<DetalleImpresoraComponent>, private impresoraService: ImpresionService) {}

  print?: Impresora;
  printDetalles?: ImpresoraDetalle;

  ngOnInit(): void {
    this.print = this.dialogRef._containerInstance._config.data.impresora;
    
    this.getDetalleImpresora(this.print?.impresoraId!);
  }

  getDetalleImpresora(id: string){
      this.impresoraService.getImpresoraDetalle(id).subscribe(impresora => {
        this.printDetalles = impresora;
        console.log(this.printDetalles);
    })
  }

  getImpresoraDialog(): Impresora{
    return this.dialogRef._containerInstance._config.data.impresora;
  }

}
