import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MenubarModule
  ],
  exports:[
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MenubarModule
  ]
})
export class PrimeNgModule { }
