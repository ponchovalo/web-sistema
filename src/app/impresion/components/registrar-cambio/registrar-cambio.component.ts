import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Impresora, ImpresoraDetalle } from '../../interfaces/impresora.interface';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registrar-cambio',
  templateUrl: './registrar-cambio.component.html',
  styleUrls: ['./registrar-cambio.component.css']
})
export class RegistrarCambioComponent implements OnInit{
  constructor(private dialogRef: MatDialogRef<ImpresoraDetalle>){}
  detalles?: ImpresoraDetalle;
  
  ngOnInit(): void {
    const info: ImpresoraDetalle = this.dialogRef._containerInstance._config.data.detalles;
    this.detalles = info;
    console.log(this.detalles.impresora.modelo);
  }

  

}
