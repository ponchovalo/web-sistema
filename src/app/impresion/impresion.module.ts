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
import { ControlTonerComponent } from './pages/control-toner/control-toner.component';
import { EdicionRefaccionComponent } from './components/edicion-refaccion/edicion-refaccion.component';
import { PaginacionComponent } from './components/paginacion/paginacion.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    HomeImpresionComponent,
    InventarioImpresionComponent,
    EdicionImpresoraComponent,
    AlmacenImpresionComponent,
    DetalleImpresoraComponent,
    RegistrarCambioComponent,
    ControlTonerComponent,
    EdicionRefaccionComponent,
    PaginacionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImpresionRoutingModule,
    PrimeNgModule,
    MaterialModule,
    FormsModule,
  ]
})
export class ImpresionModule { }
