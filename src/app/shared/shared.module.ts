import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ImpresionRoutingModule } from '../impresion/impresion-routing-module';
import { WyseRoutingModule } from '../wyse/wyse-routing.module';
import { JammerRoutingModule } from '../jammer/jammer-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MenuBarComponent,
    SidebarComponent
  ],
  exports:[
    MenuBarComponent,
    SidebarComponent,
    FormsModule
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ImpresionRoutingModule,
    WyseRoutingModule,
    JammerRoutingModule,
    FormsModule
  ]
})
export class SharedModule { }
