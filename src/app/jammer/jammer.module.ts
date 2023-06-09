import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JammerRoutingModule } from './jammer-routing.module';
import { HomeJammerComponent } from './pages/home-jammer/home-jammer.component';
import { InventarioJammerComponent } from './pages/inventario-jammer/inventario-jammer.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    HomeJammerComponent,
    InventarioJammerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    JammerRoutingModule,
    SharedModule
  ]
})
export class JammerModule { }
