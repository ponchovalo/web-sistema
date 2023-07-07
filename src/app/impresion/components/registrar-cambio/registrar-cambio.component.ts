import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FiltroRefa, Impresora, ImpresoraDetalle, RefaccionImpresora, RegCambioRefaImp } from '../../interfaces/impresora.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { ImpresionService } from '../../services/impresion.service';

@Component({
  selector: 'app-registrar-cambio',
  templateUrl: './registrar-cambio.component.html',
  styleUrls: ['./registrar-cambio.component.css']
})
export class RegistrarCambioComponent implements OnInit{
  constructor(private dialogRef: MatDialogRef<ImpresoraDetalle>, private impresionService: ImpresionService){}
  detalles?: ImpresoraDetalle;
  datos: boolean= false;

  registro: RegCambioRefaImp = {
    cantidad: 0,
    idRefaccion: 0,
    idImpresora: 0,
    cont102: 0,
    cont109: 0,
    cont124: 0,
  };

  filtro: FiltroRefa = {
    modelo: "",
    tipo: ""
  }
  idRefa: string = "";
  titulo: string = "";

  opcionTipo: string[] = ["CONSUMIBLE", "REFACCION"];
  modelos: string[] = ["MF525DW", "ILBP352DN", "IRA4545I", "C356IF"]

  refacciones?: RefaccionImpresora[];

  ngOnInit(): void {
    this.getData();
  }

  getData(){

    if(this.dialogRef._containerInstance._config.data == null){
      this.datos == false;
      return
    }

    this.datos = true;

    const info: ImpresoraDetalle = this.dialogRef._containerInstance._config.data.detalles;
    this.detalles = info;

    this.titulo = this.detalles.impresora.nombre;
    this.registro.cantidad = 1;
    this.registro.idImpresora = parseInt(info.impresora.impresoraId);
    this.registro.cont102 = info.cont102;
    this.registro.cont109 = info.cont109;
    this.registro.cont124 = info.cont124;

    this.filtro.modelo = info.impresora.modelo;

  }

  printData(){
    console.log(this.registro)
    this.cerrarDialog();
  }

  getRefaccion(){
    this.impresionService.getRefaFiltro(this.filtro).subscribe(data => {
      this.refacciones = data;
    })
  }
  getIdRefaccion(){
    this.registro.idRefaccion = parseInt(this.idRefa);
  }

  cerrarDialog(){
    this.dialogRef.close(true);
  }

}
