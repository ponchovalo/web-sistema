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

  
  impresoraDetalle: ImpresoraDetalle = {
    impresora: {
      nombre: strin
    },
    cont102: 0,
    cont109: 0,
    cont124: 0,
    blackLevel: 0,
    cyanLevel: 0,
    magentaLevel: 0,
    yellowLevel: 0,
  };
  
  print?: Impresora = {};

  ngOnInit(): void {

    this.print = this.dialogRef._containerInstance._config.data.impresora;
    console.log(this.print?.impresoraId)

    this.getDetalleImpresora(this.print?.impresoraId!);

  }

  getDetalleImpresora(id: string){
      this.impresoraService.getImpresoraDetalle(id).subscribe(impresora => {
      this.impresoraDetalle = impresora
      return this.impresoraDetalle;
    })
  }

}
