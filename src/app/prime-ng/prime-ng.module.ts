import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MenubarModule,
    CardModule,
    ListboxModule
  ],
  exports:[
    InputTextModule,
    ButtonModule, 
    DropdownModule,
    MenubarModule,
    CardModule,
    ListboxModule
  ]
})
export class PrimeNgModule { }
