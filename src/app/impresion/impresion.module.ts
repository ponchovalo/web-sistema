import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeImpresionComponent } from './pages/home-impresion/home-impresion.component';
import { ImpresionRoutingModule } from './impresion-routing-module';
import { InventarioImpresionComponent } from './pages/inventario-impresion/inventario-impresion.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { EdicionImpresoraComponent } from './components/edicion-impresora/edicion-impresora.component';



@NgModule({
  declarations: [
    HomeImpresionComponent,
    InventarioImpresionComponent,
    EdicionImpresoraComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImpresionRoutingModule,
    MaterialModule
  ]
})
export class ImpresionModule { }
