import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit{

  @Input() longitud: number = 0;
  @Input() tamPagina: number = 0;
  @Input() opcionesPagina: number[] = [];
  @Input() cantidaPaginas: number = 0;

  deshabilitades: boolean = true;
  deshabilitaasc: boolean = false;

  contador: number = 1;

  primero: number = 0;
  segundo: number = 0;

  noPagina: number = 0;

  pagina = {
    length: this.longitud,
    pageIndex: this.contador,
    pageSize: this.tamPagina,
    previousPageIndex: this.contador - 1,
  }

  constructor(){}


  ngOnInit(): void {
  }

  adelante(){
    this.contador = this.contador + 1;

    console.log(this.pagina)

    if(this.contador == this.cantidaPaginas){
      this.primero = this.primero + this.tamPagina;
      this.segundo = this.longitud;
    }else{
      this.primero = this.primero + this.tamPagina;
      this.segundo = this.primero + this.tamPagina;
    }

    if(this.contador > 1){
      this.deshabilitades = false;
      if(this.contador == this.cantidaPaginas){
        this.deshabilitaasc = true;
      }
    }
    //this.pagina.length = this.longitud;
    this.pagina.pageSize = this.tamPagina;
    this.pagina.pageIndex = this.pagina.pageIndex + 1;

  }

  atras(){
    this.contador = this.contador - 1;

    console.log(this.pagina)

    if(this.contador == (this.cantidaPaginas - 1)){
      this.primero = this.primero - this.tamPagina;
      this.segundo = this.primero + this.tamPagina
    }else{
      this.primero = this.primero - this.tamPagina;
      this.segundo = this.segundo - this.tamPagina;
    }
    if( this.contador < this.cantidaPaginas){
      this.deshabilitaasc = false;
      if(this.contador == 1){
        this.deshabilitades = true;
      }
    }

    //this.pagina.length = this.longitud;
    this.pagina.pageSize = this.tamPagina;
    this.pagina.pageIndex = this.pagina.pageIndex - 1;
    console.log(this.contador + " - " + this.cantidaPaginas)


  }

  cambioTam(){
    this.pagina.pageIndex = 1;
    console.log(this.pagina)
  }




}
