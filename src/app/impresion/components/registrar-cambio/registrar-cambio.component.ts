import { DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FiltroImpresora, FiltroRefa, Impresora, ImpresoraDetalle, RefaccionImpresora, RegCambioRefaImp } from '../../interfaces/impresora.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { ImpresionService } from '../../services/impresion.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-registrar-cambio',
  templateUrl: './registrar-cambio.component.html',
  styleUrls: ['./registrar-cambio.component.css']
})
export class RegistrarCambioComponent implements OnInit{
  constructor(private dialogRef: MatDialogRef<ImpresoraDetalle>, private impresionService: ImpresionService){}

  
  titulo: string = "";
  detalles?: ImpresoraDetalle;
  datos: boolean= false;

  registro: RegCambioRefaImp = {
    cantidad: 1,
    idRefaccion: 0,
    idImpresora: 0,
    cont102: 0,
    cont109: 0,
    cont124: 0,
  };
  //filtro de refacciones
  filtro: FiltroRefa = {
    modelo: "",
    tipo: ""
  }
  idRefa: string = "";
  opcionTipo: string[] = ["CONSUMIBLE", "REFACCION"];
  modelos: string[] = ["MF525DW", "ILBP352DN", "IRA4545I", "C356IF"]
  refacciones?: RefaccionImpresora[];

  //filtro de impresoras
  filtroImpresora: FiltroImpresora = {
    Edificio: "",
    Ubicacion: ""
  }
  edificios: string[] = [];
  ubicaciones: string[] = [];

  //Impresoras
  impresoras: Impresora[] = [];
  impresora: Impresora = {
    impresoraId: "",
    nombre: "",
    modelo: "",
    serie: "",
    ip: '',
    mac: '',
    edificio: '',
    ubicacion: ''
  }
  idImp: string = "";

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    if(this.dialogRef._containerInstance._config.data == null){
      this.getEdificios();
      this.datos == false;
      return
    }
    this.datos = true;
    const info: ImpresoraDetalle = this.dialogRef._containerInstance._config.data.detalles;
    this.detalles = info;

    this.titulo = this.detalles.impresora.nombre;
    this.registro.idImpresora = parseInt(info.impresora.impresoraId);
    this.registro.cont102 = info.cont102;
    this.registro.cont109 = info.cont109;
    this.registro.cont124 = info.cont124;
    this.filtro.modelo = info.impresora.modelo;
  }

  guardarRegistro(){
    console.log(this.registro)
    this.impresionService.setRegistroConsumible(this.registro).subscribe(data => {
      console.log(data)
    })
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

  getEdificios(){
    this.impresionService.getEdificios().subscribe(data => {
      this.edificios = data;
    })
  }

  getUbicaciones(){
    let consulta = {
      edificio: this.filtroImpresora.Edificio
    }
    this.impresionService.getUbicaciones(consulta).subscribe(data => {
      this.ubicaciones = data;
      if(this.ubicaciones.length == 1){
        this.filtroImpresora.Ubicacion = this.ubicaciones[0]
        this.getImpresoras();
      }else{
        this.filtroImpresora.Ubicacion = "";
        this.impresoras = [];
        this.impresora!.modelo = "";
        this.filtro.tipo = "";
        this.refacciones = [];
      }

    })
  }

  getImpresoras(){
    this.impresionService.getImpresorasFiltro(this.filtroImpresora).subscribe(data => {
      this.impresoras = data;
      if(this.impresoras.length == 1){
        this.impresora = this.impresoras[0];
        this.filtro.modelo = this.impresoras[0].modelo;
        this.registro.idImpresora = parseInt(this.impresoras[0].impresoraId);
        this.getContadores(this.impresoras[0].impresoraId);
      }
    })
  }

  getModelo(){
    this.filtro.modelo = this.impresora!.modelo!;
    this.registro.idImpresora = parseInt(this.impresora!.impresoraId);
    this.getContadores(this.impresora.impresoraId)
  }

  getContadores(id: string){
    this.impresionService.getImpresoraDetalle(id).subscribe(data => {
      this.registro.cont102 = data.cont102;
      this.registro.cont109 = data.cont109;
      this.registro.cont124 = data.cont124;
    })
  }

}
