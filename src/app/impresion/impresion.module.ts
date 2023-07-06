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
import { FormsModule } from '@angular/forms';
import { DetalleImpresoraComponent } from './components/detalle-impresora/detalle-impresora.component';
import { RegistrarCambioComponent } from './components/registrar-cambio/registrar-cambio.component';



@NgModule({
  declarations: [
    HomeImpresionComponent,
    InventarioImpresionComponent,
    EdicionImpresoraComponent,
    AlmacenImpresionComponent,
    DetalleImpresoraComponent,
    RegistrarCambioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImpresionRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ImpresionModule { }
