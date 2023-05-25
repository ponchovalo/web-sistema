import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input('seccion') seccion = ''; 

  listItems = [
    {
      enlace: '/impresion/inventario',
      icono: 'print',
      titulo: 'Inventario Impresoras'
    },
    {
      enlace: '/impresion/almacen',
      icono: 'inventory',
      titulo: 'Almacen Refacciones'
    },
    {
      enlace: '/impresion/inventario',
      icono: 'app_registration',
      titulo: 'Control de Toner'
    },
    {
      enlace: '/impresion/almacen',
      icono: 'calendar_month',
      titulo: 'Reporte Mensual'
    }
  ]
  constructor(private router: Router){}

  ngOnInit(): void {
    console.log(this.seccion);
  }

  
}
