import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeImpresionComponent } from './pages/home-impresion/home-impresion.component';
import { ImpresionRoutingModule } from './impresion-routing-module';
import { InventarioImpresionComponent } from './pages/inventario-impresion/inventario-impresion.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { EdicionImpresoraComponent } from './components/edicion-impresora/edicion-impresora.component';
import { AlmacenImpresionComponent } from './pages/almacen-impresion/almacen-impresion.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';



@NgModule({
  declarations: [
    HomeImpresionComponent,
    InventarioImpresionComponent,
    EdicionImpresoraComponent,
    AlmacenImpresionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImpresionRoutingModule,
    MaterialModule
  ]
})
export class ImpresionModule { }
