import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    MenuBarComponent
  ],
  exports:[
    MenuBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
    
  ]
})
export class SharedModule { }
