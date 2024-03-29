import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeImpresionComponent } from './pages/home-impresion/home-impresion.component';
import { ImpresionRoutingModule } from './impresion-routing-module';
import { InventarioImpresionComponent } from './pages/inventario-impresion/inventario-impresion.component';
import { SharedModule } from '../shared/shared.module';
import { AlmacenImpresionComponent } from './pages/almacen-impresion/almacen-impresion.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ControlTonerComponent } from './pages/control-toner/control-toner.component';
import { ControlTonerDialogComponent } from './components/control-toner-dialog/control-toner-dialog.component';
import { ReportesImpresionComponent } from './pages/reportes-impresion/reportes-impresion.component';
import { ReporteMensualComponent } from './components/reporte-mensual/reporte-mensual.component';



@NgModule({
  declarations: [
    HomeImpresionComponent,
    InventarioImpresionComponent,
    AlmacenImpresionComponent,
    ControlTonerComponent,
    ControlTonerDialogComponent,
    ReportesImpresionComponent,
    ReporteMensualComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImpresionRoutingModule,
    PrimeNgModule,
    FormsModule,
  ]
})
export class ImpresionModule { }
