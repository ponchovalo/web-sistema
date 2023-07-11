import { Component, OnInit } from '@angular/core';
import { ImpresionService } from '../../services/impresion.service';
import { RefaccionImpresora } from '../../interfaces/impresora.interface';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edicion-refaccion',
  templateUrl: './edicion-refaccion.component.html',
  styleUrls: ['./edicion-refaccion.component.css']
})
export class EdicionRefaccionComponent implements OnInit{

  constructor(private impresionService: ImpresionService, private dialogRef: MatDialogRef<EdicionRefaccionComponent>){}

  refaccion: RefaccionImpresora = {
    noParte: '',
    nombre: '',
    descripcion: '',
    modeloImpresora: '',
    tipo: '',
    vidaUtil: 0,
    cantidad: 0
  }

  modelos: string[] = [];
  tipos: string[] = ["CONSUMIBLE", "REFACCION"];

  ngOnInit(): void {
    this.getData();
  }

  getData():void{
    this.getModelos();
    if(this.dialogRef._containerInstance._config.data){
      this.getRefaccion();
    }else{
      this.initRefaccion()
    }
  }

  initRefaccion(): void{
    this.refaccion.refaccionId = "";
    this.refaccion.noParte = "";
    this.refaccion.nombre = "";
    this.refaccion.descripcion ="";
    this.refaccion.modeloImpresora = ""
    this.refaccion.tipo = "";
    this.refaccion.vidaUtil = 0;
    this.refaccion.cantidad = 0;
  }

  getRefaccion(): void{
    const refa = this.dialogRef._containerInstance._config.data.refaccion;
    this.refaccion.refaccionId = refa.refaccionId;
    this.refaccion.noParte = refa.noParte;
    this.refaccion.nombre = refa.nombre;
    this.refaccion.descripcion = refa.descripcion;
    this.refaccion.modeloImpresora = refa.modeloImpresora;
    this.refaccion.tipo = refa.tipo;
    this.refaccion.vidaUtil = refa.vidaUtil;
    this.refaccion.cantidad = refa.cantidad;
  }

  getModelos(): void{
    this.impresionService.getModelos().subscribe(data => {
      this.modelos = data;
    });
  }

  addRefaccion(): void{
    if(this.refaccion.refaccionId == ""){
      this.impresionService.setRefaccion(this.refaccion).subscribe();
    }else{
      this.impresionService.editRefaccion(this.refaccion).subscribe();
    }
    this.initRefaccion();
    this.cerrarDialog();
  }

  cerrarDialog(): void{
    this.dialogRef.close(true);
  }



}
