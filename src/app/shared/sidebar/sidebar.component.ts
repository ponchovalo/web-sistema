import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() seccion?:string;


  listItems = [
    {
      seccion: 'Impresion',
      enlace: '/impresion/inventario',
      icono: 'print',
      titulo: 'Inventario Impresoras'
    },
    {
      seccion: 'Impresion',
      enlace: '/impresion/almacen',
      icono: 'inventory',
      titulo: 'Almacen Refacciones'
    },
    {
      seccion: 'Impresion',
      enlace: '/impresion/controltoner',
      icono: 'app_registration',
      titulo: 'Control de Toner'
    },
    {
      seccion: 'Impresion',
      enlace: '/impresion/almacen',
      icono: 'calendar_month',
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

    let filtroItems = this.listItems.filter(item => item.seccion === this.seccion)
    this.listItems = filtroItems;

    console.log(this.seccion)
  }


}
