import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WyseRoutingModule } from './wyse-routing.module';
import { InventarioWyseComponent } from './pages/inventario-wyse/inventario-wyse.component';
import { HomeWyseComponent } from './pages/home-wyse/home-wyse.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InventarioWyseComponent,
    HomeWyseComponent
  ],
  imports: [
    CommonModule,
    WyseRoutingModule,
    SharedModule
  ]
})
export class WyseModule { }
