import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() seccion?:string;

  titulo = "";

  elementoSelect = {
    titulo: "",
    enlace: ""
  }

  elementosSidebar = [
    {
      seccion: 'Impresion',
      enlace: '/impresion/inventario',
      icono: PrimeIcons.PRINT,
      titulo: 'Inventario Impresoras'
    },
    {
      seccion: 'Impresion',
      enlace: '/impresion/almacen',
      icono: PrimeIcons.DATABASE,
      titulo: 'Almacen Refacciones'
    },
    {
      seccion: 'Impresion',
      enlace: '/impresion/controltoner',
      icono: PrimeIcons.FILE_EDIT,
      titulo: 'Control de Toner'
    },
    {
      seccion: 'Impresion',
      enlace: '/impresion/almacen',
      icono: PrimeIcons.CHART_LINE,
      titulo: 'Reporte Mensual'
    },
    {
      seccion: 'Wyse',
      enlace: '/wyse/inventario',
      icono: 'computer',
      titulo: 'Inventario Wyse'
    },
    {
      seccion: 'Wyse',
      enlace: '/wyse/almacen',
      icono: 'verified_user',
      titulo: 'Permisos Carpetas'
    },
    {
      seccion: 'Jammer',
      enlace: '/jammer/inventario',
      icono: 'computer',
      titulo: 'Inventario Jammer'
    }
  ]
  constructor(private router: Router){}

  ngOnInit(): void {

    let filtroItems = this.elementosSidebar.filter(item => item.seccion === this.seccion)
    this.elementosSidebar = filtroItems;

    console.log(this.seccion)

    this.titulo = `Inventario ${this.seccion}`
  }

  enlazar(elemento: any){
    this.router.navigate([elemento.enlace])
    console.log("enlazar")
  }


}
