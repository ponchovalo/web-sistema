import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ImpresionRoutingModule } from '../impresion/impresion-routing-module';
import { WyseRoutingModule } from '../wyse/wyse-routing.module';
import { ImpresionModule } from '../impresion/impresion.module';
import { HomeImpresionComponent } from '../impresion/pages/home-impresion/home-impresion.component';



@NgModule({
  declarations: [
    MenuBarComponent,
    SidebarComponent
  ],
  exports:[
    MenuBarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ImpresionRoutingModule,
    WyseRoutingModule


  ]
})
export class SharedModule { }
